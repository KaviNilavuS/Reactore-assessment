import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { AddComponent } from '../add/add.component';
import { EditComponent } from '../edit/edit.component';

import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const mockDialogData = {
    closeAll: () => {},
    open: () => {
      return {
        afterClosed: () => {
          return of({});
        },
      };
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      providers: [
        { provide: MatDialog, useValue: mockDialogData },
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
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Project Management heading', () => {
    // arrange & act
    const className = fixture.debugElement.query(
      By.css('.title')
    ).nativeElement;
    // assert
    expect(className.textContent).toEqual('Project Management');
  });

  describe('Add Project button', () => {
    it('should render Add project button', () => {
      // arrange & act
      const className = fixture.debugElement.query(
        By.css('.add')
      ).nativeElement;
      // assert
      expect(className.textContent).toEqual('Add project');
    });

    it('should call addRow method when clicking on Add project button', () => {
      // arrange
      spyOn(component, 'addRow');
      const add = fixture.debugElement.query(By.css('.add'));
      // act
      add.triggerEventHandler('click', null);
      // assert
      expect(component.addRow).toHaveBeenCalled();
    });
  });

  describe('addRow', () => {
    it('should call addRow method', () => {
      // arrange
      spyOn(component, 'addRow');
      // act
      component.addRow();
      // assert
      expect(component.addRow).toHaveBeenCalled();
    });

    it('should open dialog when calling addRow method', () => {
      // arrange and act
      spyOn(component.dialog, 'open').and.callThrough();
      component.addRow();
      // assert
      expect(component.dialog.open).toHaveBeenCalledWith(AddComponent, {
        width: '350px',
      });
    });
  });

  describe('deleteRow', () => {
    it('should call deleteRow method', () => {
      // arrange
      spyOn(component, 'deleteRow');
      // act
      component.deleteRow('');
      // assert
      expect(component.deleteRow).toHaveBeenCalled();
    });
  });

  describe('editRow', () => {
    it('should call editRow method', () => {
      // arrange
      spyOn(component, 'editRow');
      // act
      component.editRow('');
      // assert
      expect(component.editRow).toHaveBeenCalled();
    });

    it('should open dialog when calling editRow method', () => {
      // arrange and act
      spyOn(component.dialog, 'open').and.callThrough();
      component.editRow('');
      // assert
      expect(component.dialog.open).toHaveBeenCalledWith(EditComponent, {
        width: '550px',
        data: '',
      });
    });
  });
});
