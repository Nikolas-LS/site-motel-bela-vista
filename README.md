# Motel Bela Vista — Landing Page

Site institucional (landing page) do **Motel Bela Vista**, em São Leopoldo - RS. Apresenta o motel de forma moderna e elegante, destaca as categorias de suítes e facilita o contato e a reserva pelo WhatsApp.

## Seções da página

1. Cabeçalho fixo com logo e menu
2. Hero com título animado, feixes de luz e a fachada
3. Faixa de diferenciais (animada)
4. O Motel, com texto que acende ao rolar e números animados
5. Suítes, com foto e consulta pelo WhatsApp
6. Comodidades
7. Chamada para reserva
8. Localização, contatos e mapa
9. Rodapé com redes sociais (Instagram, WhatsApp e Facebook)

## Tecnologias

- [Vue 3](https://vuejs.org/) (`<script setup>`, estilos `scoped`) e [Vite](https://vite.dev/)
- [unplugin-icons](https://github.com/unplugin/unplugin-icons) com os conjuntos Solar e Simple Icons
- CSS próprio, sem framework: tokens e estilos globais em `src/assets/styles/` e estilos de cada componente junto dele
- Fonte do título: Cormorant Garamond (Google Fonts)

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
├── assets/
│   ├── images/          # logo, fachada e fotos das suítes
│   └── styles/          # variables, base, typography, layout, components e animations (via main.css)
├── components/
│   ├── layout/          # TheHeader, TheFooter
│   ├── sections/        # HeroSection, AboutSection, SuitesSection, ...
│   └── ui/              # SplitText, WordReveal, CursorFollower, HeroStreams
├── composables/         # useCountUp, useParallax
├── data/                # conteúdo do site: site, navigation, suites, comforts, stats, marquee
├── directives/          # v-reveal, v-tilt, v-magnetic (registradas em index.js)
├── utils/               # media, whatsapp, ripple, smoothScroll
├── App.vue
└── main.js
```

O alias `@` aponta para `src/` (ex.: `import { site } from '@/data/site'`).

## Como editar o conteúdo

O conteúdo fica em [`src/data/`](src/data), sem precisar mexer nos componentes:

| Arquivo | O que contém |
| --- | --- |
| `site.js` | telefones, endereço, horário, link do mapa, Instagram e Facebook |
| `suites.js` | nome, descrição, preço, ícone e foto de cada suíte (a ordem da lista é a ordem dos cards) |
| `comforts.js` | lista de comodidades |
| `stats.js` | números da seção "O Motel" |
| `marquee.js` | frases da faixa animada |
| `navigation.js` | links do menu |

As fotos ficam em `src/assets/images/` (fachada) e `src/assets/images/suites/` (uma por categoria). **As fotos atuais são ilustrativas** (Unsplash) e devem ser trocadas pelas fotos reais do motel. Ao trocar, mantenha os nomes dos arquivos ou ajuste os imports em `src/data/suites.js` e nos componentes.

## Pendências

- [ ] Trocar as fotos ilustrativas pelas fotos reais
- [ ] Definir descrições e valores reais de cada suíte
- [ ] Confirmar a lista de comodidades
- [ ] Confirmar o endereço e a posição do pino no mapa
- [ ] Publicar o site (hospedagem e domínio)

## Aviso

Conteúdo destinado a maiores de 18 anos.
