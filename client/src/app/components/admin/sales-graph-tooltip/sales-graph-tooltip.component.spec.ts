import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesGraphTooltipComponent } from './sales-graph-tooltip.component';

describe('SalesGraphTooltipComponent', () => {
  let component: SalesGraphTooltipComponent;
  let fixture: ComponentFixture<SalesGraphTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesGraphTooltipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalesGraphTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
