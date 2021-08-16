import { environment } from './../../../../environments/environment';
import { CareersService } from './../careers.service';
import { Component, OnInit } from '@angular/core';
import { CareerForm } from 'src/app/models/career/careersForm-model';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css'],
})
export class CvsComponent implements OnInit {
  allCvs: CareerForm[] = [];
  base_url = environment.BASE_;
  constructor(private careersService: CareersService) {}

  ngOnInit(): void {
    this.careersService.getAllCvs().subscribe((resData) => {
      this.allCvs = resData;
      console.log(resData);
    });
  }
}
