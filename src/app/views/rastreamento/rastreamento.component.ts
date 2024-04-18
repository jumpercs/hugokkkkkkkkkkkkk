import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/core/controllers/service/Services.service';
import { FormularioModel } from 'src/app/core/models/formulario';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rastreamento',
  templateUrl: './rastreamento.component.html',
  styleUrls: ['./rastreamento.component.scss']
})


export class RastreamentoComponent implements OnInit {

  dados: any = [];
  formulario!: UntypedFormGroup;
  loading: boolean = false;

  constructor(private formBuilder: UntypedFormBuilder, private _service: ServicesService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      codigo: [null, [Validators.required]]

    });

  }

  searchCode(codigo: any) {
    this.loading = true;
    this.dados.length = 0;

    this._service.getFormularios().subscribe((response) => {
      this.showForm(response, codigo);

    }, error => {
      console.log(error);

    });

  }

  showForm(dados: any, codigo: any) {

    dados.forEach((element: any) => {
      let servicos: any[] = [];
      let options = { year: 'numeric', month: 'numeric', day: 'numeric' } as any

      if (codigo == element.data.ipt_00003) {

        element.data.ctn_00005.forEach((service: any) => {
          servicos.push({
            descricaoServico: service.ipt_00001,
            nomeServico: service.slt_00001.label,
            statusServicos: service.slt_00003.label

          });

        });

        this.dados.push({
          codigo: element.data.ipt_00003,
          status: element.data.slt_00002.label,
          dataAtualizacao: new Date(element.lastUpdate).toLocaleString('pt-BR', options),
          servicos: servicos
        });

        this.loading = false;
        return;
      }


    });

    if (this.dados.length == 0) {
      alert("nenhum dado encontrado!");
      this.loading = false;
      return;
    }

  }

  ngFormulario() {
    let codigo = this.formulario.controls['codigo'].value
    this.searchCode(codigo)

  }

}

