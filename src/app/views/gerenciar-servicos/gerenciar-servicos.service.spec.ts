import { TestBed } from '@angular/core/testing';

import { GerenciarServicosService } from './gerenciar-servicos.service';

describe('GerenciarServicosService', () => {
  let service: GerenciarServicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciarServicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
