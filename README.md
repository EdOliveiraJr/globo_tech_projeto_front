# 📝 Sistema de Controle de Tarefas (TaskMy)

Este projeto consiste em um **Sistema de Controle de Tarefas**, onde cada usuário pode gerenciar múltiplas listas de tarefas e controlar os itens dentro de cada lista.  

O objetivo principal deste módulo é praticar **estruturação de páginas, estilização e responsividade**, utilizando **dados mockados** diretamente no código HTML.  
A manipulação dinâmica de dados será implementada apenas no próximo módulo.

---

## 🚀 Funcionalidades

- 👤 **Usuários**
  - Criar um novo usuário.
  - Logar na conta
  - Recuperar senha

- 📂 **Listas de Tarefas**
  - Criar uma nova lista de tarefas para um usuário.
  - Remover uma lista de tarefas de um usuário.
  - Listar todas as listas de um usuário.

- ✅ **Tarefas**
  - Adicionar tarefas a uma lista.
  - Listar todas as tarefas de uma lista.
  - Marcar uma tarefa como concluída.
  - Remover uma tarefa de uma lista.

---

## 📌 Tecnologias Utilizadas

- **HTML5**  
- **CSS3 (responsividade)**

---

## 📱 Layout e Responsividade

- Estruturação das páginas com **HTML semântico**.  
- Estilização responsiva com **CSS Flexbox/Grid**.  
- Layout adaptável para diferentes tamanhos de tela (desktop, tablet, mobile).
- Acessibilidade na aplicação

---

## Protótipo do Sistema

https://www.canva.com/design/DAGwGJdE6r8/Ycnuueq06VlDi1qsdwnVJQ/view?mode=prototype

---

## 🗂️ Organização do Projeto

```bash
📦 to-do-list
 ┣ 📂 assets/          # Imagens, ícones e estilos
 ┣ 📂 layouts/         # Componentes reutilizáveis de layout (Web Components)
 ┣ 📂 pages/           # Páginas do sistema (mockadas em HTML)
 ┣ 📜 index.html       # Página inicial
 ┣ 📜 style.css        # Estilos globais
 ┗ 📜 README.md        # Documentação do projeto
```

---

## 🛠️ Como Executar

1. Clone este repositório:
   ```bash
   git clone https://github.com/EdOliveiraJr/globo_tech_projeto_front.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd globo_tech_projeto_front
   ```
3. Abra o arquivo `index.html` diretamente no navegador.

---

## 📖 Observação Importante

- Neste módulo, **não há conexão com banco de dados ou backend**.  
- Os dados de usuários, listas e tarefas estão **mockados** no próprio código.  
- No próximo módulo será feita a integração com dados reais e dinâmicos.  

---

## 🗃️ Modelagem de Banco de Dados (Opcional)

### 🔹 Modelo Relacional (SQL)

Um possível modelo usando **MySQL/PostgreSQL** poderia ser:

**Tabelas:**

- `usuarios`  
  - `id_usuario` (PK)  
  - `nome`  
  - `email`

- `listas`  
  - `id_lista` (PK)  
  - `id_usuario` (FK → usuarios)  
  - `titulo`

- `tarefas`  
  - `id_tarefa` (PK)  
  - `id_lista` (FK → listas)  
  - `descricao`  
  - `status` (pendente | concluída)  
  - `data_criacao`

**Relacionamentos:**
- Um usuário → várias listas.  
- Uma lista → várias tarefas.  

---

### 🔹 Modelo NoSQL (MongoDB)

No caso de **MongoDB**, os documentos poderiam ser estruturados assim:

```json
{
  "usuario_id": "u123",
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "listas": [
    {
      "lista_id": "l001",
      "titulo": "Trabalho",
      "tarefas": [
        {
          "tarefa_id": "t01",
          "descricao": "Finalizar relatório",
          "status": "pendente",
          "data_criacao": "2025-08-20"
        },
        {
          "tarefa_id": "t02",
          "descricao": "Enviar e-mail para equipe",
          "status": "concluída",
          "data_criacao": "2025-08-19"
        }
      ]
    },
    {
      "lista_id": "l002",
      "titulo": "Pessoal",
      "tarefas": []
    }
  ]
}
```

- Um **documento de usuário** contém todas as suas listas.  
- Cada lista embute suas tarefas dentro do mesmo documento.  

---

## 🎨 Extra

Sugestão de ferramenta para desenhar os modelos: [draw.io](https://app.diagrams.net/).  

---

## 👨‍💻 Autor

Projeto desenvolvido para fins acadêmicos no módulo **FE-HTML-CSS-001 - Estrutura e Estilo**.  
