import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent { 

  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router
  ){
    this.form =  this._formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      document: ['', Validators.required],
    })
    
  }

  public get F_login (): AbstractControl { return this.form.get('user') as AbstractControl; }
  public get F_password (): AbstractControl { return this.form.get('password') as AbstractControl; }
  public get F_email (): AbstractControl { return this.form.get('email') as AbstractControl; }
  public get F_phoneNumber (): AbstractControl { return this.form.get('phoneNuber') as AbstractControl; }
  public get F_document (): AbstractControl { return this.form.get('document') as AbstractControl; }

  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }
}
