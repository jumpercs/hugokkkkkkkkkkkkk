import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacaoDadosFormularioComponent } from './visualizacao-dados-formulario.component';

describe('VisualizacaoDadosFormularioComponent', () => {
  let component: VisualizacaoDadosFormularioComponent;
  let fixture: ComponentFixture<VisualizacaoDadosFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizacaoDadosFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacaoDadosFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
