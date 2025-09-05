# Uso do Widget – Instruções Detalhadas

**OBSERVAÇÃO:**   
Você pode ir direto para o **[Ir para Passo 4](#4-incorporando-o-widget-em-qualquer-site)** (Incorporando o widget em qualquer site).   
Os demais passos são OPCIONAIS.


## 1. Rodando em desenvolvimento

1. Acesse a pasta do React App:

```bash
cd react-app
```

2. Instale dependências (se ainda não tiver feito):

```bash
npm install
```

3. Rode o servidor de desenvolvimento do Vite:

```bash
npm run dev
```

> A aplicação React ficará disponível em `http://localhost:5173`.

4. No `widget.js`, use a URL de desenvolvimento:

```js
const WIDGET_URL = 'http://localhost:5173/';
```

5. Abra qualquer arquivo de `sites-exemplo/` no navegador. O widget será carregado via iFrame.

---

## 2. Build para produção / servidor local

1. Crie o build do React App:

```bash
cd react-app
npm run build
```

2. Sirva o build em um servidor estático:

```bash
npx serve -s dist -l 3000
```

3. Altere o `WIDGET_URL` em `widget.js` para apontar para o build ou para a URL pública do servidor:

```js
const WIDGET_URL = 'http://localhost:3000/';
```

4. Abra os sites de teste em `sites-exemplo/` para verificar o funcionamento.

---

## 3. Publicação em produção (Vercel)

1. Crie uma conta em   [Vercel](https://vercel.com/) e faça login.
2. Crie um novo **Static Site**:
   * Framework Preset: `Vite`
   * Repositório: `ElderSam/prova-frontend-bonifiq`
   * Branch: `main`
   * Root Directory: `react-app`
3. Render vai gerar uma URL pública, ex.: `https://....vercel.app`.
4. Atualize o `WIDGET_URL` em `widget.js` para a URL do Render:

```js
const WIDGET_URL = 'https://....vercel.app';
```

OBSERVAÇÃO: no meu caso a url gerado foi https://prova-frontend-bonifiq.vercel.app

---

## 4. Incorporando o widget em qualquer site

1. Copie o arquivo `widget.js` para o seu site ou use um caminho público. Por exemplo, usando o GitHub raw (para teste rápido):

```html
<script src="https://raw.githubusercontent.com/ElderSam/prova-frontend-bonifiq/main/widget.js"></script>
```

2. O widget será adicionado automaticamente com botão flutuante e iFrame.

> ⚠️ Para produção real, é recomendado servir o `widget.js` a partir de um servidor estático confiável para garantir HTTPS, cache e performance.
> ⚠️ O iFrame usa `postMessage` para comunicação, enviando apenas o `loggedUserId`.

---

## 5. Customizações rápidas

* **Tamanho do widget:** Ajuste `WIDGET_WIDTH` e `WIDGET_HEIGHT` em `widget.js`.
* **Ícone do botão:** Alterar `chevronDownSVG`.
* **Estilos:** Podem ser modificados dentro do `style.innerHTML` do `widget.js`.

---

## 6. Exemplos de sites de teste

* `sites-exemplo/Site01/index.html`
* `sites-exemplo/Site02/index.html`
* `sites-exemplo/Site03/index.html`

Basta abrir qualquer um deles no navegador e o widget será carregado automaticamente.
