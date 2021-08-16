import { ToastrService } from 'ngx-toastr';
import { Project } from './../../../models/project/project-model';
import { AllservicesService } from './../allservices.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css'],
})
export class EditProjectsComponent implements OnInit {
  editProjectFormData: FormData = new FormData();
  projects: Project[] = [];
  editProject: any;
  editProjectForm!: FormGroup;
  submitted = false;
  isEdit = false;
  selectedFile: File;
  dataString: string;
  constructor(
    private formBuilder: FormBuilder,
    private allServicesService: AllservicesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchAllProjects();
    this.editProjectForm = this.formBuilder.group({
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
  fetchAllProjects(): void {
    this.allServicesService.getAllProjects().subscribe((resData) => {
      this.projects = resData;
    });
  }
  get getFormControls() {
    return this.editProjectForm.controls;
  }
  onEditProject(id: number) {
    this.isEdit = !this.isEdit;
    this.projects.filter((currentId) => {
      if (currentId.ID === id) {
        this.editProject = currentId;
      }
    });
    console.log(this.editProject);

    this.editProjectForm.setValue({
      ID: this.editProject.ID,
      DepartmentNameAr: this.editProject.DepartmentNameAr,
      ProjectNameAr: this.editProject.ProjectNameAr,
      ProjectBriefAr: this.editProject.ProjectBriefAr,
      DepartmentNameEn: this.editProject.DepartmentNameEn,
      ProjectNameEn: this.editProject.ProjectNameEn,
      ProjectBriefEn: this.editProject.ProjectBriefEn,
      ProjectIncome: this.editProject.ProjectIncome,
      Image: this.editProject.Image,
      ProjectDate: new Date(this.editProject.ProjectDate).toUTCString(),
    });
    this.dataString = new Date(this.editProjectForm.value.ProjectDate)
      .toISOString()
      .split('T')[0];
  }

  fileUploader(e) {
    this.selectedFile = e.target.files[0];
    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      if (this.editProjectFormData.get('Image')) {
        this.editProjectFormData.set(
          'Image',
          this.selectedFile,
          this.selectedFile.name
        );
      } else {
        this.editProjectFormData.append(
          'Image',
          this.selectedFile,
          this.selectedFile.name
        );
      }
      this.toastr.success('successfully Add', '  Photo');
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.editProjectForm.invalid) {
      return;
    }
    for (const key in this.editProjectForm.value) {
      if (key !== 'Image') {
        this.editProjectFormData.append(key, this.editProjectForm.value[key]);
      }
    }
    this.allServicesService
      .editProject(this.editProjectFormData, this.editProject.ID)
      .subscribe((resData) => {
        console.log(resData);
      });
  }
}
