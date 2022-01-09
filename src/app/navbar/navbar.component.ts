import { Component, OnInit } from '@angular/core';
import {AccountService} from "../_services/account.service"
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  model:any={}
  isLoggedIn = false;
  constructor(private accountService:AccountService ) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response)
      this.isLoggedIn = true;
    }, err =>{
      console.log(err)
    })
  }


  logout(){
    this.accountService.logut();
    this.isLoggedIn = false;
  }

  getCurentUser(){
    this.accountService.currentUser$.subscribe(user =>{
      this.isLoggedIn = !!user
    }, error =>{
      console.log(error)
    })
  }

}
