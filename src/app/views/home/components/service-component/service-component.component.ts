import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/core/controllers/service/Services.service';
import { Services } from 'src/app/core/models/Services';

@Component({
  selector: 'app-service-component',
  templateUrl: './service-component.component.html',
  styleUrls: ['./service-component.component.scss']
})

export class ServiceComponentComponent implements OnInit {

  services: Services[] = [];

  allServices: { icon: string, title: string, description: string, segment: string }[] = [];

  showAll: boolean = false;

  loading: boolean = true;

  constructor(private _service: ServicesService) { }

  ngOnInit(): void {
    this._service.getServices().subscribe((services: Services[]) => {

      for (let i = 0; i < services.length; i++) {
        let service = {
          id: services[i].id,
          icon: services[i].data.cst_00002.data,
          title: services[i].data.ipt_00002,
          description: services[i].data.ipt_00003,
          segment: services[i].data.slt_00001.label,
        };

        this.allServices.push(service);
        this.loading = false;
      }

    },

      error => {
        console.error("Ocorreu um erro ao obter o serviços", error);
        this.loading = false;
      },
    );

  }

  showMoreItems(): void {
    this.showAll = true;
  }

  showFewerItems(): void {
    this.showAll = false
  }



}


