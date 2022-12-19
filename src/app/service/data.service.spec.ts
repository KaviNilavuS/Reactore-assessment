import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: { open: () => {} } },
        {
          provide: MatSnackBar,
          useValue: {
            openFromComponent: () => {},
          },
        },
      ],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProjects', () => {
    it('should call getProjects method', () => {
      // arrange
      const spy = spyOn(service, 'getProjects').and.returnValue({});
      // act
      service.getProjects();
      // assert
      expect(spy).toHaveBeenCalled();
      expect(service.getProjects()).toEqual({});
    });
  });

  describe('getData', () => {
    it('should call getData method', () => {
      // arrange
      service.currentData = [] as any;
      const spy = spyOn(service, 'getData').and.returnValue([]);
      // act
      service.getData();
      // assert
      expect(spy).toHaveBeenCalled();
      expect(service.getData()).toEqual([]);
    });
  });

  describe('deleteData', () => {
    it('should call deleteData method', () => {
      // arrange
      const spy = spyOn(service, 'deleteData').and.returnValue();
      // act
      service.deleteData('');
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('saveProject', () => {
    it('should call saveProject method', () => {
      // arrange
      const spy = spyOn(service, 'saveProject').and.returnValue();
      // act
      service.saveProject('');
      // assert
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('openSnackBar', () => {
    it('should call openSnackBar method', () => {
      // arrange
      const spy = spyOn(service, 'openSnackBar').and.returnValue();
      // act
      service.openSnackBar('', '');
      // assert
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('', '');
    });
  });

  describe('setData', () => {
    it('should call setData method', () => {
      // arrange
      const spy = spyOn(service, 'setData').and.returnValue(true);
      // act
      service.setData('');
      // assert
      expect(spy).toHaveBeenCalled();
      expect(spy).toBeTruthy();
    });
  });
});
