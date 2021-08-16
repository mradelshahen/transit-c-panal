import { Members } from './../../models/members-model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partner } from 'src/app/models/partners/partners-model';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  constructor(private httpClient: HttpClient) {}

  getAllMembers(): Observable<Members[]> {
    return this.httpClient.get<Members[]>(
      `${environment.BASE_URL}BoardMember/GetAllBoardMembert`
    );
  }
  addNewMember(memberForm: FormData) {
    return this.httpClient.post(
      `${environment.BASE_URL}BoardMember/UploadBoardMember`,
      memberForm
    );
  }
  deleteMember(memberId: number) {
    return this.httpClient.delete(
      `${environment.BASE_URL}BoardMember/DeleteBoardMember/${memberId}`
    );
  }
  editMember(memberId: number, editMemberFormData: FormData) {
    return this.httpClient.put(
      `${environment.BASE_URL}BoardMember/UpdateBoardMember/${memberId}`,
      editMemberFormData
    );
  }
  addNewPartner(partnerFormData: FormData): Observable<Partner> {
    return this.httpClient.post<Partner>(
      `${environment.BASE_URL}partner/UploadPartner`,
      partnerFormData
    );
  }
}
