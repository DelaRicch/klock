import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellingWatchComponent } from './best-selling-watch.component';

describe('BestSellingWatchComponent', () => {
  let component: BestSellingWatchComponent;
  let fixture: ComponentFixture<BestSellingWatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSellingWatchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestSellingWatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
