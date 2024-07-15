import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { HomeComponent } from './features/pages/Home/Home.component';
import { CreateAccountComponent } from './features/auth/create-account/create-account.component';
import { LoginComponent } from './features/auth/login/login.component';

export const routes: Routes = [

    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '',
    component: MainLayoutComponent,
    children: [
        {path: 'home', component: HomeComponent},
        {path: 'login', component: LoginComponent},
        {path: 'create-account', component: CreateAccountComponent}
    ],
    }
];