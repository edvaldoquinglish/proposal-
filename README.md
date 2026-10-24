# ❤️ Tenho uma pergunta pra você

![Made with Love](https://img.shields.io/badge/Made%20with-Love-FF2D55?style=for-the-badge&logo=heart&logoColor=white)
![License MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-2.0-blue?style=for-the-badge)
![Angola](https://img.shields.io/badge/Angola-🇦🇴-black?style=for-the-badge)
![HTML/CSS/JS](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS-orange?style=for-the-badge)

Uma proposta de namoro interativa, divertida e cheia de animações.  
O botão **Não** foge pela tela (mas nunca sai dela), o **SIM** fica cada vez mais irresistível, e no final há confetes, corações e partilha para todas as redes.

---

## ✨ Funcionalidades

- Botão “Não” que se move aleatoriamente **sempre dentro da tela**
- Frases engraçadas a cada tentativa de fuga
- Depois de 5 fugas o botão “Não” desaparece e o SIM fica gigante
- Tela de sucesso com confetes e corações
- **Sistema de partilha** completo:
  - WhatsApp (chat + fácil de usar em Status/Story)
  - Instagram (copia texto + abre app)
  - Facebook
  - TikTok
  - YouTube
  - E-mail
  - SMS
  - Partilha nativa do sistema (Web Share API)
- Header animado com botão de música
- Footer animado com autoria
- Flores SVG animadas + corações flutuantes
- Animações de scroll (reveal forte)
- Nome da pessoa animado com gradiente brilhante
- Música de fundo (basta colocar `music.mp3` na pasta)
- Design moderno, glassmorphism e totalmente responsivo

---

## 🚀 Como usar

1. Abre a pasta do projeto
2. (Opcional) Coloca um ficheiro `music.mp3` (música romântica royalty-free) na mesma pasta
3. Abre o `index.html` no navegador
4. Personaliza o nome da garota no HTML (elemento `#girlName`) se quiseres

```html
<span class="girl-name" id="girlName">Meu Amor</span>
```

Podes mudar para o nome real dela!

---

## 📁 Estrutura

```
proposal-site/
├── index.html      # Página principal
├── style.css       # Estilos + animações
├── app.js          # Lógica interativa + partilha
├── music.mp3       # (opcional) Música de fundo
├── LICENSE         # Licença MIT
└── README.md       # Este ficheiro
```

---

## 🎨 Personalização rápida

| O quê              | Onde alterar                          |
|--------------------|---------------------------------------|
| Nome da pessoa     | `#girlName` no `index.html`           |
| Frases do “Não”    | Array `phrases` no `app.js`           |
| Mensagem de partilha | Variável `shareMessage` no `app.js` |
| Cores              | Variáveis CSS em `:root` no `style.css` |

---

## 📜 Licença

Este projeto está sob a **Licença MIT**.

```
Copyright (c) 2025 Edvaldo Valódia Ndonga (Edvaldo Quinglish)
```

Podes usar, modificar e partilhar livremente.  
Só pedimos que mantenhas o crédito ao autor.

---

## 👨‍💻 Autor

**Edvaldo Valódia Ndonga**  
conhecido como **Edvaldo Quinglish**

Feito com ❤️ em Angola.

Se gostaste, dá uma estrela ⭐ e partilha a alegria!

---

> “O amor não se impõe… mas um botão que foge ajuda bastante.” 😄
