import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { DataService } from 'src/app/service/data.service';

import { TotalProjectsComponent } from './total-projects.component';

xdescribe('TotalProjectsComponent', () => {
  let component: TotalProjectsComponent;
  let fixture: ComponentFixture<TotalProjectsComponent>;
  const matDialogStub = {
    open(): any {
      return { afterClosed: () => of('primary') };
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalProjectsComponent ],
      providers: [ { provide: MatDialog, useValue: matDialogStub },
        {
          provide: MatSnackBar,
          useValue: {
            openFromComponent: () => {}
          }
        }, { provide: DataService, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Total Projects ripple', () => {
    // arrange & act
    const className = fixture.debugElement.query(
      By.css('.count-container__total')
    ).nativeElement;
    // assert
    expect(className.textContent.trim()).toBe('Total Projects');
  });

  it('should render Overall Progress ripple', () => {
    // arrange & act
    const className = fixture.debugElement.query(
      By.css('.count-container__overall')
    ).nativeElement;
    // assert
    expect(className.textContent.trim()).toBe('Overall Progress');
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
});
