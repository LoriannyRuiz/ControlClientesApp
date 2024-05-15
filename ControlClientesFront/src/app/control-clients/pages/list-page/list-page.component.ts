import { Component } from '@angular/core';
import { ClientsService } from '../../service/clients.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent {

  clients: any[] = [];

  constructor(private clientsService: ClientsService) { }

  ngOnInit() {
    this.clientsService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });
  }
}
