# Lubrinorte — Sistema Completo Unificado

Repositório unificado contendo o **site institucional B2B** e o **sistema ERP** para Lubrinorte Manaus.

## 📂 Estrutura

```
lubrinorte/
├── /site              # Site institucional B2B (Netlify)
│   ├── index.html     # Single HTML com login B2B
│   ├── server.py      # SPA server para roteamento local
│   └── ...
│
├── /erp               # Sistema ERP interno
│   ├── /apps
│   │   ├── web/       # Dashboard ERP (Next.js + Auth + Supabase)
│   │   └── docs/      # Documentação
│   ├── /packages      # Pacotes compartilhados (UI, TypeScript, ESLint)
│   ├── /supabase      # Migrations e seeds
│   ├── /scripts       # Scripts de setup/seed
│   └── package.json   # Monorepo (Turborepo)
│
├── netlify.toml       # Configuração Netlify (aponta para /site)
├── .gitignore
└── README.md          # Este arquivo
```

## 🚀 Deploy

### Site Institucional (Netlify)
- **URL:** https://lubrinorte.netlify.app
- **Acesso:** `/login` com credenciais `admin@lubrinorte.com / Lubrinorte@2026`
- **Build:** Netlify CI/CD automático do branch `main`

### Sistema ERP
- Local em desenvolvimento ou em outro servidor
- Stack: Next.js + TypeScript + Supabase + Turborepo

## 🔧 Desenvolvimento Local

### Site Institucional
```bash
cd site
python server.py  # Serve em http://localhost:8765
# Acesse http://localhost:8765/login
```

### Sistema ERP
```bash
cd erp
npm install       # Instala dependências (Turborepo gerencia monorepo)
npm run dev       # Inicia desenvolvimento
```

## 📝 Credenciais Demo

**Site Institucional (B2B Login):**
- Email: `admin@lubrinorte.com`
- Senha: `Lubrinorte@2026`

## 📦 Git

- Repositório: https://github.com/araujo77fabio/lubrinorte.git
- Branch principal: `main`
- Histórico unificado a partir de commit `6f59cc1`

## 📞 Contato

- **Telefone:** (92) 3622-1479
- **WhatsApp:** (92) 3622-1479
- **Localização:** Manaus, Amazonas
