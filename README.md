<<<<<<< HEAD

# Guia de Desenvolvimento com GitHub

Este documento padroniza o fluxo de trabalho com GitHub, abordando nomeação de branches, convenção de commits, criação de pull requests e boas práticas gerais.

---

## 📌 Nomeação de Branches

Utilizamos um padrão para nomeação de branches que facilita a rastreabilidade do desenvolvimento. O formato é:

```
<id-da-tarefa>/<descricao-resumida>
```

**Exemplo:**

```sh
git checkout -b TL-100/create-post-api
```

Se não houver um ID de tarefa, utilize um nome descritivo:

```sh
git checkout -b feature/create-login
```

---

## 🔖 Convenção de Commits

Utilizamos a convenção de commits baseada no Angular:

```
tipo(escopo): descrição breve
```

### Tipos de commits:

- **feat**: Adição de uma nova funcionalidade
- **fix**: Correção de um bug
- **docs**: Alterações em documentação
- **style**: Mudanças que não afetam a lógica (espaços, formatação, etc.)
- **refactor**: Refatoração para melhorar manutenibilidade ou performance
- **test**: Adição ou modificação de testes
- **chore**: Mudanças na configuração do projeto (CI/CD, pacotes, etc.)

**Exemplos:**

```sh
git commit -m "feat(auth): add user authentication"
git commit -m "fix(login): correct password validation"
git commit -m "docs(readme): update project instructions"
```

---

## 🔄 Pull Requests (PRs)

### 📌 Título

Os títulos das PRs seguem o mesmo padrão dos commits, incluindo o ID da tarefa:

```
[<id-da-tarefa>] tipo(escopo): descrição
```

**Exemplo:**

```
[TL-100] feat(posts): creating hook to integrate with posts API
```

### 📄 Descrição

Uma PR bem descrita é essencial para manter o histórico claro e facilitar revisões. Utilize o seguinte modelo:

#### **📌 Tipo de mudança**

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Chore (documentation, packages, or tests updates, nothing that affect the final user directly)
- [ ] Release (new version of the application - only for production)

#### **📝 Descrição**

Descreva detalhadamente o que foi feito nesta PR. Inclua o motivo da mudança e como ela afeta o sistema. Exemplos de informações úteis:

- Quais partes do sistema foram modificadas?
- Quais regras de negócio foram alteradas ou adicionadas?
- Há impactos visuais ou funcionais para o usuário final?

#### **📷 Screenshots (se aplicável)**

Se a PR modifica a interface do usuário, adicione imagens para facilitar o entendimento.

#### **🔗 Tarefas relacionadas**

Liste as tarefas relacionadas, se houver:

- [task-id](task-link) ou N/A

#### **✅ Checklist**

- [ ] My changes have less than or equal 400 lines
- [ ] I have performed a self-review of my own code
- [ ] The existing tests and linter pass locally with my changes
- [ ] I have commented my code in hard-to-understand areas (if applicable)
- [ ] I have created tests for my fix or feature (if applicable)

#### **🛠 Dependências**

Liste outras PRs que esta depende, se houver:

- [link-to-PR](PR_link) ou N/A

---

## 🚀 Boas Práticas Adicionais

- **Assignees**: Defina quem trabalhou na PR. Isso facilita identificar responsáveis por eventuais problemas ou dúvidas.
- **Labels**: Utilize etiquetas relevantes para classificar a PR (ex: `bug`, `feature`, `refactor`).
- **Múltiplos Commits**: Divida suas alterações em commits pequenos e organizados, para facilitar o entendimento do processo de desenvolvimento.
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
>>>>>>> 0fd5da8 (feat: adicionada função para expandir as divs dos menus dieta/treino)
