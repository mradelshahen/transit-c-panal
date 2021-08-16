import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { StatisticsComponent } from './statistics/statistics.component';
import { EventsComponent } from './events/events.component';
import { EditEventComponent } from './edit-event/edit-event.component';

@NgModule({
  declarations: [StatisticsComponent, EventsComponent, EditEventComponent],
  imports: [CommonModule, HomepageRoutingModule, ReactiveFormsModule],
})
export class HomepageModule {}
