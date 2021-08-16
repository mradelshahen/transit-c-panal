import { EditTenderComponent } from './edit-tender/edit-tender.component';
import { AddTenderComponent } from './add-tender/add-tender.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'add',
    component: AddTenderComponent,
  },
  {
    path: 'edit',
    component: EditTenderComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenderRoutingModule {}
