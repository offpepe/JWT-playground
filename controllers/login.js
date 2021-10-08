const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;

const secret = 'didthoughtiwasasecretbutitsmeDIO';

const jwtconfig = {
  expiresIn: '3d',
  algorithm: 'HS256'
}


module.exports = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password)
    return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });
    
    const user = await User.findUser(username);
    
    if (!user || user.password !== password)
    return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });
    
  const token = jwt.sign({ user: username }, secret, jwtconfig);
  await fs.writeFile('./token.txt', token);
  return res.status(200).json({ message: 'Login efetuado com sucesso', token});
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
