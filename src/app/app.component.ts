import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  logo = '../assets/logo.png';
  videoId = 'https://www.youtube.com/embed/nyeNg6VjDqU?rel=0&amp;showinfo=0';

  constructor (private router: Router) {}

  ngOnInit(): void {}
}
