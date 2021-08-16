import { ToastrService } from 'ngx-toastr';
import { Career } from './../../../models/career/career-model';
import { CareersService } from './../careers.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css'],
})
export class EditJobComponent implements OnInit {
  editCareer: Career;
  careerForm!: FormGroup;
  careerList: Career[] = [];
  submitted = false;
  isEdit = false;
  isLoading : Boolean;
  constructor(
    private formBuilder: FormBuilder,
    private careersService: CareersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchAllCareers();
    this.careerForm = this.formBuilder.group({
      ID: '0',
      TitleEn: ['', [Validators.required, Validators.minLength(3)]],
      TitleAr: ['', [Validators.required, Validators.minLength(3)]],
      About_the_JobEn: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      About_the_JobAr: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      Job_RequirementsEn: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      Job_RequirementsAr: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      Priority: '0',
    });
  }
  fetchAllCareers(): void {
    this.isLoading =true;
    this.careersService.getAllCareers().subscribe((resData) => {
      this.careerList = resData;
      this.isLoading = false;
    });
  }
  get getFormControls() {
    return this.careerForm.controls;
  }
  OnDeleteCareer(memberId: number) {
    this.careersService.deleteCareer(memberId).subscribe(
      (deletedRes) => {
        console.log(deletedRes);
        this.toastr.success('successfully Deleted', 'Delete Member');
        this.fetchAllCareers();
      },
      (err) => {
        this.toastr.error('Error on Deleting', 'Somthing Wrong');
      }
    );
  }
  onEditCareer(id: number) {
    this.isEdit = !this.isEdit;
    this.careerList.filter((currentId) => {
      if (currentId.ID === id) {
        this.editCareer = currentId;
      }
    });
    console.log(this.editCareer);
    this.careerForm.setValue({
      ID: this.editCareer.ID,
      TitleAr: this.editCareer.TitleAr,
      About_the_JobAr: this.editCareer.About_the_JobAr,
      Job_RequirementsAr: this.editCareer.Job_RequirementsAr,
      TitleEn: this.editCareer.TitleEn,
      About_the_JobEn: this.editCareer.About_the_JobEn,
      Job_RequirementsEn: this.editCareer.Job_RequirementsEn,
      Priority: '0',
    });
  }
  onCareerSubmit() {
    this.submitted = true;
    if (this.careerForm.invalid) {
      return;
    }
    this.careersService.editCareer(
      this.careerForm.value,
      this.careerForm.value.ID
    );
  }
}
