import { EditEventComponent } from './edit-event/edit-event.component';
import { EventsComponent } from './events/events.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'statistics',
    component: StatisticsComponent,
  },

  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'event/edit',
    component: EditEventComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
