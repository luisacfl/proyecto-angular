export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public contrasena: string,
        public token: string,
        public tipo: number,
        public seguidos: Array<String>
    ){}
}
