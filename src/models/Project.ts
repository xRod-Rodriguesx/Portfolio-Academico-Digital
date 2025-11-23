import fs from 'fs'; // 1. Importa o módulo 'fs' (File System) do Node.js
import path from 'path'; // 2. Importa o módulo 'path' para lidar com caminhos de arquivo

// 3. Define o caminho para nosso arquivo JSON
// path.resolve garante que o caminho funcione em qualquer sistema operacional
const dataFilePath = path.resolve(__dirname, '..', '..', 'data', 'projects.json');
console.log('>>> Tentando usar o arquivo JSON em:', dataFilePath);

// 1. Define o "molde" (continua igual)
export type Project = {
  id: number;
  nome: string;
  descricao: string;
  tecnologias: string;
  link?: string; // Tornamos o link opcional aqui também
};

// 2. Nossa lista agora começa vazia e será carregada do arquivo
let listaDeProjetos: Project[] = [];

// --- NOVAS FUNÇÕES ---

// Função para CARREGAR os projetos do arquivo JSON
const loadProjects = () => {
  try {
    // Tenta ler o arquivo
    const fileData = fs.readFileSync(dataFilePath, 'utf-8');
    // Converte o texto JSON em um array JavaScript
    listaDeProjetos = JSON.parse(fileData);
  } catch (error) {
    // Se o arquivo não existir ou der erro na leitura, começa com uma lista vazia
    console.warn("Arquivo projects.json não encontrado ou inválido. Começando com lista vazia.");
    listaDeProjetos = [];
  }
};

// Função para SALVAR os projetos no arquivo JSON
const saveProjects = () => {
  // --- LOG 1 ---
  console.log('>>> [saveProjects] Iniciando salvamento...'); 
  try {
    const jsonData = JSON.stringify(listaDeProjetos, null, 2);
    fs.writeFileSync(dataFilePath, jsonData, 'utf-8');
    // --- LOG 2 ---
    console.log('>>> [saveProjects] Arquivo salvo com sucesso!'); 
  } catch (error) {
    console.error(">>> [saveProjects] ERRO ao salvar:", error); 
  }
};

// --- FIM DAS NOVAS FUNÇÕES ---

// Carrega os projetos do arquivo ASSIM que este módulo é iniciado
loadProjects();

// Exporta a lista (agora ela é carregada do arquivo)
export const Projetos = listaDeProjetos;

// --- FUNÇÕES DE MANIPULAÇÃO (Agora salvam no arquivo) ---

// Função que remove um projeto
export const deletarProjetoPorId = (id: number) => {
  const index = listaDeProjetos.findIndex(p => p.id === id);
  if (index !== -1) {
    listaDeProjetos.splice(index, 1);
    saveProjects(); // <-- Salva as mudanças no arquivo!
  }
};

// Função de busca por ID (continua igual)
export const getProjetoPorId = (id: number) => {
  return listaDeProjetos.find(p => p.id === id);
};

// Função de edição
export const editarProjeto = (id: number, novosDados: Partial<Project>) => {
  const index = listaDeProjetos.findIndex(p => p.id === id);
  if (index !== -1) {
    const projetoAntigo = listaDeProjetos[index];
    if (projetoAntigo) {
      listaDeProjetos[index] = {
        ...projetoAntigo,
        ...novosDados,
        id: projetoAntigo.id 
      };
      saveProjects(); // <-- Salva as mudanças no arquivo!
    }
  }
};


export const adicionarProjeto = (novoProjeto: Project) => {
  // --- LOG 3 ---
  console.log('>>> [adicionarProjeto] Recebido:', novoProjeto); 
  listaDeProjetos.push(novoProjeto);
  // --- LOG 4 ---
  console.log('>>> [adicionarProjeto] Chamando saveProjects...'); 
  saveProjects(); 
};
