import { Component, OnInit } from '@angular/core';
import {UserDetailsService} from '../user-details.service';
import {User} from '../user'

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  user!:User;

  constructor(private userDetail:UserDetailsService) { }
 
  ngOnInit(): void {
   this.user=this.userDetail.user;
   console.log(this.user.FirstName);
  }

}
