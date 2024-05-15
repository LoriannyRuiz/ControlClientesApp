import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { UpdatePageComponent } from './pages/update-page/update-page.component';

const routes: Routes = [

  {
    path: 'list-address/:id',
    component: ListPageComponent,
  },
  {
    path: 'new-address',
    component: NewPageComponent,
  },
  {
    path: 'update-address/:id',
    component: UpdatePageComponent
  },
  {
    path: '',
    redirectTo: 'list-address',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'new-address'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlAddressRoutingModule { }
