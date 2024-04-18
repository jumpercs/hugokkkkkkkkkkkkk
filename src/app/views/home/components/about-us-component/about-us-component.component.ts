import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us-component',
  templateUrl: './about-us-component.component.html',
  styleUrls: ['./about-us-component.component.scss']
})
export class AboutUsComponentComponent implements OnInit {


  icons_about: any = [
    { image: 'assets/missao.png', title: 'Missão', descriptions: 'Proporcionar ao nosso cliente a tranquilidade de ter todas as opções necessárias para solucionar o seu negócio.' },
    { image: 'assets/visao.png', title: 'Visão', descriptions: 'Ser a maior e melhor empresa do segmento com um completo mix de soluções empresariais.' },
    { image: 'assets/valores.png', title: 'Valores', descriptions: 'Buscamos a satisfação do cliente, a excelência e o dinamismo, sendo uma empresa que valoriza as pessoas.' }

  ]

  constructor() { }

  ngOnInit(): void {


  }

}
