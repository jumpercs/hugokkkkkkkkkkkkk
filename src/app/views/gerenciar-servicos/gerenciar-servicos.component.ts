import { Component, OnInit } from '@angular/core';
import { dataServicos } from './data/servicos';
import { dataSegmento } from './data/segmentos';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/core/controllers/service/Services.service';


@Component({
  selector: 'app-gerenciar-servicos',
  templateUrl: './gerenciar-servicos.component.html',
  styleUrls: ['./gerenciar-servicos.component.scss']
})
export class GerenciarServicosComponent implements OnInit {

  formulario!: UntypedFormGroup;
  formularioUpdate!: UntypedFormGroup;
  isFormulario: boolean = true;
  isLoading: boolean = true;
  isLoadingUpdate: boolean = false;
  isContent: boolean = false;
  dataService: any = [];
  quantSeguimentos: any;
  segmentos: any = [];
  dataFile: any;
  dataFileUpdate: any;
  objImgUpdate: any;
  json: any;

  constructor(private formBuilder: UntypedFormBuilder, private service: ServicesService) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({
      nomeServico: [null, [Validators.required]],
      segmento: [null, [Validators.required]],
      descricaoServico: [null, [Validators.required]]
    });

    this.formularioUpdate = this.formBuilder.group({
      nomeServico: [null, [Validators.required]],
      segmento: [null, [Validators.required]],
      descricaoServico: [null, [Validators.required]]
    });

    this.service.getSegmentos().subscribe((response) => {
      this.organizarSegmentos(response);

    }, error => {
      console.log(error);

    });

    this.service.getServices().subscribe((response) => {
      this.organizarDados(response);

    }, error => {
      console.log(error);

    });

  }

  organizarDados(dados: any) {

    this.quantSeguimentos = dados.length;

    dados.forEach((element: any) => {

      const dados = new dataServicos();

      this.dataService.push({
        "id": dados.code = element.id,
        "code": dados.code = element.code,
        "nome": dados.nome = element.data.ipt_00002,
        "segmento": dados.segmento = element.data.slt_00001.label
      });

    });

    this.isLoading = false;
    this.isContent = true;

  }

  organizarSegmentos(dados: any) {

    dados.forEach((element: any) => {

      let segmentos = new dataSegmento();

      this.segmentos.push({
        "id": segmentos.id = element.id,
        "segmento": segmentos.id = element.data.ipt_00002
      });

    });

  }

  deletar(id: any) {

    this.service.deleteService(id).subscribe((response) => {
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

    this.service.searchService(id).subscribe((response) => {

      console.log(response);

      this.setValues(response);
      this.json = response;


    }, error => {
      console.log(error);

    });

  }

  setValues(dados: any) {

    this.formularioUpdate.patchValue({
      nomeServico: dados.data.ipt_00002,
      segmento: dados.data.slt_00001.label,
      descricaoServico: dados.data.ipt_00003

    });

    this.searchImage(dados);

    setTimeout(() => {
      this.isFormulario = true;
      this.isLoadingUpdate = false;

    }, 1000);

  }

  searchImage(dados: any) {

    let inputFile = document.getElementById('file') as any
    let base64 = dados.data.cst_00002.data;
    let fileName = dados.data.cst_00002.name;

    let blob: any = this.dataURItoBlob(base64);
    let file = new File([blob], `${fileName}`, { type: 'image/png' });

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    inputFile.files = dataTransfer.files;

    let reader = new FileReader();

    reader.onload = function (event) {
      let base64 = event.target?.result;
      sendDataUpdate(base64);
    }

    reader.readAsDataURL(file);

    const sendDataUpdate = (base64: any) => {

      this.objImgUpdate = {
        'name': file.name,
        'base64': base64
      };

      console.log(this.objImgUpdate);

      let span = (document.querySelector(".nameDocument") as any);
      span.innerHTML = `<strong class="mt-3">Nome do Arquivo: </strong>${this.objImgUpdate.name}`;

    }

  }

  dataURItoBlob(base64: any) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: 'image/png' });
  }

  uploadFile() {

    let fileInput = (document.querySelector(".btn-file") as HTMLInputElement) as any;
    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
      let base64 = event.target?.result;

      tranferirBase64(base64);

    }

    reader.readAsDataURL(file);

    const tranferirBase64 = (base64: any) => {

      this.dataFile = {
        'name': file.name,
        'base64': base64
      }

    }

    return true;
  }

  alterInputFile() {

    let fileInput = (document.getElementById("file") as HTMLInputElement) as any;
    let file = fileInput.files[0];
    let reader = new FileReader();

    reader.onload = function (event) {
      let base64 = event.target?.result;

      tranferirBase64(base64);

    }

    reader.readAsDataURL(file);

    const tranferirBase64 = (base64: any) => {

      this.objImgUpdate = {
        'name': file.name,
        'base64': base64
      }

      console.log(this.objImgUpdate);

    }

    return true;
  }

  ngFormulario() {

    if (this.formulario.valid && this.uploadFile()) {

      let dataForm = {
        nomeServico: this.formulario.controls['nomeServico'].value,
        segmento: this.formulario.controls['segmento'].value,
        descricaoServico: this.formulario.controls['descricaoServico'].value,
        imagem: this.dataFile
      }


      this.service.postServices(dataForm).subscribe((response) => {
        alert('Serviço cadastrado com sucesso!');

        setInterval(()=> {
          window.location.reload();
          
        }, 500)

      }, error => {
        alert('Falha ao Cadastrar Segmento!');


      });

    }


  }

  ngFormularioUpdate() {

    if (this.formularioUpdate.valid) {

      let dataForm = {
        nomeServico: this.formularioUpdate.controls['nomeServico'].value,
        segmento: this.formularioUpdate.controls['segmento'].value,
        descricaoServico: this.formularioUpdate.controls['descricaoServico'].value,
        imagem: this.objImgUpdate

      }

      this.service.putServices(dataForm, this.json).subscribe((response) => {
        alert('Serviço atualizado com sucesso!');

        setInterval(()=> {
          window.location.reload();

        }, 500)

      }, error => {
        alert('Falha ao atualizar Serviço!');

      });

    }

  }

}
