import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { map, Observable } from 'rxjs';
import { StaffService, ISelectAddRange, ResultSelectAddRange, IAddRangeAge } from 'src/app/service/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-range-age',
  templateUrl: './add-range-age.component.html',
  styleUrls: ['./add-range-age.component.css']
})
export class AddRangeAgeComponent implements OnInit, AfterViewInit {
  @ViewChild('myGroupMember') myGroupMember!: MatSelect;
  @ViewChild('myTypeTime') myTypeTime!: MatSelect;
  exampleDatabase!: ExampleHttpDatabase;
  public groupMember: number | undefined;
  public typeTime: number | undefined;
  public dataGroupMember!: ResultSelectAddRange[];
  public dataTypeTime!: ResultSelectAddRange[];

  public formAddRangeAge = new UntypedFormGroup({
    groupMember: new UntypedFormControl(0),
    typeTime: new UntypedFormControl(0),
    range_start: new UntypedFormControl('', Validators.required),
    reane_end: new UntypedFormControl('', Validators.required)
  });

  constructor(private _staffService: StaffService) { }

  ngOnInit(): void {
    this.exampleDatabase = new ExampleHttpDatabase(this._staffService);
    this.exampleDatabase.getGroupMember().subscribe(data => this.dataGroupMember = data.result)
    this.exampleDatabase.getTypeTime().subscribe(data => this.dataTypeTime = data.result)
  }

  ngAfterViewInit(): void {
  }

  addRangeAge() {
    this.exampleDatabase.addRangeAge(this.formAddRangeAge.value).subscribe(res=>{
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


export class ExampleHttpDatabase {
  constructor(private _staffService: StaffService) { }
  getGroupMember(): Observable<ISelectAddRange> {
    return this._staffService.groupTypeMember();
  }
  getTypeTime(): Observable<ISelectAddRange> {
    return this._staffService.getTypeTime();
  }
  addRangeAge(result: IAddRangeAge): Observable<IAddRangeAge> {
    return this._staffService.addRangeAge(result);
  }
}