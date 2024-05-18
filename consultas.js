import pool from './config/db.js';

//Agregar un nuevo estudiante
const argumentos = process.argv.slice(2);
const opcion = argumentos[0];
let nombre = argumentos[1];
let rut = argumentos[2];
let curso = argumentos[3];
let nivel = argumentos[4];

const agregar = async() => {
    try {
        
        const text = 'INSERT INTO estudiantes(nombre,rut,curso,nivel) values ($1, $2, $3, $4) RETURNING *';
        const values = [nombre,rut,curso,nivel];
        const res = await pool.query(text, values);
        console.log(`El estudiante ${nombre} fue agregado Correctamente`);
    } catch (error) {
        console.log(error);
    }
}

//Consultar estudiantes registrados
const mostrar = async() => {
    try {
        const text = 'SELECT * FROM estudiantes';
        const {rows} = await pool.query(text);
        console.log('Registro actual:', rows);
    } catch (error) {
        console.log(error);
    }
}

//Consultar estudiantes por rut
const consultaRut = async() => {
    try {
        const text = 'SELECT * FROM estudiantes WHERE rut = $1';
        const values = [rut];
        const res = await pool.query(text, values);
        console.log(res.rows);
    } catch (error) {
        console.log(error.message);
    }
}

//Editar estudiante

const editar = async() => {
    try {
        const text = 'UPDATE estudiantes SET nombre = $1, rut = $2, curso = $3, nivel = $4 WHERE rut = $2 RETURNING *';
        const values = [nombre,rut,curso,nivel];
        const res = await pool.query(text, values);
        console.log(`El estudiante ${nombre} fue editado Correctamente`);
    } catch (error) {
        console.log(error);
    }
}

//Eliminar estudiante
const eliminar = async () => {
    try {
      const text = "delete from estudiantes where rut = $1";
      const values = [rut];
      const response = await pool.query(text, values);
      console.log(
        `Registro de estudiante con RUT ${rut} eliminado correctamente`
      );
    } catch (error) {
      console.log(error.message);
    }
  };
//Ejecutar consultas en base de datos
if (opcion === 'agregar') {
    agregar();
} else if (opcion === 'mostrar') {
    mostrar();
} else if (opcion === 'consulta') {
    consultaRut();
} else if (opcion === 'editar') {
    editar();
} else if (opcion === 'eliminar') {
    rut = argumentos[1];
    eliminar();
}