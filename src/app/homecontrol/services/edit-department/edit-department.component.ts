import { ToastrService } from 'ngx-toastr';
import { Department } from './../../../models/departments/departments-model';
import { AllservicesService } from './../allservices.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
})
export class EditDepartmentComponent implements OnInit {
  companyDepartments: Department[] = [];
  addDepartmentForm!: FormGroup;
  submitted = false;
  isEdit = false;
  sectorAr = ['الانظمة', 'الشبكات'];
  sectorEn = ['Development', 'Networks'];

  constructor(
    private formBuilder: FormBuilder,
    private allServicesService: AllservicesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchAllDepartments();
    this.addDepartmentForm = this.formBuilder.group({
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
  fetchAllDepartments() {
    this.allServicesService.getAllDepartments().subscribe((resDepartments) => {
      this.companyDepartments = resDepartments;
    });
  }
  get getFormControls() {
    return this.addDepartmentForm.controls;
  }
  onDeleteDepartment(depID: number) {
    this.allServicesService.deleteDepartment(depID).subscribe((res) => {
      this.toastr.success('Department Deleted Successfully', 'Deleted');
      this.fetchAllDepartments();
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.addDepartmentForm.invalid) {
      return;
    }
  }
}
