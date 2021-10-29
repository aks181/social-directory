import { Component, OnInit } from '@angular/core';
import { ApiService } from "../shared/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id : number =1;
  myContacts: any = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getContactsData(this.id);
  }
  getContactsData(id) {
      this.api.getContacts(id).subscribe(res => {
      this.myContacts.push(res);
      console.log(res)
      console.log(this.myContacts)
    })
  }
}
