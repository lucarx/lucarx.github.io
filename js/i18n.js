document.addEventListener("DOMContentLoaded", () => {
    // Translations
    window.translations = {
      en: {
        inicio: "Home",
        sobre: "About",
        projetos: "Projects",
        habilidades: "Skills",
        contato: "Contact",
        greeting: "Hello, I am",
        role: "Backend Developer",
        tagline: "Transforming ideas into amazing digital experiences",
        verProjetos: "View Projects",
        sobreMim: "About Me",
        sobreDesc:
          "I am a backend developer with experience in PHP, Python, and JavaScript. Specialized in creating RESTful APIs, optimized database systems, and scalable architectures.",
        nome: "Name:",
        email: "Email:",
        localizacao: "Location:",
        disponibilidade: "Availability:",
        disponibilidadeValue: "Freelance / Full Time",
        downloadCV: "Download CV",
        meusProjetos: "My Projects",
        todos: "All",
        frontend: "Front-end",
        backend: "Backend",
        minhasHabilidades: "My Skills",
        entreEmContato: "Get in Touch",
        vamosConversar: "Let's talk",
        contatoDesc: "I'm available for freelance projects and job opportunities.",
        localizacaoContato: "Location",
        seuNome: "Your Name",
        seuEmail: "Your Email",
        assunto: "Subject",
        suaMensagem: "Your Message",
        enviarMensagem: "Send Message",
        direitos: "All rights reserved.",
        idioma: "Language",
        tema: "Theme",
        configuracoes: "Settings",
        temaClaro: "Light Theme",
        temaEscuro: "Dark Theme",
      },
      pt: {
        inicio: "Início",
        sobre: "Sobre",
        projetos: "Projetos",
        habilidades: "Habilidades",
        contato: "Contato",
        greeting: "Olá, eu sou",
        role: "Desenvolvedor Backend",
        tagline: "Transformando ideias em experiências digitais incríveis",
        verProjetos: "Ver Projetos",
        sobreMim: "Sobre Mim",
        sobreDesc:
          "Sou um desenvolvedor backend com experiência em PHP, Python, e JavaScript. Especializado em criar APIs RESTful, sistemas de banco de dados otimizados e arquiteturas escaláveis.",
        nome: "Nome:",
        email: "Email:",
        localizacao: "Localização:",
        disponibilidade: "Disponibilidade:",
        disponibilidadeValue: "Freelance / Tempo Integral",
        downloadCV: "Download CV",
        meusProjetos: "Meus Projetos",
        todos: "Todos",
        frontend: "Front-end",
        backend: "Backend",
        minhasHabilidades: "Minhas Habilidades",
        entreEmContato: "Entre em Contato",
        vamosConversar: "Vamos conversar",
        contatoDesc: "Estou disponível para projetos freelance e oportunidades de trabalho.",
        localizacaoContato: "Localização",
        seuNome: "Seu Nome",
        seuEmail: "Seu Email",
        assunto: "Assunto",
        suaMensagem: "Sua Mensagem",
        enviarMensagem: "Enviar Mensagem",
        direitos: "Todos os direitos reservados.",
        idioma: "Idioma",
        tema: "Tema",
        configuracoes: "Configurações",
        temaClaro: "Tema Claro",
        temaEscuro: "Tema Escuro",
      },
    }
  
    // Language buttons
    const languageButtons = document.querySelectorAll(".language-btn")
  
    // Set active language
    const currentLang = localStorage.getItem("language") || "pt"
    setActiveLanguage(currentLang)
  
    // Language switcher
    languageButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        const lang = this.getAttribute("data-lang")
        setActiveLanguage(lang)
        localStorage.setItem("language", lang)
  
        // Toggle CV download links based on language
        const cvLinks = document.querySelectorAll(".cv-download a")
        cvLinks.forEach((link) => {
          if (link.getAttribute("data-lang") === lang) {
            link.style.display = "inline-block"
          } else {
            link.style.display = "none"
          }
        })
      })
    })
  
    function setActiveLanguage(lang) {
      // Update active button
      languageButtons.forEach((btn) => {
        if (btn.getAttribute("data-lang") === lang) {
          btn.classList.add("active")
        } else {
          btn.classList.remove("active")
        }
      })
  
      // Update text content
      updateAllTexts(lang)
  
      // Toggle CV download links based on language
      const cvLinks = document.querySelectorAll(".cv-download a")
      if (cvLinks.length) {
        cvLinks.forEach((link) => {
          if (link.getAttribute("data-lang") === lang) {
            link.style.display = "inline-block"
          } else {
            link.style.display = "none"
          }
        })
      }
    }
  
    function updateAllTexts(lang) {
      const elements = document.querySelectorAll("[data-i18n]")
      const translations = window.translations[lang]
  
      elements.forEach((element) => {
        const key = element.getAttribute("data-i18n")
        if (!key) return
  
        const keys = key.split(".")
        let value = translations
  
        for (const k of keys) {
          if (value[k] === undefined) return
          value = value[k]
        }
  
        element.textContent = value
      })
  
      // Update placeholders
      const placeholderElements = document.querySelectorAll("[data-i18n-placeholder]")
      placeholderElements.forEach((element) => {
        const key = element.getAttribute("data-i18n-placeholder")
        if (!key || !translations[key]) return
        element.placeholder = translations[key]
      })
  
      // Update title attributes
      const titleElements = document.querySelectorAll("[data-i18n-title]")
      titleElements.forEach((element) => {
        const key = element.getAttribute("data-i18n-title")
        if (!key || !translations[key]) return
        element.title = translations[key]
      })
    }
  })
  