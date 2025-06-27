document.addEventListener("DOMContentLoaded", () => {
  // Theme buttons
  const themeButtons = document.querySelectorAll(".theme-btn")

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "light"
  setTheme(savedTheme)

  // Theme switcher
  themeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const theme = this.getAttribute("data-theme")
      setTheme(theme)
      localStorage.setItem("theme", theme)
    })
  })

  function setTheme(theme) {
    // Update active button
    themeButtons.forEach((btn) => {
      if (btn.getAttribute("data-theme") === theme) {
        btn.classList.add("active")
      } else {
        btn.classList.remove("active")
      }
    })

    // Apply theme to body
    document.body.className = theme === "dark" ? "dark-theme" : ""
  }
})
