import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookoComponent } from './booko.component';

describe('BookoComponent', () => {
  let component: BookoComponent;
  let fixture: ComponentFixture<BookoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
