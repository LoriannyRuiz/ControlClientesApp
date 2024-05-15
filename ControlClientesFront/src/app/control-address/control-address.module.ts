import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlAddressRoutingModule } from './control-address-routing.module';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { UpdatePageComponent } from './pages/update-page/update-page.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewPageComponent,
    ListPageComponent,
    UpdatePageComponent
  ],
  imports: [
    CommonModule,
    ControlAddressRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ControlAddressModule { }
