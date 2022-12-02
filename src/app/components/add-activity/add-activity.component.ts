import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/th';
import { ActivityService } from 'src/app/service/activity.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'th-TH' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ],
})
export class AddActivityComponent implements OnInit {

  constructor(private _activityService: ActivityService) { }

  public formActivity = new FormGroup({
    name: new FormControl('', Validators.required),
    start_date: new FormControl('', Validators.required),
    end_date_register: new FormControl('', Validators.required),
    end_date: new FormControl('', Validators.required),
    details: new FormControl('')
  })

  ngOnInit(): void {
  }

  onSaveActivity() {
    this._activityService.addActivity(this.formActivity.value).subscribe(res => {
      if (res.message === "success") {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'บันทึกสำเร็จ',
          showConfirmButton: false,
          timer: 2000,
        }).then(() => {
          this.ngOnInit();
        })
      }
    })
  }

}
