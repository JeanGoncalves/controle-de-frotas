export class Veiculo {

    constructor (
        public combustivel: string,
        public imagem: string,
        public marca: string,
        public modelo: string,
        public placa: string,
        public valor: number,

        public checked?: boolean
    ) {}
}
