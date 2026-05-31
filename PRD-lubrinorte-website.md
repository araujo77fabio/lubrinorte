# PRD — Site Institucional Lubrinorte
**Versão:** 1.0  
**Data:** 30 de maio de 2026  
**Status:** Aprovado para Desenvolvimento  
**Responsável:** Produto Digital — Lubrinorte  

---

## Sumário Executivo

A Lubrinorte é uma empresa brasileira especializada em óleos lubrificantes, atendendo tanto o mercado B2B (distribuidores, oficinas mecânicas, frotas industriais) quanto o B2C (consumidor final). O site institucional é o principal ponto de contato digital da marca e deve refletir a posição de liderança da empresa, transmitir credibilidade técnica e gerar oportunidades comerciais qualificadas.

Este PRD define todos os requisitos necessários para o desenvolvimento do novo site institucional, com design cinematográfico, animações GSAP de alto impacto e rolagem suave via Lenis — resultando em uma experiência premium alinhada com as melhores referências globais do setor industrial.

---

## 1. Visao Geral do Produto

### 1.1 O Que E

O site institucional da Lubrinorte e uma plataforma web de presenca digital, voltada a comunicacao da marca, exibicao do portfolio de produtos, captacao de leads qualificados e consolidacao de credibilidade perante clientes B2B e B2C no mercado brasileiro.

O site nao e um e-commerce — e um cartao de visitas digital de altissimo padrao, funcionando como ferramenta estrategica de marketing e vendas. A navegacao deve ser fluida, as animacoes impactantes e o conteudo tecnicamente preciso.

### 1.2 Por Que Existe

O mercado de lubrificantes no Brasil e altamente competitivo, dominado por grandes marcas internacionais (Mobil, Castrol, Shell, Petronas) e players regionais. A Lubrinorte precisa de uma presenca digital que:

- Diferencie a empresa pela qualidade percebida, mesmo antes do primeiro contato comercial
- Eduque o mercado sobre os diferenciais tecnico-qualitativos dos produtos
- Converta visitantes em leads qualificados (solicitacoes de orcamento, contato com distribuidor)
- Sirva como prova social para distribuidores e parceiros em potencial
- Atenda adequadamente os diferentes perfis de clientes (industrial, automotivo, consumidor final)

O site atual (se existente) ou a ausencia de presenca digital robusta representa uma perda competitiva direta. Um site de nivel premium e uma necessidade estrategica urgente.

### 1.3 Visao Estrategica

**Visao de curto prazo (0–6 meses):** Lançar um site institucional de alta performance que posicione a Lubrinorte como referencia de qualidade no segmento de lubrificantes no Brasil.

**Visao de medio prazo (6–18 meses):** Estabelecer o site como o principal canal de geracao de leads B2B, com integracao a CRM e fluxos de nutricao automatizados.

**Visao de longo prazo (18+ meses):** Evoluir o site para um hub de conteudo tecnico (blog, fichas tecnicas, calculadora de lubrificacao) que posicione a Lubrinorte como autoridade no tema, melhorando o ranqueamento organico e a fidelizacao de clientes.

### 1.4 Proposta de Valor do Produto Digital

| Para quem | O site oferece | Diferencial |
|-----------|---------------|-------------|
| Gerente de compras industrial | Catalogo tecnico claro, certificacoes e formulario de orcamento | Agilidade e credibilidade tecnica |
| Proprietario de oficina mecanica | Catalogo por aplicacao (automovel, moto, diesel) e contato rapido | Facilidade de encontrar o produto certo |
| Distribuidor / Representante | Pagina de parcerias e materiais de suporte comercial | Visao de oportunidade de negocio |
| Consumidor final | Informacoes sobre onde comprar e qual produto usar | Orientacao e confianca na marca |

---

## 2. Objetivos de Negocio

### 2.1 Objetivo Principal

Consolidar a presenca digital da Lubrinorte como ferramenta de geracao de receita e fortalecimento de marca, transformando visitantes anonimos em oportunidades comerciais rastreadas.

### 2.2 Objetivos Mensuráveis e KPIs

**OBJ-01 — Geracao de Leads Qualificados**
- Meta: Atingir 150 leads qualificados por mes ao final do 3o mes pos-lancamento
- KPI: Numero de formularios de orcamento/contato submetidos por mes
- Baseline: 0 (site novo) ou [numero atual do canal anterior]
- Metodo de medicao: Google Analytics 4 + CRM integrado

**OBJ-02 — Reducao da Taxa de Rejeicao**
- Meta: Taxa de rejeicao abaixo de 45% em todas as paginas principais
- KPI: Bounce Rate por pagina (GA4)
- Razao: Um site com design premium e animacoes envolventes deve reter o visitante
- Metodo: GA4 com eventos de scroll depth (25%, 50%, 75%, 100%)

**OBJ-03 — Tempo Medio de Permanencia**
- Meta: Tempo medio na pagina superior a 2 minutos e 30 segundos
- KPI: Average Engagement Time (GA4)
- Razao: Conteudo de qualidade e experiencia visual rica retêm o usuario
- Metodo: Monitoramento mensal via GA4

**OBJ-04 — Cobertura do Catalogo de Produtos**
- Meta: 100% do catalogo de produtos catalogados e indexados no site no lancamento
- KPI: Numero de produtos publicados vs. catalogo total da empresa
- Razao: Site incompleto gera desconfianca e perda de oportunidade
- Metodo: Auditoria de conteudo pre-lancamento

**OBJ-05 — Performance Tecnica (Core Web Vitals)**
- Meta: LCP < 2,5s, CLS < 0,1, FID/INP < 200ms em dispositivos moveis
- KPI: Pontuacao do Google PageSpeed Insights >= 85 (mobile) e >= 95 (desktop)
- Razao: Performance diretamente impacta SEO e experiencia do usuario
- Metodo: Medicao mensal via Google Search Console e PageSpeed Insights

**OBJ-06 — Alcance Organico (SEO)**
- Meta: Atingir posicao media <= 15 nas SERPs para as 10 palavras-chave prioritarias em 6 meses
- KPI: Posicao media e impressoes no Google Search Console
- Palavras-chave alvo: "oleo lubrificante industrial [cidade/regiao]", "distribuidor de lubrificantes", "oleo motor automotivo", entre outros
- Metodo: Google Search Console, monitoramento quinzenal

---

## 3. Personas de Usuario

### Persona 1 — Carlos Mendes, Gerente de Manutencao Industrial

**Perfil Demografico**
- Idade: 42 anos
- Localizacao: Sao Paulo / Grande ABC
- Cargo: Gerente de Manutencao em industria metalurgica de medio porte
- Educacao: Tecnico em Mecanica, curso de gestao industrial
- Renda: R$ 8.000–14.000/mes

**Contexto e Comportamento**
Carlos e responsavel pela compra de lubrificantes para uma frota de maquinas industriais. Seu volume de compra mensal e significativo (400–1.200 litros), e ele presta contas ao diretor de operacoes sobre custo e disponibilidade. Acessa a internet principalmente via desktop, durante o horario comercial. Pesquisa no Google antes de acionar o setor de compras.

**Objetivos**
- Encontrar fornecedor confiavel com especificacoes tecnicas precisas
- Comparar viscosidade, aplicacoes e certificacoes (ISO, API) rapidamente
- Solicitar orcamento sem precisar ligar primeiro
- Verificar se a empresa tem historico solido e certificacoes de qualidade

**Dores**
- Sites que nao tem ficha tecnica do produto (PDF para download)
- Demora para receber resposta de orcamento
- Dificuldade em encontrar o produto certo para cada maquina
- Falta de informacoes sobre CNPJ, endereco e historico da empresa

**Como o Site Ajuda**
- Catalogo tecnico com filtros por aplicacao, viscosidade e norma tecnica
- Formulario de orcamento com campos especificos (volume, aplicacao, prazo)
- Pagina "Sobre" com historico, certificacoes e localizacao
- Download de fichas tecnicas em PDF diretamente do catalogo

**Citacao Representativa**
"Se o site nao tem a ficha tecnica, ja passo para o proximo fornecedor. Preciso das specs antes de qualquer reuniao."

---

### Persona 2 — Rodrigo Alves, Proprietario de Oficina Mecanica

**Perfil Demografico**
- Idade: 35 anos
- Localizacao: Belo Horizonte, MG
- Cargo: Dono e mecanico-chefe de oficina com 4 funcionarios
- Educacao: Ensino medio, cursos tecnicos de mecanica automotiva
- Renda: R$ 5.000–9.000/mes (lucro do negocio)

**Contexto e Comportamento**
Rodrigo compra oleo de motor, filtros e fluidos para sua oficina. Faz compras mensais de volume moderado (50–200 litros). Acessa o site principalmente pelo celular, muitas vezes entre atendimentos. E influenciado por custo-beneficio, disponibilidade local e facilidade de contato.

**Objetivos**
- Encontrar oleos certos para modelos especificos de veiculos (FIAT, VW, GM, Ford)
- Localizar o distribuidor mais proximo para compra rapida
- Entender as diferencas entre linhas (semi-sintetico, sintetico, mineral)
- Ter numero de WhatsApp para pedidos rapidos

**Dores**
- Sites tecnicos demais, sem linguagem acessivel
- Nao encontrar aplicacao por modelo de veiculo
- Formularios longos e burocraticos
- Site que nao abre bem no celular

**Como o Site Ajuda**
- Catalogo com filtro por tipo de veiculo e aplicacao (motor, cambio, direcao)
- Botao de WhatsApp flutuante e visivel em mobile
- Localizador de distribuidores por CEP ou estado
- Linguagem clara e acessivel nas descricoes dos produtos

**Citacao Representativa**
"Quero saber se tem o oleo certo para o Gol G6 e onde comprar perto daqui. Simples assim."

---

### Persona 3 — Patricia Souza, Diretora Comercial de Distribuidora

**Perfil Demografico**
- Idade: 48 anos
- Localizacao: Curitiba, PR
- Cargo: Diretora Comercial em distribuidora de autopeças e lubrificantes
- Educacao: Graduacao em Administracao, MBA em Vendas
- Renda: R$ 15.000–25.000/mes

**Contexto e Comportamento**
Patricia avalia fornecedores de lubrificantes para incluir no portfolio da sua distribuidora. Ela analisa com cuidado o posicionamento de marca, qualidade do material de marketing, certificacoes e potencial de margem. Usa notebook no escritorio e tablet em viagens. Toma decisoes mais lentas, com multiplos pontos de contato.

**Objetivos**
- Avaliar o posicionamento e a seriedade da marca Lubrinorte
- Entender as linhas de produto e a proposta de valor para revenda
- Encontrar contato comercial adequado para negociacao de parceria
- Ter acesso a materiais de apresentacao (catalogo PDF, apresentacao institucional)

**Dores**
- Sites amadores que passam imagem de empresa nao estruturada
- Falta de pagina dedicada a distribuidores/parceiros
- Ausencia de informacoes sobre condicoes comerciais e suporte tecnico
- Dificuldade em identificar o responsavel comercial da empresa

**Como o Site Ajuda**
- Design premium que transmite credibilidade e solidez da marca
- Secao "Seja um Parceiro" com beneficios claros e formulario de contato B2B
- Pagina institucional com historico, missao e diferenciais competitivos
- Download de catalogo institucional em PDF

**Citacao Representativa**
"O site e o primeiro filtro. Se nao passa credibilidade, nem ligo. Preciso ver que e uma empresa seria antes de qualquer conversa."

---

### Persona 4 — Lucas Ferreira, Gestor de Frota de Transportadora

**Perfil Demografico**
- Idade: 38 anos
- Localizacao: Goiania, GO
- Cargo: Gerente de Frota em empresa de transporte rodoviario
- Educacao: Tecnico em Logistica, especializacao em gestao de frotas
- Renda: R$ 6.000–11.000/mes

**Contexto e Comportamento**
Lucas gerencia uma frota de 45 caminhoes e precisa de lubrificantes em grande volume e com regularidade (compras quinzenais). Prioriza confiabilidade de fornecimento, especificacoes tecnicas para motores diesel e suporte tecnico pos-venda. Acessa por desktop e celular.

**Objetivos**
- Encontrar oleos com especificacoes API CK-4 ou CJ-4 para motores diesel
- Garantir fornecimento continuado com prazo de entrega confiavel
- Ter suporte tecnico disponivel para duvidas sobre trocas e intervalos
- Negociar contrato de fornecimento com condicoes especiais

**Dores**
- Catalogo sem distincao clara entre linhas diesel e gasolina
- Falta de informacao sobre capacidade de entrega e abrangencia geografica
- Ausencia de casos de sucesso com outras frotas
- Site sem sinal de que a empresa atende demandas de grande volume

**Como o Site Ajuda**
- Linha dedicada a "Diesel e Frotas" no catalogo com especificacoes API/ACEA
- Secao de cases e clientes (logos de empresas atendidas)
- Formulario de orcamento com campo de volume estimado mensal
- Pagina de contato com indicacao de atendimento especializado para frotas

**Citacao Representativa**
"Preciso saber se o oleo tem especificacao correta para os motores da minha frota e se a empresa consegue entregar toda quinzena no volume que preciso."

---

## 4. Jornadas de Usuario

### Jornada 1 — Primeira Visita de um Cliente B2B (Carlos / Lucas)

**Ponto de Entrada:** Pesquisa no Google por "oleo lubrificante industrial SP" ou "distribuidor de lubrificantes"

```
[Google SERP]
     |
     v
[Pagina inicial — Hero animado com proposta de valor clara]
     |
     +-- Scroll down --> [Secao de Categorias de Produtos]
     |                         |
     |                         v
     |               [Click em categoria: Industrial / Frotas]
     |                         |
     |                         v
     |               [Pagina de Catalogo filtrada]
     |                         |
     |                         v
     |               [Pagina de Produto individual — ficha tecnica]
     |                         |
     |                         v
     |               [Download PDF ou CTA "Solicitar Orcamento"]
     |
     +-- Scroll direto --> [Secao Sobre / Historia]
     |
     +-- Scroll direto --> [Secao Clientes / Certificacoes]
     |
     v
[Formulario de Contato / Orcamento]
     |
     v
[Confirmacao: "Entraremos em contato em ate 24h uteis"]
     |
     v
[E-mail automatico de confirmacao para o lead]
```

**Momento de Decisao:** O usuario decide continuar ou sair no Hero. Se a proposta de valor nao for clara em menos de 5 segundos, ele vai embora.

**Acoes Criticas:**
1. Hero deve comunicar "quem somos" e "o que fazemos" imediatamente
2. Navegacao para o catalogo deve ser a menos de 1 clique da home
3. O formulario de orcamento deve ser acessivel em todas as paginas (CTA no header fixo)

---

### Jornada 2 — Busca de Produto por Oficina (Rodrigo)

**Ponto de Entrada:** Acessa pelo celular, vindo de indicacao de outro mecanico ou busca direta

```
[Home — mobile]
     |
     v
[Toca no menu hamburger ou scroll rapido ate catalogo]
     |
     v
[Seleciona: "Automotivo"]
     |
     v
[Filtra por: "Motor a gasolina" > "Semi-sintetico"]
     |
     v
[Ve lista de produtos — imagens, nome e viscosidade]
     |
     v
[Clica em produto: "Lubrinorte Sintetico 5W-30"]
     |
     v
[Pagina do produto: foto, descricao, aplicacoes (modelos de carro), especificacoes]
     |
     v
[CTA: "Encontrar Distribuidor" ou "WhatsApp"]
     |
     v
[Localizador: digita CEP, recebe lista de distribuidores proximos com contato]
```

**Momento de Decisao:** O usuario precisa encontrar o produto certo em no maximo 3 toques no mobile.

**Acoes Criticas:**
1. Filtros de produto devem funcionar perfeitamente em mobile (touch-friendly)
2. Cada produto deve listar aplicacoes por modelo de veiculo
3. Botao de WhatsApp deve estar sempre visivel (flutuante)

---

### Jornada 3 — Avaliacao de Parceria (Patricia)

**Ponto de Entrada:** Link enviado por representante comercial ou pesquisa por "distribuidores de lubrificantes"

```
[Home — desktop]
     |
     v
[Experiencia cinematografica do Hero — ja forma percepcao de qualidade]
     |
     v
[Navega ate "Sobre" no menu]
     |
     v
[Pagina Institucional: historia, valores, estrutura, certificacoes]
     |
     v
[Volta ao menu > "Seja um Parceiro" ou "Trabalhe Conosco / Distribuidores"]
     |
     v
[Pagina de Parcerias: beneficios, como funciona, depoimentos de parceiros]
     |
     v
[Formulario de parceria: nome, empresa, CNPJ, regiao de atuacao, volume estimado]
     |
     v
[Confirmacao + promessa de retorno em 48h por um consultor]
     |
     v
[Download opcional do catalogo institucional em PDF]
```

**Momento de Decisao:** Patricia forma sua opiniao nos primeiros 10 segundos. O design e a qualidade visual sao determinantes.

**Acoes Criticas:**
1. Design deve passar credibilidade imediata — sem elementos amadores
2. Pagina "Sobre" deve ser robusta: historia, fotos, numeros da empresa
3. Formulario de parceria deve ter campos relevantes para B2B (CNPJ, regiao, volume)

---

### Jornada 4 — Retorno de Visitante / Cliente Atual

**Ponto de Entrada:** Acessa diretamente pela URL ou busca pela marca

```
[Home]
     |
     v
[Scroll rapido ate catalogo — ja sabe o que quer]
     |
     v
[Busca pelo nome do produto especifico]
     |
     v
[Pagina do produto — confirma especificacoes]
     |
     v
[CTA: "Comprar" (link para distribuidor) ou "Contato" para pedido recorrente]
```

**Acoes Criticas:**
1. Campo de busca deve ser proeminente e funcional
2. URLs de produto devem ser estaticas e memorizaveis/compartilhaveis

---

## 5. Requisitos Funcionais

### 5.1 Estrutura e Navegacao

**[MUST] RF-NAV-01 — Menu de Navegacao Principal**
O site deve possuir menu de navegacao fixo no topo (sticky header) com os seguintes itens: Home, Produtos, Sobre, Clientes, Certificacoes, Distribuidores, Contato. O menu deve permanecer visivel durante toda a rolagem da pagina.

**[MUST] RF-NAV-02 — Menu Mobile (Hamburger)**
Em telas com largura menor que 768px, o menu principal deve ser substituido por um icone de hamburger que abre um menu lateral ou dropdown com os mesmos itens. A animacao de abertura/fechamento deve usar GSAP.

**[MUST] RF-NAV-03 — Indicador de Pagina Ativa**
O item de menu correspondente a pagina atual deve ter destaque visual (sublinhado animado, cor diferente ou negrito) para orientacao do usuario.

**[MUST] RF-NAV-04 — Logo Clicavel**
O logotipo no header deve ser clicavel e redirecionar para a pagina inicial (/).

**[SHOULD] RF-NAV-05 — Breadcrumbs**
Paginas de produto e subcategorias devem exibir breadcrumbs para facilitar a navegacao e o SEO (ex: Home > Produtos > Industrial > Oleo de Corte).

**[SHOULD] RF-NAV-06 — Botao CTA no Header**
O header deve conter um botao de CTA proeminente (ex: "Solicitar Orcamento") que abre o formulario de contato ou redireciona para a pagina de contato.

**[COULD] RF-NAV-07 — Barra de Busca Global**
Campo de busca acessivel pelo icone de lupa no header, permitindo busca por nome de produto, categoria ou palavra-chave.

---

### 5.2 Secao Hero

**[MUST] RF-HERO-01 — Hero em Tela Cheia**
A secao hero da pagina inicial deve ocupar 100% da altura da viewport (100vh) e 100% da largura da tela.

**[MUST] RF-HERO-02 — Titulo Principal com Animacao de Reveal**
O titulo principal (H1) deve revelar-se com animacao de texto cinematografica usando GSAP (ex: cada palavra ou linha sobe com easing personalizado, staggered). Tempo de animacao: 1,2s–1,8s total.

**[MUST] RF-HERO-03 — Video ou Imagem de Fundo Cinematografica**
O fundo do hero deve ser um video em loop (sem audio) ou uma imagem de alta qualidade com efeito de parallax. O video deve ser otimizado (formato WebM + MP4 fallback, max 8MB, preload="auto").

**[MUST] RF-HERO-04 — Chamada para Acao (CTA) Principal**
O hero deve conter ao menos um botao de CTA visivel e clicavel apos a animacao inicial, com texto claro (ex: "Conheca Nossos Produtos" ou "Solicite um Orcamento").

**[MUST] RF-HERO-05 — Indicador de Scroll**
Um indicador visual de scroll (seta animada ou texto "Scroll" com animacao) deve ser exibido no hero para orientar o usuario.

**[SHOULD] RF-HERO-06 — Subtitulo com Proposta de Valor**
Abaixo do titulo, um subtitulo deve comunicar a proposta de valor da Lubrinorte em uma frase (ex: "Lubrificantes de alta performance para industria, frotas e automoveis").

**[SHOULD] RF-HERO-07 — Animacao de Particulas ou Efeito de Oleo**
Efeito visual sutil (particulas douradas, ondas de oleo ou reflexo metalico) no fundo do hero para reforcar o universo da marca. Implementado via GSAP ou Canvas API.

---

### 5.3 Rolagem Suave com Lenis

**[MUST] RF-SCROLL-01 — Integracao do Lenis**
O site deve utilizar a biblioteca Lenis para rolagem suave em todas as paginas. A configuracao padrao deve ser: duration: 1.2, easing: exponential, smooth: true.

**[MUST] RF-SCROLL-02 — Compatibilidade com GSAP ScrollTrigger**
O Lenis deve estar corretamente integrado com o GSAP ScrollTrigger via ticker (gsap.ticker.add) para que todas as animacoes baseadas em scroll funcionem com precisao.

**[MUST] RF-SCROLL-03 — Desativacao em Mobile (Opcional por Configuracao)**
Em dispositivos moveis, a rolagem suave deve ser desativada ou ter sua intensidade reduzida (lerp: 1.0 em mobile) para evitar conflito com o scroll nativo do iOS/Android.

**[SHOULD] RF-SCROLL-04 — Progressao de Scroll**
Uma barra de progressao de scroll (linha fina na parte superior da pagina) deve indicar o progresso de leitura do usuario na pagina.

---

### 5.4 Catalogo de Produtos

**[MUST] RF-CAT-01 — Pagina de Listagem de Produtos**
O site deve conter uma pagina de catalogo com todos os produtos listados, organizados por categoria. Layout em grid responsivo (3 colunas desktop, 2 tablet, 1 mobile).

**[MUST] RF-CAT-02 — Categorias de Produtos**
Os produtos devem ser organizados nas seguintes categorias (ajustaveis conforme portfolio real):
- Industrial (oleos de corte, engrenagens, compressores, hidraulicos)
- Automotivo (motor a gasolina, motor diesel, cambio, direcao)
- Frotas e Transportadoras
- Motocicletas
- Agricola e Off-Road
- Graxas e Fluidos Especiais

**[MUST] RF-CAT-03 — Filtros de Produto**
A pagina de catalogo deve permitir filtragem por: Categoria, Viscosidade (ex: 5W-30, 15W-40), Aplicacao (motor, cambio, hidraulico), Norma tecnica (API, ISO, ACEA). Os filtros devem funcionar sem recarregar a pagina (JavaScript/React state).

**[MUST] RF-CAT-04 — Card de Produto**
Cada produto no grid deve exibir: foto do produto, nome completo, viscosidade/grau, tag de categoria, e botao "Ver Detalhes".

**[MUST] RF-CAT-05 — Pagina de Detalhe do Produto**
Cada produto deve ter uma pagina propria com: foto em alta resolucao, nome, descricao tecnica, especificacoes (viscosidade, normas atendidas, aplicacoes), disponibilidade de embalagens (1L, 4L, 20L, 200L), e botao de CTA ("Solicitar Orcamento" ou "Encontrar Distribuidor").

**[MUST] RF-CAT-06 — Download de Ficha Tecnica**
Cada produto deve oferecer download da ficha tecnica em PDF. O arquivo deve abrir em nova aba ou fazer download direto.

**[SHOULD] RF-CAT-07 — Busca por Aplicacao de Veiculo**
Um widget de busca por veiculo (Marca > Modelo > Ano > Motor) deve sugerir os oleos compativeis. Implementacao: tabela de compatibilidade ou API de catalogo automotivo.

**[SHOULD] RF-CAT-08 — Produtos em Destaque**
A pagina inicial deve exibir uma secao "Produtos em Destaque" com 4–6 produtos selecionados manualmente, com animacao de entrada via GSAP ScrollTrigger.

**[COULD] RF-CAT-09 — Comparador de Produtos**
Ferramenta para comparar lado a lado 2–3 produtos selecionados, exibindo as especificacoes em tabela.

---

### 5.5 Secao Sobre / Historia

**[MUST] RF-SOBRE-01 — Pagina Institucional Completa**
O site deve conter uma pagina "Sobre a Lubrinorte" com: historia da empresa (ano de fundacao, trajetoria), missao, visao e valores, estrutura e capacidade produtiva, e localizacao com mapa integrado (Google Maps embed).

**[MUST] RF-SOBRE-02 — Timeline da Historia**
A historia da empresa deve ser apresentada em uma timeline horizontal ou vertical com animacoes de entrada via GSAP ScrollTrigger, revelando cada marco ao ser scrollado.

**[MUST] RF-SOBRE-03 — Numeros da Empresa**
Secao com numeros impactantes animados (counter animation via GSAP): anos de mercado, numero de produtos, estados atendidos, clientes ativos. Os numeros devem ser animados ao entrar na viewport.

**[SHOULD] RF-SOBRE-04 — Fotos da Empresa**
Galeria de fotos da fabrica, equipe e instalacoes. Minimo 6 fotos de alta qualidade. Layout com efeito parallax ou carrossel GSAP.

**[SHOULD] RF-SOBRE-05 — Equipe de Lideranca**
Cards com foto, nome e cargo dos diretores/gestores da empresa, caso a empresa queira divulgar.

---

### 5.6 Secao Clientes e Parceiros

**[MUST] RF-CLIENTES-01 — Logos de Clientes/Parceiros**
Secao com logos das empresas atendidas ou parceiras, exibidos em carrossel infinito horizontal animado (auto-play via GSAP ou CSS). Minimo: 10 logos.

**[MUST] RF-CLIENTES-02 — Depoimentos**
Secao com 3–6 depoimentos de clientes reais, exibidos em carrossel com foto (ou inicial), nome, empresa e cargo.

**[SHOULD] RF-CLIENTES-03 — Setores Atendidos**
Secao visual com icones representando os setores de atuacao: Industrial, Automotivo, Agricola, Transportadoras, Oficinas.

---

### 5.7 Secao de Certificacoes e Qualidade

**[MUST] RF-CERT-01 — Exibicao de Certificacoes**
Secao dedicada a exibir as certificacoes obtidas (ex: ISO 9001, API, INMETRO, outros). Cada certificacao deve ter: logo/selo, nome, numero do certificado e data de validade (se aplicavel).

**[MUST] RF-CERT-02 — Proposta de Qualidade**
Texto institucional sobre o compromisso da Lubrinorte com qualidade, processos de controle e testes.

**[SHOULD] RF-CERT-03 — Download dos Certificados**
Certificados devem ser baixaveis em PDF para due diligence de clientes B2B.

---

### 5.8 Formulario de Contato e Orcamento

**[MUST] RF-FORM-01 — Formulario de Contato Geral**
Formulario com campos: Nome, E-mail, Telefone (com mascara), Mensagem, Tipo de Consulta (dropdown: Orcamento / Distribuicao / Suporte Tecnico / Outro). Botao de envio com feedback visual (loading state, sucesso, erro).

**[MUST] RF-FORM-02 — Formulario de Orcamento Especifico**
Formulario com campos adicionais: Empresa (para B2B), Produto de interesse (dropdown ou multipla selecao), Volume estimado (litros/mes), Estado de entrega. Campo de arquivo opcional para anexar especificacao tecnica.

**[MUST] RF-FORM-03 — Validacao em Tempo Real**
Todos os campos obrigatorios devem ser validados em tempo real (ao perder foco) com mensagens de erro claras e acessiveis.

**[MUST] RF-FORM-04 — Notificacao por E-mail**
O envio do formulario deve disparar notificacao por e-mail para o responsavel comercial da Lubrinorte e e-mail de confirmacao para o lead.

**[MUST] RF-FORM-05 — Protecao Anti-Spam**
O formulario deve implementar protecao contra bots: reCAPTCHA v3 (invisivel) ou honeypot field.

**[SHOULD] RF-FORM-06 — Integracao com WhatsApp**
Botao flutuante do WhatsApp (bottom-right) visivel em todas as paginas, com numero pre-configurado e mensagem pre-definida (ex: "Ola, vim pelo site e quero mais informacoes sobre os produtos").

**[SHOULD] RF-FORM-07 — Localizador de Distribuidores**
Pagina ou modal com mapa interativo (Google Maps API) e lista de distribuidores por estado. Usuario insere CEP e recebe distribuidores proximos ordenados por distancia.

---

### 5.9 SEO

**[MUST] RF-SEO-01 — Meta Tags Basicas**
Cada pagina deve ter title, meta description e meta robots unicos e otimizados. Limite: title 50–60 chars, description 150–160 chars.

**[MUST] RF-SEO-02 — Open Graph e Twitter Cards**
Todas as paginas devem ter tags Open Graph (og:title, og:description, og:image, og:url) e Twitter Cards para compartilhamento em redes sociais.

**[MUST] RF-SEO-03 — Sitemap XML**
Um sitemap.xml deve ser gerado automaticamente e submetido ao Google Search Console.

**[MUST] RF-SEO-04 — Robots.txt**
Arquivo robots.txt corretamente configurado, permitindo indexacao das paginas publicas e bloqueando areas administrativas.

**[MUST] RF-SEO-05 — Schema Markup**
Implementar JSON-LD para: Organization (home), Product (paginas de produto), BreadcrumbList (paginas internas), LocalBusiness (pagina de contato).

**[MUST] RF-SEO-06 — URLs Amigaveis**
Todas as URLs devem ser descritivas e sem parametros (ex: /produtos/oleo-motor-5w30-sintetico). Sem ID numericos na URL de produto.

**[SHOULD] RF-SEO-07 — Hreflang**
Se houver versao em outro idioma no futuro, implementar hreflang. Por ora, declarar lang="pt-BR" no HTML.

---

### 5.10 Mobile e Responsividade

**[MUST] RF-MOBILE-01 — Design Mobile-First**
O desenvolvimento deve seguir abordagem mobile-first, com breakpoints: 375px (mobile pequeno), 768px (tablet), 1024px (desktop pequeno), 1440px (desktop padrao), 1920px (widescreen).

**[MUST] RF-MOBILE-02 — Touch Targets**
Todos os elementos interativos (botoes, links, filtros) devem ter area minima de toque de 44x44px em mobile (guideline da Apple HIG).

**[MUST] RF-MOBILE-03 — Imagens Responsivas**
Todas as imagens devem usar o atributo srcset e sizes para servir resolucoes adequadas a cada dispositivo. Formato: WebP com fallback JPEG/PNG.

**[MUST] RF-MOBILE-04 — Animacoes Reduzidas em Mobile**
Em dispositivos moveis ou quando o usuario tem prefers-reduced-motion ativo, as animacoes GSAP devem ser simplificadas ou desativadas para garantir performance e acessibilidade.

---

### 5.11 LGPD e Cookies

**[MUST] RF-LGPD-01 — Banner de Cookies**
Banner de consentimento de cookies deve aparecer na primeira visita, com opcoes: "Aceitar Todos", "Somente Necessarios" e "Personalizar". O banner nao deve bloquear o conteudo (design nao-modal, posicao bottom).

**[MUST] RF-LGPD-02 — Politica de Privacidade**
Pagina dedicada com Politica de Privacidade completa conforme exigencias da LGPD (Lei 13.709/2018), incluindo: dados coletados, finalidade, base legal, direitos do titular, tempo de retencao e contato do DPO.

**[MUST] RF-LGPD-03 — Termos de Uso**
Pagina com Termos de Uso do site.

**[MUST] RF-LGPD-04 — Google Analytics com Consentimento**
O Google Analytics (GA4) so deve ser carregado apos consentimento do usuario. Implementar via Consent Mode v2 do Google.

**[SHOULD] RF-LGPD-05 — Gerenciador de Preferencias de Cookies**
Modal ou pagina onde o usuario pode gerenciar suas preferencias de cookies por categoria (Necessarios, Analytics, Marketing) apos o consentimento inicial.

---

## 6. Requisitos de Experiencia Visual e Animacao

### 6.1 Principios de Design

O design do site da Lubrinorte deve seguir os principios de design cinematografico aplicado ao digital:

- **Contraste dramatico:** Uso de areas escuras e iluminadas para criar profundidade e foco
- **Movimento intencional:** Cada animacao existe para guiar o olhar, nao para decorar
- **Pausa e ritmo:** Elementos revelam-se com tempo calculado — nao tudo de uma vez
- **Textura e materialidade:** Elementos graficos que remetem ao metal, oleo e precisao industrial
- **Espaco negativo:** Generoso uso de espacamento para respiracao visual e percepcao de premium

---

### 6.2 Paleta de Cores

**Cores Primarias**

| Nome | HEX | RGB | Uso |
|------|-----|-----|-----|
| Preto Profundo | `#0A0A0A` | 10, 10, 10 | Fundo principal, secoes escuras |
| Branco Puro | `#FFFFFF` | 255, 255, 255 | Texto em fundo escuro, espacos |
| Dourado Lubrinorte | `#C9A84C` | 201, 168, 76 | Acentos, CTAs, destaques |

**Cores Secundarias**

| Nome | HEX | RGB | Uso |
|------|-----|-----|-----|
| Cinza Escuro | `#1A1A1A` | 26, 26, 26 | Cards, secoes alternadas |
| Cinza Medio | `#3A3A3A` | 58, 58, 58 | Bordas, divisores, inputs |
| Cinza Claro | `#8A8A8A` | 138, 138, 138 | Texto secundario, labels |
| Dourado Claro | `#E8C96A` | 232, 201, 106 | Hover states, gradientes |
| Dourado Escuro | `#9A7A2E` | 154, 122, 46 | Sombras, pressed states |

**Gradientes**

- Gradiente Primario: `linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)`
- Gradiente Dourado: `linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #9A7A2E 100%)`
- Gradiente de Borda: `linear-gradient(90deg, transparent, #C9A84C, transparent)` (para linhas divisoras)

**Aplicacao de Cores**
- Fundo das secoes: alterna entre `#0A0A0A` e `#1A1A1A` para criar ritmo visual
- Texto principal: `#FFFFFF` sobre fundo escuro; `#0A0A0A` sobre fundo claro
- Botoes primarios: fundo `#C9A84C`, texto `#0A0A0A`, hover: fundo `#E8C96A`
- Botoes secundarios: borda `#C9A84C`, texto `#C9A84C`, hover: fundo `#C9A84C`, texto `#0A0A0A`

---

### 6.3 Tipografia

**Fonte de Titulo — Display**
- Familia: `Bebas Neue` ou `Anton` (Google Fonts, gratuita)
- Alternativa premium: `Neue Haas Grotesk Display` ou `Clash Display`
- Uso: H1, H2, titulos de secao, numeros impactantes
- Peso: 400 (unico peso disponivel)
- Tracking: 0.05em a 0.15em (letras espacadas para impacto)

**Fonte de Texto — Body**
- Familia: `Inter` (Google Fonts, gratuita)
- Alternativa premium: `Neue Haas Grotesk Text`
- Uso: Paragrafos, labels, descricoes, formularios
- Pesos utilizados: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
- Line-height: 1.5 para leitura, 1.2 para subtitulos

**Fonte de Acento / Tecnica**
- Familia: `IBM Plex Mono` (Google Fonts, gratuita)
- Uso: Especificacoes tecnicas (viscosidade, normas), badges, codigos
- Peso: 400, 500

**Escala Tipografica (Desktop)**
| Elemento | Tamanho | Peso | Linha |
|---------|---------|------|-------|
| H1 (Hero) | 96–120px | 400 (Display) | 1.0 |
| H2 (Secao) | 64–72px | 400 (Display) | 1.05 |
| H3 (Cards) | 32–40px | 400 (Display) | 1.1 |
| Subtitulo | 18–20px | 300 (Inter) | 1.4 |
| Body | 16px | 400 (Inter) | 1.6 |
| Small | 14px | 400 (Inter) | 1.5 |
| Label / Tag | 12px | 500 (Inter) | 1.4 |
| Mono | 14px | 400 (IBM Plex Mono) | 1.4 |

---

### 6.4 Animacoes GSAP — Especificacoes Detalhadas

#### 6.4.1 Configuracao Global

```javascript
// gsap.config() — aplicar globalmente
gsap.config({
  force3D: true,        // Forcas GPU para todas as animacoes
  nullTargetWarn: false // Sem warnings em elementos nao encontrados
});

// Defaults
gsap.defaults({
  ease: "power3.out",
  duration: 0.8
});
```

#### 6.4.2 Hero — Timeline Principal

**[MUST] ANI-HERO-01 — Sequencia de Entrada do Hero**

A timeline do hero deve executar na ordem abaixo, com os tempos especificados:

```
T+0.0s  : Video/imagem de fundo faz fade-in (opacity 0->1, duration: 1.5s, ease: power2.inOut)
T+0.3s  : Overlay escuro aparece (opacity 0->0.6, duration: 0.8s)
T+0.8s  : Eyebrow text (categoria/tagline) sobe de baixo (y: 30->0, opacity: 0->1, duration: 0.6s)
T+1.0s  : Linha 1 do titulo: clip-path reveal (de baixo para cima, duration: 0.8s, ease: power4.out)
T+1.2s  : Linha 2 do titulo: mesma animacao, stagger 0.15s
T+1.4s  : Subtitulo: fade + translateY (y: 20->0, opacity: 0->1, duration: 0.7s)
T+1.8s  : CTA Button: escala de 0.9->1 + opacity (duration: 0.5s, ease: back.out(1.7))
T+2.0s  : Scroll indicator: aparece com animacao de bounce infinito
```

**Tecnica de Texto:** Usar SplitText do GSAP (plugin) ou implementacao manual com spans por linha para o efeito de clip-path reveal.

#### 6.4.3 ScrollTrigger — Secoes Gerais

**[MUST] ANI-ST-01 — Fade + Rise Padrao**
Todo elemento de conteudo (paragrafos, cards, imagens) que entra na viewport deve animar com:
- `opacity: 0 -> 1`
- `y: 60 -> 0`
- `duration: 0.8s`
- `ease: power3.out`
- `trigger: "top 85%"` (dispara quando o topo do elemento chega a 85% da tela)

**[MUST] ANI-ST-02 — Stagger em Grids**
Elementos em grid (cards de produto, logos de clientes) devem animar com stagger de 0.1s entre cada item.

**[MUST] ANI-ST-03 — Contadores Numericos**
Os numeros da secao "Numeros da Empresa" devem animar de 0 ao valor final quando entram na viewport, usando `gsap.to({ val: 0 }, { val: FINAL, onUpdate })` com duration: 2.0s e ease: power2.out.

**[MUST] ANI-ST-04 — Parallax em Imagens de Fundo**
Imagens de fundo em secoes devem ter efeito de parallax suave:
- `y: "-15%" -> "15%"` durante o scroll pela secao
- Scrub: 1 (smooth, 1 segundo de lag)
- `trigger: start "top bottom", end: "bottom top"`

**[SHOULD] ANI-ST-05 — Pin Section — Secao de Categorias**
A secao de categorias do catalogo deve usar ScrollTrigger com `pin: true`, revelando cada categoria enquanto o usuario scrolla, antes de despinnar e continuar.

**[SHOULD] ANI-ST-06 — Horizontal Scroll — Timeline da Historia**
A timeline da historia da empresa deve rolar horizontalmente enquanto o usuario scrolla verticalmente, usando ScrollTrigger com `scrub: 1` e `pin: true`.

**[SHOULD] ANI-ST-07 — Linha Animada como Divisor**
Linhas divisorias entre secoes devem ser desenhadas da esquerda para a direita via `scaleX: 0->1`, `transformOrigin: "left center"`, ativadas pelo ScrollTrigger.

**[COULD] ANI-ST-08 — Texto em Marquee (Carrossel de Clientes)**
Logos de clientes em carrossel infinito com velocidade constante, pausando no hover. Implementado via GSAP timeline com `repeat: -1` e `reversed` no mouseover.

#### 6.4.4 Animacoes de Hover e Interacao

**[MUST] ANI-INT-01 — Hover em Cards de Produto**
Ao hover num card de produto: borda dourada aparece, imagem faz zoom leve (scale: 1->1.05), sombra aumenta. Tudo com GSAP `duration: 0.3s, ease: power2.out`.

**[MUST] ANI-INT-02 — Hover em Botoes Primarios**
Background faz sweep da esquerda para direita (clip-path ou pseudo-elemento), duration: 0.35s.

**[MUST] ANI-INT-03 — Menu Hamburger**
Abertura do menu mobile: linhas do hamburger transformam-se em X via GSAP. Menu lateral/overlay faz translate e fade.

**[SHOULD] ANI-INT-04 — Cursor Personalizado (Desktop)**
Cursor circular personalizado que: aumenta ao passar sobre elementos clicaveis, muda de cor sobre o hero, mistura com elementos de fundo (mix-blend-mode: difference ou similar). Implementado via GSAP para suavidade (lerp do cursor).

**[SHOULD] ANI-INT-05 — Transicao entre Paginas**
Transicao suave ao navegar entre paginas: overlay escuro entra e sai, sincronizado com o carregamento da nova pagina. Implementado via GSAP + View Transitions API ou framework routing.

---

### 6.5 Configuracao do Lenis

```javascript
// Inicializacao recomendada
const lenis = new Lenis({
  duration: 1.2,           // Duracao da animacao de scroll
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
  direction: 'vertical',   // Direcao do scroll
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,      // Sensibilidade do mouse wheel
  smoothTouch: false,      // Desativado em touch (iOS/Android)
  touchMultiplier: 2,      // Multiplicador de velocidade em touch
  infinite: false          // Sem scroll infinito
});

// Integracao com GSAP RAF
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integracao com ScrollTrigger
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  }
});
```

---

### 6.6 Principios de Motion

1. **Hierarquia de entrada:** Elementos mais importantes animam primeiro, secundarios em stagger
2. **Consistencia de easing:** power3.out para entradas, power3.in para saidas
3. **Duracao proporcional a distancia:** Elementos que se movem mais ficam em tela por mais tempo
4. **Nunca animar opacidade isoladamente:** Sempre combinar com translacao (y) para dar sensacao de fisicalidade
5. **Respeitar prefers-reduced-motion:** Toda animacao deve ter fallback sem movimento
6. **Performance first:** Animar apenas `transform` e `opacity` — nunca `width`, `height`, `top`, `left`

---

## 7. Requisitos Nao-Funcionais

### 7.1 Performance (Core Web Vitals)

**[MUST] RNF-PERF-01 — Largest Contentful Paint (LCP)**
- Meta: LCP <= 2,5 segundos em conexao 4G simulada (75o percentil)
- Estrategias: Preload do LCP element, imagens com priority, servidor com CDN
- Ferramenta de medicao: Google PageSpeed Insights, Lighthouse CI

**[MUST] RNF-PERF-02 — Cumulative Layout Shift (CLS)**
- Meta: CLS <= 0,1 (classificacao "Good" do Google)
- Estrategias: Definir width/height em todas as imagens, evitar injecao dinamica de conteudo acima do fold, fontes com font-display: swap
- Ferramenta de medicao: Google Search Console, WebPageTest

**[MUST] RNF-PERF-03 — Interaction to Next Paint (INP)**
- Meta: INP <= 200ms
- Estrategias: Evitar blocking JavaScript no main thread, usar web workers para processamento pesado, debounce em event handlers
- Ferramenta de medicao: Chrome DevTools, RUM (Real User Monitoring)

**[MUST] RNF-PERF-04 — Pontuacao do PageSpeed Insights**
- Meta: >= 85 em mobile, >= 95 em desktop
- Medido na pagina inicial e em pelo menos 3 paginas internas (produto, sobre, contato)

**[MUST] RNF-PERF-05 — Otimizacao de Imagens**
- Todas as imagens devem ser servidas em formato WebP
- Imagens acima do fold: atributo `loading="eager"` e `fetchpriority="high"`
- Imagens abaixo do fold: atributo `loading="lazy"`
- Maximo: 200KB por imagem; excepcoes justificadas para hero (max 400KB)

**[MUST] RNF-PERF-06 — Video Otimizado**
- Video do hero: WebM (VP9) com fallback MP4 (H.264)
- Resolucao maxima: 1920x1080 para desktop, 768x1080 para mobile
- Tamanho maximo: 8MB para WebM, 12MB para MP4
- Atributos: `autoplay muted loop playsinline preload="auto"`

**[SHOULD] RNF-PERF-07 — Bundle JavaScript**
- Bundle total de JavaScript (sem contar video) deve ser <= 250KB gzipped
- Code splitting por rota implementado (lazy loading de paginas internas)
- GSAP e Lenis devem ser importados somente nos modulos que os utilizam

**[SHOULD] RNF-PERF-08 — Cache e CDN**
- Assets estaticos (imagens, fontes, JS, CSS) devem ser servidos via CDN (ex: Cloudflare, Vercel Edge Network, Netlify CDN)
- Cache-Control: immutable para assets com hash no nome (ex: main.abc123.js)
- Cache-Control: max-age=86400 para imagens de conteudo

---

### 7.2 Acessibilidade (WCAG 2.1 AA)

**[MUST] RNF-ACSS-01 — Contraste de Cores**
- Texto normal: contraste minimo 4,5:1 contra o fundo
- Texto grande (>= 18px normal ou >= 14px negrito): contraste minimo 3:1
- Verificar especialmente: texto dourado sobre fundo preto, texto branco sobre video

**[MUST] RNF-ACSS-02 — Navegacao por Teclado**
- Todos os elementos interativos devem ser acessiveis e operaveis via teclado (Tab, Enter, Space, setas)
- Ordem de foco deve seguir a ordem visual da pagina
- Focus ring visivel em todos os elementos focaveis (outline nunca removido sem substituto visual)

**[MUST] RNF-ACSS-03 — ARIA e Semantica**
- Uso correto de elementos semanticos HTML5 (header, nav, main, section, article, footer)
- ARIA labels em elementos sem texto visivel (icones, botoes apenas com imagem)
- Role="region" e aria-label em secoes importantes para leitores de tela

**[MUST] RNF-ACSS-04 — Texto Alternativo em Imagens**
- Toda imagem informativa deve ter `alt` descritivo
- Imagens decorativas devem ter `alt=""` e `role="presentation"`

**[MUST] RNF-ACSS-05 — Preferencia de Movimento Reduzido**
- Implementar media query `prefers-reduced-motion: reduce` em todos os CSS de animacao
- GSAP deve verificar esta preferencia e desativar ou simplificar animacoes

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  gsap.globalTimeline.timeScale(100); // Ou desativar completamente
}
```

**[MUST] RNF-ACSS-06 — Formularios Acessiveis**
- Todos os campos de formulario devem ter `<label>` associado (via for/id ou wrapping)
- Mensagens de erro devem ser associadas ao campo via `aria-describedby`
- Estado de erro deve ser indicado tambem por cor E icone (nao somente cor)

**[SHOULD] RNF-ACSS-07 — Teste com Leitores de Tela**
- O site deve ser testado com NVDA (Windows) e VoiceOver (macOS/iOS) antes do lancamento
- Relatorio de acessibilidade deve acompanhar a entrega

---

### 7.3 Suporte a Navegadores

**[MUST] RNF-BROWSER-01 — Navegadores Suportados**
O site deve funcionar corretamente (sem erros visuais ou funcionais criticos) nos seguintes navegadores:

| Navegador | Versao Minima | Plataforma |
|-----------|--------------|------------|
| Google Chrome | Ultimas 2 versoes | Desktop + Android |
| Mozilla Firefox | Ultimas 2 versoes | Desktop |
| Microsoft Edge | Ultimas 2 versoes | Desktop |
| Safari | Ultimas 2 versoes | Desktop + iOS |
| Samsung Internet | Versao 18+ | Android |

**[MUST] RNF-BROWSER-02 — Progressive Enhancement**
O site deve ser funcional (sem JavaScript) no nivel basico: conteudo legivel, links funcionais. As animacoes e interatividade sao aprimoramento progressivo.

**[SHOULD] RNF-BROWSER-03 — Polyfills**
Se necessario, usar polyfills seletivos para features usadas (ex: View Transitions API). Usar `@supports` no CSS para features experimentais.

---

### 7.4 Seguranca

**[MUST] RNF-SEG-01 — HTTPS Obrigatorio**
O site deve ser servido exclusivamente via HTTPS, com redirecionamento 301 de HTTP para HTTPS. Certificado SSL valido e renovado automaticamente.

**[MUST] RNF-SEG-02 — Headers de Seguranca HTTP**
Implementar os seguintes headers:
- `Content-Security-Policy` (CSP) restritivo
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` desabilitando features nao utilizadas

**[MUST] RNF-SEG-03 — Sanitizacao de Inputs**
Todos os campos de formulario devem ter sanitizacao server-side. Nenhum input de usuario deve ser renderizado como HTML sem sanitizacao.

**[SHOULD] RNF-SEG-04 — Rate Limiting no Backend**
API de envio de formulario deve ter rate limiting (ex: max 5 submissoes por IP por hora) para prevenir abuso.

---

## 8. Historias de Usuario

### US-001 — Primeira Impressao do Site

**Titulo:** Experiencia cinematografica na primeira visita  
**Como** visitante anonimo chegando ao site pela primeira vez,  
**quero** ver uma experiencia visual de alta qualidade logo ao abrir a pagina,  
**para que** eu forme uma percepcao positiva e premium da marca Lubrinorte imediatamente.

**Criterios de Aceite:**
- Dado que o usuario acessa a URL do site, quando a pagina carrega, entao o hero anima-se em sequencia (video de fundo, titulo, subtitulo, CTA) em no maximo 2,0 segundos apos o LCP
- Dado que o usuario esta no hero, quando ele nao interage por 3 segundos, entao o indicador de scroll aparece pulsando
- Dado que o usuario tem prefers-reduced-motion ativo, quando a pagina carrega, entao o hero exibe conteudo estatico sem animacoes de movimento

---

### US-002 — Navegacao para o Catalogo

**Titulo:** Acesso rapido ao catalogo de produtos  
**Como** gerente de manutencao industrial,  
**quero** acessar o catalogo de produtos em no maximo 1 clique a partir da home,  
**para que** eu possa encontrar as especificacoes tecnicas rapidamente sem frustracao.

**Criterios de Aceite:**
- Dado que o usuario esta na home, quando ele clica em "Produtos" no menu, entao e redirecionado para /produtos em menos de 0,5s (sem recarregamento de pagina se SPA)
- Dado que o usuario esta na pagina de produtos, quando visualiza o grid, entao ve cards com foto, nome, viscosidade e categoria de cada produto
- Dado que o catalogo tem mais de 12 produtos, quando a pagina carrega, entao os produtos sao exibidos em grid com paginacao ou carregamento progressivo

---

### US-003 — Filtro por Categoria de Produto

**Titulo:** Filtragem de produtos por categoria  
**Como** proprietario de oficina mecanica,  
**quero** filtrar os produtos por categoria (ex: Motor a Gasolina),  
**para que** eu veja apenas os oleos relevantes para meu negocio sem scrollar por produtos irrelevantes.

**Criterios de Aceite:**
- Dado que o usuario esta na pagina de produtos, quando ele seleciona o filtro "Automotivo > Motor a Gasolina", entao apenas os produtos desta categoria sao exibidos
- Dado que o usuario aplica um filtro, quando o resultado e mostrado, entao a URL e atualizada (ex: /produtos?categoria=motor-gasolina) permitindo compartilhamento do link filtrado
- Dado que nenhum produto corresponde ao filtro, quando o resultado e exibido, entao uma mensagem amigavel e mostrada sugerindo contato

---

### US-004 — Visualizacao de Produto Individual

**Titulo:** Pagina de detalhe do produto  
**Como** gerente de frota de transportadora,  
**quero** ver todas as informacoes tecnicas de um produto em uma pagina dedicada,  
**para que** eu possa tomar uma decisao de compra informada sem precisar ligar para a empresa.

**Criterios de Aceite:**
- Dado que o usuario clica em um card de produto, quando a pagina do produto carrega, entao exibe: foto em alta resolucao, nome, descricao tecnica, especificacoes (viscosidade, normas API/ISO, aplicacoes), embalagens disponiveis e CTA de orcamento
- Dado que o produto tem ficha tecnica disponivel, quando o usuario clica em "Baixar Ficha Tecnica", entao o PDF e aberto em nova aba ou inicia download automatico
- Dado que o usuario esta na pagina do produto em mobile, quando acessa em smartphone 375px, entao a pagina e legivel e usavel sem zoom manual necessario

---

### US-005 — Solicitacao de Orcamento

**Titulo:** Envio de formulario de orcamento  
**Como** diretor de compras de industria,  
**quero** solicitar um orcamento pelo site sem precisar ligar,  
**para que** eu receba retorno da equipe comercial com as informacoes que preciso.

**Criterios de Aceite:**
- Dado que o usuario acessa o formulario de orcamento, quando preenche Nome, E-mail, Produto de Interesse e Mensagem e clica em "Enviar", entao recebe confirmacao visual de sucesso na tela
- Dado que o formulario e enviado com sucesso, quando o servidor processa, entao o usuario recebe e-mail de confirmacao em ate 2 minutos e a equipe da Lubrinorte recebe notificacao
- Dado que o usuario tenta enviar o formulario com campo obrigatorio vazio, quando clica em "Enviar", entao o campo invalido e destacado em vermelho com mensagem de erro especifica
- Dado que o usuario e um bot, quando tenta submeter o formulario via automacao, entao o reCAPTCHA v3 bloqueia a submissao e retorna erro 403

---

### US-006 — Contato via WhatsApp

**Titulo:** Iniciar conversa pelo WhatsApp  
**Como** proprietario de oficina mecanica acessando pelo celular,  
**quero** clicar em um botao de WhatsApp visivel,  
**para que** eu possa fazer meu pedido de forma rapida e familiar.

**Criterios de Aceite:**
- Dado que o usuario acessa qualquer pagina do site, quando rola ou permanece na pagina, entao o botao flutuante do WhatsApp e visivel no canto inferior direito
- Dado que o usuario clica no botao de WhatsApp, quando o app e aberto, entao a conversa inicia com a mensagem pre-definida "Ola, vim pelo site e gostaria de mais informacoes"
- Dado que o usuario esta em desktop, quando clica no botao, entao e redirecionado para web.whatsapp.com ou para o app se instalado

---

### US-007 — Localizacao de Distribuidor

**Titulo:** Encontrar distribuidor mais proximo  
**Como** mecanico de oficina em Belo Horizonte,  
**quero** encontrar o distribuidor de lubrificantes Lubrinorte mais proximo da minha oficina,  
**para que** eu possa comprar o produto sem ter que esperar frete de longa distancia.

**Criterios de Aceite:**
- Dado que o usuario acessa a pagina/secao de distribuidores, quando digita seu CEP e clica em "Buscar", entao ve a lista de distribuidores com nome, endereco, telefone e distancia aproximada
- Dado que o usuario esta na lista de distribuidores, quando clica no endereco, entao e redirecionado para o Google Maps com a rota ate o distribuidor
- Dado que nao ha distribuidor cadastrado na regiao, quando o resultado e exibido, entao aparece mensagem sugerindo contato direto pela Lubrinorte com link para o formulario

---

### US-008 — Conhecer a Historia da Empresa

**Titulo:** Explorar a trajetoria da Lubrinorte  
**Como** diretora comercial de distribuidora avaliando parceiros,  
**quero** entender a historia e o porte da Lubrinorte,  
**para que** eu confie que e uma empresa estabelecida e confiavel para fechar parceria.

**Criterios de Aceite:**
- Dado que o usuario acessa a pagina "Sobre", quando scrolla, entao ve uma timeline horizontal/vertical com os marcos historicos da empresa animados em sequencia
- Dado que o usuario chega na secao de numeros, quando a secao entra na viewport, entao os contadores (anos, clientes, estados, produtos) animam de 0 ao valor final
- Dado que o usuario acessa a pagina "Sobre" em mobile, quando visualiza, entao a timeline adapta-se ao layout vertical e e totalmente navegavel em toque

---

### US-009 — Consultar Certificacoes

**Titulo:** Verificar certificacoes de qualidade  
**Como** gerente de manutencao industrial,  
**quero** ver as certificacoes obtidas pela Lubrinorte,  
**para que** eu tenha seguranca tecnica para aprovar o fornecedor junto ao meu departamento de qualidade.

**Criterios de Aceite:**
- Dado que o usuario acessa a pagina ou secao de certificacoes, quando visualiza, entao ve selo/logo de cada certificacao com nome, numero e validade
- Dado que a certificacao tem PDF disponivel, quando o usuario clica em "Baixar Certificado", entao o documento e baixado ou aberto em nova aba
- Dado que o usuario e um auditor verificando a empresa, quando acessa a pagina de certificacoes, entao encontra todas as informacoes necessarias sem precisar entrar em contato

---

### US-010 — Ser um Distribuidor / Parceiro

**Titulo:** Manifestar interesse em ser parceiro  
**Como** diretor comercial de distribuidora,  
**quero** encontrar facilmente como posso me tornar distribuidor da Lubrinorte,  
**para que** eu possa iniciar uma negociacao de parceria comercial.

**Criterios de Aceite:**
- Dado que o usuario quer ser distribuidor, quando navega pelo site, entao encontra o link "Seja um Parceiro" ou similar no menu principal ou no footer
- Dado que o usuario acessa a pagina de parcerias, quando a visualiza, entao ve beneficios claros, como funciona o processo e um formulario especifico com campos de CNPJ, regiao e volume
- Dado que o formulario de parceria e preenchido e enviado, quando a equipe recebe, entao um consultor retorna em ate 48 horas uteis (esta informacao e exibida na confirmacao)

---

### US-011 — Navegacao por Teclado (Acessibilidade)

**Titulo:** Usar o site somente com teclado  
**Como** usuario com deficiencia motora que nao usa mouse,  
**quero** navegar por todo o site usando somente o teclado,  
**para que** eu acesse todas as funcionalidades sem barreiras.

**Criterios de Aceite:**
- Dado que o usuario pressiona Tab, quando navega pela pagina, entao todos os elementos interativos recebem foco em ordem logica e com focus ring visivel
- Dado que o usuario esta no menu de navegacao, quando pressiona Enter, entao o item e ativado; quando pressiona Escape, entao o menu dropdown fecha
- Dado que o usuario esta no formulario, quando preenche todos os campos via teclado e pressiona Enter no botao de envio, entao o formulario e submetido normalmente

---

### US-012 — Consentimento de Cookies (LGPD)

**Titulo:** Controlar preferencias de cookies  
**Como** visitante preocupado com privacidade,  
**quero** escolher quais cookies aceitar,  
**para que** eu use o site sem que dados desnecessarios sejam coletados sem minha permissao.

**Criterios de Aceite:**
- Dado que o usuario acessa o site pela primeira vez, quando a pagina carrega, entao aparece o banner de consentimento de cookies antes de qualquer cookie de analytics ser disparado
- Dado que o usuario clica em "Somente Necessarios", quando o consentimento e registrado, entao o Google Analytics nao e inicializado nessa sessao
- Dado que o usuario clica em "Personalizar", quando abre o modal, entao pode ativar/desativar categorias individualmente (Necessarios, Analytics, Marketing)
- Dado que o usuario aceitou ou recusou anteriormente, quando volta ao site, entao o banner nao aparece novamente ate que os cookies expirem (30 dias)

---

### US-013 — Visualizacao Mobile do Hero

**Titulo:** Hero responsivo em smartphone  
**Como** usuario acessando pelo iPhone com tela de 390px,  
**quero** que o hero carregue rapido e seja legivel,  
**para que** eu tenha uma primeira impressao positiva mesmo em mobile.

**Criterios de Aceite:**
- Dado que o usuario acessa o hero em mobile, quando a pagina carrega, entao o video de fundo e substituido por imagem estatica otimizada (ou video reduzido) para economizar dados
- Dado que o usuario esta no hero em mobile 390px, quando visualiza, entao o titulo e o CTA sao legivel e clicaveis sem precisar de zoom
- Dado que o LCP e medido em mobile 4G, quando medido via PageSpeed Insights, entao o resultado e <= 2,5 segundos

---

### US-014 — Compartilhamento de Produto nas Redes Sociais

**Titulo:** Compartilhar produto no WhatsApp / LinkedIn  
**Como** comprador tecnico querendo recomendar um produto para um colega,  
**quero** compartilhar o link de um produto e ele aparecer com imagem e descricao,  
**para que** meu colega entenda do que se trata sem nem precisar abrir o link.

**Criterios de Aceite:**
- Dado que o usuario compartilha a URL de um produto no WhatsApp, quando a preview e gerada, entao exibe a imagem do produto, o nome e a descricao curta
- Dado que o usuario compartilha no LinkedIn, quando a preview e gerada, entao exibe og:image, og:title e og:description corretos para aquele produto especifico
- Dado que a imagem Open Graph e definida, quando validada no Meta Sharing Debugger, entao dimensoes sao 1200x630px sem elementos cortados

---

## 9. Metricas de Sucesso

### 9.1 Dashboard de KPIs

Todas as metricas abaixo devem ser monitoradas mensalmente. Um dashboard no Google Looker Studio deve ser criado consolidando as fontes de dados.

### 9.2 Metricas de Aquisicao

| Metrica | Baseline | Meta 3 meses | Meta 6 meses | Fonte |
|---------|---------|--------------|--------------|-------|
| Sessoes mensais organicas | 0 | 500 | 2.000 | GA4 |
| Impressoes no Google Search | 0 | 10.000 | 50.000 | Search Console |
| Posicao media palavras-chave alvo | N/A | <= 30 | <= 15 | Search Console |
| Novos usuarios por mes | 0 | 400 | 1.500 | GA4 |

### 9.3 Metricas de Comportamento

| Metrica | Meta | Alerta (abaixo de) | Fonte |
|---------|------|--------------------|-------|
| Taxa de rejeicao (home) | <= 45% | 60% | GA4 |
| Taxa de rejeicao (produto) | <= 40% | 55% | GA4 |
| Tempo medio de engajamento | >= 2min30s | 1min | GA4 |
| Paginas por sessao | >= 2,5 | 1,5 | GA4 |
| Scroll depth >= 50% (home) | >= 60% usuarios | 40% | GA4 (evento custom) |

### 9.4 Metricas de Conversao

| Metrica | Meta | Alerta | Fonte |
|---------|------|--------|-------|
| Formularios enviados / mes | >= 150 | < 50 | GA4 + CRM |
| Taxa de conversao (visita -> formulario) | >= 2% | < 0,8% | GA4 |
| Downloads de ficha tecnica / mes | >= 80 | < 20 | GA4 (evento custom) |
| Cliques no WhatsApp / mes | >= 100 | < 30 | GA4 (evento custom) |
| Leads de parceria / mes | >= 10 | < 3 | GA4 + CRM |

### 9.5 Metricas de Performance Tecnica

| Metrica | Meta "Good" | Meta Minima Aceitavel | Ferramenta |
|---------|-------------|----------------------|-----------|
| LCP (mobile) | <= 2,5s | <= 4,0s | CrUX / PSI |
| LCP (desktop) | <= 1,8s | <= 2,5s | CrUX / PSI |
| CLS | <= 0,1 | <= 0,25 | CrUX / PSI |
| INP (mobile) | <= 200ms | <= 500ms | CrUX / PSI |
| PageSpeed Score (mobile) | >= 85 | >= 70 | PSI |
| PageSpeed Score (desktop) | >= 95 | >= 85 | PSI |
| TTFB (Time to First Byte) | <= 800ms | <= 1.800ms | WebPageTest |

### 9.6 Metricas de Acessibilidade e Qualidade

| Metrica | Meta | Ferramenta |
|---------|------|-----------|
| Lighthouse Accessibility Score | >= 95 | Lighthouse CI |
| Lighthouse SEO Score | >= 95 | Lighthouse CI |
| Lighthouse Best Practices | >= 95 | Lighthouse CI |
| Zero erros criticos de acessibilidade (axe) | 0 erros criticos | axe DevTools |
| Cobertura de schema markup | 100% das paginas de produto | Google Rich Results Test |

### 9.7 Cadencia de Revisao

- **Semanal:** Metricas de conversao e formularios (alertas automaticos se abaixo do alerta)
- **Mensal:** Revisao completa do dashboard com todo o time
- **Trimestral:** Revisao estrategica: ajuste de metas, prioridades de conteudo e otimizacoes tecnicas

---

## 10. Consideracoes Tecnicas

### 10.1 Framework Recomendado

**Recomendacao Principal: Next.js 14+ (App Router)**

**Justificativa:**
- SSG (Static Site Generation) para paginas de conteudo estatico (home, sobre, certificacoes) = velocidade maxima
- SSR (Server-Side Rendering) para paginas dinamicas (catalogo com filtros, busca)
- ISR (Incremental Static Regeneration) para atualizacao de catalogo sem rebuild completo
- Excelente suporte a SEO com renderizacao server-side
- Ecosistema React maduro com ampla adocao no Brasil
- Vercel (plataforma otimizada para Next.js) oferece CDN global, analytics integrado e deploys automaticos
- Suporte nativo a otimizacao de imagens (`next/image`) com WebP automatico

**Alternativas Avaliadas:**
- **Astro:** Excelente para sites estaticos com pouco JS — porem pode complicar integracao de animacoes GSAP interativas e formularios dinamicos
- **Vite + React SPA:** Rapido no desenvolvimento — porem sem SSR nativo, o que prejudica SEO
- **Nuxt (Vue):** Valida, mas o ecossistema de componentes GSAP e maior em React

### 10.2 GSAP — Licenca e Plugins

**Licenca necessaria: GSAP Club GreenSock — Business Green**

| Plugin | Uso | Licenca |
|--------|-----|---------|
| GSAP Core | Todas as animacoes basicas | Gratuita (com atribuicao em hobby) |
| ScrollTrigger | Animacoes baseadas em scroll, pin sections | Gratuita |
| SplitText | Animacoes letra a letra / linha a linha | Club GreenSock (pago) |
| Observer | Controle preciso de eventos de scroll/touch | Gratuita |
| DrawSVG | Animacao de linhas SVG | Club GreenSock (pago) |
| Flip | Animacoes de layout FLIP | Gratuita |

**Custo estimado:** USD 199/ano (Business Green — permite uso em sites comerciais)

**Nota importante:** Para uso comercial (sites de empresas), o GSAP Core e ScrollTrigger sao gratuitos. SplitText e DrawSVG requerem licenca Club. Se o orcamento nao permitir, SplitText pode ser substituido por implementacao manual com spans.

### 10.3 Lenis — Integracao

- Versao: `@studio-freight/lenis` >= 1.0.0 ou `lenis` >= 1.1.0 (pacote renomeado)
- Lenis e MIT License — gratuito para uso comercial
- Integracao com Next.js: usar em componente client-side com `useEffect` no layout raiz
- Lenis deve ser inicializado uma unica vez na aplicacao (singleton pattern)

### 10.4 CMS Headless (Recomendado para Manutencao de Conteudo)

**Recomendacao: Sanity.io**

**Justificativa:**
- Interface de administracao intuitiva para equipe nao-tecnica da Lubrinorte
- Schema flexivel para produtos, categorias, certificacoes e distribuidores
- API GraphQL + GROQ para consultas otimizadas
- Plano gratuito cobre o uso inicial; plano Growth (USD 15/mes) para uso intensivo
- Deploy do studio no proprio dominio da empresa (admin.lubrinorte.com.br)
- Suporte a uploads de PDF (fichas tecnicas, certificados) e imagens

**Alternativas:**
- **Contentful:** Mais estabelecido, porem mais caro para volumes maiores
- **Strapi (self-hosted):** Gratuito, mas requer servidor proprio para o CMS
- **Payload CMS:** Alternativa moderna e open-source, excelente integracao com Next.js

**Dados gerenciados via CMS:**
- Catalogo de produtos (nome, descricao, especificacoes, imagem, ficha PDF)
- Categorias de produtos
- Distribuidores (nome, endereco, contato, lat/lng)
- Clientes / logos
- Depoimentos
- Certificacoes (nome, numero, validade, PDF)
- Conteudo da pagina "Sobre" (timeline, numeros)

### 10.5 Banco de Dados e Backend

- Para formularios de contato: API route do Next.js + servico de e-mail (Resend.com ou SendGrid)
- Para localizador de distribuidores: dados no CMS ou JSON estatico (se lista nao for muito grande)
- Para busca de produto: filtros client-side (se catalogo <= 200 produtos) ou Algolia (se catalogo maior)
- Nao e necessario banco de dados proprio na fase inicial — CMS + APIs externas cobrem os casos de uso

### 10.6 Hosting e Infraestrutura

**Recomendacao: Vercel (plano Pro)**

| Recurso | Detalhe |
|---------|---------|
| Hosting | Vercel Pro — USD 20/mes |
| CDN | Vercel Edge Network (global, incluido) |
| Dominio | Registrar .com.br no Registro.br |
| SSL | Automatico via Let's Encrypt (Vercel gerencia) |
| Analytics | Vercel Analytics + GA4 |
| Monitoramento | Vercel Speed Insights |

**Alternativa economica:** Netlify (plano Pro, USD 19/mes) com funcionalidades equivalentes.

### 10.7 Integracao de Terceiros

| Servico | Finalidade | Custo |
|---------|-----------|-------|
| Google Analytics 4 | Analytics de comportamento | Gratuito |
| Google Search Console | Monitoramento SEO | Gratuito |
| Google Maps API | Mapa de distribuidores | USD 0–200/mes (depende de volume) |
| reCAPTCHA v3 | Protecao de formularios | Gratuito |
| Resend.com | Envio de e-mails transacionais | Gratuito ate 3.000/mes; USD 20/mes para mais |
| WhatsApp Business API | Botao flutuante | Gratuito (link simples via wa.me) |
| Hotjar (opcional) | Heatmaps e gravacoes de sessao | A partir de USD 32/mes |

### 10.8 Estrutura de Repositorio e Deploy

```
lubrinorte-site/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Grupo de rotas publicas
│   │   ├── page.tsx        # Home (/)
│   │   ├── sobre/          # /sobre
│   │   ├── produtos/       # /produtos
│   │   │   └── [slug]/     # /produtos/[slug]
│   │   ├── certificacoes/
│   │   ├── distribuidores/
│   │   └── contato/
│   ├── api/                # API Routes
│   │   └── formulario/
│   └── layout.tsx          # Layout raiz com Lenis
├── components/
│   ├── gsap/               # Componentes de animacao
│   ├── ui/                 # Componentes de interface
│   └── sections/           # Secoes reutilizaveis
├── lib/
│   ├── gsap.ts             # Configuracao e utils GSAP
│   ├── lenis.ts            # Singleton do Lenis
│   └── sanity.ts           # Client do Sanity
├── public/
│   ├── videos/             # Video do hero
│   └── fonts/              # Fontes self-hosted
└── sanity/                 # Studio do CMS (Sanity)
    └── schemas/
```

**Pipeline de deploy:**
- Branch `main` -> deploy automatico em producao (Vercel)
- Branch `develop` -> deploy automatico em preview (URL de preview da Vercel)
- PRs geram preview deployments individuais para revisao

---

## 11. Fases de Implementacao

### Fase 0 — Preparacao (2 semanas)

**Objetivo:** Configurar ambiente, definir identidade visual e preparar assets

**Escopo:**
- [ ] Definicao final da paleta de cores, tipografia e identidade visual com aprovacao da Lubrinorte
- [ ] Fotografia/producao de video para o hero (ou selecao de material existente)
- [ ] Levantamento completo do catalogo de produtos com especificacoes e fotos
- [ ] Configuracao do repositorio Git, ambientes de desenvolvimento e staging
- [ ] Setup do CMS Sanity com schemas definidos
- [ ] Setup do projeto Next.js com GSAP, Lenis e estrutura de pastas
- [ ] Contratacao do dominio lubrinorte.com.br (ou confirmacao do atual)

**Entregaveis:**
- Repositorio configurado e rodando localmente
- Design System aprovado (cores, tipografia, grid, componentes basicos)
- CMS operacional com estrutura de dados definida

---

### Fase 1 — MVP (6 semanas)

**Objetivo:** Lancamento do site com funcionalidades essenciais e qualidade visual premium

**Escopo:**

**Paginas:**
- [ ] Home completa (hero, destaque de produtos, sobre resumido, clientes, CTA)
- [ ] Pagina de Produtos / Catalogo (grid com filtros basicos por categoria)
- [ ] Pagina de Produto Individual (foto, descricao, especificacoes, CTA)
- [ ] Pagina Sobre (historia simplificada, numeros, localizacao)
- [ ] Pagina de Contato (formulario geral + WhatsApp)
- [ ] Pagina de Politica de Privacidade e Termos de Uso

**Funcionalidades:**
- [ ] Menu de navegacao responsivo (desktop + mobile hamburger)
- [ ] Hero com animacoes GSAP (sequencia de entrada)
- [ ] Lenis smooth scroll integrado com ScrollTrigger
- [ ] Animacoes de scroll nas secoes principais (fade + rise, contadores)
- [ ] Formulario de contato com validacao e envio de e-mail
- [ ] Botao flutuante de WhatsApp
- [ ] Banner de cookies LGPD com Google Analytics condicional
- [ ] SEO basico: meta tags, Open Graph, sitemap, schema markup Organization e Product
- [ ] Otimizacao de imagens (WebP, lazy loading, responsive)
- [ ] Certificado SSL e HTTPS

**Animacoes GSAP incluidas no MVP:**
- [ ] Hero timeline (entrada cinematografica)
- [ ] Fade + rise em todas as secoes
- [ ] Contadores numericos na secao de numeros
- [ ] Carrossel de logos de clientes (CSS ou GSAP basico)
- [ ] Hover nos cards de produto

**Criterio de saida do MVP:**
- Todas as paginas listadas publicadas e sem bugs criticos
- PageSpeed >= 80 mobile, >= 92 desktop
- Formulario de contato funcional (testado com envio real)
- LGPD compliant (banner de cookies)
- Zero erros de console em Chrome, Firefox e Safari

---

### Fase 2 — V1 — Experiencia Completa (6 semanas pos-MVP)

**Objetivo:** Adicionar funcionalidades avancadas de UX, animacoes premium e conversao

**Escopo:**

**Novas Paginas:**
- [ ] Pagina de Certificacoes (com download de PDFs)
- [ ] Pagina de Distribuidores / Localizador (mapa + lista)
- [ ] Pagina "Seja um Parceiro" (formulario B2B especifico)
- [ ] Pagina de Filtros avancados de produto (viscosidade, norma, aplicacao)

**Funcionalidades:**
- [ ] Download de fichas tecnicas por produto (PDF)
- [ ] Localizador de distribuidores com filtro por CEP/estado
- [ ] Formulario de orcamento especifico (B2B, com volume e produto)
- [ ] Busca global por produto/palavra-chave
- [ ] Breadcrumbs em paginas internas
- [ ] Botao CTA no header fixo
- [ ] Progressao de scroll (barra superior)

**Animacoes GSAP V1:**
- [ ] Timeline da historia com horizontal scroll (ScrollTrigger + pin)
- [ ] Pin section de categorias do catalogo
- [ ] Linhas divisoras animadas (scaleX)
- [ ] Cursor personalizado (desktop)
- [ ] Transicao suave entre paginas (View Transitions ou overlay GSAP)
- [ ] Efeito de particulas no hero (GSAP ou Canvas)
- [ ] SplitText reveal no hero e titulos de secao

**Criterio de saida da V1:**
- Todas as funcionalidades listadas operacionais
- PageSpeed >= 85 mobile, >= 95 desktop
- Lighthouse Accessibility >= 95
- Testado em Chrome, Firefox, Safari, Edge (desktop) e Chrome/Safari mobile
- 0 erros criticos de acessibilidade no axe

---

### Fase 3 — V2 — Hub de Conteudo e Otimizacao (3 meses pos-V1)

**Objetivo:** Posicionar a Lubrinorte como autoridade no segmento, ampliar alcance organico

**Escopo:**

**Novas Funcionalidades:**
- [ ] Blog / Central de Conteudo (artigos tecnicos, dicas de lubrificacao, noticias)
- [ ] Calculadora de Intervalo de Troca (ferramenta interativa para usuarios)
- [ ] Compatibilidade de produto por veiculo (Marca > Modelo > Ano > Motor)
- [ ] Comparador de produtos lado a lado
- [ ] Newsletter (captacao de e-mails com incentivo — ex: guia de lubrificacao)
- [ ] Integracao com CRM (HubSpot ou RD Station) para nutricao de leads
- [ ] Google Tag Manager para gerenciamento de tags sem deploy

**Melhorias Tecnicas:**
- [ ] Implementar A/B testing no CTA do hero
- [ ] Heatmaps com Hotjar para otimizacao de UX baseada em dados
- [ ] Implementar web push notifications (opt-in) para novos produtos/conteudos
- [ ] Schema markup para Article (blog) e FAQ (se implementado)
- [ ] Acelerar LCP: explorar Edge Functions para servidor mais proximo do usuario

---

## 12. Riscos e Mitigacoes

### RISCO-01 — Performance Prejudicada pelas Animacoes GSAP

**Probabilidade:** Alta  
**Impacto:** Alto (afeta UX, SEO e Core Web Vitals)

**Descricao:** Animacoes GSAP mal implementadas podem causar jank (queda de frames), aumentar o tempo de carregamento e prejudicar as metricas de Core Web Vitals, especialmente em dispositivos moveis de entrada (que sao comuns no Brasil).

**Mitigacoes:**
1. Animar exclusivamente `transform` e `opacity` — nunca propriedades que disparam layout ou paint (width, height, top, left, background-color)
2. Utilizar `will-change: transform` com criterio — somente nos elementos que serao animados
3. Implementar testes de performance em dispositivos reais de baixo custo (ex: Moto G Power) antes do lancamento
4. Desativar animacoes pesadas em mobile (parallax, particulas) e usar versoes simplificadas
5. Usar `gsap.ticker.lagSmoothing(0)` e configurar corretamente a integracao com Lenis para evitar double-animation
6. Configurar Lighthouse CI no pipeline para bloquear merges que reduzam a nota de performance abaixo do minimo

---

### RISCO-02 — Atraso na Producao de Assets (Fotos e Video)

**Probabilidade:** Media  
**Impacto:** Alto (sem assets de qualidade, o design cinematografico nao funciona)

**Descricao:** O design premium depende fundamentalmente de fotografia e video profissionais. Se a producao for adiada ou os materiais entregues forem de baixa qualidade, o site perde seu principal diferencial visual.

**Mitigacoes:**
1. Iniciar producao fotografica e de video na Fase 0, em paralelo com o desenvolvimento
2. Definir um banco de assets minimo obrigatorio para o lancamento do MVP: 1 video de hero, 6 fotos institucionais, fotos de todos os produtos
3. Manter um plano B com imagens de stock profissionais (Unsplash Pro, Getty) como substitutos temporarios, claramente identificados como temporarios no projeto
4. Briefing detalhado para o produtor: lista de shots necessarios, estilo (cinematografico, escuro, industrial), resolucao minima (4K para fotos, 1080p para video)

---

### RISCO-03 — Escopo do Catalogo de Produtos Desconhecido ou Incompleto

**Probabilidade:** Alta  
**Impacto:** Medio (atrasa o lancamento e pode reduzir a credibilidade se o catalogo for parcial)

**Descricao:** E comum que empresas nao tenham todos os dados de produtos organizados digitalmente (especificacoes, fotos individuais, fichas tecnicas). Isso pode atrasar o lancamento do MVP ou resultar em um catalogo incompleto que frustra o usuario B2B.

**Mitigacoes:**
1. Realizar levantamento completo do catalogo na Fase 0 com prazo maximo de 2 semanas
2. Definir o conjunto minimo de dados por produto para o lancamento: nome, categoria, viscosidade, 1 foto, descricao curta. Dados adicionais (ficha PDF, normas completas) podem ser adicionados pos-lancamento
3. O CMS Sanity facilita o preenchimento progressivo — equipe da Lubrinorte pode alimentar dados sem precisar de desenvolvedor
4. Criar template padrao de ficha tecnica para que a equipe interna produza os PDFs com consistencia visual

---

### RISCO-04 — Nao-Conformidade com LGPD

**Probabilidade:** Media  
**Impacto:** Alto (multas de ate R$ 50 milhoes ou 2% do faturamento, dano reputacional)

**Descricao:** O site coleta dados pessoais (formularios, analytics, cookies) e precisa estar em conformidade com a Lei Geral de Protecao de Dados (Lei 13.709/2018). Uma implementacao incorreta pode expor a Lubrinorte a riscos legais.

**Mitigacoes:**
1. Implementar banner de cookies com Consent Mode v2 do Google antes do lancamento — GA4 nao deve disparar sem consentimento
2. Elaborar Politica de Privacidade com assessoria juridica especializada em LGPD (nao usar apenas templates genericos)
3. Mapear todos os dados coletados pelo site: formularios (nome, e-mail, telefone, empresa), cookies de analytics, IP de acesso
4. Definir e documentar a base legal para cada tipo de dado coletado (consentimento, interesse legitimo, execucao de contrato)
5. Disponibilizar canal de exercicio de direitos do titular (art. 18 da LGPD): e-mail dedicado ou formulario no proprio site

---

### RISCO-05 — Rejeicao do Design pelo Cliente

**Probabilidade:** Media  
**Impacto:** Alto (retrabalho de design pode atrasar 4–6 semanas o lancamento)

**Descricao:** O estilo cinematografico e escuro pode nao estar alinhado com as expectativas ou identidade atual da Lubrinorte, gerando necessidade de redesign apos o inicio do desenvolvimento.

**Mitigacoes:**
1. Apresentar moodboard detalhado para aprovacao antes de iniciar qualquer codigo — incluir referencias de sites de referencia (Lambo, Rolls-Royce, lubricantes Shell V-Power, etc.)
2. Validar paleta de cores e tipografia com a diretoria na Fase 0, formalizando a aprovacao por escrito
3. Criar um prototipo de alta fidelidade (Figma) da home e de uma pagina de produto para aprovacao visual antes do desenvolvimento
4. Definir processo de revisao com maximo 2 rodadas de feedback por entregavel de design, com prazo maximo de 5 dias uteis por rodada

---

### RISCO-06 — Dependencia de Fornecedor Unico (Vercel/GSAP)

**Probabilidade:** Baixa  
**Impacto:** Medio

**Descricao:** A stack recomendada depende de servicos de terceiros (Vercel para hosting, GSAP Club para plugins). Mudancas de preco ou interrupcao desses servicos poderiam impactar o site.

**Mitigacoes:**
1. Next.js pode ser hospedado em qualquer provedor compativel com Node.js (AWS, Cloudflare, Railway) — nao ha lock-in tecnico com Vercel
2. O GSAP Core e ScrollTrigger sao gratuitos e cobrem 80% dos casos de uso — o SplitText pode ser substituido por implementacao propria
3. Manter o arquivo de licenca GSAP documentado e renovacao no calendario anual
4. Exportar configuracoes do Sanity regularmente — os dados de CMS podem ser migrados para outro headless CMS se necessario

---

## Apendice A — Glossario de Termos Tecnicos

| Termo | Definicao |
|-------|-----------|
| GSAP | GreenSock Animation Platform — biblioteca JavaScript de animacoes de alto desempenho |
| ScrollTrigger | Plugin GSAP para disparar animacoes baseadas na posicao de scroll |
| Lenis | Biblioteca de smooth scroll que intercepta o scroll nativo e o suaviza |
| LCP | Largest Contentful Paint — tempo ate o maior elemento visivel renderizar |
| CLS | Cumulative Layout Shift — instabilidade visual acumulada na pagina |
| INP | Interaction to Next Paint — tempo de resposta a interacoes do usuario |
| SSG | Static Site Generation — geracao de HTML no build, nao em cada request |
| SSR | Server-Side Rendering — geracao de HTML no servidor a cada request |
| ISR | Incremental Static Regeneration — regeneracao de paginas estaticas em background |
| CMS Headless | Sistema de gerenciamento de conteudo desacoplado do frontend |
| LGPD | Lei Geral de Protecao de Dados — Lei 13.709/2018 |
| Core Web Vitals | Conjunto de metricas do Google que mensuram a experiencia do usuario |
| Open Graph | Protocolo de metadados para controle de previews em redes sociais |
| Schema Markup | Dados estruturados em JSON-LD para melhor compreensao pelo Google |

---

## Apendice B — Referencias e Inspiracoes

**Sites de referencia de design premium:**
- Lamborghini.com — uso de video hero, tipografia bold, fundo escuro
- Shell.com/v-power — balanco entre premium e informacao tecnica
- Rolls-Royce.com — espaco negativo, movimento sutil, exclusividade
- Awwwards.com — buscar "industrial", "oil", "chemical" para referencias setoriais

**Referencias tecnicas:**
- GSAP Docs: https://gsap.com/docs/
- Lenis Docs: https://lenis.darkroom.engineering/
- Next.js Docs: https://nextjs.org/docs
- Core Web Vitals: https://web.dev/vitals/
- LGPD — Lei 13.709/2018: https://www.gov.br/mj/lgpd

---

*Este documento e propriedade da Lubrinorte e destina-se exclusivamente ao uso interno e pela equipe de desenvolvimento contratada. Versao 1.0 — 30 de maio de 2026.*
