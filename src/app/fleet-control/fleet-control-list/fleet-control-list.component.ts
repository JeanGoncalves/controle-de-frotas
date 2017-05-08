import { Component, OnInit } from '@angular/core';

import { Veiculo } from './../veiculo.model';
import { FleetControlService } from "./../fleet-control.service";
import { DialogService } from './../../dialog.service';

@Component({
  moduleId: module.id,
  selector: 'app-fleet-control-list',
  templateUrl: './fleet-control-list.component.html',
  styleUrls: ['./fleet-control-list.component.css']
})
export class FleetControlListComponent implements OnInit {

  veiculos: Veiculo[] = [];
  checkboxHead: boolean = false;
  hasCheckboxChecked: boolean = false;

  constructor(
    private fleetControlService: FleetControlService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    
    this.fleetControlService.findAll()
            .then((veiculos: Veiculo[]) => {
                this.veiculos = veiculos;
            })
            .catch(err => {
                console.error(err);
            });
  }

  onChangeCbxAll(): void {
    this.veiculos.map((veiculo: Veiculo) => veiculo.checked = this.checkboxHead);
    this.changeCheckbox();
  }

  onChangeCbx(): void {
    this.changeCheckbox();
  }

  private changeCheckbox(): void {
    this.hasCheckboxChecked = false;
    this.veiculos.forEach((veiculo: Veiculo) => {
      if (veiculo.checked) this.hasCheckboxChecked = true;
      if (!veiculo.checked) this.checkboxHead = false;
    })
  }

  onDelete(): void {
    let veiculosToRemove = this.veiculos.filter((veiculo: Veiculo) => veiculo.checked === true);
    this.dialogService.confirm('Deseja deletar o(s) ' + veiculosToRemove.length + ' Veículo(s) ?')
        .then((canDelete: boolean) => {
            if (canDelete) {
                veiculosToRemove.forEach((veiculo: Veiculo) => {
                  this.fleetControlService
                      .delete(veiculo)
                      .then(() => {
                          this.veiculos = this.veiculos.filter(v => v.placa !== veiculo.placa);
                          this.hasCheckboxChecked = false;
                          this.checkboxHead = false;
                      })
                });
            }
        });
  }

  resolvePlaca(veiculo: Veiculo): string {
    return veiculo.placa.replace('-', '');
  }
}
