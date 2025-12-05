// Seleciona campos
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
