
class Usuario{

    constructor(carnet, nombre, apellidos, genero, facultad, carrera, correo, contraseña){
        this.carnet = carnet;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.genero = genero;
        this.facultad = facultad;
        this.carrera = carrera;
        this.correo = correo;
        this.contraseña = contraseña;
    }   
}

module.exports = Usuario;