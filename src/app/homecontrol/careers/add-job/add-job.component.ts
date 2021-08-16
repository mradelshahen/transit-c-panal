import { ToastrService } from 'ngx-toastr';
import { Partner } from 'src/app/models/partners/partners-model';
import { CareersService } from './../careers.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Career } from 'src/app/models/career/career-model';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
})
export class AddJobComponent implements OnInit {
  editCareer: Career;
  addCareerForm: FormGroup;
  submitted = false;
  constructor(
    private formBulider: FormBuilder,
    private careersService: CareersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addCareerForm = this.formBulider.group({
      titleEn: ['', [Validators.required, Validators.minLength(3)]],
      titleAr: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      about_the_JobEn: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
        ],
      ],
      about_the_JobAr: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
          ,
        ],
      ],
      job_RequirementsEn: ['', [Validators.required, Validators.minLength(50)]],
      job_RequirementsAr: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
    });
  }
  get getFormControls() {
    return this.addCareerForm.controls;
  }

  onCareerSubmit() {
    this.submitted = true;
    if (this.addCareerForm.invalid) {
      return;
    }
    this.careersService
      .addNewCareer(this.addCareerForm.value)
      .subscribe((resData) => {
        console.log(resData);
        this.toastr.success('Successfully Added', 'Careers');
      });
  }
}
