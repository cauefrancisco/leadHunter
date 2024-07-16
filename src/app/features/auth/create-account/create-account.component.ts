import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AuthService } from '../../services/auth.service';
import { ICreateAccount } from '../../../shared/interfaces/createAccount/new-account.interface';
import { sha256 } from 'js-sha256';

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
export class CreateAccountComponent { 

  public form: FormGroup;
  public systemKey!: string;

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

  public goTo(page: string): void {
    this._router.navigateByUrl(page);
  }

  public createAccount(): void {

    if(this.form.invalid){
      return;
    }
    //logar no sistema
    //gerar sessão do sistema com URL específica da requisição de criar conta
    //criptografar senha que o usuário escolheu
    //fazer requisição para createAccount

    this._authService.requestSystemLogin();
    this._authService.systemLoginResponse.subscribe((res) => {
      console.log('createAccountSystemKeyPayload', res);
      const path = 'retaguarda_prospect/usuarios/CadastrarUsuario';
      // const url = 'retaguarda_prospect/usuarios/CadastrarUsuario';
      this.systemKey = this._authService.generateSystemSignatureSession(res, path);
      console.log("systemKey", this.systemKey);
      const salt = `salt${this.F_password.value}`;
      const hashSalt = sha256(salt);
      const PAYLOAD = {
        cnpjCpf: this.F_document.value,
        email: this.F_email.value,
        senhaHashed: hashSalt,
        usuario: this.F_login.value
      } as ICreateAccount;

      this._authService.createNewAccount(PAYLOAD, this.systemKey).subscribe((res) => {
        console.log('deu certo')
        // criar comandos
        //colocar modal de feedback
        // request funcionando corretamente.
      }, () => {
        console.log('deu errado');
        // criar comandos
        //colocar modal de erro
      })
    });
  }
}
