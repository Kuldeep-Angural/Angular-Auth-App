import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionarcardComponent } from './questionarcard.component';

describe('QuestionarcardComponent', () => {
  let component: QuestionarcardComponent;
  let fixture: ComponentFixture<QuestionarcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionarcardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionarcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
