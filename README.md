# 🧪 Prova Prática – Desenvolvedor Front-End

## Instruções

1. Crie o build do react app e use um servidor estático
``cd react-app``  
``npm build``  
``npx serve dist``

2. Abra um dos 3 sites que disponibilizamos para teste  
Exemplo: abra no navegador a página `sites-exemplo/Site01/index.html`

## 🧠 Objetivo

Avaliar a capacidade do candidato em desenvolver e integrar um widget em uma página web, consumindo dados de uma API e utilizando tecnologias modernas como React.

---

## 📋 Instruções Gerais

Você deve entregar:

1. Um arquivo JavaScript que será incluído em qualquer site para carregar um widget contendo um iFrame.
2. Um projeto React utilizando o framework Vite + TypeScript com a página a ser carregada no widget.
3. As instruções de como executar e testar a solução.

---

## ✅ Requisitos

### 1. JavaScript para inserir o widget (arquivo externo)

Desenvolva um script JS que:

- Cria um botão flutuante fixo no canto inferior direito da tela (como um botão de chat).
- Ao clicar no botão, um iFrame deve aparecer com o conteúdo da aplicação React.
- O botão deve permitir abrir/fechar o widget.
- O script deve ser facilmente incorporado via `<script src="..."></script>` em qualquer site.

> 💡 O `window.loggedUserId` estará definido na página principal com o valor do ID do usuário logado (por exemplo: `window.loggedUserId = 2`).

---

### 2. Aplicação React

Você deverá criar uma aplicação que será exibida dentro do iFrame. Essa aplicação deve:

- Ao carregar, ler o valor de `window.parent.loggedUserId` via `postMessage`.
- Usar esse ID para fazer uma requisição `GET` para:
  `https://jsonplaceholder.typicode.com/users/<ID>`
- Exibir na tela os seguintes dados do usuário retornado:
  - Nome
  - E-mail
- Usar o mesmo ID para fazer uma requisição `GET` para:
  `https://jsonplaceholder.typicode.com/posts?userId=<ID>`
- Exibir na tela os posts realizados pelo usuário contendo:
  - Título (`title`)
  - Conteúdo (`body`)

> ⚠️ Importante: a aplicação React precisa funcionar mesmo rodando em um iFrame hospedado em outro domínio.

---

### 3. Design & UX

- O widget pode ser simples, mas deve ser utilizável em desktop e mobile.
- O widget deve cobrir no máximo **320px de largura** e **600px de altura**.
- Sinta-se livre para utilizar bibliotecas com componentes prontos ou de estilização.
- Deve haver um botão de **fechar** dentro do próprio widget.

---

## 🧪 Critérios de Avaliação

| Critério                          | Peso |
|----------------------------------|------|
| Funcionalidade completa          | 40%  |
| Organização do código            | 20%  |
| Uso adequado de React e JS       | 20%  |
| UX e comportamento do widget     | 10%  |
| Clareza nas instruções de uso    | 10%  |

---

## 🚀 Extras (não obrigatórios, mas contam pontos)

- Adicionar tratamento de erro caso o ID do usuário seja inválido.
- Fazer loading enquanto a API é chamada.
- Testes unitários

---

## 👾 Exemplos

![Aviato example](imgs/01.gif)
![Classimax example](imgs/02.gif)
![Shop example](imgs/03.gif)

---

## 📦 Entrega

Oba! Terminou tudinho? Agora faça o seguinte:

1. Confirme que o código está na branch **main/master** do repositório que você criou.
2. Configure o repositório no GitHub como **público** para que possamos acessar sua solução.
3. Preencha o formulário abaixo:
[https://forms.gle/Ytp6pi3gUZBmadcf7](https://forms.gle/Ytp6pi3gUZBmadcf7)

A gente te responde em breve, ok?

---

Boa sorte! 🍀
