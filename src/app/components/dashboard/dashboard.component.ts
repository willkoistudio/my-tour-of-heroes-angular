import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Hero } from '../../class/hero';
import { HeroService } from '../../services/hero.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs/Observable';
import { Article } from '../../class/article';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
    )
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit {

  heroes$: Observable<Hero[]>;
  articles$: Observable<Article[]>;
  selectedHero: Hero;

  constructor(private heroService: HeroService, private blogService: BlogService) {}

  ngOnInit() {
    this.heroes$ = this.heroService.getHeroes();
    this.articles$ = this.blogService.getArticles();
  }
  ngAfterViewInit(): void {
  }
  onSelect(hero: Hero): void {
    this.selectedHero !== hero ? this.selectedHero = hero : this.selectedHero = undefined;
  }
}
