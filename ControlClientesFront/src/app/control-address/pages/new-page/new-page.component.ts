import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '../../service/address.service';
import { ClientsService } from '../../../control-clients/service/clients.service';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  clientes: any[] = [];
  myForm!: FormGroup;
  showmessage: string = '';

  constructor(
    private http: HttpClient,
    private AddressService: AddressService,
    private activated: ActivatedRoute,
    private router : Router,
    private clientsService: ClientsService
    ) { }

  ngOnInit(): void {
    this.clientsService.getAllClients().subscribe(clients => {
      this.clientes = clients;
      console.log(this.clientes);
    });
    this.buildForm()

  }


   buildForm() {
    this.myForm = new FormGroup({
      clienteId: new FormControl(''),
      calle: new FormControl('',[Validators.minLength(3), Validators.maxLength(50)]),
      ciudad: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),

    });

   }

   submitForm() {
    const clientId = this.myForm.value.clienteId;
    if (this.myForm.valid) {
      const address = this.myForm.value;
      console.log(address)
      if (address.clienteId && address.calle && address.ciudad) {
        this.AddressService.postAddress( address, address).subscribe(
          () => {
            // Procesar respuesta exitosa
            this.showmessage = 'Direccion agregada correctamente.';
            setTimeout(() => {
              this.showmessage= '';//this.router.navigate(['/address/list-address/'+this.id]);
            }, 3000);
          },
          (error) => {
            // Procesar error
            this.showmessage = 'Error al agregar direccion.';
            setTimeout(() => {
              this.showmessage= '';
            }, 3000);
          }
        );
      } else {
        this.showmessage = 'Por favor, complete todos los campos.';
        setTimeout(() => {
          this.showmessage= '';
        }, 3000);
      }
    } else {
      this.showmessage = 'Por favor, complete todos los campos correctamente.';
      setTimeout(() => {
        this.showmessage= '';
      }, 3000);
    }

  }

  goBack(){
    this.router.navigate(['/clients/list-clients']);
  }
}
