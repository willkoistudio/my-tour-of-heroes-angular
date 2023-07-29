import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Components
import { DashboardComponent } from '../app/components/dashboard/dashboard.component';
import { LoginComponent } from '../app/components/login/login.component';
import { AuthGuard } from '../app/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'heroes', loadChildren: 'app/components/hero/hero.module#HeroModule' },
  { path: 'blog', loadChildren: 'app/components/blog/blog.module#BlogModule' },
  // otherwise redirect to home
  { path: '**', redirectTo: '/home' }
];

export const mainRouting: ModuleWithProviders = RouterModule.forRoot(routes);
