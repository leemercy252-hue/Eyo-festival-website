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
  });const ticketForm = document.getElementById("ticketForm");

ticketForm.addEventListener("submit", function(e) {

  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const type = document.getElementById("type").value;

  const ticketID = "EYO-" + Math.floor(Math.random() * 999999);

  document.getElementById("ticketResult").innerHTML = `

    <div class="ticket-result">

      <h3>🎫 Your Ticket</h3>

      <p><strong>Name:</strong> ${name}</p>

      <p><strong>Email:</strong> ${email}</p>

      <p><strong>Type:</strong> ${type}</p>

      <p><strong>Ticket ID:</strong> ${ticketID}</p>

      <button 
        class="download-btn"
        onclick="downloadPDF('${name}','${email}','${type}','${ticketID}')">

        Download Ticket (PDF)

      </button>

    </div>
  `;
});
function downloadPDF(name, email, type, ticketID) {

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);

  doc.text("EYO FESTIVAL TICKET", 20, 20);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  doc.text("Name: " + name, 20, 40);
  doc.text("Email: " + email, 20, 50);
  doc.text("Ticket Type: " + type, 20, 60);
  doc.text("Ticket ID: " + ticketID, 20, 70);

  doc.line(20, 80, 180, 80);

  doc.text(
    "Present this ticket at the festival entrance.",
    20,
    95
  );

  doc.save("Eyo-Festival-Ticket.pdf");
}