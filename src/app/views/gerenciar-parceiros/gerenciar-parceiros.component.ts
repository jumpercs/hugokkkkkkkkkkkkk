import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/core/controllers/service/Services.service';

import { ParceirosService } from 'src/app/core/controllers/service/parceiros.service';
import { ParceirosServiceModel } from 'src/app/core/models/parceiros';
import { Services } from 'src/app/core/models/Services';


@Component({
  selector: 'app-gerenciar-parceiros',
  templateUrl: './gerenciar-parceiros.component.html',
  styleUrls: ['./gerenciar-parceiros.component.scss']
})
export class GerenciarParceirosComponent implements OnInit {
  qntParceiros: any;
  allParceiros: { id: string, codigo: string, razao: string, nomeFantasia: string, cnpj: string, descricao: string, servicos: string[] }[] = []

  servicos: string[] = [];
  qntServicos: any;

  allServicos: { id: string | undefined, servico: any }[] = [];
  selectServicos: any[] = [];


  formulario!: UntypedFormGroup;
  formularioUpdate!: UntypedFormGroup;

  isFormulario: boolean = true;
  isLoading: boolean = true;
  isLoadingUpdate: boolean = false;
  isContent: boolean = true;

  json: any;
  cnpj: any;


  constructor(private formBuilder: FormBuilder, private _service: ServicesService, private _parceiros: ParceirosService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      razaoSocial: [null, [Validators.required, Validators.minLength(4)]],
      nomeFantasia: [null, [Validators.required, Validators.minLength(4)]],
      cnpj: [null, [Validators.required]],
      servico: [null, [Validators.required]],
      descricaoParceiro: [null, [Validators.required, Validators.minLength(4)]]

    });

    this.formularioUpdate = this.formBuilder.group({
      razaoSocial: [null, [Validators.required]],
      nomeFantasia: [null, [Validators.required]],
      cnpj: [null, [Validators.required]],
      servico: [null, [Validators.required]],
      descricaoParceiro: [null, [Validators.required]]

    });

    this.getParceiros();
    this.getServices();
    this.selectServicos
  }

  get razaoSocial() {
    return this.formulario.get('razaoSocial')!;
  }

  get nomeFantasia() {
    return this.formulario.get('nomeFantasia')!;
  }

  get cnpjField() {
    return this.formulario.get('cnpj')!;
  }

  get servico() {
    return this.formulario.get('servico')!;
  }

  get descricaoParceiro() {
    return this.formulario.get('descricaoParceiro')!;
  }



  aplicarMascaraCNPJ(event: Event): void {
    const input = event.target as HTMLInputElement;
    let valor = input.value;

    valor = valor.replace(/\D/g, "");

    valor = valor.slice(0, 14);

    if (valor.length <= 2) {
      valor = valor.replace(/^(\d{0,2})/, "$1");
    } else if (valor.length <= 5) {
      valor = valor.replace(/^(\d{2})(\d{0,3})/, "$1.$2");
    } else if (valor.length <= 8) {
      valor = valor.replace(/^(\d{2})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else if (valor.length <= 12) {
      valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, "$1.$2.$3/$4");
    } else {
      valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, "$1.$2.$3/$4-$5");
    }

    input.value = valor;
  }


  getParceiros() {
    this._parceiros.getParceiros().subscribe((dadosParceiros: ParceirosServiceModel[]) => {

      this.qntParceiros = dadosParceiros.length;

      for (let i = 0; i < dadosParceiros.length; i++) {
        let element = {
          id: dadosParceiros[i].id,
          codigo: dadosParceiros[i].code,
          razao: dadosParceiros[i].data.ipt_00002,
          nomeFantasia: dadosParceiros[i].data.ipt_00003,
          cnpj: dadosParceiros[i].data.ipt_00004,
          descricao: dadosParceiros[i].data.ipt_00005,
          servicos: [] as string[],
        };

        for (let j = 0; j < dadosParceiros[i].data.ctn_00004.length; j++) {
          let servico = dadosParceiros[i].data.ctn_00004[j].slt_00001.label;
          element.servicos.push(servico); // Adiciona o serviço ao array de serviços
        }
        this.allParceiros.push(element)
      }

      this.isLoading = false;
      this.isContent = true;
    },

      error => {
        console.error("Ocorreu um erro ao obter os parceiros", error);
      },
    );
  }

  getServices() {
    this._service.getServices().subscribe((dadosServicos: Services[]) => {

      this.qntServicos = dadosServicos.length

      for (let i = 0; i < dadosServicos.length; i++) {
        let element = {
          id: dadosServicos[i].id,
          servico: dadosServicos[i].data.ipt_00002,
        };
        this.allServicos.push(element)

      }

    }, error => {
      console.error("Ocorreu um erro ao obter os serviços", error);

    })
  }

  deletar(id: any) {

    this._parceiros.deleteParceiros(id).subscribe((response) => {
      alert('Sucesso ao deletar');

      setTimeout(() => {
        window.location.reload();

      }, 1000);


    }, error => {
      alert('Erro ao deletar');

    });

  }

  buscarEditar(id: any) {

    this.isFormulario = false;
    this.isLoadingUpdate = true;

    this._parceiros.searchParceiro(id).subscribe((response) => {

      this.setValues(response);
      this.json = response;


    }, error => {
      console.log(error);

    });

  }

  setValues(dados: any) {

    this.formularioUpdate.patchValue({
      razaoSocial: dados.data.ipt_00002,
      nomeFantasia: dados.data.ipt_00003,
      cnpj: dados.data.ipt_00004,
      servico: dados.ipt_00001,
      descricaoParceiro: dados.data.ipt_00005,
    });

    setTimeout(() => {
      this.isFormulario = true;
      this.isLoadingUpdate = false;

    }, 1000);

  }

  ngFormulario() {

    this.formulario.get('razaoSocial')?.markAsTouched();
    this.formulario.get('nomeFantasia')?.markAsTouched();
    this.formulario.get('cnpj')?.markAsTouched();
    this.formulario.get('servico')?.markAsTouched();
    this.formulario.get('descricaoParceiro')?.markAsTouched();


    if (this.formulario.invalid) {
      alert("Preencha todos os campos obrigatórios!")
      return;
    }

    if (this.formulario.valid) {

      let dataForm = {
        razaoSocial: this.formulario.controls['razaoSocial'].value,
        nomeFantasia: this.formulario.controls['nomeFantasia'].value,
        cnpj: this.formulario.controls['cnpj'].value,
        servico: this.formulario.controls['servico'].value,
        descricaoParceiro: this.formulario.controls['descricaoParceiro'].value,

      }


      this._parceiros.postParceiros(dataForm).subscribe((response) => {
        alert('Parceiro cadastrado com sucesso!');

        setInterval(() => {
          window.location.reload();

        }, 500)

      }, error => {
        alert('Falha ao Cadastrar Parceiro!');
      });

      this.formulario.reset()
    }
  }

  ngFormularioUpdate() {

    if (this.formularioUpdate.valid) {

      let dataForm = {
        razaoSocial: this.formularioUpdate.controls['razaoSocial'].value,
        nomeFantasia: this.formularioUpdate.controls['nomeFantasia'].value,
        cnpj: this.formularioUpdate.controls['cnpj'].value,
        servico: this.formularioUpdate.controls['servico'].value,
        descricaoParceiro: this.formularioUpdate.controls['descricaoParceiro'].value,
      }

      this._parceiros.putParceiros(dataForm, this.json).subscribe((response) => {
        alert('Parceiro atualizado com sucesso!');

        setInterval(() => {
          window.location.reload();

        }, 500)

      }, error => {
        alert('Falha ao editar Parceiro!');
      });
    }

  }

  resetFormulario() {
    this.formulario.reset()
  }

}
