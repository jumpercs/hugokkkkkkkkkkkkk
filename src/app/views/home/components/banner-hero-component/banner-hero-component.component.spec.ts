import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerHeroComponentComponent } from './banner-hero-component.component';

describe('BannerHeroComponentComponent', () => {
  let component: BannerHeroComponentComponent;
  let fixture: ComponentFixture<BannerHeroComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerHeroComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerHeroComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
