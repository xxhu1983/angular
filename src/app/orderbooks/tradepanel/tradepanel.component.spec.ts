import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradepanelComponent } from './tradepanel.component';

describe('TradepanelComponent', () => {
  let component: TradepanelComponent;
  let fixture: ComponentFixture<TradepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradepanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradepanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
