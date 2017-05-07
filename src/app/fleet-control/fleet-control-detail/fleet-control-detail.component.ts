import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common';

import { Veiculo } from './../veiculo.model';
import { FleetControlService } from './../fleet-control.service';

@Component({
  moduleId: module.id,
  selector: 'app-fleet-control-detail',
  templateUrl: './fleet-control-detail.component.html',
  styleUrls: ['./fleet-control-detail.component.css']
})
export class FleetControlDetailComponent implements OnInit {

  veiculo: Veiculo;
  private isNew: Boolean = true;

  constructor(
    private fleetControlService: FleetControlService,
    private router: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.veiculo = new Veiculo('','','','','',0);

    this.router.params.forEach((params: Params) => {
      let placa: string = this.resolvePlaca(params['placa']);

      if (placa) {
        this.isNew = false;
        this.fleetControlService.find(placa)
          .then((veiculo: Veiculo) => {
            this.veiculo = veiculo;
            console.log(placa, veiculo);
          })
      }
    })
    
  }

  resolvePlaca = function(placa: string): string {
    if (!placa) return;
    return placa.substr(0, 3) + '-' + placa.substr(3);
  }

  goBack(): void {
    this.location.back();
  }
}
