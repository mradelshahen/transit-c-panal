import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tender } from 'src/app/models/tender/tender-model';

@Injectable({
  providedIn: 'root',
})
export class TenderService {
  constructor(private httpClient: HttpClient) {}
  getAllTenders(): Observable<Tender[]> {
    return this.httpClient.get<Tender[]>(
      `${environment.BASE_URL}Tender/GetAllTenders`
    );
  }
  editTender(tenderFormData: FormData, tenderId: number) {
    return this.httpClient.put(
      `${environment.BASE_URL}Tender/UpdateTender/${tenderId}`,
      tenderFormData
    );
  }
  deleteTender(tenderId: number) {
    return this.httpClient.delete(
      `${environment.BASE_URL}Tender/DeleteTender/${tenderId}`
    );
  }
  addNewTender(tenderFormData: FormData): Observable<any> {
    return this.httpClient.post(
      `${environment.BASE_URL}Tender/AddTender`,
      tenderFormData
    );
  }
}
