import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public defaultData = [
    {
      projectid: 1,
      projectname: 'abc',
      percentage: '60',
      managername: 'abc manager',
    },
    {
      projectid: 2,
      projectname: 'xyz',
      percentage: '50',
      managername: 'xyz manager',
    },
    {
      projectid: 3,
      projectname: 'mno',
      percentage: '100',
      managername: 'mno manager',
    },
  ];

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {}

  public bsValue$ = new BehaviorSubject(this.getProjects());
  public currentData = this.bsValue$.asObservable();

  getProjects(): any {
    return JSON.parse(localStorage.getItem('projects'));
  }

  getProjectsAndIndex(projectid): any {
    const data = this.getProjects();
    const index = data.findIndex((res) => res.projectid === projectid);
    return { index, data };
  }

  setData(value): boolean {
    const isSaved = true;
    const { index, data } = this.getProjectsAndIndex(value.projectid);
    if (index === -1) {
      data.push(value);

    }
    else if (JSON.stringify(data[index]) !== JSON.stringify(value)) {
      data.splice(index, 1, value);
    }
    this.saveProject(data);
    this.bsValue$.next(data);
    return isSaved;
  }

  getData(): any {
    return this.currentData;
  }

  deleteData(row): void {
    const { index, data } = this.getProjectsAndIndex(row.projectid);
    data.splice(data, 1);
    this.saveProject(data);
    this.bsValue$.next(data);
    this.dialog.closeAll();
  }

  saveProject(data): void {
    localStorage.setItem('projects', JSON.stringify(data));
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
