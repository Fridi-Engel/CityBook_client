import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user'
import { Children } from './chidren'
import { UserChildren } from './userChild'

@Injectable({
  providedIn: 'root'
})
export class HttpUserService {

  constructor(private http: HttpClient) { }

  AddUser(user: User, children: Children[]) {
    let params: UserChildren = { user: user, children: children };
    console.log(params.user);
    console.log(params.children);
    return this.http.post("http://localhost:59033/api/User/AddUser", params);
  }
}
