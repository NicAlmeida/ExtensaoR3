document.addEventListener("DOMContentLoaded", () => {
  const toggleEscuro = document.getElementById("toggleEscuro");
  const toggleDaltonismo = document.getElementById("toggleDaltonismo");
  const logo = document.getElementById("logoSite");
  const iconHome = document.getElementById("iconHome");
  const btnEnviar = document.querySelector(".btnEnviar");
  const inputTexto = document.querySelector(".inputTexto");

  const LOGOS = {
    normal: "../icons/Vector48.png",
    dark: "../icons/Vector48_dark.png",
    dalt: "../icons/Vector48_dalt.png",
    dark_dalt: "../icons/Vector48_dark_dalt.png",
  };

  const ICONES_HOME = {
    normal: "../icons/home-icon.png",
    dark: "../icons/home-icon-dark.png",
    dalt: "../icons/home-icon-dalt.png",
    dark_dalt: "../icons/home-icon.png",
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
    logo.onerror = null;
    logo.onerror = function () {
      i++;
      if (i < candidates.length) logo.src = candidates[i];
      else logo.onerror = null;
    };
    if (candidates.length) logo.src = candidates[0];
  }

  function setIconHomeFor(escuro, dalt) {
    if (!iconHome) return;
    if (escuro && dalt) iconHome.src = ICONES_HOME.dark_dalt;
    else if (escuro) iconHome.src = ICONES_HOME.dark;
    else if (dalt) iconHome.src = ICONES_HOME.dalt;
    else iconHome.src = ICONES_HOME.normal;
  }

  function setModoEscuro(ativar) {
    document.body.classList.toggle("dark", ativar);
    const daltAtivo = document.body.classList.contains("daltonismo");
    try {
      localStorage.setItem("tema", ativar ? "escuro" : "claro");
      setLogoFor(ativar, daltAtivo);
      setIconHomeFor(ativar, daltAtivo);
    } catch (e) {
      console.log(e);
    }
  }

  function setModoDaltonismo(ativar) {
    document.body.classList.toggle("daltonismo", ativar);
    const escuroAtivo = document.body.classList.contains("dark");
    try {
      localStorage.setItem("modoDaltonismo", ativar ? "ativo" : "desativado");
      setLogoFor(escuroAtivo, ativar);
      setIconHomeFor(escuroAtivo, ativar);
    } catch (e) {
      console.log(e);
    }
  }

  (function carregarPreferencias() {
    try {
      const tema = localStorage.getItem("tema");
      const modoDalt = localStorage.getItem("modoDaltonismo");
      const escuro = tema === "escuro";
      const dalt = modoDalt === "ativo";

      document.body.classList.toggle("dark", escuro);
      document.body.classList.toggle("daltonismo", dalt);

      if (toggleEscuro) toggleEscuro.checked = escuro;
      if (toggleDaltonismo) toggleDaltonismo.checked = dalt;

      const labels = document.querySelectorAll(".switch-label");
      if ((escuro && dalt) || (!escuro && !dalt)) {
        labels.forEach((label) => {
          label.style.color = "black";
        });
      }

      setLogoFor(escuro, dalt);
      setIconHomeFor(escuro, dalt);
    } catch (err) {
      console.warn(err);
    }
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

  if (btnEnviar) {
    btnEnviar.addEventListener("click", () => {
      alert("Agradecemos o seu feedback");
      if (inputTexto) inputTexto.value = "";
    });
  }

  window.__opiniaoTheme = { setModoEscuro, setModoDaltonismo };
});
