import { ToastrService } from 'ngx-toastr';
import { AboutService } from './../about.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  Image_UploadForm: FormData = new FormData();
  selectedFile: File;
  boradForm!: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private aboutServices: AboutService,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.boradForm = this.formBuilder.group({
      ID: '0',
      Position_Order: '0',
      NameAr: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      position_TitleAr: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      DetailsAr: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      DetailsEn: ['', [Validators.required, Validators.minLength(10)]],
      NameEn: ['', [Validators.required, Validators.minLength(3)]],
      position_TitleEn: ['', [Validators.required, Validators.minLength(3)]],
      Image_Upload: [''],
    });
  }

  get getFormControls() {
    return this.boradForm.controls;
  }
  fileUploader(e) {
    this.selectedFile = e.target.files[0];
    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      if (this.Image_UploadForm.get('Image_Upload')) {
        this.Image_UploadForm.set(
          'Image_Upload',
          this.selectedFile,
          this.selectedFile.name
        );
      } else {
        this.Image_UploadForm.append(
          'Image_Upload',
          this.selectedFile,
          this.selectedFile.name
        );
      }
    }
  }
  onSubmitEvent() {
    this.submitted = true;

    if (this.boradForm.invalid) {
      return;
    }
    for (const key in this.boradForm.value) {
      if (key !== 'Image_Upload') {
        this.Image_UploadForm.append(key, this.boradForm.value[key]);
      }
    }

    this.aboutServices.addNewMember(this.Image_UploadForm).subscribe(
      (res) => {
        this.toaster.success('successfully Added', 'Add Member');
        this.boradForm.reset();
      },
      (err) => {
        this.toaster.error('Something Wrong in Added', 'Add Member');
      }
    );
  }
}
