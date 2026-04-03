import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastoPorCategoriaComponent } from './gasto-por-categoria.component';

describe('GastoPorCategoriaComponent', () => {
  let component: GastoPorCategoriaComponent;
  let fixture: ComponentFixture<GastoPorCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GastoPorCategoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastoPorCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
