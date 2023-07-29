import { Component, OnInit, OnDestroy } from '@angular/core';

import { MessageService } from '../../services/message.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
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

export class MessagesComponent implements OnInit, OnDestroy {

  public notification: Boolean = false;
  private subscription: Subscription;
  private timer: Observable<any>;

  constructor(public messageService: MessageService) {
  }
  // timeoutID: any;
  public ngOnInit() {
    this.messageService.clear();
    // call this setTimer method when you want to set timer
    this.setTimer();
  }
  public ngOnDestroy() {
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }
  public setTimer() {

    // set notification to true to show loading div on view
    this.notification = true;

    this.timer = Observable.timer(3000); // 3000 millisecond means 3 seconds
    this.subscription = this.timer.subscribe(() => {
        // set notification to false to hide loading div from view after 5 seconds
        this.notification = false;
    });
  }
}
