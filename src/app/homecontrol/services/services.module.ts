import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { AddDepartmntComponent } from './add-departmnt/add-departmnt.component';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';

@NgModule({
  declarations: [
    AddDepartmntComponent,
    AddProjectsComponent,
    EditDepartmentComponent,
    EditProjectsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ServicesRoutingModule],
})
export class ServicesModule {}
