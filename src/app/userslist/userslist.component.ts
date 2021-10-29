import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { UserData } from './userslist.model';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.css']
})
export class UserslistComponent implements OnInit {
  allUsersData = [];
  userModelObj: UserData = new UserData;
  searchText: any;
  public uname = 'akshay';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.api.getUsers().subscribe(res => {
    this.allUsersData = res;
  })
  }

  addContact(data: any) {
    console.log(data);
    
  }

  searchUsers(event) {
    // console.log(event.target.value)

  }
 

}
