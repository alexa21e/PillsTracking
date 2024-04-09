import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientPageComponent } from './add-patient-page.component';

describe('AddPatientPageComponent', () => {
  let component: AddPatientPageComponent;
  let fixture: ComponentFixture<AddPatientPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPatientPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

function openForm(): void {
  const formContainer = document.querySelector('.form-container') as HTMLElement;
  formContainer.style.display = 'block';
}

function closeForm(): void {
  const formContainer = document.querySelector('.form-container') as HTMLElement;
  formContainer.style.display = 'none';
}


