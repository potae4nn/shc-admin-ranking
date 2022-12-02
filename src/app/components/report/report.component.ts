import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, fromEvent, tap, range } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivityService, IRangeAge, RangeResult, Result, IPlan, PlanResult, IRanking, ResultMen, ResultWomen, IActivity } from 'src/app/service/activity.service';
import { MatDialog } from '@angular/material/dialog';
import { StatusRankComponent } from '../dialog/status-rank/status-rank.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['index', 'employee_id', 'name', 'sex', 'plan_name', 'total_time', 'total_distance', 'shirt_size'];
  exampleDatabase!: ExampleHttpDatabase;
  dataWomen: ResultWomen[] = [];
  dataMen: ResultMen[] = [];
  range: RangeResult[] = [];
  id_plan!: number;
  id_range!: number;

  resultsLength: any;
  isLoadingResults = true;
  isRateLimitReached = false;

  public d = new Date();
  public yearNow = this.d.getFullYear();
  public yearArray: any[] = [];
  public yearSelect: string = '';
  public plans: PlanResult[] = [];
  public selectedYear: string | undefined;
  public plansList: number | undefined;
  public rangelists: number | undefined;
  public showtable: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputSearch') inputSearch!: ElementRef;
  @ViewChild('mySelectedYear') mySelectedYear!: MatSelect;
  @ViewChild('myPlansList') myPlansList!: MatSelect;
  @ViewChild('myRangelists') myRangelists!: MatSelect;

  constructor(private _activityService: ActivityService, public dialog: MatDialog) { }

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._activityService);
    this.exampleDatabase.getPlan().pipe(
      map(data => {
        this.isLoadingResults = false;
        if (data === null) {
          return [];
        }
        return data.result;
      })
    ).subscribe(data => this.plans = data)

    while (2000 <= Number(this.yearNow)) {
      this.yearArray.push(this.yearNow);
      this.yearNow--;
    }
  }

  ngAfterViewInit() {
    const myPlansList = this.myPlansList.valueChange.pipe(
      map(res => {
        this.exampleDatabase.getActivityById(res).subscribe(data =>
          this.range = data.result
        )
        this.id_plan = res;
      })
    );
    const mySelectedYear = this.mySelectedYear.valueChange.pipe(
      map(data => {
        this.yearSelect = data;
        return data;
      })
    );
    const myRangelists = this.myRangelists.valueChange.pipe(
      map(data => {
        this.id_range = data;
        return data;
      })
    )

    merge(myPlansList, myRangelists, mySelectedYear)
      .pipe(
        tap(() => {
          this.loadPage()
        })
      ).subscribe();
  }

  loadPage() {
    console.log(this.id_plan, this.id_range, this.yearSelect);
    this.exampleDatabase.getRanking(this.id_plan, this.id_range, this.yearSelect)
      ?.subscribe(data => {
        this.dataMen = data.resultMen,
          this.dataWomen = data.resultWomen
        if (data) this.showtable = true;
      })
  }
}

export class ExampleHttpDatabase {
  constructor(private _activityService: ActivityService) { }
  getRange(): Observable<IRangeAge> {
    return this._activityService.getRange();
  }
  getPlan(): Observable<IPlan> {
    return this._activityService.getPlan();
  }
  getActivityById(id: any): Observable<IRangeAge> {
    return this._activityService.getPlanRangeById(id);
  }
  getRanking(id_plan: number, id_range: number, year: string) {
    let ranking = undefined;
    if (id_plan !== undefined && id_range !== undefined && year !== undefined) {
      ranking = this._activityService.getRanking(id_plan, id_range, year);
    };
    return ranking
  }
}
