import { Component, OnInit } from '@angular/core';
import { User } from '../../class/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CheckLoginService } from '../../services/check-login.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
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
export class LoginComponent implements OnInit {
  logo = '../assets/logo.png';
  user: User;
  loginForm: FormGroup;
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private checkLoginService: CheckLoginService
  ) {
    this.buildForm(); // inject FormBuilder
  }

  ngOnInit() {
    // reset login status
    this.loginService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.user = {
      name: null,
      password: null
    };
  }

  // Formulaire
  buildForm() {
    this.loginForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')])],
      password: ['', Validators.required]
    });
  }

  login() {
    this.loginService.login(this.user);

      // .subscribe(
      //     data => {
      //         this.router.navigate([this.returnUrl]);
      //     },
      //     error => {
      //         this.checkLoginService.error(error);
      //     });
  }
}
