import { HomeService } from './../home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Events } from 'src/app/models/event-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  eventForm!: FormGroup;
  submitted = false;
  eventFormData = new FormData();
  selectedFile: File;
  eventImage;
  eventsList: Events[] = [];
  editEvent: Events;
  isEdit = false;
  constructor(
    private formBuilder: FormBuilder,
    private homeservice: HomeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchEventList();
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
      EventDate: [''],
      EventImage: ['', [Validators.required]],
    });
  }
  fetchEventList(): void {
    this.homeservice.getAllEvents().subscribe((resData) => {
      this.eventsList = resData;
    });
  }
  get getFormControls() {
    return this.eventForm.controls;
  }

  OnDeleteEvent(eventId: number) {
    this.homeservice.deleteEvent(eventId).subscribe((res) => {
      this.toastr.success('Event Deleted');
      this.fetchEventList();
    });
  }
  onEditEvent(id: number) {
    this.isEdit = !this.isEdit;
    this.eventsList.filter((currentId) => {
      if (currentId.id === id) {
        this.editEvent = currentId;
      }
    });
    this.eventImage = environment.BASE_ + this.editEvent.EventImage;
    this.eventForm.patchValue({
      id: this.editEvent.id,
      EventNameAr: this.editEvent.EventNameAr,
      eventDescAr: this.editEvent.eventDescAr,
      EventImage: this.selectedFile,
      EventData: '2020-20-10',
      EventNameEn: this.editEvent.EventNameEn,
      eventDescEn: this.editEvent.eventDescEn,
    });
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
        this.toastr.success('successfully Add', ' Member Photo');
      } else {
        this.eventFormData.append(
          'EventImage',
          this.selectedFile,
          this.selectedFile.name
        );
      }
      var reader = new FileReader();
      // this.ImagePath = e.target.files;
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (_e) => {
        this.eventImage = reader.result;
      };
    }
  }

  onSubmitEdit() {
    console.log(this.eventForm.value);

    if (this.eventForm.invalid) {
      return;
    }
    for (const key in this.eventForm.value) {
      if (key !== 'EventImage') {
        this.eventFormData.append(key, this.eventForm.value[key]);
      }
    }
    this.homeservice
      .updateEvent(this.editEvent.id, this.eventFormData)
      .subscribe((resData) => {
        this.toastr.success('Event Updated');
      });
  }
}
