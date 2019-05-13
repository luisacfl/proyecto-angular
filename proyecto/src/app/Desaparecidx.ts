export class Desaparecidx {
    constructor(
        public id: string,
        public prim_nombre: string,
        public seg_nombre: string,
        public apellido_pat: string,
        public apellido_mat: string,
        public fuerocomun_complexion: string,
        public fuerocomun_dependencia: string,
        public fuerocomun_desapentidad: string,
        public fuerocomun_desapfecha: string,
        public fuerocomun_desaphora: string,
        public fuerocomun_desaplocalidad: string,
        public fuerocomun_desapmunicipio: string,
        public fuerocomun_desappais: string,
        public fuerocomun_descripcion: string,
        public fuerocomun_discapacidad: string,
        public fuerocomun_edad: number,
        public fuerocomun_estatura: string,
        public fuerocomun_etnia: string,
        public fuerocomun_nacionalidad: string,
        public fuerocomun_sexo: string,
        public status: string, //asumir que update es desaparecido y delete es encontrado
        public duplicado: number,
        public lat: number, //Lat y long son solo para el mapa, no poner en detalle
        public long: number,
        public img: string
    ) { }
}
