import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { Result, ICollect } from '../../service/deshboard.service';
import { StatusTableService } from 'src/app/service/status-table.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusRankComponent } from '../dialog/status-rank/status-rank.component';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit, AfterViewInit {

  constructor(private _statusTableService: StatusTableService, public dialog: MatDialog, public _formBuilder: UntypedFormBuilder) { }

  displayedColumns: string[] = ['user_id', 'name', 'distance', 'time', 'member_type_name', 'status', 'actions'];
  exampleDatabase!: ExampleHttpDatabase;
  dataRank: Result[] = [];
  checkFormArray: Array<any> = [];

  statusRank = this._formBuilder.group({
    approve: false,
    disapprove: false,
  });

  statusCheck = [
    { name: "approve", id: 1, name_th: 'อนุมัติ' },
    { name: "disapprove", id: 2, name_th: 'ไม่อนุมัติ' }
  ];

  resultsLength: any;
  resultsLengthSearch: any
  isLoadingResults = false;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputSearch') inputSearch!: ElementRef;
  @ViewChild('sectionStatus') sectionStatus!: ElementRef;

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.exampleDatabase = new ExampleHttpDatabase(this._statusTableService);
    this.exampleDatabase.searchPedding('', "history.timeupdate", "desc", 0, [])
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
    // If the user changes the sort order, reset back to the first page.
    fromEvent(this.inputSearch.nativeElement, 'input')
      .pipe(
        debounceTime(500),
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

  onChange(id: number, isChecked: boolean) {
    this.paginator.pageIndex = 0;
    if (isChecked) {
      this.checkFormArray.push(id);
      this.loadPage();
    } else {
      let index = this.checkFormArray.indexOf(id);
      this.checkFormArray.splice(index, 1);
      this.loadPage();
    }
  }

  loadPage() {
    this.exampleDatabase.searchPedding(
      this.inputSearch.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.checkFormArray
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

  colorStatus(status: any) {
    switch (status) {
      case '1':
        return '#008000';
      case '2':
        return '#ff0000';
      case '0':
        return '#ffa500';
    }
    return '#ffa500';
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
// page = หน้า, sort = ตัวที่ต้องการเรียง, order = วิธีการเรียง ASC ,DESC
export class ExampleHttpDatabase {
  constructor(private _statusTableService: StatusTableService) { }
  searchPedding(dataSearch: string, sort: string, order: SortDirection, page: number, status: any): Observable<ICollect> {
    return this._statusTableService.searchCollect(dataSearch, page, sort, order, status);
  }
}