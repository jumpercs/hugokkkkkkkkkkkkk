import { Component, OnInit } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Router } from "@angular/router";
import { Services } from 'src/app/core/models/Services';
import { ServicesService } from 'src/app/core/controllers/service/Services.service';
import { ServiceForm } from 'src/app/core/models/service-form';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';


@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  services: Services[] = [];

  listServices: ServiceForm[] = [];

  newList: { services: string, segment: string }[] = []

  selectedService?: Services; // Armazenar o serviço selecionado

  descricaoServico: string = ''; // Armazenar a descrição do serviço


  formulario: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required, Validators.minLength(4)])!,
    email: new UntypedFormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
    ]),
    cell: new UntypedFormControl('', [Validators.required, Validators.minLength(15)]),
    tel: new UntypedFormControl('')

  });

  get name() {
    return this.formulario.get('name')!;
  }

  get email() {
    return this.formulario.get('email')!;
  }

  get cell() {
    return this.formulario.get('cell')!;
  }


  formatarTelefone(event: any) {
    const inputTelefone = event.target;
    const valorSemMascara = inputTelefone.value.replace(/\D/g, '');

    if (valorSemMascara.length <= 11) {
      let telefoneFormatado = '';

      if (valorSemMascara.length === 11) {
        telefoneFormatado = `(${valorSemMascara.slice(0, 2)}) ${valorSemMascara.slice(2, 7)}-${valorSemMascara.slice(7)}`;
      } else {
        telefoneFormatado = `(${valorSemMascara.slice(0, 2)}) ${valorSemMascara.slice(2, 6)}-${valorSemMascara.slice(6)}`;
      }

      inputTelefone.value = telefoneFormatado;
    } else {
      inputTelefone.value = inputTelefone.value.slice(0, 15);
    }
  }

  constructor(private router: Router, private _service: ServicesService, private http: HttpClient, private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    this._service.getServices().subscribe((services: Services[]) => {
      this.services = services;

    })
  }


  createService() {
    const uuid = uuidv4();
    let item: ServiceForm = {
      j_id: uuid,
      segmento_id: this.selectedService!.data.slt_00001.value, // supondo que segmento_id deve ser "slt_00004"
      segmento_value: this.selectedService!.data.slt_00001.label,
      servico_id: this.selectedService!.id!, // supondo que servico_id deve ser "slt_00001"
      servico_label: this.selectedService!.data.ipt_00002,
      status_label: "ABERTO",
      status_value: "ABERTO",
      descricao: this.descricaoServico
    };
    this.listServices.push(item)
    this.selectedService = undefined;
    this.descricaoServico = '';
  }

  btnBack() {
    this.router.navigate(['']);
  }


  remove(service: ServiceForm) {
    const index = this.listServices.findIndex(item => item.j_id === service.j_id);
    if (index !== -1) {
      this.listServices.splice(index, 1);
    }
  }


  async sendFile(event: any, form: ServiceForm) {
    this.formulario
    const file: File = event.target.files[0];

    if (file.type !== 'application/pdf') {
      alert('Por favor, selecione um arquivo PDF');
      return;
    }

    if (file != null) {
      const uuid = uuidv4();

      const index = this.listServices.findIndex(item => item.j_id === form.j_id);
      if (index !== -1) {
        this.listServices[index].file_id = uuid
        this.listServices[index].file_name = file.name
      }


      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", uuid);

      let token = await this.gerarToken().toPromise();

      const headers = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': `Bearer ${token.access_token}`,
        'X-stuff-code': 'p-cri-formu-01'
      });


      this.http.post("http://app.chutzy.com:8080/jarvis/api/stuff/data/upload", formData, { headers }).subscribe((response) => {
        console.log(response);
      })
    }
  }

  async sendForm() {
    this.formulario.get('name')?.markAsTouched();
    this.formulario.get('email')?.markAsTouched();
    this.formulario.get('cell')?.markAsTouched();


    if (this.listServices.length === 0 || this.formulario.invalid) {
      alert("Preencha todos os campos obrigatórios e escolha pelo menos um serviço.")
      return;
    }

    const now = new Date();
    let date = now.toISOString();
    let servicos = []

    for (let index = 0; index < this.listServices.length; index++) {
      const servico = this.listServices[index];

      servicos.push(
        {
          "j_id": servico.j_id,
          "slt_00004": {
            "value": servico.segmento_id,
            "label": servico.segmento_value
          },
          "slt_00001": {
            "value": servico.servico_id,
            "label": servico.servico_label
          },
          "slt_00003": {
            "value": "Aberto",
            "label": "Aberto"
          },
          "cst_00001": servico.file_id ? {
            "code": servico.file_id,
            "name": servico.file_name
          } : null,

          "ipt_00001": servico.descricao
        }
      )
    }

    const data = {
      "data": {
        "ctn_00005": servicos,
        "slt_00001": date,
        "ipt_00002": this.formulario.get('name')?.value,
        "ipt_00005": this.formulario.get('tel')?.value,
        "ipt_00004": this.formulario.get('cell')?.value,
        "ipt_00003": this.formulario.get('email')?.value,

        "slt_00002": {
          "value": "Aberto",
          "label": "Aberto"
        },
      },
      "languages": [
        {
          "label": "Português/BR",
          "value": {
            "id": "61d715a41bbd50725ec4cc19",
            "deleted": false,
            "cko": null,
            "name": "Português/BR",
            "prefix": "pt-br",
            "flag": "flag-icon-br",
            "active": true
          }
        },
        {
          "label": "English",
          "value": {
            "id": "61d715a41bbd50725ec4cc1a",
            "deleted": false,
            "cko": null,
            "name": "English",
            "prefix": "en",
            "flag": "flag-icon-us",
            "active": true
          }
        },
        {
          "label": "Espanhõl",
          "value": {
            "id": "61d715a41bbd50725ec4cc1b",
            "deleted": false,
            "cko": null,
            "name": "Espanhõl",
            "prefix": "es",
            "flag": "flag-icon-es",
            "active": true
          }
        }
      ],
      "languageSelected": {
        "id": "61d715a41bbd50725ec4cc19",
        "deleted": false,
        "cko": null,
        "name": "Português/BR",
        "prefix": "pt-br",
        "flag": "flag-icon-br",
        "active": true
      },
      "languageId": "61d715a41bbd50725ec4cc19"
    }

    let token = await this.gerarToken().toPromise();

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.access_token}`,
      'X-stuff-code': 'p-cri-formu-01'
    });

    this.http.post('http://app.chutzy.com:8080/jarvis/api/stuff/data/', data, { headers }).subscribe((response) => {
      console.log(response);

      alert("Formulário enviado com sucesso! Entraremos em contato em breve.")
    }
    )

    console.log(data);
    this.formulario.reset();
    this.listServices = []

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

}

