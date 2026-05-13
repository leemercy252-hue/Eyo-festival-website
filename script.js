/* =============================
   MOBILE MENU TOGGLE
============================= */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}


/* =============================
   CLOSE MENU WHEN LINK CLICKED
============================= */
document.addEventListener("DOMContentLoaded", () => {

  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });

});


/* =============================
   ACTIVE PAGE HIGHLIGHT
============================= */
document.addEventListener("DOMContentLoaded", () => {

  const currentPage = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll(".nav-links a");

  links.forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

});


/* =============================
   SMOOTH SCROLL (ANCHOR LINKS ONLY)
============================= */
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: "smooth"
        });
      }

    });

  });

});