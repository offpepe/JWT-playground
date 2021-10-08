const fs = require('fs').promises;

const mockPosts = [
  {
    title: 'título fake',
    content: 'conteúdo conteúdo conteúdo conteúdo conteúdo',
  },
  {
    title: 'título fake',
    content: 'conteúdo conteúdo conteúdo conteúdo conteúdo',
  },
  {
    title: 'título fake',
    content: 'conteúdo conteúdo conteúdo conteúdo conteúdo',
  },
  {
    title: 'título fake',
    content: 'conteúdo conteúdo conteúdo conteúdo conteúdo',
  },
];

module.exports = async (req, res) => {
  const token = await fs.readFile('./token.txt', 'utf-8');
  const auth = req.headers.authorization
  if(!auth || auth !== token ) return res.status(401).json({ error: { code: 401, message: 'é necessário efetuar login para fazer este tipo de operação!' } });
  res.status(200).json({ mockPosts });
};
