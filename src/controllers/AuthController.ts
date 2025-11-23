import { Request, Response, NextFunction } from 'express';

// --- DEFINIÇÕES SIMPLES DE USUÁRIO E SENHA ---
// Em um projeto real, isso viria de um banco de dados!
const USUARIO_ADMIN = 'Rodthedog';
const SENHA_ADMIN = 'bigdog';

// --- LÓGICA DO LOGIN (POST) ---
export const handleLogin = (req: Request, res: Response) => {
  // 1. Pega o usuário e senha enviados pelo formulário
  const { username, password } = req.body;

  // 2. Verifica se batem com nossas definições
  if (username === USUARIO_ADMIN && password === SENHA_ADMIN) {
    // 3. Login CORRETO! Marca o usuário como logado na SESSÃO.
    //    O 'req.session' só existe porque configuramos o 'express-session' no server.ts
    //    Precisamos adicionar uma definição de tipo para 'isAdmin' (próximo passo)
    req.session.isAdmin = true; 

    // 4. Redireciona para a página de gerenciamento de projetos
    res.redirect('/admin/projetos');
  } else {
    // 5. Login INCORRETO! Renderiza a página de login novamente,
    //    passando uma mensagem de erro para o EJS.
    res.render('login', { 
      erro: 'Usuário ou senha inválidos.' 
    });
  }
};

// --- LÓGICA DO LOGOUT (Será usada depois) ---
export const handleLogout = (req: Request, res: Response) => {
  // Destrói a sessão
  req.session.destroy((err) => {
    if (err) {
      console.error("Erro ao fazer logout:", err);
      return res.redirect('/'); // Ou para uma página de erro
    }
    // Redireciona para a página inicial após o logout
    res.redirect('/'); 
  });
};

// --- MIDDLEWARE DE PROTEÇÃO DE ROTAS ---
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  // 1. Verifica se a sessão existe E se o usuário está marcado como admin
  if (req.session && req.session.isAdmin) {
    // 2. Se SIM: Deixa passar para a próxima função (o controlador da rota)
    next(); 
  } else {
    // 3. Se NÃO: Redireciona o usuário de volta para a página de login
    res.redirect('/admin'); 
  }
};