import { ToastrService } from 'ngx-toastr';
import { AllservicesService } from './../allservices.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-projects',
  templateUrl: './add-projects.component.html',
  styleUrls: ['./add-projects.component.css'],
})
export class AddProjectsComponent implements OnInit {
  projectFormData = new FormData();
  selectedFile: File;
  addProjectForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private allServicesService: AllservicesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addProjectForm = this.formBuilder.group({
      ID: '0',
      ProjectNameAr: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      ProjectBriefAr: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      ProjectNameEn: ['', [Validators.required, Validators.minLength(3)]],
      ProjectBriefEn: ['', [Validators.required, Validators.minLength(10)]],
      Image: ['', [Validators.required]],
      ProjectDate: ['', [Validators.required]],
      ProjectIncome: '0',
      DepartmentNameEn: ['', [Validators.required]],
      DepartmentNameAr: ['', [Validators.required]],
    });
  }
  get getFormControls() {
    return this.addProjectForm.controls;
  }
  fileUploader(e) {
    this.selectedFile = e.target.files[0];
    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      if (this.projectFormData.get('Image')) {
        this.projectFormData.set(
          'Image',
          this.selectedFile,
          this.selectedFile.name
        );
      } else {
        this.projectFormData.append(
          'Image',
          this.selectedFile,
          this.selectedFile.name
        );
      }
    }
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.addProjectForm.value);

    if (this.addProjectForm.invalid) {
      return;
    }

    for (const key in this.addProjectForm.value) {
      if (key !== 'Image') {
        this.projectFormData.append(key, this.addProjectForm.value[key]);
      }
    }
    this.allServicesService.addNewProject(this.projectFormData).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('project Added', 'Projects');
      },
      (err) => {
        this.toastr.error('somthing is wrong', 'Projects');
      }
    );
  }
}
