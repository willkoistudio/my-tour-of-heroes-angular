import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { LocalStorage } from 'ngx-webstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger(
      'fadeIn', [
        transition(':enter', [
          style({transform: 'translateX(0%)', opacity: 0}),
          animate('200ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('100ms', style({transform: 'translateX(0%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class HeaderComponent implements OnInit {

  @LocalStorage('user')
  storage;
  role: string = this.storage ? this.storage.role : null;
  user: string = this.storage ? this.storage.name : null;
  menuMob: Boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {  }

  onMobile() {
    this.menuMob = !this.menuMob;
  }
  closeMenu() {
    this.menuMob = false;
  }
  goTo(route) {
    this.router.navigate([route]);
    this.menuMob = false;
  }
}
