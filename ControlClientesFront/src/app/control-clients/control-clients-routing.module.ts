import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { UpdatePageComponent } from './pages/update-page/update-page.component';

const routes: Routes = [

  {
    path: 'list-clients',
    component: ListPageComponent,
  },
  {
    path: 'new-clients',
    component: NewPageComponent,
  },
  {
    path: 'update-clients',
    component: UpdatePageComponent
  },
  {
    path: '',
    redirectTo: 'list-clients',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'list-clients'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlClientsRoutingModule { }
