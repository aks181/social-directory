import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  success: boolean = false;
  warning: boolean = false;
  loggedUser: any;

  constructor(private formBuilder: FormBuilder, private _http: HttpClient, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    // this.loginForm = this.formBuilder.group({
    //   email: [''],
    //   password: ['']
    // })
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })    
  }
  
  //logIn method
  logIn() {
    this._http.get<any>("http://localhost:3000/signup")
      .subscribe(res => {
        const user = res.find((a: any) => {
          return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
        });
        if (user) {
          // this.success = true;
          // console.log(user.id);
          this.loggedUser = user;
          this.loginService.loggedUser = this.loggedUser;
          // console.log(this.loggedUser)
          this.loginForm.reset();
          this.router.navigate(['home'])
        } else {
          // alert('User not found.')
          this.warning = true;
        }

      }, err => {
        alert('Something went wrong.')
      })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // get LoggedInUser() {
  //   return this.loggedUserId;
  // }
}
