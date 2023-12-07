import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectproductService } from 'src/app/services/selectproduct.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username='';
  password='';

  constructor(private userService: UserService,private router: Router,private selectProduct: SelectproductService) { }

  ngOnInit(): void {
  }

  login(): void {
    console.log(this.username,this.password);
    this.userService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        this.router.navigateByUrl(`/home/${response.userdata._id}`)
      },
      error => {
        alert("Credential is not Correct")
      }
    );
  } 

}
