import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, fromEvent, tap } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivityService, IActivity, Result } from 'src/app/service/activity.service';
import { MatDialog } from '@angular/material/dialog';
import { EditActivityComponent } from '../dialog/edit-activity/edit-activity.component';
import { url } from '../../../app.url';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'start_date', 'end_date_register', 'end_date', 'details', 'status', 'actions'];
  exampleDatabase!: ExampleHttpDatabase;
  dataActivity: Result[] = [];
  url: string = url;
  config: SwiperOptions = {
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    loop: true
  };

  resultsLength: any;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  constructor(private _activityService: ActivityService, public dialog: MatDialog) { }

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._activityService);
    this.exampleDatabase.searchActivity('', "id_plan", "desc", 0)
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
          console.log(data)
          return data.result;
        })
      ).subscribe(data => this.dataActivity = data)
  }
  concat(image: any) {
    const img = image.split(',');
    return img
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
    ).subscribe(data => this.dataActivity = data)
  }


  openDialogEditActivity(id_plan: number) {
    console.log(id_plan)
    const dialogWithForm = this.dialog.open(EditActivityComponent, {
      width: '950px',
      data: id_plan
    });
    dialogWithForm.afterClosed().subscribe(() => {
      this.ngOnInit()
    })
  }
}

export class ExampleHttpDatabase {
  constructor(private _activityService: ActivityService) { }
  searchActivity(dataSearch: string, sort: string, order: SortDirection, page: number): Observable<IActivity> {
    return this._activityService.searchActivity(dataSearch, page, sort, order)
  }
}
