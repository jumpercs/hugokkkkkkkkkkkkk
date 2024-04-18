import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesService } from 'src/app/core/controllers/service/Services.service';
import { FormService } from 'src/app/core/controllers/service/form.service';
import { ParceirosService } from 'src/app/core/controllers/service/parceiros.service';
import { FormularioModel } from 'src/app/core/models/formulario';


@Component({
  selector: 'app-visualizacao-dados-formulario',
  templateUrl: './visualizacao-dados-formulario.component.html',
  styleUrls: ['./visualizacao-dados-formulario.component.scss']
})
export class VisualizacaoDadosFormularioComponent implements OnInit {

  idForm: any;
  listForms: FormularioModel[] = [];
  listParceiros: any[] = [];
  listParceirosFiltro: any[] = [];
  selectedParceiro: any;
  fileDownloadService: any;
  formIndex: number = -1;
  serviceIndex: number = -1;

  constructor(private _service: ServicesService, private _parceiros: ParceirosService, private http: HttpClient, private _form: FormService) { }

  ngOnInit(): void {
    this.initAccordion();
    this.getParceiros();
    this.getCurrentUser();
    this.getFormularios();
  }

  currentUser: any = {
    name: ""
  };


  showServicesFromAnotherUser(FormIndex: any, ServiceIndex: any ): boolean {
    if (this.currentUser.name == "hug.admin") {
      return true;
    }
    return this.currentUser.name != "hug.admin" && this.listForms[FormIndex].data.ctn_00005[ServiceIndex].slt_00002?.label == this.currentUser.name;

    
  }


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
      this.currentUser.name = name;
      console.log("this.currentUser.name: ", this.currentUser.name);




      console.log(this.currentUser.name);
    } catch (error) {
      console.error("Error occurred while getting current user:", error);
    }
  }



  gerarToken(): Observable<any> {

    let data: URLSearchParams = new URLSearchParams();

    data.set('username', "DEV-91HD:hug.admin");
    data.set('password', "fRT0G53t");
    data.set('grant_type', 'password');


    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Basic ${btoa('web@jarvis.2021:JcNJ4fES')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>('http://app.chutzy.com:8080/jarvis/oauth/token', data.toString(), { headers, })
  }

  startDownload(id: any, serviceId: any) {

    this.gerarToken().subscribe(
      token => this.finishDownload(token.access_token, id, serviceId)
    )

  }


  finishDownload(token: any, id: any, serviceId: any) {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-stuff-code': 'p-cri-formu-01'
    });

    this.http.get<any>(`http://app.chutzy.com:8080/jarvis/api/stuff/data/${id}`, { headers })
      .subscribe((response) => {
        const files = response.data.ctn_00005;
        if (files && files.length > 0) {
          files.forEach((file: { slt_00001: { label: any; }; cst_00001: { name: any; }; }) => {
            // Verifica se o arquivo pertence ao serviço desejado
            if (file.slt_00001 && file.slt_00001.label === serviceId) {
              this.downloadFile(token, file.cst_00001, id); // Aqui estou passando o nome do arquivo para downloadFile
            }
          });
        } else {
          console.log('Arquivo não encontrado.');
        }
      });
  }

  downloadFile(token: any, file: any, id: any): void {
    const idFile = id
    const fileName = file.name;
    const fileCode = file.code;
    const baseUrl = `http://app.chutzy.com:8080/jarvis/api/stuff/data/download`;

    let headers: HttpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-stuff-code': 'p-cri-formu-01'
    });

    let raw = [
      {
        "fieldName": "NEW_FILE",
        "value": false,
        "escape": true
      },
      {
        "fieldName": "CODE_FILE",
        "value": `${fileCode}`,
        "escape": true
      },
      {
        "fieldName": "ID_OBJ",
        "value": `${idFile}`,
        "escape": true
      }
    ]

    this.http.post(`${baseUrl}`, raw, {
      headers,
      responseType: 'blob' as 'json',
    })
      .subscribe(
        response => this.downloadFileClient(response, file)
      )
    console.log(file.name);


  }


  downloadFileClient(response: any, file: any) {

    const REPORT = new Blob([response], {
      type: response.type
    });

    const BLOB = window.URL.createObjectURL(REPORT);
    let LINK = null;


    // opção para selecionar um diretório e salvar o arquivo
    LINK = document.createElement('a');
    LINK.href = BLOB;
    LINK.download = `${file.name}`;
    LINK.dispatchEvent(new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    }));

  }

  initAccordion(): void {

    const accordionContent = document.querySelectorAll<HTMLElement>(".accordion-content");

    accordionContent.forEach((item, index) => {
      let header = item.querySelector("header");
      if (header) {
        header.addEventListener("click", () => {
          item.classList.toggle("open");

          let description = item.querySelector(".description") as HTMLElement | null;

          if (description) {
            if (item.classList.contains("open")) {
              description.style.height = `${description.scrollHeight}px`;
            } else {
              description.style.height = "0px";
            }
          }
        });
      }
    });
  }



  

  
  

  getFormularios() {
   console.log("getFormularios currentUser: ", this.currentUser.name);
    
    if (this.currentUser.name !==  "hug.admin") {
      console.warn("mudando currentUser.name para 'nome fantasia da abc technology'");
      this.currentUser.name = "nome fantasia da abc technology";
      this._service.getFormularios().subscribe((form: FormularioModel[]) => {

        console.log(form);
        console.log(this.currentUser.name)
        let allForms = form.map(item => {
          return {
            ...item
          };
        }
        );
       

        this.listForms = allForms.filter(form => form.data.ctn_00005.some(item => item.slt_00002 && item.slt_00002.label == this.currentUser.name))



      })
    } else {

      console.log("é igual a hug.admin")

      this._service.getFormularios().subscribe((form: FormularioModel[]) => {
        this.listForms = form.map(item => {
          return {
            ...item
          };
        });
      })
    }



  }


  getParceiros() {
    this._parceiros.getParceiros().subscribe(res => {
      this.listParceiros = res;
    })
  }

  filterParceiro(service: string, formIndex: number, serviceIndex: number, id: string) {

    this.listParceirosFiltro = this.listParceiros.filter(parceiro =>

      parceiro.data.ctn_00004.some((item: { slt_00001: { label: any; }; }) =>
        item.slt_00001.label === service
      )

    );

    this.formIndex = formIndex;
    this.serviceIndex = serviceIndex;
    this.idForm = id

  }

  selectParceiro(parceiro: any) {

    this.listForms[this.formIndex].data.ctn_00005[this.serviceIndex].slt_00002 = {
      "value": parceiro.id,
      "label": parceiro.data.ipt_00003
    }


    this._form.putFormulario(this.listForms[this.formIndex]).subscribe((e: any) => {
      console.log(e);
    }, error => {
      console.log(error)
    })

    this.formIndex = -1;
    this.serviceIndex = -1;
  }
}




