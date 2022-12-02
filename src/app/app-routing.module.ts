import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './service/auth-guard.service';

import { DeshboardComponent } from './components/deshboard/deshboard.component';
import { SigninComponent } from './components/signin/signin.component';
import { TablesComponent } from './components/tables/tables.component';
import { TestTableComponent } from './components/test-table/test-table.component';
import { TableMemberComponent } from './components/table-member/table-member.component';
import { TableStaffComponent } from './components/table-staff/table-staff.component';
import { ReportComponent } from './components/report/report.component';
import { ActivityComponent } from './components/activity/activity.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { TypeMemberComponent } from './components/type-member/type-member.component';
import { AddTypeMemberComponent } from './components/add-type-member/add-type-member.component';
import { RangeAgeComponent } from './components/range-age/range-age.component';
import { AddRangeAgeComponent } from './components/add-range-age/add-range-age.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DeshboardComponent },
  { path: 'statuslist', canActivate: [AuthGuard], component: TablesComponent },
  { path: 'member', canActivate: [AuthGuard], component: TableMemberComponent },
  { path: 'staff', canActivate: [AuthGuard], component: TableStaffComponent },
  { path: 'report', canActivate: [AuthGuard], component: ReportComponent },
  { path: 'activities', canActivate: [AuthGuard], component: ActivityComponent },
  { path: 'add_activities', canActivate: [AuthGuard], component: AddActivityComponent },
  { path: 'typemember', canActivate: [AuthGuard], component: TypeMemberComponent },
  { path: 'add_typemember', canActivate: [AuthGuard], component: AddTypeMemberComponent },
  { path: 'range_age', canActivate: [AuthGuard], component: RangeAgeComponent },
  { path: 'add_rangeage', canActivate: [AuthGuard], component: AddRangeAgeComponent },
  { path: '**', pathMatch: 'full', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
