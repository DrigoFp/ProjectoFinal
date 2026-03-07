# ProjectoFinal
# 🏋️‍♂️ Treinos App — Projeto Final Angular

Aplicação desenvolvida como projeto final da unidade curricular de **Angular**, com o objetivo de gerir treinos, exercícios e estatísticas pessoais de forma simples, rápida e intuitiva.

---

## 📌 Funcionalidades Principais

### ✔ Criar Treinos
- Definir nome, tipo, data e exercícios.
- Cada exercício contém: **nome**, **peso**, **repetições**.

### ✔ Listar Treinos
- Visualização completa dos treinos criados.
- Filtro por tipo de treino.
- Estatísticas automáticas:
  - Total de treinos
  - Total de exercícios
  - Último treino realizado

### ✔ Ver Detalhe do Treino
- Mostra todos os exercícios associados.
- Botões para **editar** ou **apagar** o treino.

### ✔ Editar Treino
- Atualização completa dos dados do treino.
- Atualização dos exercícios individualmente.

### ✔ Apagar Treino
- Remoção imediata com confirmação.

### ✔ Armazenamento Local
- Todos os dados são guardados em **LocalStorage**.
- A aplicação mantém os treinos mesmo após fechar o browser.

---

## 🧠 Arquitetura e Tecnologias

- **Angular 17+**
- **Standalone Components**
- **Angular Router**
- **RxJS (BehaviorSubject)**
- **LocalStorage API**
- **TypeScript**
- **HTML / CSS**

---

## 📂 Estrutura do Projeto
- src/app/
- ├── treinos/
- │     ├── lista/
- │     ├── criar/
- │     ├── editar/
- │     ├── detalhe/
- │     └── treinos-store.ts
- ├── shared/
- │     ├── components/kpi-card
- │     ├── models/
- │     └── services/
- ├── dashboard/
- ├── header/
- ├── footer/
- └── app.routes.ts
- └──assets/

---

## 🚀 Como Executar o Projeto

### Instalar dependências
```bash
npm install
- Iniciar o servidor de desenvolvimento

ng serve

- Para aceder 
http://localhost:4200


---

-  Conclusão

Este projeto demonstra a criação de uma Single Page Application (SPA) em Angular, aplicando componentes standalone, serviços para gestão de estado, comunicação reativa com BehaviorSubject, formulários dinâmicos e armazenamento persistente através de LocalStorage.
A aplicação evidencia boas práticas de desenvolvimento frontend, organização modular e reutilização de componentes, resultando numa solução funcional, intuitiva e facilmente escalável.