import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { UserData } from './userslist.model';
import { LoginComponent } from "../login/login.component";
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  allUsersData = [];
  userModelObj: UserData = new UserData;
  searchText: any;
  uname = '';
  loggedUser2: any;
  loggedUserId: any;
  success = false;

  constructor(private api: ApiService, private _http:HttpClient, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getUserData();
    this.loggedUser2 = this.loginService.loggedUser
    this.uname = this.loggedUser2.name.split(' ')[0];
    // console.log(this.loggedUser2)
    this.loggedUserId = this.loggedUser2.id;
    // console.log(this.loggedUserId)
  }

  getUserData() {
    this.api.getUsers().subscribe(res => {
      // console.log(res);
      res = res.filter(item => item.id !== this.loggedUserId)
      this.allUsersData = res;
    })
  }

  addContact(data: any) {
    console.log(data);
    console.log(this.userModelObj.contacts);
    this.userModelObj.contacts.push(data);
    console.log(this.userModelObj)
    // this.loggedUser2.contacts.push(this.userModelObj)
    console.log(this.loggedUser2);
    let newObj = {...this.userModelObj, ...this.loggedUser2}
    console.log(newObj);
    const {id, ...otherProps} = newObj;
    const newerObj = {userId: id, ...otherProps};
    console.log(newerObj);


    this._http.post<any>("http://localhost:3000/contactsnew", newerObj).subscribe(res => {
      // alert("Contact added successfully.");
      this.success = true;
      
    }, err=> {
      alert("Something's wrong.")
    })
    this.success= false;
  }

  searchUsers(event) {
    // console.log(event.target.value)

  }
 

}
