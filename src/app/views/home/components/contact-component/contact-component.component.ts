import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, FormsModule, Validators } from '@angular/forms'; // Importe o FormsModule aqui


@Component({
  selector: 'app-contact-component',
  templateUrl: './contact-component.component.html',
  styleUrls: ['./contact-component.component.scss']
})


export class ContactComponentComponent implements OnInit {

  formulario: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required, Validators.minLength(4)])!,
    email: new UntypedFormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
    ]),
    cell: new UntypedFormControl('', [Validators.required, Validators.minLength(15)]),
    phone: new UntypedFormControl(''),
    message: new UntypedFormControl('', [Validators.required, Validators.minLength(4)])
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

  get message() {
    return this.formulario.get('message')!;
  }

  get phone() {
    return this.formulario.get('phone')!;
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


  contact: any = [
    { icon: "assets/region.png", title: "Endereço:", description: "Rua dos Catetos, 170 (13G) - Ribeirão Preto - SP." },
    { icon: "assets/phone.png", title: "Telefone:", description: "(16) 98125-5055" },
    { icon: "assets/email.png", title: "E-mail:", description: " lr7pxassessoria@hotmail.com" },
  ]




  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formulario.get('name')?.markAsTouched();
    this.formulario.get('email')?.markAsTouched();
    this.formulario.get('cell')?.markAsTouched();
    this.formulario.get('message')?.markAllAsTouched();


    if (this.formulario.invalid) {
      alert("Preencha todos os campos obrigatórios!")
      return;
    }

    const Email: any = (window as any).Email;

    const badyform = `
    Nome: ${this.formulario.value.name}
    E-mail: ${this.formulario.value.email}
    Telefone: ${this.formulario.value.cell}
    Celular: ${this.formulario.value.phone}
    Mensagem: ${this.formulario.value.message}
    `

    Email.send({
      SecureToken: "bdc04b69-2827-4141-a185-eee0af300f0d",
      To: "jasminepinheiro14@gmail.com",
      From: "grupoh7px@gmail.com",
      Subject: "SOLICITAÇÃO DE DÚVIDAS DO CLIENTE",
      Body: badyform
    }).then(
      (message: any) => alert(message)
    ).catch(
      (error: any) => console.error('Erro ao enviar email', error)
    );

    this.formulario.reset()
  }



}
