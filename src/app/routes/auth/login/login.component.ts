import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  public form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
  ){
    this.form =  this._formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    })
    
  }

  public get F_login (): AbstractControl { return this.form.get('login') as AbstractControl; }
  public get F_password (): AbstractControl { return this.form.get('password') as AbstractControl; }


  ngOnInit(){
    console.log("valor input login", this.F_login.value);
    console.log("valor input login", this.F_password.value);
  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }
}
