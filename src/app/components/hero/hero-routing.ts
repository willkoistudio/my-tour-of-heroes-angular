import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';

// Components
import { HeroesComponent } from './heroes/heroes.component';
import { HeroInfosComponent } from './hero-infos/hero-infos.component';
import { AddHeroComponent } from './add-hero/add-hero.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent, canActivate: [AuthGuard] },
  { path: 'hero/:id', component: HeroInfosComponent, canActivate: [AuthGuard] },
  { path: 'add-hero', component: AddHeroComponent, canActivate: [AuthGuard] }
];

export const heroRouting: ModuleWithProviders = RouterModule.forChild(routes);

