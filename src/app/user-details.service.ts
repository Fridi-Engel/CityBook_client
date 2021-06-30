import { Injectable } from '@angular/core';
import { User } from './user';
import { Children } from './chidren'
import { FormArray, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  user!: User;
  children: Children[] = [];


  constructor() {
    this.resetDetails();
  }

  resetDetails(){
    this.user={ FirstName: "", LastName: "", IdNumber: "", DateOfBirth: new Date(), HMO: "", Min: "" };
    this.children = [];
  }

}
