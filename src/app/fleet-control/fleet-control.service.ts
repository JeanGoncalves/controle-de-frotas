import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import { Observable } from 'rxjs';

import 'rxjs/add/operator/toPromise';

import { Veiculo } from "./veiculo.model";
import { VEICULOS } from "./veiculos-mock";

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

    find(id: number): Promise<Veiculo> {
        return this.findAll()
            .then((veiculos: Veiculo[]) => veiculos.find((veiculo) => veiculo.id === id));
    }

    create(veiculo: Veiculo): Promise<Veiculo> {
        return this.http
            .post(this.veiculosUrl, JSON.stringify(veiculo), {headers: this.headers})
            .toPromise()
            .then((response: Response) => response.json().data as Veiculo)
            .catch(this.handleError);
    }

    update(veiculo: Veiculo): Promise<Veiculo> {
        const url = `${this.veiculosUrl}/${veiculo.placa}`;
        
        return this.http
            .put(url, JSON.stringify(veiculo), {headers: this.headers})
            .toPromise()
            .then(() => veiculo as Veiculo)
            .catch(this.handleError);
    }

    delete(veiculo: Veiculo): Promise<Veiculo> {
        const url = `${this.veiculosUrl}/${veiculo.placa}`;
        return this.http
            .delete(url, {headers: this.headers})
            .toPromise()
            .then(() => veiculo as Veiculo)
            .catch(this.handleError);
    }

    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);
    }

    search(term: string): Observable<Veiculo[]> {
        return this.http
            .get(`${this.veiculosUrl}/?modelo=${term}`)
            .map((res: Response) => res.json().data as Veiculo[])
    }
}