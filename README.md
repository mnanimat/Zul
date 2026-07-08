# OliverZul — Jornada Viva

Site web interativo para GitHub e Vercel, em modo história, sobre arqueologia, poesia e fé evangélica. O visitante interage com o mouse, explora capítulos, joga mini games e acessa uma área para referências do Instagram.

## Importante sobre o Instagram

Este projeto **não copia imagens do Instagram**. Ele usa placeholders e links oficiais. Para publicar com segurança:

1. Use somente imagens, vídeos e textos que sejam seus ou que tenham autorização do autor.
2. Coloque os arquivos autorizados dentro de `public/assets/`.
3. Edite `src/data/content.js` para trocar títulos, textos, imagens e URLs.
4. Para posts do Instagram, prefira linkar o post original ou incorporar pelo recurso oficial da plataforma.

## Recursos incluídos

- Layout responsivo para celular, tablet e computador.
- Fundo animado em canvas com partículas.
- Luz que acompanha o mouse.
- Capítulos em modo história.
- Mini game de arqueologia: caça aos fragmentos.
- Mini game de poesia: criação de verso interativo.
- Mini quiz de fé evangélica.
- Área de referências para imagens autorizadas e links oficiais.
- Som ambiente gerado por WebAudio, sem arquivo de música externo.

## Como rodar no computador

```bash
npm install
npm run dev
```

Abra o endereço mostrado no terminal, normalmente `http://localhost:5173`.

## Como publicar no GitHub

```bash
git init
git add .
git commit -m "site interativo oliverzul"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/oliverzul-story-site.git
git push -u origin main
```

## Como publicar na Vercel

1. Entre em https://vercel.com
2. Clique em **Add New Project**.
3. Importe o repositório do GitHub.
4. Framework: **Vite**.
5. Build command: `npm run build`.
6. Output directory: `dist`.
7. Clique em **Deploy**.

## Onde editar o conteúdo

Edite este arquivo:

```txt
src/data/content.js
```

Campos principais:

- `profile`: nome, @, chamada e link.
- `references`: cartões de imagens/reels/posts.
- `chapters`: capítulos da história.
- `quizQuestions`: perguntas do quiz.
- `poetryWords`: palavras do jogo de poesia.

## Como adicionar imagens autorizadas

1. Coloque a imagem em `public/assets/minha-imagem.jpg`.
2. No arquivo `src/data/content.js`, use:

```js
image: '/assets/minha-imagem.jpg'
```

## Próximas melhorias possíveis

- Adicionar narração por voz.
- Criar login para salvar progresso.
- Integrar CMS, como Sanity, Supabase ou Firebase.
- Adicionar ranking de jogadores.
- Transformar os capítulos em fases com pontuação.
