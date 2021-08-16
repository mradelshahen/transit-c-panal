import { AboutService } from './../about.service';
import { Members } from './../../../models/members-model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css'],
})
export class EditMemberComponent implements OnInit {
  editMemberForm: FormData = new FormData();
  selectedFile: File;
  membersList: Members[] = [];
  editMember: Members;
  boradForm!: FormGroup;
  memberImage;
  submitted = false;
  isEdit = false;
  constructor(
    private formBuilder: FormBuilder,
    private aboutService: AboutService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.featchMemberList();
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
  featchMemberList(): void {
    this.aboutService.getAllMembers().subscribe((responseMemeberList) => {
      this.membersList = responseMemeberList;
    });
  }
  get getFormControls() {
    return this.boradForm.controls;
  }
  onSubmitMember() {
    this.submitted = true;
    if (this.boradForm.invalid) {
      return;
    }
  }
  OnDeleteMember(memberId: number) {
    this.aboutService.deleteMember(memberId).subscribe(
      (deletedRes) => {
        console.log(deletedRes);
        this.toastr.success('successfully Deleted', 'Delete Member');
        this.featchMemberList();
      },
      (err) => {
        this.toastr.error('Error on Deleting', 'Somthing Wrong');
      }
    );
  }
  onEditMember(id: number) {
    this.isEdit = !this.isEdit;
    this.membersList.filter((currentId) => {
      if (currentId.ID === id) {
        this.editMember = currentId;
      }
    });
    console.log(this.editMember);
    this.boradForm.setValue({
      ID: this.editMember.ID,
      Position_Order: '0',
      NameAr: this.editMember.NameAr,
      position_TitleAr: this.editMember.Position_TitleAr,
      DetailsAr: this.editMember.DetailsAr,
      DetailsEn: this.editMember.DetailsEn,
      NameEn: this.editMember.NameEn,
      position_TitleEn: this.editMember.Position_TitleEn,
      Image_Upload: this.editMember.Image_Upload,
    });
    this.memberImage = environment.BASE_ + this.editMember.Image_Upload;
  }
  fileUploader(e) {
    this.selectedFile = e.target.files[0];
    if (
      e.target.files.length > 0 &&
      e.target.files[0].type.indexOf('image') > -1
    ) {
      if (this.editMemberForm.get('Image_Upload')) {
        this.editMemberForm.set(
          'Image_Upload',
          this.selectedFile,
          this.selectedFile.name
        );
        this.toastr.success('successfully Add', ' Member Photo');
      } else {
        this.editMemberForm.append(
          'Image_Upload',
          this.selectedFile,
          this.selectedFile.name
        );
      }
      var reader = new FileReader();
      // this.ImagePath = e.target.files;
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (_e) => {
        this.memberImage = reader.result;
      };
    }
  }

  onSubmitEvent() {
    if (this.boradForm.invalid) {
      return;
    }
    for (const key in this.boradForm.value) {
      if (key !== 'Image_Upload') {
        this.editMemberForm.append(key, this.boradForm.value[key]);
      }
    }
    console.log(this.editMemberForm);
    this.aboutService
      .editMember(this.boradForm.value.ID, this.editMemberForm)
      .subscribe((res) => {
        console.log(res);
      });
  }
}
