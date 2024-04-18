import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

  constructor(private _http: HttpClient) { }

  login(username: string, password: string): Observable<any> {

    let data: URLSearchParams = new URLSearchParams();

    data.set('username', username);
    data.set('password', password);
    data.set('grant_type', 'password');

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Basic ${btoa('web@jarvis.2021:JcNJ4fES')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this._http.post<any>('http://app.chutzy.com:8080/jarvis/oauth/token', data.toString(), {
      headers,
      observe: 'response'
    }).pipe(
      take(1)
    );

  }

}
