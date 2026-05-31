# 🚀 Guia de Deploy — Lubrinorte

## Pré-requisitos

- GitHub account: https://github.com
- Netlify account: https://netlify.com
- Git instalado
- GitHub CLI (`gh`) ou autenticação Git via tokens

---

## 1️⃣ Criar Repositório no GitHub

### Opção A: Via Web (recomendado se `gh` não está instalado)

1. Acesse https://github.com/new
2. **Repository name:** `lubrinorte`
3. **Description:** `Lubrinorte Manaus — Site institucional de óleos lubrificantes com GSAP + Lenis`
4. **Visibility:** Public
5. **Clique em "Create repository"**
6. Copie a URL do repositório (ex: `https://github.com/SEU_USUARIO/lubrinorte.git`)

### Opção B: Via GitHub CLI (se instalado)

```bash
gh repo create lubrinorte --public --source=. --remote=origin --push
```

---

## 2️⃣ Fazer Push para GitHub

Se criou via Web, execute no terminal:

```bash
cd c:/Users/user/OneDrive/Docs\ Imperium/Apps/lubrinorte

# Adicione a URL do repositório
git remote add origin https://github.com/SEU_USUARIO/lubrinorte.git

# Renomeie a branch padrão para 'main' (GitHub padrão)
git branch -M main

# Faça o push
git push -u origin main
```

Pronto! Seu repositório agora está no GitHub.

---

## 3️⃣ Deploy Automático no Netlify

### Passo 1: Autentique no Netlify

1. Acesse https://netlify.com
2. Clique em "Sign up" (ou faça login)
3. Clique em "Connect with GitHub"
4. Autorize Netlify a acessar seus repositórios

### Passo 2: Implante o Site

1. Na dashboard do Netlify, clique em **"New site from Git"**
2. Selecione **GitHub**
3. Procure por **`lubrinorte`** e selecione
4. Configurações de Build:
   - **Base directory:** (deixe em branco)
   - **Build command:** (deixe em branco)
   - **Publish directory:** `site`
5. Clique em **"Deploy site"**

Netlify iniciará o deploy automaticamente. Você verá um link como:
```
https://[random-id].netlify.app
```

### Passo 3: Configurar Domínio Personalizado (Opcional)

1. Na dashboard do site no Netlify, vá para **"Domain settings"**
2. Clique em **"Add custom domain"**
3. Digite seu domínio (ex: `lubrinorte.com.br`)
4. Siga as instruções para apontar o DNS

---

## 4️⃣ Atualizações Futuras

Toda vez que você fizer um commit e fazer push para a branch `main`:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

Netlify **detecta automaticamente** o push e redeploy o site em ~1 minuto.

---

## 📊 Status do Deploy

- **Build time:** ~30 segundos
- **Deploy time:** ~1 minuto
- **URL padrão:** https://[project-id].netlify.app
- **Domínio customizado:** Deploy automático com SSL grátis

---

## ✅ Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Local remote configurado (`git remote -v` deve listar "origin")
- [ ] Push feito para `main` (`git log --oneline` mostra os commits)
- [ ] Site live no Netlify
- [ ] Domínio customizado apontando (se aplicável)
- [ ] Contato (92) 3622-1479 visível no site

---

## 🆘 Troubleshooting

### Push recusado
```bash
# Verifique se o remote está correto
git remote -v

# Se não estiver, remova e adicione novamente
git remote remove origin
git remote add origin https://github.com/SEU_USUARIO/lubrinorte.git
git push -u origin main
```

### Deploy não dispara após push
1. Verifique se você está na branch `main`
2. Confirme que o GitHub está conectado ao Netlify
3. Verifique os logs de build no Netlify dashboard

---

**Pronto para ir ao ar! 🎉**
