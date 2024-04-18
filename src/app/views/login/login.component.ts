import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin!: UntypedFormGroup

  constructor(private formBuilder: UntypedFormBuilder, private _serviceLogin: LoginService, private _router: Router) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      usuario: [null],
      senha: [null]
    });
  }

  ngFormLogin() {
    let usuario = 'DEV-91HD:' + this.formLogin.controls['usuario'].value;
    let senha = this.formLogin.controls['senha'].value;

    this._serviceLogin.login(usuario, senha).subscribe((response) => {
      alert('Login efetuado com Sucesso!');
      this._router.navigate(['']);

      window.localStorage.setItem("TOKEN", response.body.access_token);

    }, error => {
      alert('Falha ao efetuar o Login');

    });
  }


  showPassword() {
    const inputPassword = (document.getElementById("password") as HTMLInputElement);

    inputPassword.type = inputPassword.type == "password" ? "text" : "password";

    const spanPassword = (document.getElementById("showPassword") as HTMLElement);

    spanPassword.innerHTML = spanPassword.innerHTML == "Exibir senha" ? "Ocultar senha" : "Exibir senha";

  }

}
