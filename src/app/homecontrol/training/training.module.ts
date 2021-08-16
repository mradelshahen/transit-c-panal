import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { AddTrainingComponent } from './add-training/add-training.component';
import { EditTrainingComponent } from './edit-training/edit-training.component';

@NgModule({
  declarations: [AddTrainingComponent, EditTrainingComponent],
  imports: [CommonModule, ReactiveFormsModule, TrainingRoutingModule],
})
export class TrainingModule {}
