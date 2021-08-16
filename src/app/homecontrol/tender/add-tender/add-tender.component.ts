import { ToastrService } from 'ngx-toastr';
import { TenderService } from './../tender.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.css'],
})
export class AddTenderComponent implements OnInit {
  tenderForm: FormGroup;
  selectedFile: File;
  tenderFormData: FormData = new FormData();
  submitted = false;
  constructor(
    private formBulider: FormBuilder,
    private tender: TenderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.tenderForm = this.formBulider.group({
      Tender_ID: '0',
      Tender_NameAr: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      Tender_NameEn: ['', [Validators.required, Validators.minLength(5)]],
      Tender_Code: ['', [Validators.required, Validators.minLength(3)]],
      Tender_Due_Date: ['', [Validators.required]],
      Tender_Attachment: ['', [Validators.required]],
    });
  }
  get getFormControls() {
    return this.tenderForm.controls;
  }
  fileUploader(e) {
    this.selectedFile = e.target.files[0];
    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      if (this.tenderFormData.get('Tender_Attachment')) {
        this.tenderFormData.set(
          'Tender_Attachment',
          this.selectedFile,
          this.selectedFile.name
        );
      } else {
        this.tenderFormData.append(
          'Tender_Attachment',
          this.selectedFile,
          this.selectedFile.name
        );
      }
    }
  }
  onSubmitTender() {
    this.submitted = true;
    if (this.tenderForm.invalid) {
      return;
    }

    for (const key in this.tenderForm.value) {
      if (key !== 'Tender_Attachment') {
        this.tenderFormData.append(key, this.tenderForm.value[key]);
      }
    }
    console.log(this.tenderForm.value);

    this.tender.addNewTender(this.tenderFormData).subscribe(
      (res) => {
        this.toastr.success('successfully Added', 'Add Tender');
      },
      (err) => {
        this.toastr.error('Something Wrong in Added', 'Add Tender');
      }
    );
  }
}
