import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientsService } from '../../service/clients.service';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})


export class NewPageComponent implements OnInit {

  myForm!: FormGroup;
  showmessage: string = '';

  constructor(
    private http: HttpClient,
    private clientsService: ClientsService,
    private router : Router,
    ) { }

  ngOnInit(): void {
    this.buildForm()
  }


   buildForm() {
    this.myForm = new FormGroup({
      nombre: new FormControl('',[Validators.minLength(3), Validators.maxLength(50)]),
      apellido: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),
      telefono: new FormControl('', Validators.required),
    });
   }

   submitForm() {
    if (this.myForm.valid) {
      const client = this.myForm.value;
      if (client.nombre && client.apellido && client.telefono) {
        this.clientsService.postClient(client).subscribe(
          () => {
            // Procesar respuesta exitosa
            this.showmessage = 'Cliente agregado correctamente.';
            setTimeout(() => {
              this.showmessage= '';this.router.navigate(['/clients/list-clients']);
            }, 3000);
          },
          (error) => {
            // Procesar error
            this.showmessage = 'Error al agregar cliente.';
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
