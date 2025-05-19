document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.querySelector(".menu");

  if (menuToggle) {
    menuToggle.addEventListener("change", function() {
      if (this.checked) {
        menu.classList.add("active");
      } else {
        menu.classList.remove("active");
      }
    });

      // Alternância de tema claro/escuro
  const themeButtons = document.querySelectorAll('.theme-btn');
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
  }

  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedTheme = button.getAttribute('data-theme');
      const isDark = selectedTheme === 'dark';

      document.body.classList.toggle('theme-dark', isDark);
      localStorage.setItem('theme', selectedTheme);
    });
  });

  }

  // Settings dropdown toggle
  const settingsButton = document.querySelector(".settings-button");
  const settingsDropdown = document.querySelector(".settings-dropdown");

  if (settingsButton && settingsDropdown) {
    settingsButton.addEventListener("click", (e) => {
      e.stopPropagation();
      settingsDropdown.classList.toggle("active");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", (e) => {
      if (settingsDropdown && !settingsDropdown.contains(e.target)) {
        settingsDropdown.classList.remove("active");
      }
    });
  }

  // Projeto filtro
  const filtroBtns = document.querySelectorAll(".filtro-btn");
  const projetoCards = document.querySelectorAll(".projeto-card");

  // Inicializar todos os projetos como visíveis imediatamente
  projetoCards.forEach((card) => {
    card.style.display = "block";
    // Pequeno atraso para garantir que a animação funcione
    setTimeout(() => {
      card.classList.add("show");
    }, 10);
  });

  filtroBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filtroBtns.forEach((b) => b.classList.remove("active"));
      // Add active class to clicked button
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projetoCards.forEach((card) => {
        const categoria = card.getAttribute("data-categoria");
        
        if (filter === "todos" || filter === categoria) {
          card.style.display = "block";
          setTimeout(() => {
            card.classList.add("show");
          }, 10);
        } else {
          card.classList.remove("show");
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function(e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (menuToggle && menuToggle.checked) {
          menuToggle.checked = false;
          menu.classList.remove("active");
        }

        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});
