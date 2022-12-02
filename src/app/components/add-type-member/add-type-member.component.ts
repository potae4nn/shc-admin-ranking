import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { StaffService } from 'src/app/service/staff.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-type-member',
  templateUrl: './add-type-member.component.html',
  styleUrls: ['./add-type-member.component.css']
})
export class AddTypeMemberComponent implements OnInit {

  constructor(private _staffService:StaffService) { }

  public formAddMember = new UntypedFormGroup({
    title: new UntypedFormControl('', Validators.required),
    detail: new UntypedFormControl('')
  });

  ngOnInit(): void {
  }

  public addTypeMember() {
    this._staffService.addTypeMember(this.formAddMember.value).subscribe(data=>{
      if (data.message === "success") {
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
