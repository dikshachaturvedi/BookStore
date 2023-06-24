import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  logout()
  {
    if(confirm("sure want to log out")){
    localStorage.clear()
    window.location.replace("/")
  }
}
}
