import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { from } from 'rxjs';
import { User } from '../user';
import { Children } from '../chidren'
import { DomSanitizer } from '@angular/platform-browser';
import { HttpUserService } from '../http-user.service';
import { UserDetailsService } from '../user-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  profileForm!: FormGroup;
  messageSave!: string;
  maxDate = new Date();
  minDate!: Date;

  constructor(private fb: FormBuilder, private http: HttpUserService, private userDetails: UserDetailsService, private _snackBar: MatSnackBar) {
    this.resetForm();
    this.minDate = this.userDetails.user.DateOfBirth;
    console.log(this.profileForm.get("dateOfBirth")?.value);
  }


  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.saveToService();
  }

  resetForm() {
    this.profileForm = this.fb.group({
      firstName: [this.userDetails.user.FirstName, Validators.pattern("[A-Za-z]+")],
      lastName: [this.userDetails.user.LastName, Validators.pattern("[A-Za-z]+")],
      idNumber: [this.userDetails.user.IdNumber, Validators.pattern("[0-9]+")],
      dateOfBirth: [this.userDetails.user.DateOfBirth, Validators.required],
      hmo: [this.userDetails.user.HMO],
      min: [this.userDetails.user.Min],
      children: this.fb.array([]),
    });

    this.userDetails.children.map(x => {
      this.children().push(this.newChild(x.Name, x.Idnumber, x.DateOfBirth));
    })

  }

  children(): FormArray {
    return this.profileForm.get("children") as FormArray
  }

  newChild(name: string, id: string, date: Date): FormGroup {
    return this.fb.group({
      Name: [name, Validators.pattern("[A-Za-z' ']+")],
      Idnumber: [id, Validators.pattern("[0-9]+")],
      DateOfBirth: date
    })
  }

  addChild() {
    this.children().push(this.newChild('', '', new Date()));
  }
  save() {
    this.saveToService();
    this.http.AddUser(this.userDetails.user, this.userDetails.children).subscribe((x: any) => {
      this._snackBar.open(x, "OK");
    });
  }

  saveToService() {
    this.userDetails.user.FirstName = this.profileForm.get("firstName")?.value;
    this.userDetails.user.LastName = this.profileForm.get("lastName")?.value;
    this.userDetails.user.DateOfBirth = this.profileForm.get("dateOfBirth")?.value;
    this.userDetails.user.IdNumber = this.profileForm.get("idNumber")?.value;
    this.userDetails.user.HMO = this.profileForm.get("hmo")?.value;
    this.userDetails.user.Min = this.profileForm.get("min")?.value;
    this.userDetails.children = this.profileForm.get("children")?.value;
    console.log(this.userDetails.user.DateOfBirth);
  }

  newForm(){
    window.location.reload();
  }
}
