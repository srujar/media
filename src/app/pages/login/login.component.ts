import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertDialogService } from 'src/app/services/alert-dialog.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertDialogService,
  ) { }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  login() {
    if (!this.loginForm.valid) {
      this.markAllAsTouched(this.loginForm);
    }

    this.authService.login(this.loginForm.value).subscribe(userDetails => {
      console.log("userDetails", userDetails);
      if (userDetails.success) {
        this.alertService.confirm('Login', `You have successfully logged in`, 'OK', 'sm');
        this.activeModal.close('success');
      } else {
        this.alertService.confirm('Login', `User ${this.loginForm.value.userid} doesn't exist !!!`, 'OK', 'sm');
      }
    });

  }

  public markAllAsTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
      if (control.controls) {
        this.markAllAsTouched(control);
      }
    });
  }

}
