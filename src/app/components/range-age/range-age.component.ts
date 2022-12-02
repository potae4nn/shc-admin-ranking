import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, fromEvent, tap } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivityService, IRangeAge, RangeResult } from 'src/app/service/activity.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusRankComponent } from '../dialog/status-rank/status-rank.component';
import { url } from '../../../app.url';

@Component({
  selector: 'app-range-age',
  templateUrl: './range-age.component.html',
  styleUrls: ['./range-age.component.css']
})
export class RangeAgeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['rangeage', 'range_start', 'range_end', 'typemember', 'actions'];
  exampleDatabase!: ExampleHttpDatabase;
  data: RangeResult[] = [];
  url: string = url;

  resultsLength: any;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  constructor(private _activityService: ActivityService, public dialog: MatDialog) { }

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._activityService);
    this.exampleDatabase.searchActivity('', "rgm.id", "asc", 0)
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
      ).subscribe(data => this.data = data)
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

  colorStatus(status: any) {
    switch (status) {
      case 1:
        return '#008000';
      case 2:
        return '#e60000';
    }
    return '#e60000';
  }

  loadPage() {
    this.exampleDatabase.searchActivity(
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
    ).subscribe(data => this.data = data)
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
  constructor(private _activityService: ActivityService) { }
  searchActivity(dataSearch: string, sort: string, order: SortDirection, page: number): Observable<IRangeAge> {
    return this._activityService.searchRangeAge(dataSearch, page, sort, order)
  }
}
