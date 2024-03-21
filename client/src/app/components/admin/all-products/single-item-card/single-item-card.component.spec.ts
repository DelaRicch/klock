import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleItemCardComponent } from './single-item-card.component';

describe('SingleItemCardComponent', () => {
  let component: SingleItemCardComponent;
  let fixture: ComponentFixture<SingleItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleItemCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
