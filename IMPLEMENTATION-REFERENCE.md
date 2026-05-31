# Truck Fleet Component - Implementation Reference

This document shows how to integrate the truck fleet component into different site architectures.

---

## Static HTML Site

### Directory Structure
```
/
├── index.html
├── css/
│   └── truck-fleet.css
├── js/
│   └── truck-fleet-animations.js
└── external_images/
    └── uni/
        └── lubrinorte_truck_fleet_hero-5C9GxXvK8Evput9BDHapzk.webp
```

### index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lubrinorte - Óleos Lubrificantes Premium</title>
    
    <!-- Main styles -->
    <link rel="stylesheet" href="/css/main.css">
    
    <!-- Truck Fleet component styles -->
    <link rel="stylesheet" href="/css/truck-fleet.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <!-- Your navbar code -->
    </nav>

    <!-- Hero Section -->
    <section id="hero" class="hero">
        <!-- Your main hero -->
    </section>

    <!-- Truck Fleet Section (COMPONENT) -->
    <section class="truck-fleet-section" id="truck-fleet-section">
        <div class="truck-fleet-hero-bg" aria-hidden="true"></div>
        <div class="truck-fleet-overlay" aria-hidden="true"></div>
        <div class="truck-fleet-content">
            <!-- Content from component HTML -->
        </div>
    </section>

    <!-- Other Sections -->
    <section id="contact">
        <!-- Your contact section -->
    </section>

    <!-- Footer -->
    <footer>
        <!-- Your footer -->
    </footer>

    <!-- GSAP & ScrollTrigger (Global dependencies) -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    
    <!-- Lenis (if using smooth scroll) -->
    <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.0/dist/lenis.min.js"></script>
    
    <!-- Main scripts -->
    <script src="/js/main.js"></script>
    
    <!-- Truck Fleet component script -->
    <script src="/js/truck-fleet-animations.js"></script>
</body>
</html>
```

---

## Jekyll/Static Site Generator

### Directory Structure
```
_layouts/
├── default.html
└── page.html
_includes/
├── header.html
├── footer.html
└── truck-fleet-section.html
_sass/
└── truck-fleet.scss
js/
└── truck-fleet-animations.js
assets/
└── images/
    └── truck-fleet-hero.webp
```

### _layouts/default.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ page.title }} | Lubrinorte</title>
    <link rel="stylesheet" href="{{ '/css/main.css' | relative_url }}">
</head>
<body>
    {% include header.html %}
    
    <main>
        {{ content }}
    </main>
    
    {% include footer.html %}
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="{{ '/js/truck-fleet-animations.js' | relative_url }}"></script>
</body>
</html>
```

### _includes/truck-fleet-section.html

```html
<section class="truck-fleet-section" id="truck-fleet-section">
    <div class="truck-fleet-hero-bg" aria-hidden="true"></div>
    <div class="truck-fleet-overlay" aria-hidden="true"></div>
    <div class="truck-fleet-content">
        <!-- Component HTML content -->
    </div>
</section>
```

### Usage in Page

```liquid
---
layout: default
title: Óleos para Frotas
---

<h1>{{ page.title }}</h1>

{% include truck-fleet-section.html %}
```

---

## Next.js / React

### Directory Structure
```
pages/
├── index.tsx
└── frotas.tsx
components/
└── TruckFleetSection/
    ├── index.tsx
    ├── styles.module.css
    └── animations.ts
public/
└── images/
    └── truck-fleet-hero.webp
```

### components/TruckFleetSection/index.tsx

```tsx
import React, { useEffect, useRef } from 'react';
import styles from './styles.module.css';
import { initTruckFleetAnimations } from './animations';

interface TruckFleetSectionProps {
  onQuoteClick?: () => void;
  onSpecsClick?: () => void;
}

export const TruckFleetSection: React.FC<TruckFleetSectionProps> = ({
  onQuoteClick,
  onSpecsClick,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize animations when component mounts
    if (sectionRef.current) {
      initTruckFleetAnimations();
    }

    // Cleanup on unmount
    return () => {
      // ScrollTrigger cleanup handled in animations.ts
    };
  }, []);

  const handleQuoteClick = () => {
    if (onQuoteClick) {
      onQuoteClick();
    } else {
      // Default behavior
      window.location.href = '/quote-request';
    }
  };

  const handleSpecsClick = () => {
    if (onSpecsClick) {
      onSpecsClick();
    } else {
      // Default behavior
      window.open('/specs/truck-fleet-oils.pdf', '_blank');
    }
  };

  return (
    <section
      ref={sectionRef}
      className={styles['truck-fleet-section']}
      id="truck-fleet-section"
    >
      <div
        className={styles['truck-fleet-hero-bg']}
        aria-hidden="true"
      />
      <div
        className={styles['truck-fleet-overlay']}
        aria-hidden="true"
      />

      <div className={styles['truck-fleet-content']}>
        <div className={styles['truck-fleet-hero']}>
          <h1 className={styles['truck-fleet-title']} role="heading" aria-level="1">
            <span>ÓLEOS PARA</span>
            <span>FROTAS DE</span>
            <span>
              CAMINHÕES
              <span className={styles.accent}>.</span>
            </span>
          </h1>

          <p className={styles['truck-fleet-subtitle']}>
            Soluções premium de lubrificação para frotas pesadas. Desenvolvidos
            especialmente para as condições extremas das rodovias brasileiras,
            garantindo máximo desempenho, economia de combustível e durabilidade
            excepcional de seus motores diesel.
          </p>
        </div>

        <div
          className={styles['truck-fleet-benefits']}
          role="region"
          aria-label="Benefícios dos óleos para frotas"
        >
          {[
            {
              icon: '⚡',
              title: 'Durabilidade em Longa Distância',
              description: 'Óleo de longa duração que mantém suas propriedades de proteção mesmo após milhares de quilômetros.',
            },
            {
              icon: '🛡️',
              title: 'Proteção Máxima para Motores Diesel',
              description: 'Fórmula especial desenvolvida para proteger motores diesel contra desgaste e corrosão.',
            },
            {
              icon: '⛽',
              title: 'Economia de Combustível',
              description: 'Reduz a resistência do motor resultando em até 3-5% de economia no consumo de diesel.',
            },
            {
              icon: '📞',
              title: 'Suporte Técnico 24h',
              description: 'Equipe técnica disponível 24/7 para orientação sobre manutenção preventiva.',
            },
          ].map((benefit, index) => (
            <div key={index} className={styles['benefit-card']} tabIndex={0}>
              <div className={styles['benefit-icon']} aria-hidden="true">
                {benefit.icon}
              </div>
              <h3 className={styles['benefit-title']}>{benefit.title}</h3>
              <p className={styles['benefit-description']}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div
          className={styles['truck-fleet-cta']}
          role="region"
          aria-label="Chamadas para ação"
        >
          <button
            className={`${styles.btn} ${styles['btn-primary']}`}
            onClick={handleQuoteClick}
            aria-label="Solicitar cotação para frota"
          >
            Solicitar Cotação para Frota
          </button>
          <button
            className={`${styles.btn} ${styles['btn-secondary']}`}
            onClick={handleSpecsClick}
            aria-label="Ver especificações técnicas dos óleos"
          >
            Ver Especificações Técnicas
          </button>
        </div>

        <div
          className={styles['truck-fleet-stats']}
          role="region"
          aria-label="Estatísticas de confiabilidade"
        >
          {[
            { target: 350, label: 'Mil km de Confiabilidade' },
            { target: 2850, label: 'Frotas Atendidas' },
            { target: 98, label: '% Retenção de Clientes' },
          ].map((stat, index) => (
            <div key={index} className={styles['stat-item']}>
              <div
                className={styles['stat-number']}
                data-target={stat.target}
              >
                0
              </div>
              <div className={styles['stat-label']}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TruckFleetSection;
```

### components/TruckFleetSection/animations.ts

```ts
/**
 * GSAP animations for Truck Fleet Section
 * Ensure GSAP and ScrollTrigger are loaded globally
 */

declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export function initTruckFleetAnimations() {
  if (typeof window.gsap === 'undefined' || typeof window.ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded');
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ... Copy animation functions from truck-fleet-component.html script section
  
  // Initialize animations
  initializeAnimations();
}

function initializeAnimations() {
  // Animation implementation
}
```

### pages/frotas.tsx

```tsx
import Head from 'next/head';
import TruckFleetSection from '@/components/TruckFleetSection';
import { useRouter } from 'next/router';

export default function FrotasPage() {
  const router = useRouter();

  const handleQuoteClick = () => {
    router.push('/quote-request?product=fleet-oils');
  };

  const handleSpecsClick = () => {
    // Open in new tab or modal
    window.open('/specs/truck-fleet-oils.pdf', '_blank');
  };

  return (
    <>
      <Head>
        <title>Óleos para Frotas de Caminhões | Lubrinorte</title>
        <meta
          name="description"
          content="Soluções premium de lubrificação para frotas pesadas"
        />
      </Head>

      <TruckFleetSection
        onQuoteClick={handleQuoteClick}
        onSpecsClick={handleSpecsClick}
      />
    </>
  );
}
```

---

## WordPress / PHP

### Directory Structure
```
wp-content/
└── themes/
    └── lubrinorte/
        ├── functions.php
        ├── template-parts/
        │   └── truck-fleet.php
        ├── assets/
        │   ├── css/
        │   │   └── truck-fleet.css
        │   └── js/
        │       └── truck-fleet-animations.js
```

### template-parts/truck-fleet.php

```php
<?php
/**
 * Template part for Truck Fleet Section
 */
?>

<section class="truck-fleet-section" id="truck-fleet-section">
    <div class="truck-fleet-hero-bg" aria-hidden="true"></div>
    <div class="truck-fleet-overlay" aria-hidden="true"></div>
    
    <div class="truck-fleet-content">
        <div class="truck-fleet-hero">
            <h1 class="truck-fleet-title" role="heading" aria-level="1">
                <span>ÓLEOS PARA</span>
                <span>FROTAS DE</span>
                <span>CAMINHÕES<span class="accent">.</span></span>
            </h1>
            
            <p class="truck-fleet-subtitle">
                <?php echo wp_kses_post(
                    get_option('truck_fleet_subtitle', 
                        'Soluções premium de lubrificação para frotas pesadas.')
                ); ?>
            </p>
        </div>

        <!-- Benefits -->
        <div class="truck-fleet-benefits" role="region" aria-label="Benefícios">
            <?php
            $benefits = get_option('truck_fleet_benefits', [
                [
                    'icon' => '⚡',
                    'title' => 'Durabilidade em Longa Distância',
                    'description' => 'Óleo de longa duração que mantém suas propriedades...',
                ],
                // ... more benefits
            ]);
            
            foreach ($benefits as $benefit) : ?>
                <div class="benefit-card" tabindex="0">
                    <div class="benefit-icon" aria-hidden="true">
                        <?php echo esc_html($benefit['icon']); ?>
                    </div>
                    <h3 class="benefit-title">
                        <?php echo esc_html($benefit['title']); ?>
                    </h3>
                    <p class="benefit-description">
                        <?php echo wp_kses_post($benefit['description']); ?>
                    </p>
                </div>
            <?php endforeach; ?>
        </div>

        <!-- CTA Buttons -->
        <div class="truck-fleet-cta" role="region" aria-label="Ações">
            <a href="<?php echo esc_url(get_permalink(get_page_by_path('quote-request'))); ?>" 
               class="btn btn-primary">
                Solicitar Cotação para Frota
            </a>
            <a href="<?php echo esc_url(wp_get_attachment_url(get_option('truck_fleet_specs_pdf'))); ?>" 
               class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                Ver Especificações Técnicas
            </a>
        </div>

        <!-- Stats -->
        <div class="truck-fleet-stats" role="region" aria-label="Estatísticas">
            <div class="stat-item">
                <div class="stat-number" data-target="350">0</div>
                <div class="stat-label">Mil km de Confiabilidade</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" data-target="2850">0</div>
                <div class="stat-label">Frotas Atendidas</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" data-target="98">0</div>
                <div class="stat-label">% Retenção de Clientes</div>
            </div>
        </div>
    </div>
</section>
```

### functions.php

```php
<?php

// Enqueue styles
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_style(
        'truck-fleet-styles',
        get_template_directory_uri() . '/assets/css/truck-fleet.css',
        [],
        '1.0.0'
    );
});

// Enqueue GSAP and animations
add_action('wp_footer', function() {
    wp_enqueue_script(
        'gsap',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
        [],
        '3.12.2'
    );
    
    wp_enqueue_script(
        'scrolltrigger',
        'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js',
        ['gsap'],
        '3.12.2'
    );
    
    wp_enqueue_script(
        'truck-fleet-animations',
        get_template_directory_uri() . '/assets/js/truck-fleet-animations.js',
        ['scrolltrigger'],
        '1.0.0',
        true
    );
});

// Register custom options (optional ACF integration)
add_filter('acf/settings/load_json', function($paths) {
    $paths[] = get_template_directory() . '/acf-json';
    return $paths;
});
```

### Usage in Template

```php
<?php get_header(); ?>

<main id="main">
    <!-- Other sections -->
    
    <?php get_template_part('template-parts/truck-fleet'); ?>
    
    <!-- Other sections -->
</main>

<?php get_footer(); ?>
```

---

## Webflow / No-Code Platforms

### Export HTML/CSS Approach

1. **Export component as custom code block:**
   - In Webflow, create a custom code embed
   - Paste the entire HTML/CSS/JS from component

2. **Link external resources:**
   ```html
   <!-- In Webflow custom code -->
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
   ```

3. **Update image paths:**
   - Use Webflow's asset manager
   - Reference via `https://images.webflow.com/...`

---

## Testing Integration

### Quick Test Script

```javascript
// Run in browser console to verify setup
(function testTruckFleetIntegration() {
  console.log('=== Truck Fleet Component Test ===');
  
  // Check HTML structure
  const section = document.getElementById('truck-fleet-section');
  console.log('✓ Section found:', !!section);
  
  // Check GSAP
  console.log('✓ GSAP loaded:', typeof gsap !== 'undefined');
  console.log('✓ ScrollTrigger loaded:', typeof ScrollTrigger !== 'undefined');
  
  // Check animations
  const titleSpans = document.querySelectorAll('.truck-fleet-title span');
  console.log('✓ Title spans:', titleSpans.length);
  
  const benefitCards = document.querySelectorAll('.benefit-card');
  console.log('✓ Benefit cards:', benefitCards.length);
  
  const buttons = document.querySelectorAll('.truck-fleet-section .btn');
  console.log('✓ Buttons:', buttons.length);
  
  const stats = document.querySelectorAll('.stat-number');
  console.log('✓ Stats:', stats.length);
  
  console.log('=== Test Complete ===');
})();
```

---

## Environment-Specific Notes

### Development
- Keep animations enabled for testing
- Use source maps for debugging
- Test in actual browser with DevTools

### Staging
- Run full accessibility audit
- Test with actual images
- Verify CDN paths
- Check Core Web Vitals

### Production
- Optimize images (WebP, responsive)
- Enable caching headers
- Minify CSS/JS
- Monitor performance metrics
- Set up error tracking

---

**Version**: 1.0  
**Last Updated**: 2026-05-31
