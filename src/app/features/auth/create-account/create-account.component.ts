import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/modules/material.module';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { AuthService } from '../../services/auth.service';
import { ICreateAccount } from '../../../shared/interfaces/createAccount/new-account.interface';
import { sha256 } from 'js-sha256';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackModalComponent } from '../../../shared/modals/feedback-modal/feedback-modal.component';
import { text } from 'stream/consumers';
import { IFeedbackDialogData } from '../../../shared/interfaces/feedback-dialog.interface';

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
export class CreateAccountComponent implements OnInit { 

  public form: FormGroup;
  public systemKey!: string;
  public teste: any;
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _dialog: MatDialog,
  ){
    this.form =  this._formBuilder.group({
      company: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      document: ['', Validators.required],
    })

  }
  public get F_password (): AbstractControl { return this.form.get('password') as AbstractControl; }
  public get F_email (): AbstractControl { return this.form.get('email') as AbstractControl; }
  public get F_company (): AbstractControl { return this.form.get('company') as AbstractControl; }
  public get F_document (): AbstractControl { return this.form.get('document') as AbstractControl; }

  public ngOnInit() {
   
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
    const salt = `salt${this.F_password.value}`;
    const hashSalt = sha256(salt);
    const PAYLOAD = {
      cnpjCpf: this.F_document.value,
      email: this.F_email.value,
      senhaHashed: hashSalt,
      usuario: this.F_email.value
    } as ICreateAccount;
    this._authService.systemKey.subscribe((res) => {
      console.log('res signature', res);
      this.systemKey = res;
    });
    this.createAccount(PAYLOAD);
  }

  public createAccount(payload: any): void {
    setTimeout(() => {
      this._authService.createNewAccount(payload, this.systemKey).subscribe((res) => {
        if(res.result.ret !== 0){
          this._dialog.open(FeedbackModalComponent, {
            data: {
              title: 'Erro!',
              text: 'Erro ao cadastrar Usuário! Verifique os dados e tente novamente'
            }
              });
              return;
        }
        this._dialog.open(FeedbackModalComponent, {
        data: {
          title: 'Sucesso!',
          aditionalText: 'Ao fechar você será redirecionado para o login',
          text: 'Usuário cadastrado com sucesso!'
        }
          });
        this.goTo('login');
      }, () => {
        this._dialog.open(FeedbackModalComponent, {
          data: {
            title: 'Erro!', 
            text: 'Erro ao cadastrar usuário! Tente mais tarde'
          }
            });
      });
    }, 2000)
  
  }
  
}
