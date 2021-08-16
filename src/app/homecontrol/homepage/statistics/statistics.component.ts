import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  statisticsForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.statisticsForm = this.formBuilder.group({
      StatisticNameAr: [
        '',
        [Validators.required, Validators.pattern(/[\u0600-\u06FF-/ ]/)],
      ],
      StatisticNameEn: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  get getFormControls() {
    return this.statisticsForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.statisticsForm.invalid) {
      return;
    }
    console.log(this.statisticsForm.value);

    this.homeService
      .addNewStatistics(this.statisticsForm.value)
      .subscribe((resData) => {
        this.toastr.success(resData, 'Statistics');
      });
  }
}
