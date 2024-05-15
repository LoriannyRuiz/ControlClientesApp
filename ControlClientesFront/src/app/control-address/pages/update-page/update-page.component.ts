import { Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from '../../service/address.service';

@Component({
  selector: 'app-update-page',
  templateUrl: './update-page.component.html',
  styles: ``
})
export class UpdatePageComponent {

  address: any = {};
  id: any;
  id2:any;

  myForm!: FormGroup;
  showmessage: string = '';

  constructor(
    private http: HttpClient,
    private AddressService: AddressService,
    private activated: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activated.params.subscribe((params) => {
      this.id = params['id'];
    this.buildForm()
    this.getfactById()
    console.log(this.id)
    })



  }

  buildForm() {
    this.myForm = new FormGroup({
      clienteId: new FormControl(this.id),
      calle: new FormControl('',[Validators.minLength(3), Validators.maxLength(50)]),
      ciudad: new FormControl('', [Validators.minLength(3), Validators.maxLength(50)]),

    });
   }



   submitForm() {

    const factId= this.id;
console.log(factId);
    if (this.myForm.valid) {
      const client = this.myForm.value;
      if (client.clienteId && client.calle && client.ciudad) {
        this.AddressService.putAddress(factId, client).subscribe(
          () => {
            this.showmessage = 'Cliente Editado correctamente.';
            setTimeout(() => {
              this.showmessage= '';this.router.navigate(['/address/list-address/'+this.id2]);
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

  getfactById() {
    const clientId = this.id;

    this.http.get<any>(`https://localhost:7012/api/Direcciones/${clientId}`)
      .subscribe(response => {
        this.address = response;
        this.myForm.patchValue({
          calle: this.address.calle,
          ciudad: this.address.ciudad
        });
        const cliente = (this.address.clienteId);
        this.id2 = cliente;
      });
  }
  deleteAddress(){
    const clienId= this.id;

    this.AddressService.deleteAddress(clienId).subscribe(response => {
        this.showmessage = 'Cliente Borrado correctamente.';
        setTimeout(() => {
          this.showmessage= '';this.router.navigate(['/address/list-address/'+this.id2]);

        }, 1000);


    }, err => {
        console.log(err);

    })
  }

  goBack(){
    this.router.navigate(['/address/list-address/'+this.id2]);
  }

}
