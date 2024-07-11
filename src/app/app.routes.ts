import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { LoginComponent } from './core/pages/login/login.component';

export const routes: Routes = [

    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '',
    component: MainLayoutComponent,
    children: [
        {path: 'login', component: LoginComponent}
    ],
    }
];