import { EditProjectsComponent } from './edit-projects/edit-projects.component';
import { AddProjectsComponent } from './add-projects/add-projects.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { AddDepartmntComponent } from './add-departmnt/add-departmnt.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'department/add',
    component: AddDepartmntComponent,
  },
  {
    path: 'department/edit',
    component: EditDepartmentComponent,
  },
  {
    path: 'project/add',
    component: AddProjectsComponent,
  },
  {
    path: 'project/edit',
    component: EditProjectsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesRoutingModule {}
