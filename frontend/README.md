# C Turismo - Fullstack (React + Python FastAPI + SQLite)

Este projeto agora possui uma estrutura completa com Backend para persistência real de dados em um banco de dados SQLite.

## Estrutura do Projeto

- `/` : Frontend em React (Vite)
- `/backend_cturismo` : Backend em Python (FastAPI + SQLAlchemy + SQLite)

## Como executar

### 1. Iniciar o Backend (Python)

Você precisará do Python instalado. No terminal, entre na pasta do backend:

```bash
pip install -r backend_cturismo/requirements.txt
python -m uvicorn backend_cturismo.main:app --host 0.0.0.0 --port 8000
```
O servidor backend rodará em `http://localhost:8000`.

### 2. Iniciar o Frontend (React)

Em outro terminal, na pasta raiz do projeto:

```bash
npm install
npm run dev:all
```
Frontend em `http://localhost:3000` e backend em `http://localhost:8000`.

## Funcionalidades Integradas
- **Persistência Real**: Os clientes são salvos no arquivo SQLite dentro da pasta backend.
- **Admin**: O painel administrativo agora busca e salva dados diretamente do servidor.
- **Logo Corrigido**: O logo "C Turismo" está atualizado em todo o sistema.
- **Exportação**: Mantidas as funcionalidades de exportação para PDF, Word e Excel.

## Deploy (Produção)

### Backend (Render)
- Arquivo de blueprint: `render.yaml`
- Conecte o repositório no Render e crie um Web Service.
- Configurar Deploy Hook e salvar a URL em `Settings → Deploy Hooks`.
- Adicione o secret `RENDER_DEPLOY_HOOK_URL` no GitHub (Settings → Secrets → Actions).
- O workflow `.github/workflows/deploy-render.yml` acionará o deploy a cada push na `main`.

### Frontend (Netlify)
- Arquivo de configuração: `netlify.toml`
- Conecte o repositório no Netlify.
- Defina variáveis de ambiente:
  - `VITE_API_URL` apontando para a URL pública do backend Render.
  - `NODE_VERSION=20` (opcional).
- Adicione os secrets no GitHub:
  - `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`.
- O workflow `.github/workflows/deploy-netlify.yml` publicará a cada push na `main`.
