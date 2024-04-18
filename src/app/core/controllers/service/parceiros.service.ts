import { Injectable } from '@angular/core';
import { FormularioModel } from '../../models/formulario';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, take } from 'rxjs/operators';
import { ParceirosServiceModel } from '../../models/parceiros';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class ParceirosService {

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

  getParceiros(): Observable<ParceirosServiceModel[]> {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-par-ceiro-01'
        });

        const body = {
          "filters": []
        }

        return this._http.post<ParceirosServiceModel[]>(this.apiUrl, body, { headers });
      })
    );
  }


  postParceiros(data: any): Observable<any[]> {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-par-ceiro-01'
        });

        // cria um novo array com slt_00001 sempre que um novo serviço for selecionado  
        const novosSeletores = data.servico.map((servico: any) => {
          return {

            "slt_00001": {
              "value": "6601a133bdeed400e1b6d07b",
              "label": `${servico}`,
            },
            "ipt_00001": "",
            "j_id": uuidv4()
          };
        });

        const raw = JSON.stringify({

          "languageId": "61d715a41bbd50725ec4cc19",

          "data": {
            "ctn_00004": novosSeletores,
            "ctn_00003": [],
            "ctn_00005": [],
            "ipt_00002": `${data.razaoSocial}`,
            "ipt_00003": `${data.nomeFantasia}`,
            "ipt_00004": `${data.cnpj}`,
            "ipt_00005": `${data.descricaoParceiro}`
          },
        })


        return this._http.post<any>(`http://app.chutzy.com:8080/jarvis/api/stuff/data/`, raw, { headers });
      })

    );
  }

  searchParceiro(id: any) {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-par-ceiro-01'
        });

        let requestOptions: any = {
          headers: headers,
        }

        return this._http.get<any>(`http://app.chutzy.com:8080/jarvis/api/stuff/data/${id}`, requestOptions);
      })
    );
  }

  putParceiros(data: any, json: any): Observable<any[]> {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-par-ceiro-01'
        });

        const novosSeletores = data.servico.map((servico: any) => {
          return {

            "slt_00001": {
              "value": "6601a133bdeed400e1b6d07b",
              "label": `${servico}`,
            },
            "ipt_00001": "",
            "j_id": uuidv4()
          };
        });

        const raw = JSON.stringify({

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
            "ctn_00004": novosSeletores,
            "ctn_00003": [],
            "ctn_00005": [],
            "ipt_00002": `${data.razaoSocial}`,
            "ipt_00003": `${data.nomeFantasia}`,
            "ipt_00004": `${data.cnpj}`,
            "ipt_00005": `${data.descricaoParceiro}`
          },
        })


        return this._http.put<any>(`http://app.chutzy.com:8080/jarvis/api/stuff/data/`, raw, { headers });
      })

    );
  }

  deleteParceiros(id: any) {

    return this.gerarToken().pipe(
      switchMap((response) => {
        const token = response.body.access_token;

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-stuff-code': 'c-par-ceiro-01'
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
  
  

  createUser(name: string, username: string, email: string, password: string): Observable<any[]> {
      
      return this.gerarToken().pipe(
        switchMap((response) => {
                    const token = response.body.access_token;
            
                    const headers = new HttpHeaders({
                      'Accept': 'application/json, text/plain, */*',
                      'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                      'Authorization': `Bearer ${token}`,
                      'Connection': 'keep-alive',
                      'Content-Type': 'application/json',
                      'Origin': 'http://app.chutzy.com',
                      'Referer': 'http://app.chutzy.com/',
                      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0'
                    });


                    const raw = JSON.stringify({
                      "photo": "assets/images/user.png",
                      "languageSelected": {
                          "id": "61d715a41bbd50725ec4cc19",
                          "deleted": false,
                          "cko": null,
                          "name": "Português/BR",
                          "prefix": "pt-br",
                          "flag": "flag-icon-br",
                          "active": true
                      },
                      "name": `${name}`,
                      "email": `${email}`,
                      "username": `${username}`,
                      "active": true,
                      "encrypt": true,
                      "confirmPassword": `${password}`,
                      "password": `${password}`,
                      "languageId": "61d715a41bbd50725ec4cc19",
                      "type": "ADMIN",
                      "profileId": null
                  })

                  return this._http.post<any>(`http://app.chutzy.com:8080/jarvis/api/core/users/`, raw, { headers });
          }
        )
      )
    }


  }