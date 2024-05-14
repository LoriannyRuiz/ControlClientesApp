import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'address',
    loadChildren: () => import('./control-address/control-address.module').then(m => m.ControlAddressModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./control-clients/control-clients.module').then(m => m.ControlClientsModule)
  },
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
