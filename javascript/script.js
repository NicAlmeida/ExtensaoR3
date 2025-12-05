const inputA = document.querySelector(".inputA");
const inputB = document.querySelector(".inputB");
const inputC = document.querySelector(".inputC");
const inputResultado = document.querySelector(".resultado");
const btnCalcular = document.querySelector(".btnCalcular");

btnCalcular.addEventListener("click", () => {
  const A = parseFloat(inputA.value);
  const B = parseFloat(inputB.value);
  const C = parseFloat(inputC.value);

  if (isNaN(A) || isNaN(B) || isNaN(C)) {
    alert("Preencha todos os campos para calcular.");
    return;
  }

  if (A === 0) {
    alert("O valor de A não pode ser zero.");
    return;
  }

  const X = (B * C) / A;
  inputResultado.value = X.toFixed(2);
});

const toggleEscuro = document.getElementById("toggleEscuro");
const toggleDaltonismo = document.getElementById("toggleDaltonismo");
const logo = document.getElementById("logoSite");

function atualizarLogo() {
  const escuroAtivo = document.body.classList.contains("dark");
  const daltAtivo = document.body.classList.contains("daltonismo");

  if (escuroAtivo && daltAtivo) {
    logo.src = "../icons/Vector48_dalt.png";
  } else if (escuroAtivo) {
    logo.src = "../icons/Vector48_dark.png";
  } else if (daltAtivo) {
    logo.src = "../icons/Vector48_dalt.png";
  } else {
    logo.src = "../icons/Vector48.png";
  }
}

toggleEscuro.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  localStorage.setItem(
    "tema",
    document.body.classList.contains("dark") ? "escuro" : "claro"
  );

  atualizarLogo();
});

toggleDaltonismo.addEventListener("change", () => {
  document.body.classList.toggle("daltonismo");

  localStorage.setItem(
    "modoDaltonismo",
    document.body.classList.contains("daltonismo") ? "ativo" : "desativado"
  );

  atualizarLogo();
});

window.addEventListener("load", () => {
  const tema = localStorage.getItem("tema");
  const modoDaltonismo = localStorage.getItem("modoDaltonismo");

  if (tema === "escuro") {
    document.body.classList.add("dark");
    toggleEscuro.checked = true;
  }

  if (modoDaltonismo === "ativo") {
    document.body.classList.add("daltonismo");
    toggleDaltonismo.checked = true;
  }

  atualizarLogo();
});
