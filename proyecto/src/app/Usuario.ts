export class Usuario {
    constructor(
        public id: number,
        public nombre: string,
        public email: string,
        public contrasena: string,
        public token: string,
        public tipo: number,
        public subs: number[]
    ){}
}
