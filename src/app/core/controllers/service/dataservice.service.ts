import { Injectable } from '@angular/core';
import { Services } from '../../models/services';


@Injectable({
    providedIn: 'root'
})
export class DataService {
    private dataService: Services[] = [];
    constructor() { }

    setServiceData(data: Services[]) {
        this.dataService = data;
    }

    getServiceData(): Services[] {
        return this.dataService;
    }

}
