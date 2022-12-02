import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { DeshboardService, Result2, IApproveStatus } from 'src/app/service/deshboard.service';
import { url } from '../../../../app.url';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-status-rank',
  templateUrl: './status-rank.component.html',
  styleUrls: ['./status-rank.component.css']
})
export class StatusRankComponent implements OnInit, AfterViewInit {
  public details: Result2 | undefined;
  public url: string = url;
  public status: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public id_history: number,
    private _deshboardService: DeshboardService
  ) { }

  public approveForm = new UntypedFormGroup({
    distance: new UntypedFormControl(''),
    time: new UntypedFormControl(''),
    status: new UntypedFormControl(''),
    remark: new UntypedFormControl(null)
  });

  public dataApprove!: IApproveStatus;

  ngOnInit(): void {
    this._deshboardService.getDetail(this.id_history).pipe(
      map(data => {
        return data.results[0];
      })
    ).subscribe(data => this.details = data);
  }

  ngAfterViewInit() {
    this.approveForm.valueChanges.pipe(
      map(value => {
        value.id_history = this.id_history;
        value.time = this.changeTime(value.time);
        return value;
      })
    ).subscribe(data => this.dataApprove = data)
  }

  onApprove() {
    this._deshboardService.approve(this.dataApprove).subscribe(res => {
      try {
        if (res.message === "success") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'บันทึกสำเร็จ',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      } catch (error) {
        console.log(error);
      }
    })
  }

  changeTime(time: number) {
    const timeStr = time.toString()
    const myArray = timeStr.split(".");
    const periodH = Number(myArray[0]);
    const periodM = Number(myArray[1]);
    let timeNewCon: any;
    if (periodM !== undefined || periodH !== undefined) {
      if (periodM < 10) {
        timeNewCon = (periodH === undefined ? '00' : periodH) + ':' + '0' + periodM;
      } else {
        timeNewCon = (periodH === undefined ? '00' : periodH) + ':' + (periodM === undefined ? '00' : periodM);
      }
    } else if (periodM === undefined && periodH === undefined) {
      timeNewCon = null;
    }
    let timeNewData;
    if (timeNewCon == null) {
      timeNewData = time;
    } else {
      let timeSplit = timeNewCon.split(":");
      let timeSplitNum;
      if (!timeSplit[1]) {
        timeNewData = Number(timeSplit[0] * 60);
      } else {
        if (
          timeSplit[1] == "1" ||
          timeSplit[1] == "2" ||
          timeSplit[1] == "3" ||
          timeSplit[1] == "4" ||
          timeSplit[1] == "5" ||
          timeSplit[1] == "6" ||
          timeSplit[1] == "7" ||
          timeSplit[1] == "8" ||
          timeSplit[1] == "9"
        ) {
          timeSplitNum = Number(timeSplit[1] * 10);
        } else {
          timeSplitNum = Number(timeSplit[1]);
        }
        timeNewData = Number(timeSplit[0] * 60) + timeSplitNum;
      }
    }
    return timeNewData;
  }
}
