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
   SMOOTH SCROLL
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


/* EMAILJS CONTACT FORM */
document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("contactForm");

  if (!form) return;

  emailjs.init("1GlwbVyWxi9uARurG");

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    emailjs.send("service_j1q60xe", "template_7u1eg0e", {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    })
    .then(() => {
      alert("Message sent successfully ✔");
      form.reset();
    })
    .catch((error) => {
      console.log("ERROR:", error);
      alert("Failed to send message ❌ Check console");
    });

  });

});