import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../class/user';
import { LocalStorage } from 'ngx-webstorage';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CheckLoginService } from './check-login.service';

@Injectable()
export class LoginService {

    @LocalStorage('user')
    storage;

    users: User[];
    errorLogin: string;

    constructor(
        private http: HttpClient,
        private uService: UserService,
        private router: Router,
        private check: CheckLoginService
    ) { }

    login(user: User) {
        this.uService.getAll().subscribe(users => {
            const userExist = users.find(u => u.name === user.name && u.password === user.password);
            if (userExist) {
                this.storage = userExist;
                this.check.success(`Welcome ${userExist.name} ! You will be redirected to the homepage in a few moments`);
                setTimeout(() => {
                    this.router.navigate(['/dashboard']);
               }, 1000);
            } else {
                this.check.error('Invalid username or password, please try again.');
            }
        });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
    }
}
