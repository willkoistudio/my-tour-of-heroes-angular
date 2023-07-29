// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SharedModule } from '../../shared/shared.module';

// Components
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroInfosComponent } from './hero-infos/hero-infos.component';
import { AddHeroComponent } from './add-hero/add-hero.component';

// Services
import { HeroService } from '../../services/hero.service';

// Route
import { heroRouting } from './hero-routing';


@NgModule({
  imports: [
    CommonModule,
    heroRouting,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    HeroesComponent,
    HeroDetailComponent,
    HeroInfosComponent,
    AddHeroComponent
  ],
  exports: [
    HeroesComponent,
    HeroDetailComponent,
    HeroInfosComponent,
    AddHeroComponent
  ],
  providers: [
    HeroService,
  ]
})
export class HeroModule { }
