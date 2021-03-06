import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { Veiculo } from './../veiculo.model';
import { FleetControlService } from './../fleet-control.service';

@Component({
  moduleId: module.id,
  selector: 'app-fleet-control-detail',
  templateUrl: './fleet-control-detail.component.html',
  styleUrls: ['./fleet-control-detail.component.scss']
})
export class FleetControlDetailComponent implements OnInit {

  veiculo: Veiculo;
  isNew: Boolean = true;
  maskPlaca = [/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, '-', /\d/, /\d/, /\d/, /\d/];
  maskValor = createNumberMask({
                prefix: 'R$ ',
                thousandsSeparatorSymbol: '.'
              });

  constructor(
    private fleetControlService: FleetControlService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.veiculo = new Veiculo(null,'','','','','',null);

    this.activatedRouter.params.forEach((params: Params) => {
      let placa: string = params['placa'];

      if (placa) {
        this.isNew = false;
        this.fleetControlService.find(placa)
          .then((veiculo: Veiculo) => {
            this.veiculo = veiculo;
          })
      }
    })
  }

  onSubmit(): void {
    let promise;
    if (this.veiculo.valor) {
      this.veiculo.valor = Number(this.veiculo.valor.toString().replace(/\D/g,''));
    }

    if (this.isNew) {
      promise = this.fleetControlService.create(this.veiculo);    
    } else {
      promise = this.fleetControlService.update(this.veiculo);
    }

    promise.then(veiculo => this.goBack());
  }

  resolvePlaca(placa: string): string {
    if (!placa) return '';
    return placa.substr(0, 3) + '-' + placa.substr(3);
  };

  goBack(): void {
    let link = ['fleetControl'];
    this.router.navigate(link);
  }
}
