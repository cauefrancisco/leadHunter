import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth.service';
import { sha256 } from 'js-sha256';
import { ILogin } from '../../../shared/interfaces/login.interface';
import { IServerNonce } from '../../../shared/interfaces/serverNonce.interface';
import { ISession } from '../../../shared/interfaces/session.interface';
import moment from 'moment';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [AuthService],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent { 
  public form: FormGroup;
  public loggedIn!: boolean;
  public hide: boolean = true;
  public systemNonce!: string;
  public clientNonce!: string;
  public encryptedPassword!: string;
  public hash = sha256.create();
  public errorMessage = '';

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
  ){
    this.form =  this._formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
    
  }

  public get F_login (): AbstractControl { return this.form.get('login') as AbstractControl; }
  public get F_password (): AbstractControl { return this.form.get('password') as AbstractControl; }


  ngOnInit(){

  }

  ngAfterContentChecked(): void {
    this.F_login.value
    console.log(' this.F_login.value',  this.form.get('login')?.value);
    

  }

  ngOnChanges(): void {

    this.F_login.value
    console.log(' this.F_login.value',  this.F_login.value);
    
  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }

  public onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.requestLogin();
  }

  public requestLogin(): void {

    this._authService.getServerNonce(this.F_login.value).subscribe((res: IServerNonce) => {
      this.systemNonce = res.result;
      if (this.systemNonce.length > 0) {
        console.log('client nonce + 1', res.result);
        this.doLogin(res.result);
      }
    });
  }

  
  public doLogin(systemNonce: string): void {
    this.clientNonce = sha256(moment().toISOString());

    const loginPayload = {
      user: this.F_login.value,
      passwordEncrypted: this.F_password.value,
      clientNonce: this.clientNonce,
      systemNonce: systemNonce
    } as ILogin

    this._authService.doLogin(loginPayload).subscribe((res: ISession) => {
      console.log(res, 'login')
      if (res && res.result.length > 0) {
        this._authService.getUserNameForDisplay(res.logondisplay);
      }
    });
  }

}
