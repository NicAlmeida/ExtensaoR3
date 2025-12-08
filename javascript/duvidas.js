document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion-button");
  const btnEnviar = document.querySelectorAll(".btnEnviar");

  accordions.forEach((acc) => {
    acc.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });

  btnEnviar.addEventListener("click", () => {
    alert("Agradecemos o seu feedbak!");
  });
});
