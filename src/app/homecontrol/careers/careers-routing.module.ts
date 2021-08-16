import { CvsComponent } from './cvs/cvs.component';
import { AddJobComponent } from './add-job/add-job.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditJobComponent } from './edit-job/edit-job.component';

const routes: Routes = [
  {
    path: 'add/career',
    component: AddJobComponent,
  },
  {
    path: 'edit/career',
    component: EditJobComponent,
  },
  {
    path: 'allcvs',
    component: CvsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareersRoutingModule {}
