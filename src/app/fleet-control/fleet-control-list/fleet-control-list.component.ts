import { Component, OnInit } from '@angular/core';

import { Veiculo } from './../veiculo.model';
import { FleetControlService } from "./../fleet-control.service";
import { DialogService } from './../../dialog.service';

@Component({
  moduleId: module.id,
  selector: 'app-fleet-control-list',
  templateUrl: './fleet-control-list.component.html',
  styleUrls: ['./fleet-control-list.component.scss']
})
export class FleetControlListComponent implements OnInit {

  veiculos: Veiculo[] = [];
  _veiculos: Veiculo[] = [];

  checkboxHead: boolean = false;
  hasCheckboxChecked: boolean = false;

  // pagination

	/**
	 * Page in exibition in list
	 */
  pageNow: number = 1;

	/**
	 * Array with pages for pagination
	 */
  pagination: any[] = [];

  /**
   * Elements per page 
   **/
  perPage: number = 5

	/**
	 * Elements in pagination
	 */
	pagesInPagination: number = 5;

	/**
	 * Total Pages
	 * Ps.: Generate on init
	 */
	totalPages: number = 0;

  constructor(
    private fleetControlService: FleetControlService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    
    this.fleetControlService.findAll()
        .then((veiculos: Veiculo[]) => {
            this._veiculos = veiculos;
            this.veiculos = veiculos.slice(0, this.perPage);
						this.totalPages = Math.ceil(veiculos.length / this.perPage);
            this.createPagination();
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
              this._veiculos = veiculos;
              this.veiculos = veiculos.slice(0, this.perPage);
              this.pageNow = 1;
              this.createPagination();
              this.onChangeCbxAll();
          })
          .catch(err => {
              console.error(err);
          });
  }

  private createPagination(): void {
    this.pagination = [];
    for(let i = 1; i <= this.totalPages; i++) {
			this.pagination.push(i);
    }

		if (this.pagination.length > this.pagesInPagination) {
			let index = this.pagination.indexOf(this.pageNow) - Math.floor(this.pagesInPagination/2);
			if (index < 0) {
				index = 0;
			}
			
			let lastIndex = this.pagination.length - this.pagesInPagination;
			if (index > lastIndex) {
				index = lastIndex;
			}

			this.pagination = this.pagination.splice(index, this.pagesInPagination);
		}
  }

  onChangePage(page: number): void {
    this.veiculos = this._veiculos.slice((page - 1) * this.perPage, this.perPage * page);
    this.pageNow = page;
    this.checkboxHead = false;
		this.createPagination();
    this.onChangeCbxAll();
  }

  private resolvePlaca(veiculo: Veiculo): string {
    return veiculo.placa.replace('-', '');
  }
}
