import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayformComponent } from './playform.component';

describe('PlayformComponent', () => {
  let component: PlayformComponent;
  let fixture: ComponentFixture<PlayformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
