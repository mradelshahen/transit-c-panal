import { EditTrainingComponent } from './edit-training/edit-training.component';
import { AddTrainingComponent } from './add-training/add-training.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add',
    component: AddTrainingComponent,
  },
  {
    path: 'edit',
    component: EditTrainingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingRoutingModule {}
