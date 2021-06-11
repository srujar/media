import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
  }

  showLogin() {
    const modalRef = this.modal.open(LoginComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false,
    });
    modalRef.result
      .then((result) => {
        if (result === 'success') {
        }
      })
      .catch((error) => {});
  }

}
