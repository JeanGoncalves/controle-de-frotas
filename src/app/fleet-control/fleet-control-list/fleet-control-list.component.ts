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
  _veiculos: Veiculo[] = [];

  checkboxHead: boolean = false;
  hasCheckboxChecked: boolean = false;

  // pagination
  pageNow: number = 1;
  pagination: any[] = [];

  /**
   * elements per page 
   **/
  perPage: number = 5

  constructor(
    private fleetControlService: FleetControlService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    
    this.fleetControlService.findAll()
        .then((veiculos: Veiculo[]) => {
            this.createPagination(veiculos);
            this._veiculos = veiculos;

            this.veiculos = veiculos.slice(0, this.perPage);
        })
        .catch(err => {
            console.error(err);
        });
      
  }

  onChangeCbxAll(): void {
    this.veiculos.map((veiculo: Veiculo) => veiculo.checked = this.checkboxHead);
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

  onSearch(term: any): void {
      this.fleetControlService.search(term.value)
          .then((veiculos: Veiculo[]) => {
              this.createPagination(veiculos);
              this._veiculos = veiculos;
              this.veiculos = veiculos.slice(0, this.perPage);
              this.pageNow = 1;
          })
          .catch(err => {
              console.error(err);
          });
  }

  private createPagination(veiculos: Veiculo[]): void {
    let count = veiculos.length;
    this.pagination = [];
    for(let i = 1; i <= Math.ceil(count / this.perPage); i++) {
      this.pagination.push(i);
    }
  }

  onChangePage(page: number): void {
    this.veiculos = this._veiculos.slice((page - 1) * this.perPage, this.perPage * page);
    this.pageNow = page;
    this.checkboxHead = false;
    this.onChangeCbxAll();
  }

  private resolvePlaca(veiculo: Veiculo): string {
    return veiculo.placa.replace('-', '');
  }
}
