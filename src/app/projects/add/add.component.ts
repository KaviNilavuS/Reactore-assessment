import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  @Input() formData;
  addForm: FormGroup;
  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.addForm = this.fb.group({
      projectid: [Date.now()],
      projectname: ['', [Validators.required]],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      managername: ['', [Validators.required]],
    });

    if (this.formData) {
      this.addForm.patchValue(this.formData);
    }
  }

  onSubmit(): void {
    const save = this.dataService.setData(
      this.addForm.getRawValue()
    );
    if (save) {
      if (!this.addForm) {
        this.dataService.openSnackBar('Project created successfully', '');
      } else {
        this.dataService.openSnackBar('Project Updated successfully', '');
      }
      this.dataService.dialog.closeAll();
    }
  }
}
