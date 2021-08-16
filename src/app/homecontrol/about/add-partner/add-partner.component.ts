import { ToastrService } from 'ngx-toastr';
import { AboutService } from './../about.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.css'],
})
export class AddPartnerComponent implements OnInit {
  partnerFormData: FormData = new FormData();
  addPartnerForm!: FormGroup;
  submitted = false;
  selectedFile: File;

  constructor(
    private formBuilder: FormBuilder,
    private aboutServices: AboutService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.addPartnerForm = this.formBuilder.group({
      id: '0',
      partnerImage: ['', [Validators.required]],
      partnerNameAr: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      partnerBriefAr: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern(/[\u0600-\u06FF-/ ]/),
        ],
      ],
      partnerNameEn: ['', [Validators.required, Validators.minLength(3)]],
      partnerBriefEn: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get getFormControls() {
    return this.addPartnerForm.controls;
  }
  onfileUploaded(e) {
    this.selectedFile = e.target.files[0];

    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      if (this.partnerFormData.get('partnerImage')) {
        this.partnerFormData.set(
          'partnerImage',
          this.selectedFile,
          this.selectedFile.name
        );
      } else {
        this.partnerFormData.append(
          'partnerImage',
          this.selectedFile,
          this.selectedFile.name
        );
      }
    }
    this.toastr.success('successfully Added', 'Add partner Photo');
  }
  onSubmitPartner() {
    this.submitted = true;
    if (this.addPartnerForm.invalid) {
      return;
    }
    for (const key in this.addPartnerForm.value) {
      if (key !== 'partnerImage') {
        this.partnerFormData.append(key, this.addPartnerForm.value[key]);
      }
    }

    this.aboutServices.addNewPartner(this.partnerFormData).subscribe(
      (res) => {
        this.toastr.success('successfully Added', 'Add Member');
        this.addPartnerForm.reset();
      },
      (err) => {
        this.toastr.error('Something Wrong in Added', 'Add Member');
      }
    );
  }
}
