import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ActivationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = true;
  hasFullView = false;

  ngOnInit() {
    this.setHasFullView();
  }

  private setHasFullView() {
    this.router.events.subscribe((data) => {
      if (data instanceof ActivationEnd) {
        this.hasFullView = data.snapshot.data['hasFullView'];
      }
    });
  }

  public logout() {
    Swal.fire({
      title: 'จะออกจากระบบใช่หรือไม่!!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'ยกเลิก',
      confirmButtonText: 'ออกจากระบบ'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("username");
        localStorage.removeItem("rankingToken");
        this.router.navigate(['signin']);
        Swal.fire({
          title: 'ออกจากระบบสำเร็จ!',
          icon: 'success'
        }
        )
      }
    })
  }

}

