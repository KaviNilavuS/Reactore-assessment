import { Component, OnInit } from '@angular/core';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'reactore';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    if (
      !localStorage.getItem('projects') ||
      localStorage.getItem('projects') === ''
    ) {
      this.saveDefaultData();
    }

    if (localStorage.getItem('projects') === '[]') {
      if (confirm('No Projects found, Do want to load default data?!')) {
        this.saveDefaultData();
      }
    }
  }

  saveDefaultData(): void {
    this.dataService.bsValue$.next(this.dataService.defaultData);
    localStorage.setItem(
      'projects',
      JSON.stringify(this.dataService.defaultData)
    );
  }
}
