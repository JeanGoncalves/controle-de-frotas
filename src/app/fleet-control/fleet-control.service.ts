import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';

import { Veiculo } from "./veiculo.model";

@Injectable()
export class FleetControlService {

    private veiculosUrl: string = 'app/veiculos';
    private headers: Headers = new Headers({'Content-type': 'application/json'});

    constructor(
        private http: Http
    ) {}
    
    findAll(): Promise<Veiculo[]> {
        return this.http.get(this.veiculosUrl)
            .toPromise()
            .then(response => response.json().data as Veiculo[])
            .catch(this.handleError);
    }

    find(placa: string): Promise<Veiculo> {
        return this.findAll()
            .then((veiculos: Veiculo[]) => veiculos.find((veiculo) => veiculo.placa === placa));
    }

    create(veiculo: Veiculo): Promise<Veiculo> {
        // generate primary key Test Ambiance
        this.findAll().then(data => veiculo.id = data.length);
        
        return this.http
            .post(this.veiculosUrl, JSON.stringify(veiculo), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Veiculo)
            .catch(this.handleError);
    }

    update(veiculo: Veiculo): Promise<Veiculo> {
        const url = `${this.veiculosUrl}/${veiculo.id}`;
        
        return this.http
            .put(url, JSON.stringify(veiculo), {headers: this.headers})
            .toPromise()
            .then(() => veiculo as Veiculo)
            .catch(this.handleError);
    }

    delete(veiculo: Veiculo): Promise<Veiculo> {
        const url = `${this.veiculosUrl}/${veiculo.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => veiculo as Veiculo)
            .catch(this.handleError);
    }

    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }

    search(term: string): Promise<Veiculo[]> {
        return this.findAll()
            .then((veiculos: Veiculo[]) => veiculos.filter((veiculo: Veiculo) => veiculo.marca.toUpperCase().indexOf(term.toUpperCase()) !== -1 || veiculo.combustivel.toUpperCase().indexOf(term.toUpperCase()) !== -1));
    }

    replacePlaca(veiculo: Veiculo): string {
        return veiculo.placa.replace('-', '');
    }
}