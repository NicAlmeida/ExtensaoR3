document.addEventListener("DOMContentLoaded", () => {
  const toggleEscuro = document.getElementById("toggleEscuro");
  const toggleDaltonismo = document.getElementById("toggleDaltonismo");
  const logo = document.getElementById("logoSite");

  const LOGOS = {
    normal: "../icons/Vector48.png",
    dark: "../icons/Vector48_dark.png",
    dalt: "../icons/Vector48_dalt.png",
    dark_dalt: "../icons/Vector48_dark_dalt.png",
  };

  function setLogoFor(escuro, dalt) {
    if (!logo) return;

    const candidates = [];
    if (escuro && dalt)
      candidates.push(LOGOS.dark_dalt, LOGOS.dalt, LOGOS.dark, LOGOS.normal);
    else if (escuro) candidates.push(LOGOS.dark, LOGOS.normal);
    else if (dalt) candidates.push(LOGOS.dalt, LOGOS.normal);
    else candidates.push(LOGOS.normal);

    let i = 0;
    logo.onerror = function () {
      i++;
      if (i < candidates.length) {
        logo.src = candidates[i];
      } else {
        logo.onerror = null;
      }
    };
    if (candidates.length) {
      logo.src = candidates[0];
    }
  }

  function atualizarLogo() {
    const escuroAtivo = document.body.classList.contains("dark");
    const daltAtivo = document.body.classList.contains("daltonismo");
    setLogoFor(escuroAtivo, daltAtivo);
  }

  function setModoEscuro(ativar) {
    document.body.classList.toggle("dark", ativar);
    try {
      localStorage.setItem("tema", ativar ? "escuro" : "claro");
    } catch (e) {}
    atualizarLogo();
  }

  function setModoDaltonismo(ativar) {
    document.body.classList.toggle("daltonismo", ativar);
    try {
      localStorage.setItem("modoDaltonismo", ativar ? "ativo" : "desativado");
    } catch (e) {}
    atualizarLogo();
  }

  (function carregarPreferencias() {
    try {
      const tema = localStorage.getItem("tema");
      const modoDaltonismo = localStorage.getItem("modoDaltonismo");

      const escuro = tema === "escuro";
      const dalt = modoDaltonismo === "ativo";

      document.body.classList.toggle("dark", escuro);
      document.body.classList.toggle("daltonismo", dalt);

      if (toggleEscuro) toggleEscuro.checked = escuro;
      if (toggleDaltonismo) toggleDaltonismo.checked = dalt;
      if (toggleEscuro.checked && toggleDaltonismo.checked) {
        const labels = document.querySelectorAll(".switch-label");
        labels.forEach((label) => {
          label.style.color = "black";
        });
      }
      if (!toggleEscuro.checked && !toggleDaltonismo.checked) {
        const labels = document.querySelectorAll(".switch-label");
        labels.forEach((label) => {
          label.style.color = "white";
        });
      }
    } catch (err) {
      console.warn("Não foi possível carregar preferências:", err);
    }

    atualizarLogo();
  })();

  if (toggleEscuro) {
    toggleEscuro.addEventListener("change", () => {
      setModoEscuro(toggleEscuro.checked);
    });
  }

  if (toggleDaltonismo) {
    toggleDaltonismo.addEventListener("change", () => {
      setModoDaltonismo(toggleDaltonismo.checked);
    });
  }

  window.__opiniaoTheme = {
    atualizarLogo,
    setModoEscuro,
    setModoDaltonismo,
  };
});
