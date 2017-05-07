import { Component, OnInit } from '@angular/core';

import { Veiculo } from './../veiculo.model';
import { FleetControlService } from "./../fleet-control.service";

@Component({
  moduleId: module.id,
  selector: 'app-fleet-control-list',
  templateUrl: './fleet-control-list.component.html',
  styleUrls: ['./fleet-control-list.component.css']
})
export class FleetControlListComponent implements OnInit {

  veiculos: Veiculo[] = [];

  constructor(private fleetControlService: FleetControlService) { }

  ngOnInit() {
    
    this.fleetControlService.findAll()
            .then((veiculos: Veiculo[]) => {
                this.veiculos = veiculos;
            })
            .catch(err => {
                console.error(err);
            });    
  }

  

}
