import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss']
})
export class HeaderComponentComponent implements OnInit {

  dto: any = {
    image: "",
    name: "",
    typeUser: ""
  }

  login: boolean = true;
  isValidUser: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

    if (window.localStorage.getItem("TOKEN")) {
      this.isValidUser = true;
      this.login = false;
      return;

    }

  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    window.localStorage.removeItem("TOKEN");
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    let subMenu = (document.getElementById("subMenu") as HTMLElement) as any;
    subMenu.classList.toggle("open-menu");

  }

  redirectToHome() {
    this.router.navigate(['']);
  }



}
