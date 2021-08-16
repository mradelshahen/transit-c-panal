import { Course } from './../../../models/training/course-model';
import { TrainingService } from './../training.service';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-training',
  templateUrl: './add-training.component.html',
  styleUrls: ['./add-training.component.css'],
})
export class AddTrainingComponent implements OnInit {
  addTraining: FormGroup;
  submitted = false;
  constructor(
    private formBulider: FormBuilder,
    private trainingService: TrainingService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addTraining = this.formBulider.group({
      ID: '0',
      Course_NameAr: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      Course_NameEn: ['', [Validators.required, Validators.minLength(3)]],
      Course_DetailsAr: [
        '',
        [
          Validators.required,
          Validators.minLength(50),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      Course_DetailsEn: ['', [Validators.required, Validators.minLength(50)]],
      Course_Date: ['', [Validators.required]],
      Image_Upload: 'not Provided',
    });
  }
  get getFormControls() {
    return this.addTraining.controls;
  }
  onSubmitTraining() {
    this.submitted = true;
    if (this.addTraining.invalid) {
      return;
    }
    this.trainingService
      .AddNewCourse(this.addTraining.value)
      .subscribe((resData) => {
        console.log(resData);
        this.toastr.success('Successfully Added', 'Course');
      });
  }
}
