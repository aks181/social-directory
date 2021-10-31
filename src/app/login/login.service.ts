import { Injectable } from "@angular/core";
import { UserData } from "../userslist/userslist.model";

@Injectable()
export class LoginService {
    loggedUser : UserData;

    constructor() {}
}