import { ToastrService } from 'ngx-toastr';
import { HomeService } from './../home.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  PatternValidator,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  eventForm!: FormGroup;
  submitted = false;
  eventFormData = new FormData();
  selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      id: '0',
      EventNameAr: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      EventNameEn: ['', [Validators.required, Validators.minLength(5)]],
      eventDescEn: ['', [Validators.required, Validators.minLength(50)]],
      eventDescAr: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      EventData: ['', [Validators.required]],
      EventImage: ['', [Validators.required]],
    });
  }
  get getFormControls() {
    return this.eventForm.controls;
  }
  fileUploader(e) {
    this.selectedFile = e.target.files[0];
    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      if (this.eventFormData.get('EventImage')) {
        this.eventFormData.set(
          'EventImage',
          this.selectedFile,
          this.selectedFile.name
        );
      } else {
        this.eventFormData.append(
          'EventImage',
          this.selectedFile,
          this.selectedFile.name
        );
      }
    }
  }
  onSubmitEvent() {
    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    }
    for (const key in this.eventForm.value) {
      if (key !== 'EventImage') {
        this.eventFormData.append(key, this.eventForm.value[key]);
      }
    }

    this.homeService.addNewEvents(this.eventFormData).subscribe(
      (res) => {
        this.toastr.success('successfully Added', 'Add event');
      },
      (err) => {
        this.toastr.error('Something Wrong in Added', 'Add event');
      }
    );
  }
}
