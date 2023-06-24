import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

formdata:any;
message="";

  constructor(private api:ApiService) { }

  ngOnInit() {
    window.scroll(0,0);
    this.formdata = new FormGroup(
      {

        username:new FormControl("", Validators.required),
        password:new FormControl("", Validators.required)
      }
    )
  }

onClickSubmit(data:any)
{
  this.api.post("admin/login" , {data:data}).subscribe((result:any)=>{
    console.log(result)
    if(result.data.status == "success")
    {
    //  alert("success")
    localStorage.setItem("usertype" , "admin");
    window.location.replace("/admin/dashboard")
    }
    else
    {

      this.message = "Username or password Wrong!";
    }

  }, (err)=>{
    console.log(err);
  });


}

}
