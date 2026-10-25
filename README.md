<div align="center">

# Motel Bela Vista

**Landing page institucional do Motel Bela Vista, em São Leopoldo - RS.**

[![Site](https://img.shields.io/badge/site-motelbelavista.com-e63946?style=for-the-badge)](https://motelbelavista.com)
![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646cff?style=for-the-badge&logo=vite&logoColor=white)

<br />

<img src="docs/screenshots/hero.jpg" alt="Seção inicial do site, com o título Motel Bela Vista e a fachada" width="860" />

</div>

<br />

## Sobre o projeto

Site de página única que apresenta o motel, mostra as categorias de suítes com fotos reais e facilita o contato e a reserva pelo WhatsApp. Tudo foi feito sem framework de CSS, com animações próprias e suporte a **tema claro e escuro**, que acompanha o aparelho do visitante e pode ser trocado no botão do cabeçalho.

- Layout responsivo, com versão própria para celular
- Animações de entrada, texto que acende ao rolar, cards com inclinação 3D e botões magnéticos
- Carrossel de fotos em cada suíte
- Botões de reserva e consulta que abrem o WhatsApp com a mensagem já preenchida
- Todo o conteúdo (telefones, suítes, comodidades, textos) editável em arquivos simples, sem mexer nos componentes

## Tour pelas seções

Cada seção da página, na ordem em que aparece.

### 1. Cabeçalho e menu

Cabeçalho fixo com a logo à esquerda, o botão de **tema claro/escuro** e o botão **Menu**. O menu abre um painel com os links numerados das seções, o atalho **Reservar pelo WhatsApp** e os ícones das redes sociais (Instagram, WhatsApp e Facebook). Fecha com `Esc` ou ao clicar fora.

<div align="center">
<img src="docs/screenshots/mobile-menu.jpg" alt="Menu aberto no celular" width="260" />
</div>

### 2. Hero

A primeira impressão: título em fonte serifada com animação letra a letra, feixes de luz vermelhos ao fundo, a etiqueta **Aberto 24 horas - São Leopoldo - RS**, o botão **Reservar agora** e a foto da fachada, que inclina levemente ao passar o mouse.

<div align="center">
<img src="docs/screenshots/hero.jpg" alt="Seção Hero" width="860" />
</div>

### 3. Faixa de diferenciais

Uma faixa que corre continuamente logo abaixo do hero, com os pontos fortes do motel: *Privacidade total, Discrição, Conforto, Atendimento 24h, Higiene impecável, Ambientes românticos* e *Estacionamento privativo*.

<div align="center">
<img src="docs/screenshots/marquee.jpg" alt="Faixa animada de diferenciais" width="860" />
</div>

### 4. O Motel

Texto de apresentação cujas palavras **acendem conforme a rolagem**, foto da área interna e das garagens com a logo sobreposta, e três números que contam de zero até o valor final: **24h** de atendimento, **100%** de discrição e **365** dias por ano.

<div align="center">
<img src="docs/screenshots/sobre.jpg" alt="Seção O Motel" width="860" />
</div>

### 5. Suítes

Cinco categorias, cada uma em um card com **carrossel de fotos reais** (setas, indicadores e rolagem por toque): **Standard, Luxo, Super Luxo, Mini-Suíte** e **Suíte**. O botão **Consultar** abre o WhatsApp já perguntando sobre aquela suíte.

<div align="center">
<img src="docs/screenshots/suites.jpg" alt="Seção Suítes" width="860" />
</div>

### 6. Comodidades

Seis diferenciais com ícone: privacidade e sigilo, garagem privativa, climatização, entretenimento, room service e atendimento 24 horas.

<div align="center">
<img src="docs/screenshots/comodidades.jpg" alt="Seção Comodidades" width="860" />
</div>

### 7. Chamada para reserva

Bloco de destaque em vermelho, com o convite **"Pronto para uma noite especial?"** e o botão **Chamar no WhatsApp**, que abre a conversa com a mensagem de reserva pronta.

<div align="center">
<img src="docs/screenshots/reservas.jpg" alt="Chamada para reserva" width="860" />
</div>

### 8. Localização

Cartão com endereço, telefones (clicáveis para ligar) e horário de funcionamento, o botão **Como chegar** e o **mapa do Google** incorporado, já com o pino do motel.

<div align="center">
<img src="docs/screenshots/localizacao.jpg" alt="Seção Localização com mapa" width="860" />
</div>

### 9. Rodapé

Logo, frase de boas-vindas, redes sociais, links de navegação, contatos e o aviso **+18**.

<div align="center">
<img src="docs/screenshots/rodape.jpg" alt="Rodapé" width="860" />
</div>

## Tema claro e escuro

O site respeita o tema do aparelho e guarda a escolha do visitante. Os mesmos componentes ganham duas versões completas:

<div align="center">

| Tema escuro | Tema claro |
| :---: | :---: |
| <img src="docs/screenshots/hero.jpg" alt="Hero no tema escuro" width="420" /> | <img src="docs/screenshots/claro-hero.jpg" alt="Hero no tema claro" width="420" /> |
| <img src="docs/screenshots/sobre.jpg" alt="O Motel no tema escuro" width="420" /> | <img src="docs/screenshots/claro-sobre.jpg" alt="O Motel no tema claro" width="420" /> |

</div>

<div align="center">
<img src="docs/screenshots/claro-suites.jpg" alt="Suítes no tema claro" width="640" />
</div>

## No celular

<div align="center">

| Início | Sobre | Suítes | Comodidades | Localização |
| :---: | :---: | :---: | :---: | :---: |
| <img src="docs/screenshots/mobile-hero.jpg" alt="Hero no celular" width="150" /> | <img src="docs/screenshots/mobile-sobre.jpg" alt="O Motel no celular" width="150" /> | <img src="docs/screenshots/mobile-suites.jpg" alt="Suítes no celular" width="150" /> | <img src="docs/screenshots/mobile-comodidades.jpg" alt="Comodidades no celular" width="150" /> | <img src="docs/screenshots/mobile-localizacao.jpg" alt="Localização no celular" width="150" /> |

</div>

## Tecnologias


- [Vue 3](https://vuejs.org/) (`<script setup>`, estilos `scoped`) e [Vite](https://vite.dev/)
- [unplugin-icons](https://github.com/unplugin/unplugin-icons) com os conjuntos Solar e Simple Icons
- CSS próprio, sem framework: variáveis e estilos globais em `src/assets/styles/` e estilos de cada componente junto dele
- Fonte do título: Cormorant Garamond (Google Fonts)
- Publicação automática no GitHub Pages, com o domínio `motelbelavista.com`