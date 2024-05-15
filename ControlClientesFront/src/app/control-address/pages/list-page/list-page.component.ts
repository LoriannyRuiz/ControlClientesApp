import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../service/address.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent implements OnInit {

  address: any[] = [];

  id: any;

  constructor(
    private AddressService: AddressService,
    private http: HttpClient,
    private activated: ActivatedRoute,
    private router: Router

  ) {

   }
  ngOnInit() {
    this.activated.params.subscribe((params) => {
      this.id = params['id']});

    const clientId= this.id;
console.log(this.address)

    this.AddressService.getAllAddress(clientId).subscribe(clients => {
      this.address = clients;
    });
  }

  

}
