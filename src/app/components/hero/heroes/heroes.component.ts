import { Component, OnInit } from '@angular/core';
import { Hero } from '../../../class/hero';

import { HeroService } from '../../../services/hero.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  animations: [
    trigger(
      'fadeIn', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('100ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('100ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger(
      'fadeRight', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('300ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})

export class HeroesComponent implements OnInit {
  heroes: Hero[]; // array des héros
  filteredHeroes: Hero[]; // array des héros filtrés
  listHeroes: Hero[]; // array des héros conditionné si filtrés ou normal
  selectedHero: Hero;

  constructor(private heroService: HeroService, private searchService: SearchService) {}

  onSelect(hero: Hero): void {
    this.selectedHero !== hero ? this.selectedHero = hero : this.selectedHero = undefined;
  }

  ngOnInit(): void {
      this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }
  _heroes() {
    if (!this.filteredHeroes) {
      this.listHeroes = this.heroes;
      return this.listHeroes;
    } else {
      this.listHeroes = this.filteredHeroes;
      return this.listHeroes;
    }
  }
  onChange(value) {
      this.filteredHeroes = this.searchService.research(this.heroes, value);
  }
  reset() {
    this.filteredHeroes = this.searchService.research(this.heroes, '');
  }

}
