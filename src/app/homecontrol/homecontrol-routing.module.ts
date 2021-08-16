import { HomeControlComponent } from './homcontrol.component';
import { ControlComponent } from './control/control.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeControlComponent,
    children: [
      {
        path: 'homepage',
        loadChildren: () =>
          import('./homepage/homepage.module').then(
            (homepage) => homepage.HomepageModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about/about.module').then((about) => about.AboutModule),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./services/services.module').then(
            (service) => service.ServicesModule
          ),
      },
      {
        path: 'tender',
        loadChildren: () =>
          import('./tender/tender.module').then(
            (tender) => tender.TenderModule
          ),
      },
      {
        path: 'training',
        loadChildren: () =>
          import('./training/training.module').then(
            (training) => training.TrainingModule
          ),
      },
      {
        path: 'careers',
        loadChildren: () =>
          import('./careers/careers.module').then(
            (career) => career.CareersModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeControlRoutingModule {}
