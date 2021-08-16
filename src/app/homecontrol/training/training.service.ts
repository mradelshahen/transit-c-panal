import { environment } from './../../../environments/environment';
import { Course } from './../../models/training/course-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  constructor(private httpClient: HttpClient) {}
  getAllCourses() {
    return this.httpClient.get<Course[]>(
      `${environment.BASE_URL}Course/GetAllCourses`
    );
  }
  AddNewCourse(courseForm: Course) {
    return this.httpClient.post<Course>(
      `${environment.BASE_URL}Course/AddCourse`,
      courseForm
    );
  }
  editCourse(editCourseForm: Course, courseId: number) {
    return this.httpClient.put<Course>(
      `${environment.BASE_URL}Course/UpdateCourse/${courseId}`,
      editCourseForm
    );
  }
  deleteCourse(courseId: number) {
    return this.httpClient.delete(
      `${environment.BASE_URL}Course/DeleteCourse/${courseId}`
    );
  }
}
