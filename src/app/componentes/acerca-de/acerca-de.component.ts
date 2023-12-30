import { Component, OnInit, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IAcercaDe } from '../../interfaces/iacercade';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  miPortafolio: any ;
  modoEdicion: boolean = false;
  modoNuevoRegistro: boolean = false;
  form: UntypedFormGroup;
  alertaDelete: string = "¿Eliminar información AcercaDe?";
  nombreUsuario: string = "";



  constructor(public datosPortafolio: PortafolioService, private formBuilder: UntypedFormBuilder, private route: ActivatedRoute)  {
    this.form= new UntypedFormGroup({
      fullname: new UntypedFormControl([ '', [Validators.required, Validators.minLength(2)]]),
      posicion: new UntypedFormControl(['', [Validators.required, Validators.minLength(2)]]),
      descripcion: new UntypedFormControl(['', [Validators.required, Validators.minLength(2)]])
    })
   }

  ngOnInit(): void {

     // Obtener el nombre de usuario de los parámetros de la URL
     this.route.params.subscribe(params => {
      this.nombreUsuario = params['nombreUsuario'];

      // Ahora puedes usar this.nombreUsuario en tu lógica
      console.log('Nombre de usuario (acerca_de component):', this.nombreUsuario);
    });


    this.datosPortafolio.obtenerDatosAcercaDe(this.nombreUsuario).subscribe(data => {
      this.miPortafolio=data;
      console.log("mi porta", this.miPortafolio)
      if(this.miPortafolio===undefined){
        this.datosPortafolio.postAcercaDe(this.form.value).subscribe(data => {
          console.log(data);
        });

      this.datosPortafolio.obtenerDatosAcercaDe(this.nombreUsuario).subscribe(data => {
        this.miPortafolio=data;
      });

      }
    })
  }

  onCrear(event: Event){
    this.modoNuevoRegistro=true;

  }


  onEdit(id: any, event: Event ){

    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);

    this.form.setValue({
     fullname: this.miPortafolio.fullname,
      posicion: this.miPortafolio.posicion,
      descripcion: this.miPortafolio.descripcion
    })

    console.log("this.form.value: " , this.form.value);



    this.modoEdicion = true;
  }

  onSaveEdit( id: any, event: Event ){
    event.preventDefault;
    this.datosPortafolio.putAcercaDe(this.form.value, id).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method PUT Data", data);

      this.datosPortafolio.obtenerDatosAcercaDe(this.nombreUsuario).subscribe(data => {
        const dataArray = Array.isArray(data) ? data : [data];
        if (dataArray.length > 0) {
          this.miPortafolio = dataArray[0];
        } else {
          return this.miPortafolio;
        }

      });

    this.modoEdicion=false;
    });
  }

  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postAcercaDe(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);
    this.modoNuevoRegistro=false;
    });

    this.datosPortafolio.obtenerDatosAcercaDe(this.nombreUsuario).subscribe(data => {
      this.miPortafolio=data;
    });
  }

  onDelete(id: any,event: Event ){
    this.modoEdicion=false;
    event.preventDefault;
    Swal.fire({
      title: '¿Desea Eliminar la información Acerca De?',
      text: "No podrá revertir los cambios.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'ELIMINAR'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosPortafolio.deleteAcercaDe(id).subscribe(data => {
          console.log("Borrando registro", data);

          this.datosPortafolio.obtenerDatosAcercaDe(this.nombreUsuario).subscribe(data => {
            this.miPortafolio=data;
          });

          });


        Swal.fire(
          'ELIMINADO',
          'La Información Acerca De ha sido eliminada con éxito.',
          'success'
        )
      }
    })

  }

  onCancelNuevoRegistro(){
    this.modoNuevoRegistro=false;
  }

  onCancel(event: Event){

    let objetoFormulario = this.form.controls;
    let keysForms =  Object.keys(objetoFormulario);
    console.log("keysForm: ", keysForms);
    let valueForms = Object.values(objetoFormulario);
    console.log("valuesForm: ", valueForms);

    valueForms[0].setValue('');
    valueForms[1].setValue('');
    valueForms[2].setValue('');

    console.log("valueFormDetalles: ", valueForms[0].value );
    console.log("valueFormEstado: ", valueForms[1].value );
    console.log("valueFormInstitucion: ", valueForms[2].value );

    this.modoEdicion= false;

  }

}
