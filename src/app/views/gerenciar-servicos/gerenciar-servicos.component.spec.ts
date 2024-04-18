import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarServicosComponent } from './gerenciar-servicos.component';

describe('GerenciarServicosComponent', () => {
  let component: GerenciarServicosComponent;
  let fixture: ComponentFixture<GerenciarServicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarServicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
