import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, AlertDialogComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[HeaderComponent, FooterComponent]
})
export class SharedModule { }