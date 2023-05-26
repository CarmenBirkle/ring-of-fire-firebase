import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AditPlayerComponent } from './adit-player.component';

describe('AditPlayerComponent', () => {
  let component: AditPlayerComponent;
  let fixture: ComponentFixture<AditPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AditPlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AditPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
