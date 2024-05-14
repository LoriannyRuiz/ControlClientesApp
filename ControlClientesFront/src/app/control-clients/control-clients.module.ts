import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlClientsRoutingModule } from './control-clients-routing.module';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { UpdatePageComponent } from './pages/update-page/update-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListPageComponent,
    NewPageComponent,
    UpdatePageComponent
  ],
  imports: [
    CommonModule,
    ControlClientsRoutingModule,
    SharedModule
  ]
})
export class ControlClientsModule { }
