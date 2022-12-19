import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

import { DeleteConfirmModalComponent } from './delete-confirm-modal.component';

describe('DeleteConfirmModalComponent', () => {
  let component: DeleteConfirmModalComponent;
  let fixture: ComponentFixture<DeleteConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteConfirmModalComponent],
      providers: [
        { provide: MatDialog, useValue: { open: () => {} } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: { close: () => {} } },
        {
          provide: MatSnackBar,
          useValue: {
            openFromComponent: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('should render on delete confirm modal UI', () => {
    it('should render heading', () => {
      // arrange & act
      const className = fixture.debugElement.query(By.css('h2')).nativeElement;
      // assert
      expect(className.textContent.trim()).toBe('Are you Sure?');
    });

    it('should render warning icon', () => {
      // arrange & act
      const className = fixture.debugElement.query(
        By.css('.confirm-dialog__warning-icon')
      ).nativeElement;
      // assert
      expect(className).toBeTruthy();
    });

    it('should render message', () => {
      // arrange & act
      const className = fixture.debugElement.query(
        By.css('.confirm-dialog__text')
      ).nativeElement;
      // assert
      expect(className.textContent.trim()).toBe(
        'Do you really want to delete the Project?'
      );
    });

    it('should render Confirm button', () => {
      // arrange & act
      const className = fixture.debugElement.query(
        By.css('.confirm-dialog__btn button')
      ).nativeElement;
      // assert
      expect(className.textContent.trim()).toBe('Confirm');
    });

    it('should render Cancel button', () => {
      // arrange & act
      const className = fixture.debugElement.queryAll(
        By.css('.confirm-dialog__btn button')
      )[1].nativeNode;
      // assert
      expect(className.textContent).toBe('Cancel');
    });
  });

  describe('close', () => {
    it('should call close method', () => {
      // arrange
      spyOn(component, 'close');
      // act
      component.close(true);
      // assert
      expect(component.close).toHaveBeenCalled();
      expect(component.close).toHaveBeenCalledWith(true);
    });

    it('should call close method when clicking on close button', () => {
      // arrange
      spyOn(component, 'close');
      const confirmButton = fixture.debugElement.query(
        By.css('.confirm-dialog__btn button')
      );
      // act
      confirmButton.triggerEventHandler('click', null);
      // assert
      expect(component.close).toHaveBeenCalled();
    });
  });
});
