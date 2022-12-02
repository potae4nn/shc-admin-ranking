import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from './service/auth-guard.service';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { NavbarComponent } from './components/navbar/navbar.component';
import { DeshboardComponent } from './components/deshboard/deshboard.component';
import { SigninComponent } from './components/signin/signin.component';
import { TestTableComponent } from './components/test-table/test-table.component';
import { StatusRankComponent } from './components/dialog/status-rank/status-rank.component';
import { TablesComponent } from './components/tables/tables.component';
import { TableMemberComponent } from './components/table-member/table-member.component';
import { TableStaffComponent } from './components/table-staff/table-staff.component';
import { MemberDialogComponent } from './components/dialog/member-dialog/member-dialog.component';
import { ReportComponent } from './components/report/report.component';
import { ActivityComponent } from './components/activity/activity.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { AddTypeMemberComponent } from './components/add-type-member/add-type-member.component';
import { TypeMemberComponent } from './components/type-member/type-member.component';
import { RangeAgeComponent } from './components/range-age/range-age.component';
import { AddRangeAgeComponent } from './components/add-range-age/add-range-age.component';
import { EditActivityComponent } from './components/dialog/edit-activity/edit-activity.component';
import { EditImageComponent } from './components/dialog/edit-image/edit-image.component';

import { DatesPipe } from './pipe/dates.pipe';
import { SetTimePipe } from './pipe/set-time.pipe';
import { StatusPipe } from './pipe/status.pipe';
import { SetDatePipe } from './pipe/set-date.pipe';
import { ImageGroupPipe } from './pipe/image-group.pipe';
import { StatusActivityPipe } from './pipe/status-activity.pipe';
import { SexPipe } from './pipe/sex.pipe';
import { TestPipe } from './pipe/test.pipe';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        DeshboardComponent,
        SigninComponent,
        TestTableComponent,
        StatusRankComponent,
        DatesPipe,
        SetTimePipe,
        TablesComponent,
        StatusPipe,
        TableMemberComponent,
        TableStaffComponent,
        MemberDialogComponent,
        ReportComponent,
        ActivityComponent,
        PagenotfoundComponent,
        SetDatePipe,
        StatusActivityPipe,
        AddActivityComponent,
        AddTypeMemberComponent,
        TypeMemberComponent,
        RangeAgeComponent,
        ImageGroupPipe,
        SexPipe,
        AddRangeAgeComponent,
        EditActivityComponent,
        EditImageComponent,
        TestPipe
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgxUsefulSwiperModule,
        FormsModule
    ],
    providers: [
        AuthGuardService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService,
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
