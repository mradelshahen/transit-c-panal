import { Course } from './../../../models/training/course-model';
import { ToastrService } from 'ngx-toastr';
import { TrainingService } from './../training.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-training',
  templateUrl: './edit-training.component.html',
  styleUrls: ['./edit-training.component.css'],
})
export class EditTrainingComponent implements OnInit {
  editTraining: FormGroup;
  trainigObj: Course;
  isEdit = false;
  coursesList: Course[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private trainingService: TrainingService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchAllCourses();
    this.editTraining = this.formBuilder.group({
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
      Image_Upload: 'string',
    });
  }
  fetchAllCourses(): void {
    this.trainingService.getAllCourses().subscribe((resData) => {
      this.coursesList = resData;
    });
  }
  get getFormControls() {
    return this.editTraining.controls;
  }
  onEditTraining(id: number): void {
    this.isEdit = !this.isEdit;
    this.coursesList.filter((editTrainingObj) => {
      if (editTrainingObj.ID === id) {
        this.trainigObj = editTrainingObj;
      }
    });
    console.log(this.trainigObj);

    this.editTraining.setValue({
      ID: this.trainigObj.ID,
      Course_NameAr: this.trainigObj.Course_NameAr,
      Course_NameEn: this.trainigObj.Course_NameEn,
      Course_DetailsAr: this.trainigObj.Course_DetailsAr,
      Course_DetailsEn: this.trainigObj.Course_DetailsEn,
      Course_Date: this.trainigObj.Course_Date,
      Image_Upload: 'string',
    });
  }
  onDelete(id: number): void {
    this.trainingService.deleteCourse(id).subscribe((resData) => {
      this.toastrService.success('Deleted', 'Course');
      this.fetchAllCourses();
    });
  }
  onSubmitEditTraining() {
    this.trainingService
      .editCourse(this.editTraining.value, this.editTraining.value.ID)
      .subscribe((resData) => {
        this.toastrService.success('Updated', 'Course');
      });
  }
}
