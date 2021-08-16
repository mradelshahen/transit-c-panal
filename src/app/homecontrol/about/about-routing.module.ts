import { AddPartnerComponent } from './add-partner/add-partner.component';
import { BoardComponent } from './board/board.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMemberComponent } from './edit-member/edit-member.component';

const routes: Routes = [
  {
    path: 'board',
    component: BoardComponent,
  },
  {
    path: 'editboard',
    component: EditMemberComponent,
  },
  {
    path: 'addpartner',
    component: AddPartnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRoutingModule {}
