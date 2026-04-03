import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoDeGastosComponent } from './listado-de-gastos.component';

describe('ListadoDeGastosComponent', () => {
  let component: ListadoDeGastosComponent;
  let fixture: ComponentFixture<ListadoDeGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoDeGastosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoDeGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
