import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { url } from '../../../../app.url';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivityService, IActivity, Result, IRangeAge } from '../../../service/activity.service';
import Swal from 'sweetalert2';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/th';
import { SwiperOptions } from 'swiper';
import { EditImageComponent } from '../edit-image/edit-image.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpEventType } from '@angular/common/http';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css'],
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
export class EditActivityComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  public dataActivityByid: Result | undefined;
  url: string = url;
  fileImage: any[] = [];
  multipleImage!: [];
  progress = 0;

  public activityForm = new FormGroup({
    id_plan: new FormControl(this.id_plan),
    name: new FormControl(''),
    start_date: new FormControl(''),
    end_date: new FormControl(''),
    end_date_register: new FormControl(''),
    status: new FormControl(0),
    details: new FormControl(''),
  });

  status: string = '';
  showProgress: boolean = false;
  mode: ProgressBarMode = 'determinate';
  value = 0;

  rolesRange!: FormArray;

  formRangeAge!: FormGroup;

  showButtonUpload: boolean = false;

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

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public id_plan: number,
    private _activityService: ActivityService,
    // private _adapter: DateAdapter<any>,
    // @Inject(MAT_DATE_LOCALE) private _locale: string,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    const that = this;
    this._activityService.getActivityById(this.id_plan).pipe(
      map(data => {
        // console.log(data.result[0].check_range_age);
        that.formRangeAge = that.fb.group({
          rolesRange: that.fb.array(
            data.result[0].check_range_age
              .map(r =>
                that.fb.group({
                  id: r.id,
                  checked: r.checked == '1' ? true : false,
                  id_plan: that.id_plan,
                  id_report_range_age: r.id_report_range_age,
                  range_start: r.range_start,
                  range_end: r.range_end,
                  report_group_member: r.report_group_member,
                  report_type_time: r.report_type_time
                })
              )
          )
        });
        return data;
      })
    ).subscribe(data => this.dataActivityByid = data.result[0]);
  }

  get formDataRange() {
    return this.formRangeAge.get('rolesRange') as FormArray;
    // return <FormArray>this.formRangeAge.get('rolesRange')[controls];
  }

  changeTextStatus(event: any) {
    if (event == true) return this.status = 'Active';
    else return this.status = 'Inactive';
  }

  onSubmitTest(form: any) {
    console.log(form.value);
  }

  // getDateFormatString(): string {
  //   if (this._locale === 'th-TH') {
  //     this._adapter.setLocale(this._locale);
  //     return 'DD/MM/YYYY';
  //   }
  //   return '';
  // }

  onSubmit(formRangeAge: any) {
    console.log(formRangeAge);
  }

  openDialogImage(id_img: number) {
    const dialogWithForm = this.dialog.open(EditImageComponent, {
      width: '800px',
      data: {
        id_img: id_img,
        id_plan: this.id_plan
      }
    });
    dialogWithForm.afterClosed().subscribe(() => {
      this.ngOnInit()
    })
  }

  updateAllComplete(event: any) {
    console.log(event);
  }

  onUpdateActivity() {
    this._activityService.updateActivity(this.activityForm.value).subscribe(res => {
      try {
        if (res.message === "Success") {
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
      } catch (error) {
        console.log(error);
      }
    })
  }

  onUpdateRangeAge() {
    this._activityService.groupRangeAge(this.formRangeAge.value).subscribe(res => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    })
  }

  selectMultipleImage(event: any) {
    this.showButtonUpload = true;
    if (event.target.files.length > 0) {
      this.multipleImage = event.target.files;
    }
  }

  upload() {
    let formData = new FormData();
    this.progress = 0;
    // let files: Array<File> = this.filesToUpload;
    // console.log(this.multipleImage);

    for (let img of this.multipleImage) {
      formData.append('multiFiles', img);
    }
    formData.append('id_plan', this.id_plan.toString());
    this._activityService.uploadImages(formData).subscribe((event: any) => {
      console.log(event)
      if (event.type === HttpEventType.UploadProgress) {
        this.showProgress = true;
        this.progress = Math.round(100 * event.loaded / event.total);
        if (this.progress === 100) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'บันทึกรูปภาพสำเร็จ',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            setTimeout(() => {
              this.resetImageUpload()
            }, 1000);
          }
          )
        }
      }
    })
  }

  resetImageUpload() {
    this.showProgress = false;
    this.multipleImage = [];
    this.showButtonUpload = false;
    this.ngOnInit();
    this.progress = 0;
  }

}


