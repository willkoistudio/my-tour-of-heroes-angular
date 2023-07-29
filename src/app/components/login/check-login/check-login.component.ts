import { Component, OnInit } from '@angular/core';
import { CheckLoginService } from '../../../services/check-login.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-check-login',
  templateUrl: './check-login.component.html',
  styleUrls: ['./check-login.component.scss'],
  animations: [
    trigger(
        'fadeRight', [
          transition(':enter', [
            style({transform: 'translateX(100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
          ]),
          transition(':leave', [
            style({transform: 'translateX(0)', opacity: 1}),
            animate('300ms', style({transform: 'translateX(100%)', opacity: 0}))
          ])
        ]
      )
    ]
})
export class CheckLoginComponent implements OnInit {

  message: any;

  constructor(private checkLoginService: CheckLoginService) { }

  ngOnInit() {
      this.checkLoginService.getMessage().subscribe(msg => { this.message = msg; });
  }

}
