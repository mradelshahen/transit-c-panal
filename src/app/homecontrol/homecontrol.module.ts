import { AboutModule } from './about/about.module';
import { HomepageModule } from './homepage/homepage.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeControlRoutingModule } from './homecontrol-routing.module';
import { ControlComponent } from './control/control.component';
import { HomeControlComponent } from './homcontrol.component';

@NgModule({
  declarations: [HomeControlComponent, ControlComponent],
  imports: [
    CommonModule,
    HomepageModule,
    AboutModule,
    HomeControlRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class HomeControlModule {}
