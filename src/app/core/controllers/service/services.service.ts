import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { FormularioModel } from '../../models/formulario';

@Injectable({
  providedIn: 'root'
})

export class ServicesService {

  private apiUrl = `http://app.chutzy.com:8080/jarvis/api/stuff/data/filter-entities`;

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

    return this._http.post<any>('http://app.chutzy.com:8080/jarvis/oauth/token', data.toString(), {
      headers,
      observe: 'response'
    }).pipe(
      take(1),
    );
  }

  getSegmentos(): Observable<any[]> {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-tip-segme-01'
        });

        const body = {
          "filters": []
        }

        return this._http.post<any[]>(this.apiUrl, body, { headers });
      })
    );
  }

  getServices(): Observable<any[]> {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-tip-servi-01'
        });

        const body = {
          "filters": []
        }

        return this._http.post<any[]>(this.apiUrl, body, { headers });
      })
    );
  }

  deleteService(id: any) {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-tip-servi-01'
        });

        const body = JSON.stringify({
          "id": `${id}`
        })

        let requestOptions: any = {
          headers: headers,
          body: body
        }

        return this._http.delete<any>(`http://app.chutzy.com:8080/jarvis/api/stuff/data/`, requestOptions);
      })
    );

  }

  getFormularios(): Observable<FormularioModel[]> {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'p-cri-formu-01'
        });

        const body = {
          "filters": []
        }

        return this._http.post<FormularioModel[]>(this.apiUrl, body, { headers });
      })
    );
  }

  postServices(data: any): Observable<any[]> {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-tip-servi-01'
        });

        const raw = JSON.stringify({

          "languageId": "61d715a41bbd50725ec4cc19",

          "data": {

            "slt_00001": {
              "value": "6601a0babdeed400e1b6d01a",
              "label": `${data.segmento}`
            },

            "ipt_00002": `${data.nomeServico}`,
            "ipt_00003": `${data.descricaoServico}`,

            "cst_00002": {
              "code": "72471b84-d97b-4985-bcc4-bd2c233a5c2e",
              "name": `${data.imagem.name}`,
              "data": `${data.imagem.base64}`
            }

          }

        });

        return this._http.post<any>(`http://app.chutzy.com:8080/jarvis/api/stuff/data/`, raw, { headers });
      })

    );
  }

  searchService(id: any) {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-tip-servi-01'
        });

        let requestOptions: any = {
          headers: headers,
        }

        return this._http.get<any>(`http://app.chutzy.com:8080/jarvis/api/stuff/data/${id}`, requestOptions);
      })
    );

  }

  putServices(data: any, json: any): Observable<any[]> {

    return this.gerarToken().pipe(
      switchMap((response) => {

        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-tip-servi-01'
        });

        let raw = JSON.stringify({

          "id": `${json.id}`,
          "ckc": `${json.ckc}`,
          "createdBy": `${json.createdBy}`,
          "created": `${json.created}`,
          "lastUpdate": `${json.lastUpdate}`,
          "lastUpdateBy": `${json.lastUpdateBy}`,
          "cko": null,
          "deleted": `${json.deleted}`,
          "code": `${json.code}`,
          "languageId": `${json.languageId}`,

          "data": {
            "slt_00001": {
              "value": "6601a0babdeed400e1b6d01a",
              "label": `${data.segmento}`
            },

            "ipt_00002": `${data.nomeServico}`,
            "ipt_00003": `${data.descricaoServico}`,

            "cst_00002": {
              "code": "bc91dc22-958e-4cd9-adb9-f7b43d86010f",
              "name": `${data.imagem.name}`,
              "data": `${data.imagem.base64}`
            }

          }

        });

        return this._http.put<any>(`http://app.chutzy.com:8080/jarvis/api/stuff/data/`, raw, { headers });

      })

    );

  }

}

