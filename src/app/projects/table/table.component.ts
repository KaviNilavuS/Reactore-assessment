import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/service/data.service';
import { AddComponent } from '../add/add.component';
import { DeleteConfirmModalComponent } from '../delete-confirm-modal/delete-confirm-modal.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public displayedColumns;
  public data;
  dataSource = new MatTableDataSource<any>([]);

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.displayedColumns = ['projectname', 'percentage', 'managername', 'actions'];
    this.dataService.currentData.subscribe(
      (value) => (this.dataSource.data = value)
    );
  }

  addRow(): void {
    this.dialog.open(AddComponent, {
      width: '350px',
    });
  }


  deleteRow(row): void {
    const popup = this.dialog.open(DeleteConfirmModalComponent, {
      width: '400px',
    });
    popup.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.deleteData(row);
      }
    });
  }

  editRow(row): void {
    this.dialog.open(EditComponent, {
      width: '550px',
      data: row,
    });
  }
}
