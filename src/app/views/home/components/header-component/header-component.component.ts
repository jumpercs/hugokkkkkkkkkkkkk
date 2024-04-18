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

    this.getCurrentUser();

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


  // -> decode jwt token -> get the field user_name -> set to variable currentUser
  
  getCurrentUser() {
    try {
      console.log("getCurrentUser");
      let token = window.localStorage.getItem("TOKEN");
      let base64Url = token?.split('.')[1];
      let base64 = base64Url?.replace('-', '+').replace('_', '/');
      let jsonPayload = decodeURIComponent(atob(base64 || ""));
      let json = JSON.parse(jsonPayload);
      let name = json.user_name;
      //remove DEV-91HD:
      name = name.replace("DEV-91HD:", "");
      this.dto.name = name;
      


      
      console.log(this.dto.name);
    } catch (error) {
      console.error("Error occurred while getting current user:", error);
    }
  }

}
