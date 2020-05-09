const { Pool } = require('pg');

const pool  = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'api',
    port: '5434'

});


const getAplicaciones = async (req, res) =>{
    // res.send('users');

    const response = await pool.query('SELECT * FROM tb_aplicacion');
    res.status(200).json(response.rows);

    //mostrar por consola los usuarios
    //console.log(response.rows);
    //res.send('users');
};

const getAplicaionById = async (req, res) => {
    //res.send('user by id ' + req.params.id); 
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM tb_aplicacion WHERE id_app = $1', [id]);
    res.status(202).json(response.rows);
    //console.log(response.rows);
}

const createAplicacion = async (req, res) => {
    const { nombre_app, descripcion_app, url_app } = req.body;

    const response = await pool.query('INSERT INTO tb_aplicacion (nombre_app, descripcion_app, url_app) VALUES ($1, $2, $3)', [nombre_app, descripcion_app, url_app]);
    console.log(response);
    res.send('aplication created');
    res.json({
        message: 'aplicacion agregado satisfactoriamente', 
        body: {
            user: {nombre_app, descripcion_app, url_app}
        }
    });
};

const updateUser = async (req, res) =>{
    const id = req.params.id;
    const {name, email } = req.body;
    
    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name, email, id
    ]);
    console.log(response);
    res.json(response.rows);
    
    //console.log(id, name, email);
    //res.send('user updated');
}

const deleteUser = async (req, res) =>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM users WHERE id = $1', [id]);
    console.log(response);
    res.status(200).json(response.rows);
}

module.exports = {
    getAplicaciones,
    getAplicaionById,
    createAplicacion,
    updateUser, 
    deleteUser
}