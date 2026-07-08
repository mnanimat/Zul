# OliverZul Story Site

Site interativo em React + Vite, pronto para GitHub e Vercel.

## Correção de deploy no Vercel

Esta versão remove `node_modules`, `dist` e `package-lock.json` do repositório e fixa versões estáveis das dependências. Isso evita erro de instalação do tipo:

```txt
npm error Exit handler never called!
```

## Rodar localmente

```bash
npm install
npm run dev
```

## Build local

```bash
npm run build
```

## Publicar no GitHub

Suba apenas estes arquivos do projeto. Não envie `node_modules`, `dist` nem `package-lock.json`.

```bash
git add .
git commit -m "corrige deploy vercel"
git push
```

## Configuração na Vercel

- Framework Preset: Vite
- Install Command: `npm install --no-audit --no-fund --legacy-peer-deps`
- Build Command: `npm run build`
- Output Directory: `dist`
- Node.js: 20.x

## Observação sobre Instagram

Não copie imagens do Instagram sem autorização. Use imagens próprias, imagens autorizadas ou embed/link oficial.
