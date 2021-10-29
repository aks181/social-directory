import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }
 
  getUsers() {
    return this._http.get<any>("http://localhost:3000/signup").pipe(map((res: any) => {
      return res;
    }))
  }

  deleteUser(id:number) {
    return this._http.delete<any>("http://localhost:3000/contacts/"+id).pipe(map((res:any) => {
      return res;
    }))
  }

  getContacts(id: number) {
    return this._http.get<any>("http://localhost:3000/contacts/"+id).pipe(map((res: any) => {
      return res;
    }))
  }
}
