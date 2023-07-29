import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../class/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  url: 'http://localhost:3000';

  getAll() {
      return this.http.get<User[]>('http://localhost:3000/users');
  }

  getById(id: number) {
      return this.http.get(`${this.url}/users/${id}`);
  }

  create(user: User) {
      return this.http.post(`${this.url}/users`, user);
  }

  update(user: User) {
      return this.http.put(`${this.url}/users/${user.id}`, user);
  }

  delete(id: number) {
      return this.http.delete(`${this.url}/users/${id}`);
  }
}
