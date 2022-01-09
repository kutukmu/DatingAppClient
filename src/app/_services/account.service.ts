import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, ReplaySubject } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl="http://localhost:5001/api/";
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable()
  constructor(private http:HttpClient) { }

  login(model:any){
    return this.http.post(this.baseUrl + "account/login", model).pipe(map((member:User) => {
      const user = member;
      if(user){
        localStorage.setItem('user', JSON.stringify(user))
        this.currentUserSource.next(user)
      }
    }))
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user)
  }

  logut(){
    localStorage.removeItem("user")
    this.currentUserSource.next(null)
  }
}
