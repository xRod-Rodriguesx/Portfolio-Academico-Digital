// Importa o "Express" -> Objetivo de criar servidor 
import express from 'express';
import mainRoutes from './routes/index';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import connection from './database/connection';


// Cria o nosso aplicativo (o servidor em si) e a porta
const app = express();
const PORTA = 3000;

// Configura o EJS como a engine de visualização
app.set('view engine', 'ejs');
app.set('views', './views');

// Habilita o Express para ler dados vindos de formulários
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Habilita o Express para ler JSON

// Configuração do middleware de sessão
app.use(cookieParser());

app.use(session({
  secret: 'keySecreratcrazyuhutra', // Troque por uma frase aleatória longa
  resave: false,                 // Não salva a sessão se não houver mudanças
  saveUninitialized: false,      // Não cria sessão para quem não logou
  cookie: { secure: false }      // 'false' para HTTP (desenvolvimento), 'true' para HTTPS (produção)
}));

// Define a pasta 'public' como o local dos arquivos estáticos (CSS, JS, Imagens)
app.use(express.static('public'));

//Direciona para utilizar as rotas dos arquivos importados
app.use(mainRoutes);

// Middleware para tratar rotas não encontradas (404)
app.use((req, res) => {
  res.status(404).send('Página não encontrada!');
});

// Teste de Conexão com o Banco de Dados
connection.getConnection()
    .then((conn) => {
        console.log('✅ Conexão com o MySQL estabelecida com sucesso!');
        conn.release(); // Libera a conexão de volta para o pool
    })
    .catch((err) => {
        console.error('❌ Falha ao conectar no MySQL:', err.message);
        console.error('Verifique se o XAMPP/MySQL está rodando e se as credenciais no arquivo connection.ts estão corretas.');
    });

// Turn Server On
app.listen(PORTA, () => {
  console.log(`Servidor rodando com sucesso na porta ${PORTA}!`);
  console.log(`Acesse http://localhost:${PORTA}`);
});