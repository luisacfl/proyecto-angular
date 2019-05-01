
export class Usuario {
    constructor(
        public id: number,
        public nombre: string,
        public apellido: string,
        public usuario: string, 
        public correo: string,
        public contrasena: string,
        public tipo: number //0 - admin, 1 - organizacion, 2 - afiliado, 3 - interesado
    ) { }
}