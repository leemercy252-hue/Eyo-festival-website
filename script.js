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
document.getElementById("ticketForm").addEventListener("submit", function(e){
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

      <button class="download-btn" onclick="downloadPDF('${name}','${email}','${type}','${ticketID}')">
        Download Ticket (PDF)
      </button>
    </div>
  `;
});
let currentTicket = {};
let qrDataURL = "";

document.getElementById("ticketForm").addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const type = document.getElementById("type").value;

  const ticketID = "EYO-" + Math.floor(Math.random() * 999999);

  currentTicket = { name, email, type, ticketID };

  const qrText = `
EYO FESTIVAL TICKET
Name: ${name}
Email: ${email}
Type: ${type}
Ticket ID: ${ticketID}
`;

  document.getElementById("ticketResult").innerHTML = `
    <div class="ticket-result">
      <h3>🎫 Your Ticket</h3>

      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Type:</strong> ${type}</p>
      <p><strong>Ticket ID:</strong> ${ticketID}</p>

      <div id="qrcode"></div>

      <button class="download-btn" onclick="downloadPDF()">
        Download Ticket (PDF)
      </button>
    </div>
  `;

  // Generate QR code
  const qr = new QRCode(document.getElementById("qrcode"), {
    text: qrText,
    width: 120,
    height: 120
  });

  // Convert QR to image AFTER rendering
  setTimeout(() => {
    const canvas = document.querySelector("#qrcode canvas");
    if (canvas) {
      qrDataURL = canvas.toDataURL("image/png");
    }
  }, 300);
});


function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("EYO FESTIVAL TICKET", 20, 20);

  doc.setFontSize(12);
  doc.text("Name: " + currentTicket.name, 20, 40);
  doc.text("Email: " + currentTicket.email, 20, 50);
  doc.text("Ticket Type: " + currentTicket.type, 20, 60);
  doc.text("Ticket ID: " + currentTicket.ticketID, 20, 70);

  doc.text("Scan QR Code at entrance:", 20, 90);

  // Add QR image into PDF
  if (qrDataURL) {
    doc.addImage(qrDataURL, "PNG", 20, 100, 50, 50);
  }

  doc.save("Eyo-Festival-Ticket.pdf");
}