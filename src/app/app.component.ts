import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  private _jwt: JwtHelperService;

  constructor(private _router: Router) {
    this._jwt = new JwtHelperService();
  }

  ngOnInit(): void {

    let dateToday = new Date();
    let checkToken = window.localStorage.getItem("TOKEN");

    if (checkToken) {
      let decodeToken: any = this._jwt.decodeToken(checkToken);
      let typeUser = decodeToken.authorities[5];

      let tempoToken: any = new Date(decodeToken['exp'] * 1000).getTime();
      let tempoLogin: any = dateToday.getTime();

      if (tempoLogin >= tempoToken) {
        alert('Seu tempo de Login acabou!');
        window.localStorage.clear();
        this._router.navigate(['']);
        return;

      }

    } else {
      this._router.navigate(['']);
      return;

    }

  }

  title = 'projeto-h7px-web';

}
