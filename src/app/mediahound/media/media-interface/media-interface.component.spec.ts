import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaInterfaceComponent } from './media-interface.component';

describe('MediaInterfaceComponent', () => {
  let component: MediaInterfaceComponent;
  let fixture: ComponentFixture<MediaInterfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaInterfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
