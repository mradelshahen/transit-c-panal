import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderRoutingModule } from './tender-routing.module';
import { AddTenderComponent } from './add-tender/add-tender.component';
import { EditTenderComponent } from './edit-tender/edit-tender.component';

@NgModule({
  declarations: [AddTenderComponent, EditTenderComponent],
  imports: [CommonModule, ReactiveFormsModule, TenderRoutingModule],
})
export class TenderModule {}
