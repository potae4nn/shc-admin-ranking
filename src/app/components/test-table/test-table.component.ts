import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, fromEvent, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DeshboardService, Result, ICollect } from '../../service/deshboard.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusRankComponent } from '../dialog/status-rank/status-rank.component';
/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-test-table',
  templateUrl: './test-table.component.html',
  styleUrls: ['./test-table.component.css']
})
export class TestTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['user_id', 'name', 'member_type_name', 'distance'];
  exampleDatabase!: ExampleHttpDatabase;
  dataRank: Result[] = [];

  resultsLength: any;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _deshboardService: DeshboardService, public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._deshboardService);
    const searchBox = document.getElementById('search-box') as HTMLInputElement;
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (
      this.paginator.pageIndex = 0
    ));
    
    fromEvent(searchBox, 'input')
    .pipe(
      map(e => (e.target as HTMLInputElement).value),
      // filter(text => text.length >= 0),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((searchTerm) => {
        this.isLoadingResults = true;
        return this.exampleDatabase!.searchPedding(
          searchTerm,
          this.sort.active,
          this.sort.direction,
          this.paginator.pageIndex
        ).pipe(catchError(() => observableOf(null)));
      }),
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
    ).subscribe(data => (this.dataRank = data))

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase!.getPedding(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex
          ).pipe(catchError(() => observableOf(null)));
        }),
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
          console.log(data.result)
          return data.result;
        })
      ).subscribe(data => (this.dataRank = data));
  }

  openDialogStatus(id_history: number) {
    const dialogWithForm = this.dialog.open(StatusRankComponent, {
      width: '950px',
      data: id_history
    });
    dialogWithForm.afterClosed().subscribe(result => {
      if (result === true) {
        setTimeout(() => {
          this.ngAfterViewInit()
        }, 2000);
      }
    })
  }
}

export class ExampleHttpDatabase {
  constructor(private _deshboardService: DeshboardService) { }
  getPedding(sort: string, order: SortDirection, page: number): Observable<ICollect> {
    console.log("sort:" + sort, "order:" + order, "page: " + page)
    return this._deshboardService.getCollect(page, sort, order)
  }

  searchPedding(dataSearch: string, sort: string, order: SortDirection, page: number): Observable<ICollect> {
    console.log(sort, order, page, dataSearch)
    return this._deshboardService.searchCollect(dataSearch, page, sort, order)
  }
}