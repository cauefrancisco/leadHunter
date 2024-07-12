import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { LoginComponent } from './core/pages/auth/login/login.component';
import { CreateAccountComponent } from './core/pages/auth/create-account/create-account.component';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '',
    component: MainLayoutComponent,
    children: [
        {path: 'login', component: LoginComponent},
        {path: 'create-account', component: CreateAccountComponent}
    ],
    }
];