// Remover preloader imediatamente e de forma confiável
document.addEventListener("DOMContentLoaded", () => {
  // Função para remover o preloader
  function removePreloader() {
    const preloader = document.getElementById("preloader")
    if (preloader) {
      // Adicionar classe para iniciar a animação de fade out
      preloader.classList.add("preloader-hidden")

      // Remover completamente após a animação
      setTimeout(() => {
        preloader.remove() // Remover completamente do DOM
      }, 500)
    }
  }

  // Tentar remover o preloader de várias maneiras para garantir que funcione

  // Método 1: Remover após um curto atraso
  setTimeout(removePreloader, 1000)

  // Método 2: Remover quando a página estiver totalmente carregada
  window.addEventListener("load", removePreloader)

  // Método 3: Fallback - remover após 3 segundos de qualquer forma
  setTimeout(removePreloader, 3000)

  // Resto do código JavaScript existente...

  // Verificar compatibilidade do navegador
  function checkBrowserCompatibility() {
    const features = {
      "CSS Variables": window.CSS && window.CSS.supports && window.CSS.supports("--a", "0"),
      localStorage: !!window.localStorage,
      matchMedia: !!window.matchMedia,
      "Fetch API": "fetch" in window,
      "Custom Events": typeof CustomEvent === "function",
    }

    const incompatibleFeatures = Object.entries(features)
      .filter(([_, supported]) => !supported)
      .map(([feature]) => feature)

    if (incompatibleFeatures.length > 0) {
      console.warn(
        "Seu navegador pode não suportar todas as funcionalidades deste site:",
        incompatibleFeatures.join(", "),
      )
    }
  }

  // Executar verificação de compatibilidade
  checkBrowserCompatibility()

  // Aplicar tema e idioma imediatamente
  ;(() => {
    // Verificar preferência de tema do sistema
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

    // Obter tema salvo ou usar preferência do sistema
    const savedTheme = localStorage.getItem("preferredTheme") || (prefersDarkScheme.matches ? "dark" : "light")

    const savedLang = localStorage.getItem("preferredLanguage") || "pt"

    // Aplicar tema imediatamente
    applyTheme(savedTheme)

    // Definir idioma do documento
    document.documentElement.lang = savedLang

    // Adicionar listener para mudanças na preferência do sistema
    prefersDarkScheme.addEventListener("change", (e) => {
      // Só mudar automaticamente se o usuário não tiver escolhido manualmente
      if (!localStorage.getItem("preferredTheme")) {
        const newTheme = e.matches ? "dark" : "light"
        applyTheme(newTheme)
      }
    })
  })()

  // Inicializar tema e idioma
  const savedTheme = localStorage.getItem("preferredTheme") || "light"
  const savedLang = localStorage.getItem("preferredLanguage") || "pt"

  // Marcar botões ativos
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-theme") === savedTheme)
  })

  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === savedLang)
  })

  // Aplicar traduções
  changeLanguage(savedLang)

  // Animar barras de habilidades quando visíveis
  const skillBars = document.querySelectorAll(".skill-progress")

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect()
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      if (isElementInViewport(bar) && !bar.classList.contains("animate")) {
        const targetWidth = bar.getAttribute("data-width")
        bar.style.width = targetWidth
        bar.classList.add("animate")
      }
    })
  }

  // Inicializar animação das barras de habilidades
  animateSkillBars()
  window.addEventListener("scroll", animateSkillBars)

  // Menu mobile
  const menuToggle = document.getElementById("menu-toggle")
  const menu = document.querySelector(".menu")

  if (menuToggle) {
    menuToggle.addEventListener("change", function () {
      menu.classList.toggle("active", this.checked)
    })
  }

  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (menuToggle) menuToggle.checked = false
      menu.classList.remove("active")
    })
  })

  // Rolagem suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" })
      }
    })
  })

  document.addEventListener("DOMContentLoaded", () => {
    // Mostrar todos os projetos inicialmente (já visíveis pelo CSS)
    const projetoCards = document.querySelectorAll(".projeto-card");
    projetoCards.forEach(card => {
      card.classList.add("show"); // Apenas adiciona a animação
    });
  
    // Configurar o filtro para quando clicar nos botões
    const filterBtns = document.querySelectorAll(".filtro-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", function() {
        const filter = this.getAttribute("data-filter");
        
        // Atualizar botão ativo
        filterBtns.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
  
        // Filtrar projetos
        projetoCards.forEach(card => {
          const categoria = card.getAttribute("data-categoria");
          const match = filter === "todos" || categoria === filter;
  
          if (!match) {
            card.classList.remove("show"); // Esconde se não for match
          } else {
            card.classList.add("show"); // Mostra se for match
          }
        });
      });
    });
  });

  // Botões de idioma
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang")
      changeLanguage(lang)
    })
  })

  // Botões de tema
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme")
      applyTheme(theme)
    })
  })
})

// Definição das traduções
const translations = {
  pt: {
    nome: "Nome",
    email: "Email",
    mensagem: "Mensagem",
    enviar: "Enviar",
  },
  en: {
    nome: "Name",
    email: "Email",
    mensagem: "Message",
    enviar: "Send",
  },
}

// Função para mudar o idioma
function changeLanguage(lang) {
  console.log("Mudando idioma para:", lang)
  localStorage.setItem("preferredLanguage", lang)
  document.documentElement.lang = lang

  // Aplicar traduções aos elementos com data-i18n
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n")
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key]
    }
  })

  // Aplicar traduções aos placeholders
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder")
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key]
    }
  })

  // Alternar visibilidade dos botões de CV
  document.querySelectorAll(".cv-download a").forEach((btn) => {
    const btnLang = btn.getAttribute("data-lang")
    btn.style.display = btnLang === lang ? "inline-block" : "none"
  })

  // Atualizar botão de idioma ativo
  document.querySelectorAll(".language-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-lang") === lang)
  })
}

// Definição dos temas
const themes = {
  light: {
    "--background-color": "#ffffff",
    "--text-color": "#2d3748",
    "--text-light": "#718096",
    "--primary-color": "#3498db",
    "--primary-light": "#5dade2",
    "--primary-dark": "#2980b9",
    "--secondary-color": "#4dabf7",
    "--card-bg": "#ffffff",
    "--light-background": "#f8fafc",
    "--dark-background": "#1a202c",
    "--border-color": "#e2e8f0",
  },
  dark: {
    "--background-color": "#1a202c",
    "--text-color": "#f7fafc",
    "--text-light": "#e2e8f0",
    "--primary-color": "#63b3ed",
    "--primary-light": "#90cdf4",
    "--primary-dark": "#4299e1",
    "--secondary-color": "#90cdf4",
    "--card-bg": "#2d3748",
    "--light-background": "#2d3748",
    "--dark-background": "#1a202c",
    "--border-color": "#4a5568",
  },
}

// Função para aplicar o tema
function applyTheme(themeName) {
  console.log("Aplicando tema:", themeName)
  const theme = themes[themeName] || themes.light
  localStorage.setItem("preferredTheme", themeName)

  // Aplicar variáveis CSS
  Object.entries(theme).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value)
  })

  // Atualizar classe do body
  document.body.className = document.body.className.replace(/theme-\w+/g, "").trim()
  document.body.classList.add(`theme-${themeName}`)

  // Atualizar botão de tema ativo
  document.querySelectorAll(".theme-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-theme") === themeName)
  })
}
