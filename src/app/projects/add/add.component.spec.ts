import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { DataService } from 'src/app/service/data.service';

import { AddComponent } from './add.component';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let dataService: DataService;
  const mockDataService = {
    setData: () => {},
    openSnackBar: () => {},
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      providers: [
        { provide: FormBuilder, useValue: formBuilder },
        { provide: MatDialog, useValue: { open: () => {} } },
        {
          provide: MatSnackBar,
          useValue: {
            openFromComponent: () => {},
          },
        },
        { provide: DataService, useValue: mockDataService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    dataService = TestBed.inject(DataService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should render on add Form UI', () => {
    it('should render heading', () => {
      // arrange & act
      const className = fixture.debugElement.query(By.css('h1')).nativeElement;
      // assert
      expect(className.textContent.trim()).toBe('Add Project');
    });

    it('should render Project Name field', () => {
      // arrange & act
      const className = fixture.debugElement.query(
        By.css('.addform__projectname')
      ).nativeElement;
      // assert
      expect(className.getAttribute('placeholder')).toBe('Project Name');
    });

    it('should render Percentage Completed field', () => {
      // arrange & act
      const className = fixture.debugElement.query(
        By.css('.addform__percentage')
      ).nativeElement;
      // assert
      expect(className.getAttribute('placeholder')).toBe(
        'Percentage Completed'
      );
    });

    it('should have min limited Percentage Completed value as 0', () => {
      // arrange & act
      const className = fixture.debugElement.query(
        By.css('.addform__percentage')
      ).nativeElement;
      // assert
      expect(className.getAttribute('min')).toBe('0');
    });

    it('should have max limited Percentage Completed value as 100', () => {
      // arrange & act
      const className = fixture.debugElement.query(
        By.css('.addform__percentage')
      ).nativeElement;
      // assert
      expect(className.getAttribute('max')).toBe('100');
    });

    it('should render Manager Name field', () => {
      // arrange & act
      const className = fixture.debugElement.query(
        By.css('.addform__managername')
      ).nativeElement;
      // assert
      expect(className.getAttribute('placeholder')).toBe('Manager Name');
    });

    it('should render Submit button', () => {
      // arrange & act
      const className = fixture.debugElement.query(
        By.css('.addform__submit')
      ).nativeElement;
      // assert
      expect(className.textContent.trim()).toBe('Submit');
    });

    it('should be disabled Submit button when form in not valid', () => {
      // arrange
      const percentage = component.addForm.controls.percentage;
      expect(percentage.valid).toBeFalsy();
      // act
      const button = fixture.debugElement.query(
        By.css('.addform__submit')
      ).nativeElement;
      // assert
      expect(button.disabled).toBeTruthy();
    });
  });

  describe('ngOnInit', () => {
    it('should call ngOnInit', () => {
      // arrange
      spyOn(component, 'ngOnInit');
      // act
      component.ngOnInit();
      // assert
      expect(component.ngOnInit).toHaveBeenCalled();
      expect(component.ngOnInit).toHaveBeenCalledTimes(1);
    });
  });

  describe('onSubmit', () => {
    it('should call onSubmit', () => {
      // arrange
      spyOn(component, 'onSubmit');
      // act
      component.onSubmit();
      // assert
      expect(component.onSubmit).toHaveBeenCalled();
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });

    it('should set formValue when calling onSubmit method', () => {
      // arrange
      spyOn(dataService, 'setData');
      // act
      component.onSubmit();
      // assert
      expect(dataService.setData).toHaveBeenCalled();
    });
  });
});
