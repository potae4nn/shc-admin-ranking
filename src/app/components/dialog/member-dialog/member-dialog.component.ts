import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService, ResultMember } from '../../../service/user.service'
import { map } from 'rxjs';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.css']
})
export class MemberDialogComponent implements OnInit {
  public details: ResultMember | undefined;

  public userForm = new UntypedFormGroup({
    id_user: new UntypedFormControl(this.id_user),
    employee_id: new UntypedFormControl(''),
    name: new UntypedFormControl(''),
    status: new UntypedFormControl(''),
    contact_number: new UntypedFormControl(''),
    email: new UntypedFormControl('')
  });

  constructor(@Inject(MAT_DIALOG_DATA) public id_user: number, private _userService: UserService) { }

  ngOnInit() {
    this._userService.getMemberId(this.id_user)
      .pipe(
        map(data => {
          return data.result[0];
        })
      )
      .subscribe(data => this.details = data)
  }
  onUpdateUser() {
    this._userService.updateMember(this.userForm.value).subscribe(res => {
      try {
        if (res.message === "success") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'แก้ไขรายชื่อสำเร็จ',
            showConfirmButton: false,
            timer: 2000,
          })
        }
      } catch (error) {
        console.log(error);
      }
    }

    )
  }
}
