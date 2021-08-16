import { AllservicesService } from './../allservices.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-departmnt',
  templateUrl: './add-departmnt.component.html',
  styleUrls: ['./add-departmnt.component.css'],
})
export class AddDepartmntComponent implements OnInit {
  departmentFormData: FormData = new FormData();
  selectedFile: File;
  addDepartmentForm!: FormGroup;
  submitted = false;
  sectorAr = ['انظمة', 'الشبكات'];
  sectorEn = ['system', 'network'];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private allServicesService: AllservicesService
  ) {}

  ngOnInit(): void {
    this.addDepartmentForm = this.formBuilder.group({
      id: '0',
      DepartmentNameAr: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      DepartmentBriefAr: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      DepartmentNameEn: ['', [Validators.required, Validators.minLength(3)]],
      DepartmentBriefEn: ['', [Validators.required, Validators.minLength(10)]],
      DepartmentProjectNum: [
        '',
        [Validators.required, Validators.min(1), Validators.max(50)],
      ],
      DepartmentImage: ['', [Validators.required, Validators.minLength(3)]],
      SectorNameAr: ['', [Validators.required, Validators.minLength(3)]],
      SectorNameEn: ['', [Validators.required, Validators.minLength(3)]],
    });
  }
  get getFormControls() {
    return this.addDepartmentForm.controls;
  }
  fileUploader(e) {
    this.selectedFile = e.target.files[0];
    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      if (this.departmentFormData.get('DepartmentImage')) {
        this.departmentFormData.set(
          'DepartmentImage',
          this.selectedFile,
          this.selectedFile.name
        );
      } else {
        this.departmentFormData.append(
          'DepartmentImage',
          this.selectedFile,
          this.selectedFile.name
        );
      }
    }
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.addDepartmentForm.value);

    if (this.addDepartmentForm.invalid) {
      return;
    }

    for (const key in this.addDepartmentForm.value) {
      if (key !== 'DepartmentImage') {
        this.departmentFormData.append(key, this.addDepartmentForm.value[key]);
      }
    }
    this.allServicesService.addNewDepartment(this.departmentFormData).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {}
    );
  }
}
