import { Project } from './../../models/project/project-model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Department } from 'src/app/models/departments/departments-model';

@Injectable({
  providedIn: 'root',
})
export class AllservicesService {
  constructor(private httpClient: HttpClient) {}

  getAllDepartments(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(
      `${environment.BASE_URL}Department/GetAllDepartment`
    );
  }
  addNewDepartment(departmentFormData): Observable<Department> {
    return this.httpClient.post<Department>(
      `${environment.BASE_URL}Department/AddDepartment`,
      departmentFormData
    );
  }
  deleteDepartment(id: number) {
    return this.httpClient.delete(
      `${environment.BASE_URL}Department/DeleteDepartment/${id}`
    );
  }
  //***********************Projects*******************/
  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(
      `${environment.BASE_URL}Project/GetAllProjects`
    );
  }
  addNewProject(projectFormData: FormData): Observable<Project> {
    return this.httpClient.post<Project>(
      `${environment.BASE_URL}Project/AddProject`,
      projectFormData
    );
  }
  editProject(editProjectFormData: FormData, projectId) {
    return this.httpClient.put(
      `${environment.BASE_URL}Project/UpdateProject/${projectId}`,
      editProjectFormData
    );
  }
  deleteProject(deletedProjectId: number) {
    return this.httpClient.delete(
      `${environment.BASE_URL}Project/DeleteProject/${deletedProjectId}`
    );
  }
}
