# Guia de Animações - Lubrinorte

Documentação completa das animações implementadas com GSAP 3.12.5 e Lenis 1.0.42.

## 🎬 Animações Implementadas

### 1. **Hero Section**
- ✅ Badge aparece com fade-in + slide up
- ✅ Título (h1) desliza para cima com easing suave
- ✅ Parágrafo desliza para cima após título
- ✅ Botões (CTA) aparecem em cascata com stagger
- ✅ Card do lado direito escala suavemente (0.95 → 1)

**Efeito:** Entrada elegante e organizada, sequencial.

---

### 2. **Scroll Animations**

#### Section Heads
- Cada seção (Produtos, Segmentos, etc.) anima quando entra na viewport
- Fade-in + slide up com scrub 0.5

#### Cards (Grid)
- Cards de features animam em cascata quando visíveis
- Stagger de 150ms entre cada card
- Efeito de "revista abrindo"

#### Catalog Items
- Itens do catálogo (Texaco, UNI, Moura) animam em sequência
- Stagger menor (100ms) para efeito mais dinâmico

#### Quote Box (Cotação)
- Anima com scale e fade quando atinge 80% da viewport
- Duração 0.8s com scrub

---

### 3. **Parallax Effects**
- Hero gradient overlay se move conforme scroll
- Criatura sensação de profundidade

---

### 4. **Truck Fleet Section** (se integrado)
- Título anima linha por linha com clip-path
- Contadores numéricos contam de 0 até o valor final
- Cada contador tem delay progressivo

---

### 5. **Form Interactions**
- **Focus:** Inputs recebem glow dourado ao focar
- **Blur:** Glow desaparece ao sair do foco
- Transição suave 0.3s

---

### 6. **Button Hover**
- Botões escalam 1.05x ao passar o mouse
- Transição 0.2s com ease suave

---

### 7. **Custom Cursor** (Desktop only)
- Cursor customizado segue movimento do mouse
- Muda de tamanho ao passar sobre links/botões
- Escala 2x quando hover em elementos interativos
- Desaparece em mobile

**Cor:** Dourado com glow

---

## 📚 Tecnologias

| Lib | Versão | Uso |
|-----|--------|-----|
| **GSAP** | 3.12.5 | Timeline, ScrollTrigger, animações |
| **Lenis** | 1.0.42 | Scroll suave (lerp: 0.1) |
| **ScrollTrigger** | GSAP | Trigger de animações no scroll |

---

## 🔧 Como Modificar

### Adicionar nova animação
```javascript
// No arquivo animations.js

gsap.from('.seu-elemento', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  scrollTrigger: {
    trigger: '.seu-elemento',
    start: 'top 80%',
    scrub: 0.5,
  },
});
```

### Configurar Lenis
```javascript
const lenis = new Lenis({
  lerp: 0.1,        // Smoothness (0.1 = very smooth)
  wheelMultiplier: 1, // Scroll speed
});
```

### Configurar ScrollTrigger
```javascript
ScrollTrigger: {
  trigger: '.elemento',     // Elemento que dispara
  start: 'top 80%',        // Quando começa (viewport %)
  end: 'top 50%',          // Quando termina
  scrub: 0.5,              // Sync com scroll (0 = desligado)
  markers: true,           // Debug (remover em prod)
}
```

---

## 📊 Performance

- ✅ Lenis usa RAF (requestAnimationFrame) para 60fps
- ✅ ScrollTrigger é otimizado para mobile
- ✅ Animações pausam fora da viewport
- ✅ Sem layout thrashing

**Recomendação:** Monitorar Core Web Vitals no Lighthouse.

---

## 🐛 Debug

Para ver trigger markers no scroll (debug):

```javascript
// No animations.js, adicione:
scrollTrigger: {
  trigger: '.elemento',
  start: 'top 80%',
  markers: true,  // Ativa debug visual
}
```

Remova `markers: true` antes de deploy.

---

## 🎯 Próximos Passos

- [ ] Adicionar animação ao truck fleet stats (contadores)
- [ ] Implementar timeline para seções inteiras
- [ ] Otimizar performance em mobile
- [ ] Adicionar transição de página (page transition)

