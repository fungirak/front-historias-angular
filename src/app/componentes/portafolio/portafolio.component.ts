import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-portafolio',
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {
  nombreUsuario: string = "";

  constructor(private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    // Obtener el nombre de usuario de los parámetros de la URL
    this.route.params.subscribe(params => {
      this.nombreUsuario = params['nombreUsuario'];

      // Ahora puedes usar this.nombreUsuario en tu lógica
      console.log('Nombre de usuario (portafolio component):', this.nombreUsuario);
    });
  }
}
