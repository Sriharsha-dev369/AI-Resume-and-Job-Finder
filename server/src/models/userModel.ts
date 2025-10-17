const { query } = require('../db/index');

interface userData {
    id?: number;
    name: string;
    email: string;
}
const getAllUsersService = async ()=>{
    const result = await query('SELECT * FROM users');
    return result.rows;
}

const getUserByIdService = async (id:number)=>{
    const result = await query('SELECT * FROM users WHERE id = $1',[id]);
    return result.rows[0];
}

const createUserService = async (userData: userData) => {
    const { name, email } = userData;
    const result = await query('INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *', [name, email]);
    return result.rows[0];
}

const updateUserService = async (userData: userData) => {
    const { id, name, email } = userData;
    const result = await query('UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *', [name, email, id]);
    return result.rows[0];
}

const deleteUserService = async (id:number)=>{
    const result = await query('DELETE FROM users WHERE id = $1 RETURNING *',[id]);
    return result.rows[0];
}

module.exports = { getAllUsersService, getUserByIdService, createUserService, updateUserService, deleteUserService };
