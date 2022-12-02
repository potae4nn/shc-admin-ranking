import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public userservice: UserService, public router: Router) { }
  signinForm: UntypedFormGroup = new UntypedFormGroup({
    username: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', [Validators.required,
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[0-9])(?=.{6,})/
    ),
    // /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
    Validators.minLength(6),
    ]),
  });
  @Input() error!: string | null;

  @Output() submitEM = new EventEmitter();

  submit() {
    if (this.signinForm.valid) {
      this.userservice.userLogin(this.signinForm.value).subscribe(
        res => {
          localStorage.setItem("username", res.users.name);
          localStorage.setItem("rankingToken", res.token);
        },
        err => {
          console.log(err.error.message);
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: err.error.message,
            showConfirmButton: false,
            timer: 2000,
          })
        },
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'เข้าสู่ระบบสำเร็จ',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            this.router.navigate(['dashboard']);
          })
        }
      );
      this.submitEM.emit(this.signinForm.value);
    }
  }
  ngOnInit(): void {

  }

}
