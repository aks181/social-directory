import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup
  success:boolean = false;
  constructor(private formBuilder: FormBuilder, private _http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'name' : new FormControl(null, [Validators.required, Validators.minLength(3)]),
      'mobile' : new FormControl(null, [Validators.required, Validators.maxLength(10)]),
      'interests' : new FormControl(null, Validators.required),
      'location' : new FormControl(null, Validators.required),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
   
  }
  //method to create/register user
  signUp() {
    this._http.post<any>("http://localhost:3000/signup", this.signupForm.value).subscribe(res=> {
      // alert("Registration Successful ☺");
      this.success =true;
      this.signupForm.reset();
      this.router.navigate(['login'])
    }, err=> {
      alert("Something's wrong.")
    })
  }

  get name() {
    return this.signupForm.get('name');
  }
  get mobile() {
    return this.signupForm.get('mobile');
  }
  get interests() {
    return this.signupForm.get('interests');
  }
  get location() {
    return this.signupForm.get('location');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
}
