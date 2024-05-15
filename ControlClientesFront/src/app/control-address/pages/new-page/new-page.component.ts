import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '../../service/address.service';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  myForm!: FormGroup;
  showmessage: string = '';
  id: any;

  constructor(
    private http: HttpClient,
    private AddressService: AddressService,
    private activated: ActivatedRoute,
    private router : Router,
    ) { }

  ngOnInit(): void {
    this.activated.params.subscribe((params) => {
      this.id = params['id']});
    this.buildForm()

  }


   buildForm() {
    this.myForm = new FormGroup({
      clienteId: new FormControl(this.id),
      calle: new FormControl('',[Validators.minLength(3), Validators.maxLength(50)]),
      ciudad: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),

    });

   }

   submitForm() {
    const clientId = this.id;
    if (this.myForm.valid) {
      const address = this.myForm.value;
      console.log(clientId)
      console.log(address)
      if (address.clienteId && address.calle && address.ciudad) {
        this.AddressService.postAddress(this.id , address).subscribe(
          () => {
            // Procesar respuesta exitosa
            this.showmessage = 'Direccion agregada correctamente.';
            setTimeout(() => {
              this.showmessage= '';this.router.navigate(['/address/list-address/'+this.id]);
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
}
