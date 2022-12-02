import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, fromEvent, tap } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DeshboardService, Result, ICollect } from '../../service/deshboard.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusRankComponent } from '../dialog/status-rank/status-rank.component';

@Component({
  selector: 'app-deshboard',
  templateUrl: './deshboard.component.html',
  styleUrls: ['./deshboard.component.css']
})

export class DeshboardComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['user_id', 'name', 'distance', 'time', 'member_type_name', 'actions'];
  exampleDatabase!: ExampleHttpDatabase;
  dataRank: Result[] = [];

  resultsLength: any;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  constructor(private _deshboardService: DeshboardService, public dialog: MatDialog) { }

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._deshboardService);
    this.exampleDatabase.searchPedding('', "history.timeupdate", "desc", 0)
      .pipe(
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }
          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.count[0].count;
          return data.result;
        })
      ).subscribe(data => this.dataRank = data);
  }

  ngAfterViewInit() {
    fromEvent(this.inputSearch.nativeElement, 'input')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadPage();
        }),
      ).subscribe();

    this.sort.sortChange.subscribe(() => (
      this.paginator.pageIndex = 0
    ));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.loadPage()
        })
      ).subscribe();
  }

  loadPage() {
    this.exampleDatabase.searchPedding(
      this.inputSearch.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex
    ).pipe(
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;

        if (data === null) {
          return [];
        }
        // Only refresh the result length if there is new data. In case of rate
        // limit errors, we do not want to reset the paginator to zero, as that
        // would prevent users from re-triggering requests.
        this.resultsLength = data.count[0].count;
        return data.result;
      })
    ).subscribe(data => this.dataRank = data)
  }

  openDialogStatus(id_history: number) {
    const dialogWithForm = this.dialog.open(StatusRankComponent, {
      width: '950px',
      data: id_history
    });
    dialogWithForm.afterClosed().subscribe(result => {
      if (result === true) {
        setTimeout(() => {
          this.ngOnInit()
        }, 2000);
      }
    })
  }
}

export class ExampleHttpDatabase {
  constructor(private _deshboardService: DeshboardService) { }
  searchPedding(dataSearch: string, sort: string, order: SortDirection, page: number): Observable<ICollect> {
    return this._deshboardService.searchCollect(dataSearch, page, sort, order)
  }
}
