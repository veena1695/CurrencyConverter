import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }
  regObj : any = {
    email : '',
    name : '',
    pass : ''
  }

  ngOnInit(): void {
  }

  register(){
    if(this.regObj.email && this.regObj.name && this.regObj.pass){
      let users = localStorage.getItem("users") || "[{}]"
      let userObj = JSON.parse(users)
      if(userObj.length){
        localStorage.setItem("users", JSON.stringify([...userObj, this.regObj ]))
      }else{
        localStorage.setItem("users", JSON.stringify([this.regObj ]))
      }
      this.navigate('login')
    }
  }

  navigate(path:any ){
    this.router.navigateByUrl(path)
  }
}
