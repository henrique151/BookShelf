Claro! Aqui está um **README.md** completo e organizado para o seu projeto **BookShelf**:

````markdown
# BookShelf

BookShelf é uma aplicação web moderna para gerenciamento de biblioteca pessoal, permitindo aos usuários catalogar, organizar e acompanhar o progresso de leitura de seus livros.

---

## 🛠 Tecnologias Utilizadas

- **Next.js 15** com App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (biblioteca de componentes)

---

## 📚 Funcionalidades

### Dashboard Principal

- Estatísticas gerais da biblioteca:
  - Total de livros cadastrados
  - Livros em leitura
  - Livros finalizados
  - Total de páginas lidas
- Navegação rápida para outras seções
- Design responsivo

### Biblioteca (Listagem de Livros)

- Exibição de todos os livros em formato de cards
- Sistema de busca por título ou autor
- Filtros por gênero literário
- Cada card mostra:
  - Capa do livro (com fallback)
  - Título e autor
  - Ano de publicação
  - Avaliação por estrelas (1-5)
  - Gênero como badge
  - Botões para visualizar, editar e excluir

### Adicionar Novo Livro

- Formulário com campos obrigatórios e opcionais
- Preview da capa em tempo real
- Barra de progresso do formulário
- Validação antes do envio
- Feedback visual de sucesso ou erro

### Visualizar Detalhes do Livro

- Página individual para cada livro
- Exibição completa de todas as informações
- Sinopse detalhada
- Botões para editar ou excluir o livro

### Editar Livro

- Formulário pré-preenchido com dados existentes
- Atualização em tempo real dos dados

### Excluir Livro

- Dialog de confirmação antes da exclusão
- Prevenção de exclusões acidentais
- Feedback visual claro

---

## 📝 Estrutura de Dados

```ts
export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  year?: number;
  pages?: number;
  currentPage?: number;
  rating?: number;
  synopsis?: string;
  cover?: string;
  status?: "QUERO_LER" | "LENDO" | "LIDO" | "PAUSADO" | "ABANDONADO";
  notes?: string;
}
```
````

---

## 🎨 Design & Experiência

- Layout responsivo e mobile-first
- Navegação clara com navbar e breadcrumbs
- Validação de formulários em tempo real
- Feedback visual para todas as ações do usuário
- Estados de loading e confirmações para ações destrutivas

---

## 🚀 Como Rodar o Projeto

1. **Clone o repositório**

```bash
git clone <URL_DO_REPOSITORIO>
cd bookshelf
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie a aplicação**

```bash
npm run dev
```

4. Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📂 Estrutura de Pastas

```
bookshelf/
├─ app/                  # Páginas do Next.js 15
├─ components/           # Componentes reutilizáveis
├─ lib/                  # Funções utilitárias e dados iniciais
├─ types/                # Tipos TypeScript
├─ public/               # Imagens estáticas
├─ styles/               # CSS global e Tailwind
├─ tailwind.config.js
└─ next.config.js
```

---

## 📦 Dados Iniciais

O projeto já vem com 5 livros pré-cadastrados para demonstração, incluindo:

- Diversos gêneros literários
- Diferentes anos de publicação
- Avaliações variadas
- Sinopses completas
- URLs de capas funcionais

---

## 📖 Gêneros Disponíveis

- Literatura Brasileira, Ficção Científica, Realismo Mágico, Ficção, Fantasia, Romance, Biografia, História, Autoajuda, Tecnologia, Programação, Negócios, Psicologia, Filosofia, Poesia

---

## 📝 Licença

Este projeto é open-source e pode ser utilizado e modificado livremente.

```


```
