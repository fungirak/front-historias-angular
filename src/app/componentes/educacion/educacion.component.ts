import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { PortafolioService } from '../../services/portafolio.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  miPortafolio:any;
  modoEdicion: boolean = false;
  modoNuevoRegistro: boolean = false;
  i! : number ;
  editID! : number;
  form: UntypedFormGroup;
  nombreUsuario: string = "";




  constructor(public datosPortafolio: PortafolioService, private route: ActivatedRoute) {
    this.form= new UntypedFormGroup({
     detalles: new UntypedFormControl(['', [Validators.required, Validators.minLength(2)]]),
     estado: new UntypedFormControl(['', [Validators.required, Validators.minLength(2)]]),
     institucion: new UntypedFormControl(['', [Validators.required, Validators.minLength(2)]]),
     fechaInicio: new UntypedFormControl(['', [Validators.required, Validators.minLength(2)]]),
     fechaFinalizacion: new UntypedFormControl(['', [Validators.required, Validators.minLength(2)]]),
     titulo: new UntypedFormControl(['', [Validators.required, Validators.minLength(2)]])

    })

   }





  ngOnInit(): void {

     // Obtener el nombre de usuario de los parámetros de la URL
     this.route.params.subscribe(params => {
      this.nombreUsuario = params['nombreUsuario'];

      // Ahora puedes usar this.nombreUsuario en tu lógica
      console.log('Nombre de usuario (acerca_de component):', this.nombreUsuario);
    });


    this.datosPortafolio.obtenerDatosEducacion(this.nombreUsuario).subscribe(data => {
      console.log("Datos Personales: " + JSON.stringify(data));
      this.miPortafolio=data;
      console.log("data: ",data);
      console.log("miPortafolio", this.miPortafolio);
    });

  }




  onCrear(event: Event){
    let objetoFormulario = this.form.controls;
    let keysForms =  Object.keys(objetoFormulario);
    console.log("keysForm: ", keysForms);
    let valueForms = Object.values(objetoFormulario);
    console.log("valuesForm: ", valueForms);

    valueForms[0].setValue('');
    valueForms[1].setValue('');
    valueForms[2].setValue('');
    valueForms[3].setValue('');
    valueForms[4].setValue('');

    console.log("valueFormDetalles: ", valueForms[0].value );
    console.log("valueFormEstado: ", valueForms[1].value );
    console.log("valueFormInstitucion: ", valueForms[2].value );
    console.log("valueFormFechaInicio: ", valueForms[3].value );
    console.log("valueFormFechaFinalizacion: ", valueForms[4].value );
    console.log("valueFormTitulo: ", valueForms[5].value );

    this.modoNuevoRegistro=true;

  }



  onEdit(id: any, i: number,  event: Event ){
    this.editID = id;
    this.i= i;
    console.log("i", i);
    console.log("editID", this.editID);
    console.log("this.form.value: " , this.form.value);
    console.log("id: " , id);

    this.form.setValue({
      detalles: this.miPortafolio[i].detalles,
      estado: this.miPortafolio[i].estado,
      institucion: this.miPortafolio[i].institucion,
      fechaInicio: this.miPortafolio[i].fechaInicio,
      fechaFinalizacion: this.miPortafolio[i].fechaFinalizacion,
      titulo: this.miPortafolio[i].titulo
    })

    console.log("this.form.value: " , this.form.value);



    this.modoEdicion = true;


  }



  onSaveEdit( event: Event ){
    event.preventDefault;
    this.datosPortafolio.putEducacion(this.form.value, this.editID).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("id: " , this.editID);
      console.log("EDUCACIÓN method PUT Data Editada", data);

      this.datosPortafolio.obtenerOneDatosEducacion(this.editID).subscribe(data => {
        console.log("Dato: " + JSON.stringify(data));
        this.miPortafolio[this.i]=data;
        console.log("miPortafolio[i : ", this.miPortafolio[this.i]);
      });

    });
    this.modoEdicion = false;

  }



  onSaveNewNuevoRegistro(event: Event ){
    event.preventDefault;
    this.datosPortafolio.postEducacion(this.form.value).subscribe(data => {
      console.log("this.form.value: " , this.form.value);
      console.log("AcercaDe method post Data", data);

      this.datosPortafolio.obtenerDatosEducacion(this.nombreUsuario).subscribe(data => {
        this.miPortafolio=data;
      });
    });

    this.modoNuevoRegistro=false;
  }



  onDelete( i:number, event: Event ){
    this.i = i;
    this.modoEdicion = false;
    event.preventDefault;
    Swal.fire({
      title: `¿ELIMINAR EDUCACIÓN ${(this.miPortafolio[i].titulo).toUpperCase() }?`,
      text: "No podrá revertir los cambios.",
      icon: 'warning',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar.',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#00b5ff'
    }).then((result) => {
      if (result.isConfirmed) {
        this.datosPortafolio.deleteEducacion(this.miPortafolio[i].id).subscribe(data => {
          console.log("Borrando registro", data);

          this.datosPortafolio.obtenerDatosEducacion(this.nombreUsuario).subscribe(data => {
            this.miPortafolio=data;
          });

          });
        Swal.fire({
          title: 'ITEM ELIMINADO',
          icon: 'success',
          showConfirmButton: false,
          timer: 1000
        })
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
    valueForms[3].setValue('');
    valueForms[4].setValue('');

    console.log("valueFormDetalles: ", valueForms[0].value );
    console.log("valueFormEstado: ", valueForms[1].value );
    console.log("valueFormInstitucion: ", valueForms[2].value );
    console.log("valueFormFechaInicio: ", valueForms[3].value );
    console.log("valueFormFechaFinalizacion: ", valueForms[4].value );
    console.log("valueFormTitulo: ", valueForms[5].value );


    this.modoEdicion= false;
  }


}
