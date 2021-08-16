import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Statistics } from 'src/app/models/statistic-model';
import { environment } from 'src/environments/environment';
import { Events } from 'src/app/models/event-model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private httpClient: HttpClient) {}
  addNewStatistics(statisticObj: Statistics): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.BASE_URL}Statistic/AddStatistic`,
      statisticObj
    );
  }
  getAllEvents(): Observable<Events[]> {
    return this.httpClient.get<Events[]>(
      `${environment.BASE_URL}Event/GetAllEvent`
    );
  }
  addNewEvents(eventFormData: FormData): Observable<any> {
    return this.httpClient.post<Event>(
      `${environment.BASE_URL}Event/AddEvent`,
      eventFormData
    );
  }
  deleteEvent(eventId: number): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.BASE_URL}Event/DeleteEvent/${eventId}`
    );
  }
  updateEvent(eventId, updatedEvent) {
    return this.httpClient.put<any>(
      `${environment.BASE_URL}Event/UpdateEvent/${eventId}`,
      updatedEvent
    );
  }
}
