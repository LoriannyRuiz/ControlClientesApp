import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../service/clients.service';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styles: ``
})
export class UpdatePageComponent implements OnInit {
  client: any = {};
  id: any;

  myForm!: FormGroup;
  showmessage: string = '';

  constructor(
    private http: HttpClient,
    private clientsService: ClientsService,
    private activated: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activated.params.subscribe((params) => {
      this.id = params['id'];
    this.buildForm()
    this.getClientById()
    console.log(this.id)
    })



  }

  buildForm() {
    this.myForm = new FormGroup({
      nombre: new FormControl('',[Validators.minLength(3), Validators.maxLength(50)]),
      apellido: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
      telefono: new FormControl('', Validators.required),
    });
   }



   submitForm() {

    const clientId= this.id;
console.log(clientId);
    if (this.myForm.valid) {
      const client = this.myForm.value;
      if (client.nombre && client.apellido && client.telefono) {
        this.clientsService.putClient(clientId, client).subscribe(
          () => {
            this.showmessage = 'Cliente Editado correctamente.';
            setTimeout(() => {
              this.showmessage= '';this.router.navigate(['/clients/list-clients']);
            }, 2000);



          },
          (error) => {
            // Procesar error
            this.showmessage = 'Error al editar cliente.';
            setTimeout(() => {
              this.showmessage= '';
            }, 2000);

          }
        );
      } else {
        this.showmessage = 'Por favor, complete todos los campos.';
        setTimeout(() => {
          this.showmessage= '';
        }, 2000);

      }
    } else {
      this.showmessage = 'Por favor, complete todos los campos correctamente.';
      setTimeout(() => {
        this.showmessage= '';
      }, 2000);
    }

  }

  getClientById() {
    const clientId = this.id;

    this.http.get<any>(`https://localhost:7012/api/Clientes/${clientId}`)
      .subscribe(response => {
        this.client = response;
        this.myForm.patchValue({
          nombre: this.client.nombre,
          apellido: this.client.apellido,
          telefono: this.client.telefono
        });
        console.log(response);
      });
  }
  deleteClient(){
    const clienId= this.id;

    this.clientsService.deleteClient(clienId).subscribe(response => {
        this.showmessage = 'Cliente Borrado correctamente.';
        setTimeout(() => {
          this.showmessage= '';
          this.router.navigate(['/clients/list-clients']);
        }, 1000);


    }, err => {
        console.log(err);

    })
  }



}
