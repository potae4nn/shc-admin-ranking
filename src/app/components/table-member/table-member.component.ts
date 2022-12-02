import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { merge, Observable, fromEvent, tap } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UserService, IMember, ResultMember } from '../../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { MemberDialogComponent } from '../dialog/member-dialog/member-dialog.component';

@Component({
  selector: 'app-table-member',
  templateUrl: './table-member.component.html',
  styleUrls: ['./table-member.component.css']
})
export class TableMemberComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['employee_id', 'name', 'contact_number', 'email', 'actions'];
  exampleDatabase!: ExampleHttpDatabase;
  dataMember: ResultMember[] = [];

  resultsLength: any;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('inputSearch') inputSearch!: ElementRef;

  constructor(private _userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDatabase(this._userService);
    this.exampleDatabase.getMember('', "userupdate", "desc", 0)
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
      ).subscribe(data => this.dataMember = data);
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
    this.exampleDatabase.getMember(
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
    ).subscribe(data => this.dataMember = data)
  }

  openDialog(id_user:number){
    console.log(id_user)
    const dialogWithForm = this.dialog.open(MemberDialogComponent, {
      width: '400px',
      height:'500px',
      data: id_user
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
  constructor(private _userService: UserService) { }
  getMember(dataSearch: string, sort: string, order: SortDirection, page: number): Observable<IMember> {
    return this._userService.getMember(dataSearch, page, sort, order)
  }
}

