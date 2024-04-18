import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarParceirosComponent } from './gerenciar-parceiros.component';

describe('GerenciarParceirosComponent', () => {
  let component: GerenciarParceirosComponent;
  let fixture: ComponentFixture<GerenciarParceirosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciarParceirosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciarParceirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
