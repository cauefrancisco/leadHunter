import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AuthService } from '../../services/auth.service';
import { ICreateAccount } from '../../../shared/interfaces/createAccount/new-account.interface';
import { sha256 } from 'js-sha256';
import { IServerNonce } from '../../../shared/interfaces/serverNonce.interface';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
  ],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent implements OnInit, AfterViewInit { 

  public form: FormGroup;
  public systemKey!: string;
  public teste: any;
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
  ){
    this.form =  this._formBuilder.group({
      company: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      login: ['', Validators.required],
      document: ['', Validators.required],
    })

  }
  public get F_login (): AbstractControl { return this.form.get('login') as AbstractControl; }
  public get F_password (): AbstractControl { return this.form.get('password') as AbstractControl; }
  public get F_email (): AbstractControl { return this.form.get('email') as AbstractControl; }
  public get F_company (): AbstractControl { return this.form.get('company') as AbstractControl; }
  public get F_document (): AbstractControl { return this.form.get('document') as AbstractControl; }

  public ngOnInit() {
   
  }

  public ngAfterViewInit(): void {

  }

  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }
  
  public onSubmit(): void {
    this.requestSystemLogin();
  }
  
  public requestSystemLogin(): void {
    const path = 'retaguarda_prospect/usuarios/CadastrarUsuario';
    this._authService.path.next(path);
    this._authService.requestSystemLogin();
    setTimeout(() => {this.createAccount() }, 2000);
  }

  public createAccount(): void {
      const salt = `salt${this.F_password.value}`;
      const hashSalt = sha256(salt);
      const PAYLOAD = {
        cnpjCpf: this.F_document.value,
        email: this.F_email.value,
        senhaHashed: hashSalt,
        usuario: this.F_login.value
      } as ICreateAccount;
      this._authService.systemKey.subscribe((res) => {
        this.systemKey = res;
      });
      this._authService.createNewAccount(PAYLOAD, this.systemKey).subscribe((res) => {
        console.log('deu certo', res)  
        // criar comandos
        //colocar modal de feedback
        // request funcionando corretamente.
      }, () => {
        console.log('deu errado');
        // criar comandos
        //colocar modal de erro
      })
  
  }
  
}
