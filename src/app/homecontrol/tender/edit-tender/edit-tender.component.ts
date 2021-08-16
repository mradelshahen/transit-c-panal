import { ToastrService } from 'ngx-toastr';
import { Tender } from './../../../models/tender/tender-model';
import { Component, OnInit } from '@angular/core';
import { TenderService } from '../tender.service';

@Component({
  selector: 'app-edit-tender',
  templateUrl: './edit-tender.component.html',
  styleUrls: ['./edit-tender.component.css'],
})
export class EditTenderComponent implements OnInit {
  isEdit = false;
  tenderList: Tender[] = [];

  constructor(
    private tenderServices: TenderService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchAllTenders();
  }
  fetchAllTenders(): void {
    this.tenderServices.getAllTenders().subscribe((resData) => {
      this.tenderList = resData;
    });
  }
  onDeleteTender(tenderId: number) {
    this.tenderServices.deleteTender(tenderId).subscribe((resData) => {
      this.toastr.success('Tender Deleted', 'Tenders');
      this.fetchAllTenders();
    });
  }
}
