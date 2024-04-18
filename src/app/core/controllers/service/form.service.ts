import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  step1Data: any;

  constructor(private _http: HttpClient) { }

  gerarToken(): Observable<any> {

    let data: URLSearchParams = new URLSearchParams();

    data.set('username', "DEV-91HD:hug.admin");
    data.set('password', "fRT0G53t");
    data.set('grant_type', 'password');


    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Basic ${btoa('web@jarvis.2021:JcNJ4fES')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this._http.post<any>('http://app.chutzy.com:8080/jarvis/oauth/token', data.toString(), { headers, })
  }

  buscarId(id: any) {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'p-cri-formu-01'
        });

        let requestOptions: any = {
          headers: headers,
        }

        return this._http.get<any>(`http://app.chutzy.com:8080/jarvis/api/stuff/data/${id}`, requestOptions);
      })
    );

  }

  putFormulario(payload: any): Observable<any[]> {
    return this.gerarToken().pipe(
      switchMap((request) => {
        const token = request.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'p-cri-formu-01'
        });

        return this._http.put<any>(`http://app.chutzy.com:8080/jarvis/api/stuff/data/`, payload, { headers });
      })
    );
  }

}
