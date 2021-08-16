import { Career } from 'src/app/models/career/career-model';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CareerForm } from 'src/app/models/career/careersForm-model';

@Injectable({
  providedIn: 'root',
})
export class CareersService {
  constructor(private httpClient: HttpClient) {}
  getAllCareers(): Observable<Career[]> {
    return this.httpClient.get<Career[]>(
      `${environment.BASE_URL}Careers/GetAllCareers`
    );
  }
  addNewCareer(careerForm: Career) {
    return this.httpClient.post<Career>(
      `${environment.BASE_URL}Careers/AddpCareer`,
      careerForm
    );
  }
  editCareer(editCareerObj: Career, id: number) {
    return this.httpClient.put<Career>(
      `${environment.BASE_URL}Careers/UpdateCareer/${id}`,
      editCareerObj
    );
  }
  deleteCareer(id: number) {
    return this.httpClient.delete(
      `${environment.BASE_URL}Careers/DeleteCareer/${id}`
    );
  }
  getAllCvs(): Observable<CareerForm[]> {
    return this.httpClient.get<CareerForm[]>(
      `${environment.BASE_URL}Careers/GetAllCareersForm`
    );
  }
}
