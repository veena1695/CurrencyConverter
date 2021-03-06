import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) { }
  loginObj :any = {
    email : '',
    pass : ''
  }
  rememberMe :any = false;

  ngOnInit(): void {
  }

  login(){
    let users = (localStorage.getItem("users")) || "{}";
    let userObj = JSON.parse(users);
    let matchFlag = false;
    userObj.map((y: any )=>{
      if(y.email == this.loginObj.email && y.pass == this.loginObj.pass){
        alert("Login Successful");
        this.navigate('dashboard');
        matchFlag = true;
      }
    })
    if(!matchFlag){
      alert("Please check credentials")
    }
  }

  navigate(path:any ){
    this.router.navigateByUrl(path)
  }
}
