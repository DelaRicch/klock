import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingWatchesComponent } from './best-selling-watches.component';

describe('BestSellingWatchesComponent', () => {
  let component: BestSellingWatchesComponent;
  let fixture: ComponentFixture<BestSellingWatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSellingWatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestSellingWatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
