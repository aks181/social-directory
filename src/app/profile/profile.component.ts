import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { ApiService } from "../shared/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id : number =1;
  myContacts: any = [];
  loggedUser2: any;

  constructor(private api: ApiService, private loginService: LoginService) { }

  ngOnInit(): void {
    this.getContactsData();
    // console.log(this.loginService.loggedUser)
    this.loggedUser2 = this.loginService.loggedUser;
    
  }
  getContactsData() {
      this.api.getContacts().subscribe(res => {
      // this.myContacts.push(res);
      console.log(res[res.length-1].contacts);
      this.myContacts = res[res.length-1].contacts;
      // console.log(this.myContacts)
    })
  }

  get name() {
    return this.loggedUser2.name;
  }
  get email() {
    return this.loggedUser2.email;
  }
  get mobile() {
    return this.loggedUser2.mobile;
  }
  get interests() {
    return this.loggedUser2.interests;
  }
  get location() {
    return this.loggedUser2.location;
  }
  get imgSrc() {
    return ('https://robohash.org/'+this.loggedUser2.name);
  }
}
