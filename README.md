# Motel Bela Vista — Landing Page

Site institucional (landing page) do **Motel Bela Vista**, em São Leopoldo - RS. O objetivo é apresentar o motel de forma moderna e elegante, destacar as categorias de suítes e facilitar o contato e a reserva pelo WhatsApp.

## Proposta

- **Atrair e converter:** um visual sofisticado e discreto, com chamadas diretas para reservar pelo WhatsApp.
- **Mostrar o que o motel oferece:** suítes (Standard, Mini-Suíte, Suíte, Luxo e Super Luxo), comodidades e diferenciais.
- **Facilitar o acesso:** telefones, endereço, horário de funcionamento e mapa do Google.
- **Identidade visual da marca:** preto, dourado, vermelho e branco, a partir da logo e da fachada do motel.

## Seções da página

1. Menu fixo com botão de contato
2. Hero com a fachada do motel
3. Faixa de diferenciais (animada)
4. Sobre o motel, com números animados
5. Suítes, com foto e consulta pelo WhatsApp
6. Comodidades
7. Chamada para reserva
8. Localização, contatos e mapa
9. Rodapé, Instagram e botão flutuante de WhatsApp

## Tecnologias

- [Vue 3](https://vuejs.org/) (`<script setup>`) e [Vite](https://vite.dev/)
- CSS próprio, baseado no design system Hanzo (campo claro, cards com anel, botões pílula, tipografia justa), adaptado às cores do motel
- Efeitos: título letra por letra, texto que acende palavra por palavra ao rolar, cards inclinados, rabiscos desenhados e revelação ao rolar
- [unplugin-icons](https://github.com/unplugin/unplugin-icons) com o conjunto de ícones Solar
- Fontes: Inter e Instrument Serif (Google Fonts)

## Como rodar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev      # ambiente de desenvolvimento
npm run build    # gera a versão de produção em dist/
npm run preview  # visualiza o build localmente
```

## Estrutura

```
src/
├── assets/            # logo, fachada e fotos das suítes
├── components/        # NavBar, HeroSection, SuitesSection, etc.
├── data/
│   ├── site.js        # telefones, endereço, mapa, Instagram, suítes e comodidades
│   └── suiteImages.js # fotos de cada suíte
├── directives/reveal.js  # animação de entrada ao rolar a página
├── App.vue
└── style.css          # design tokens e estilos globais
hanzo-design-system/   # referência visual usada como base do design (não versionada)
img/                   # imagens originais (logo e fachada)
```

## Como editar o conteúdo

Quase todo o conteúdo do site fica em [`src/data/site.js`](src/data/site.js): telefones, endereço, link do mapa, Instagram, lista de suítes (nome, descrição e preço) e comodidades.

As fotos das suítes ficam em `src/assets/suites/` (um arquivo por categoria). **As fotos atuais são ilustrativas** (banco de imagens) e devem ser trocadas pelas fotos reais do motel, mantendo os mesmos nomes de arquivo.

## Pendências

- [ ] Trocar as fotos ilustrativas pelas fotos reais das suítes
- [ ] Definir descrições e valores reais de cada suíte
- [ ] Confirmar a lista de comodidades
- [ ] Confirmar o endereço e a posição do pino no mapa
- [ ] Publicar o site (hospedagem e domínio)

## Aviso

Conteúdo destinado a maiores de 18 anos.
