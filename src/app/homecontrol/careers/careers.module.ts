import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CareersRoutingModule } from './careers-routing.module';
import { AddJobComponent } from './add-job/add-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { CvsComponent } from './cvs/cvs.component';

@NgModule({
  declarations: [AddJobComponent, EditJobComponent, CvsComponent],
  imports: [CommonModule, ReactiveFormsModule, CareersRoutingModule],
})
export class CareersModule {}
