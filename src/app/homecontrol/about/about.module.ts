import { ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './board/board.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { EditMemberComponent } from './edit-member/edit-member.component';
import { AddPartnerComponent } from './add-partner/add-partner.component';

@NgModule({
  declarations: [BoardComponent, EditMemberComponent, AddPartnerComponent],
  imports: [CommonModule, AboutRoutingModule, ReactiveFormsModule],
})
export class AboutModule {}
