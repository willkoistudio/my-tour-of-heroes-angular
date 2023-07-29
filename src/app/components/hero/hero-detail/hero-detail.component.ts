import { Component, OnInit, Input, Output } from '@angular/core';
import { Hero } from '../../../class/hero';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { EventEmitter } from 'events';
import { HeroService } from '../../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
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
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
  }
  close(): void {
    this.hero = undefined;
  }
  saveName(): void {
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.close());
  }
}
