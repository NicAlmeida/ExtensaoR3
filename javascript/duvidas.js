document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion-button");

  accordions.forEach((acc) => {
    acc.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
});
