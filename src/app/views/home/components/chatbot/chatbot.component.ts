import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const textarea = document.querySelector(".chatbox-message-input") as any;
    const chatboxForm = document.querySelector(".chatbox-message-form") as any;
    const btnSubmit = document.querySelector(".chatbox-message-submit") as any;

    textarea.addEventListener("input", function () {

      let line = textarea.value.split('\n').length;

      if (textarea.rows < 6 || line < 6) {
        textarea.rows = line;
      }

      if (textarea.rows > 1) {
        chatboxForm.style.alignItems = 'flex-end';


      } else {
        chatboxForm.style.alignItems = 'center';

      }
    });

    // toogle chatbox 
    const chatboxToggle = document.querySelector(".chatbox-toggle") as any;
    const chatboxMessage = document.querySelector(".chatbox-message-wrapper") as any;

    chatboxToggle.addEventListener("click", () => {
      chatboxMessage.classList.toggle("show");
    });

    // droptoggle
    const dropdownToggle = document.querySelector(".chatbox-message-dropdown-toggle") as any;
    const dropdownMenu = document.querySelector(".chatbox-message-dropdown-menu") as any;

    dropdownToggle.addEventListener("click", () => {
      dropdownMenu.classList.toggle("show");
    });

    // send message 
    const chatboxMessageWrapper = document.querySelector(".chatbox-message-content") as any;
    const chatboxNoMessage = document.querySelector(".chatbox-message-no-message") as any;

    chatboxForm.addEventListener("submit", function (event: any) {
      event.preventDefault();

      if (textarea.value == '') {
        return event.preventDefault();
      }

      textarea.disabled = true;
      textarea.style.cursor = 'not-allowed';

      btnSubmit.disabled = true;
      btnSubmit.style.cursor = 'not-allowed';

      whiteMessage();
      setTimeout(autoReply, 1000);

    });

    function whiteMessage() {

      const today = new Date();

      let message = `

  <div class="chatbox-message-item sent">
      <span class="chatbox-message-item-text">
          ${textarea.value.trim().replace(/\n/g, '<br>\n')}
      </span>

      <span class="chatbox-message-item-time"> ${addZero(today.getHours())} : ${addZero(today.getMinutes())} </span>
  </div>
  
  `;

      chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
      chatboxForm.style.alignItems = 'center';
      textarea.rows = 1;
      textarea.focus();
      textarea.value = '';
      chatboxNoMessage.style.display = 'none';
      scrollBottom();

    }

    function autoReply() {

      const today = new Date();

      let message = `

  <div class="chatbox-message-item received">
      <span class="chatbox-message-item-text">
          Olá, sou seu assistente virtual Ezequiel. Como posso te ajudar?
      </span>

      
      <div class="chatbox-message-btns">
          <button class="btn" (click)="switchCaseChatbox('1')"> Quero saber mais informações </button>
          <button class="btn" (click)="switchCaseChatbox('2')"> Quero preencher um formulario </button>
          <button class="btn" (click)="switchCaseChatbox('3')"> Quero entrar em contato </button>
          <button class="btn" (click)="switchCaseChatbox('4')"> Preciso de ajuda </button>
          <button class="btn" (click)="switchCaseChatbox('5')"> Encerrar atendimento </button>
      </div>

      <span class="chatbox-message-item-time"> ${addZero(today.getHours())} : ${addZero(today.getMinutes())} </span>

  </div>
  
  `;

      chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
      scrollBottom();


    }

    function switchCaseChatbox(escolha: any) {

      let resposta = escolha;

      switch (resposta) {

        case resposta = '0':
          responseChatUser("Voltar ao menu principal");
          break;

        case resposta = '1':
          responseChatUser("Quero saber mais informações");
          break;

        case resposta = '2':
          responseChatUser("Quero preencher um formulario");
          break;

        case resposta = '3':
          responseChatUser("Quero entrar em contato");
          break;

        case resposta = '4':
          responseChatUser("Preciso de ajuda");
          break;

        case resposta = '5':
          responseChatUser("Encerrar atendimento");
          break;

      }

    }

    // functions 
    function responseChatUser(description: any) {

      const today = new Date();

      let message = `

  <div class="chatbox-message-item sent">
      <span class="chatbox-message-item-text">
          ${description.trim().replace(/\n/g, '<br>\n')}
      </span>

      <span class="chatbox-message-item-time"> ${addZero(today.getHours())} : ${addZero(today.getMinutes())} </span>
  </div>
  
  `;

      chatboxMessageWrapper.insertAdjacentHTML('beforeend', message);
      chatboxForm.style.alignItems = 'center';
      textarea.rows = 1;
      textarea.focus();
      textarea.value = '';
      chatboxNoMessage.style.display = 'none';
      scrollBottom();

      setTimeout(() => {
        responseChatBox(description);
      }, 1000);

    }

    function responseChatBox(description: any) {

      const today = new Date();
      let resposta = description;

      switch (resposta) {

        case resposta = "Voltar ao menu principal":
          autoReply();
          break;

        case resposta = "Quero saber mais informações":

          let message_one = `
      
          <div class="chatbox-message-item received">
              <span class="chatbox-message-item-text">
                  quero mais informaçoes, tudo ok?
              </span>

              <div class="chatbox-message-btns">
                  <button class="btn" (click)="switchCaseChatbox('0')"> Voltar ao menu principal </button>
                  <button class="btn" (click)="switchCaseChatbox('5')"> Encerrar </button>
              </div>
      
              <span class="chatbox-message-item-time"> ${addZero(today.getHours())} : ${addZero(today.getMinutes())} </span>
      
          </div>
          
          `;

          chatboxMessageWrapper.insertAdjacentHTML('beforeend', message_one);
          scrollBottom();
          break;

        case resposta = "Quero preencher um formulario":
          let message_two = `
      
          <div class="chatbox-message-item received">
              <span class="chatbox-message-item-text">
                  quero preencher um formulario, tudo ok?
              </span>

              <div class="chatbox-message-btns">
                  <button class="btn" (click)="switchCaseChatbox('0')"> Voltar ao menu principal </button>
                  <button class="btn" (click)="switchCaseChatbox('5')"> Encerrar </button>
              </div>
      
              <span class="chatbox-message-item-time"> ${addZero(today.getHours())} : ${addZero(today.getMinutes())} </span>
      
          </div>
          
          `;

          chatboxMessageWrapper.insertAdjacentHTML('beforeend', message_two);
          scrollBottom();
          break;

        case resposta = "Quero entrar em contato":
          let message_tree = `
      
          <div class="chatbox-message-item received">
              <span class="chatbox-message-item-text">
                  quero entrar em contato, tudo ok?
              </span>

              <div class="chatbox-message-btns">
                  <button class="btn" (click)="switchCaseChatbox('0')"> Voltar ao menu principal </button>
                  <button class="btn" (click)="switchCaseChatbox('5')"> Encerrar </button>
              </div>
      
              <span class="chatbox-message-item-time"> ${addZero(today.getHours())} : ${addZero(today.getMinutes())} </span>
      
          </div>
          
          `;

          chatboxMessageWrapper.insertAdjacentHTML('beforeend', message_tree);
          scrollBottom();
          break;

        case resposta = "Preciso de ajuda":
          let message_for = `
      
          <div class="chatbox-message-item received">
              <span class="chatbox-message-item-text">
                  Estamos aqui para ajudar! Se precisar de suporte, é só chamar.
              </span>

              <div class="chatbox-message-btns">
                  <button class="btn" (click)="switchCaseChatbox('0')"> Voltar ao menu principal </button>
                  <button class="btn" (click)="switchCaseChatbox('5')"> Encerrar </button>
              </div>
      
              <span class="chatbox-message-item-time"> ${addZero(today.getHours())} : ${addZero(today.getMinutes())} </span>
      
          </div>
          
          `;

          chatboxMessageWrapper.insertAdjacentHTML('beforeend', message_for);
          scrollBottom();
          break;

        case resposta = "Encerrar atendimento":
          let message_five = `
      
          <div class="chatbox-message-item received">
              <span class="chatbox-message-item-text">
                  Obrigado por sua colaboração! Estamos aqui para tornar sua experiência ainda melhor.
              </span>
      
              <span class="chatbox-message-item-time"> ${addZero(today.getHours())} : ${addZero(today.getMinutes())} </span>
      
          </div>
          
          `;

          chatboxMessageWrapper.insertAdjacentHTML('beforeend', message_five);
          scrollBottom();

          textarea.disabled = false;
          textarea.style.cursor = '';

          btnSubmit.disabled = false;
          btnSubmit.style.cursor = 'pointer';


          break;

      }

    }

    function addZero(num: any) {
      return num < 10 ? '0' + num : num
    }

    function scrollBottom() {
      chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight);
    }


  }



}
