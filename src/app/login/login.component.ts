import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
 
  constructor(private formBuilder: FormBuilder, private _http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })

    this.validate();
  }
    validate() {
      'use strict'
    
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
    
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form: any) {
          form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    }
  //logIn method
  logIn() {
    this._http.get<any>("http://localhost:3000/signup").subscribe(res => {
      const user = res.find((a: any)=> {
        if(a.email === '' && a.email !== this.loginForm.value.email) {
          alert("User not found. Please register first.");
        }else {
          if(a.password === this.loginForm.value.password) {
            alert("Login Successful");            
            this.loginForm.reset();
            this.router.navigate(['home']);
            return;
          } else {
            alert("Incorrect email/password");
          }
        } 
        // else {
        //   alert("User not found. Please register first.");
        // } 

        
      })
    }, err => {
      alert("Something went wrong on the backend")
    })
  }
}
