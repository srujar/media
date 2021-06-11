import { Injectable } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
;

@Injectable()
export class AlertDialogService {
  constructor(private modalService: NgbModal) {}

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    dialogSize: 'sm' | 'lg' = 'sm'
  ): Promise<boolean> {
    const modalRef = this.modalService.open(AlertDialogComponent, { size: dialogSize });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    return modalRef.result;
  }
}