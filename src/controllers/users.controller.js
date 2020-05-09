const { Pool } = require('pg');

const pool  = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'api',
    port: '5434'

});


const getUsers = async (req, res) =>{
    // res.send('users');

    const response = await pool.query('SELECT * FROM tb_users');
    res.status(200).json(response.rows);

    //mostrar por consola los usuarios
    //console.log(response.rows);
    //res.send('users');
};

const getUsersById = async (req, res) => {
    //res.send('user by id ' + req.params.id); 
    const id = req.params.id;
    const response = await pool.query('SELECT * FROM tb_users WHERE id_user = $1', [id]);
    res.status(404).json(response.rows);
    //console.log(response.rows);
}

const createUser = async (req, res) => {
    const { your_name, gender, date_birthday, email_address, password } = req.body;

    const response = await pool.query('INSERT INTO tb_users (your_name, gender, date_birthday, email_address, password, created_at) VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)', [your_name, gender, date_birthday, email_address, password ]);
    console.log(response);
    res.send('User created');
    res.json({
        message: 'usuario agregado satisfactoriamente', 
        body: {
            user: {your_name, gender, date_birthday, email_address, password}
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
    getUsers,
    getUsersById,
    createUser,
    updateUser, 
    deleteUser
}