import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { ITile } from '../../interfaces/auth/material-grid.interface';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  tiles: ITile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];

  constructor(
    private _formBuilder: FormBuilder,
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
}
