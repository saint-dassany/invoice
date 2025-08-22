const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const menuToggler = document.querySelector(".menu-toggler");

const collapsedSidebarHeight = "56px";
const fullSidebarHeight = "calc(100vh - 32px)";

// Toggle sidebar's collapsed state
sidebarToggler.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed"); 
});

// Update sidebar height and menu toggle text
const toggleMenu = (isMenuActive) => {
     sidebar.style.height = isMenuActive ? `${sidebar.scrollHeight}px` : 
     collapsedSidebarHeight;
     menuToggler.querySelector("span").innerText = isMenuActive ? "close" :
     "menu";
}

// Toggle menu-active class and adjust height 
menuToggler.addEventListener("click", () =>{
    toggleMenu(sidebar.classList.toggle("menu-active"));
});

//Adjust sidebar height on window resize
window.addEventListener("resize", () => {
    if (window.innerWidth >=1024){
        sidebar.style.height = fullSidebarHeight;
    } else {
        sidebar.classList.remove("collapsed");
        sidebar.style.height = "auto";
        toggleMenu(sidebar.classList.contains("menu-active"));
    }
});


const form = document.getElementById("invoiceForm");
const invoiceList = document.getElementById("invoiceList");

// Load invoices from localStorage
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
renderInvoices();

// Add invoice
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const number = document.getElementById("invoiceNumber").value;
    const desc = document.getElementById("invoiceDesc").value;
    const amount = document.getElementById("invoiceAmount").value;

    invoices.push({ number, desc, amount });
    localStorage.setItem("invoices", JSON.stringify(invoices));

    form.reset();
    renderInvoices();
});

// Render invoice list
function renderInvoices() {
    invoiceList.innerHTML = "";

    invoices.forEach((invoice, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${invoice.number} - ${invoice.desc} - $${invoice.amount}
            <div>
                <button onclick="editInvoice(${index})">Edit</button>
                <button onclick="deleteInvoice(${index})">Delete</button>
            </div>
        `;
        invoiceList.appendChild(li);
    });
}

// Edit invoice
function editInvoice(index) {
    const invoice = invoices[index];
    const newNumber = prompt("Enter new invoice number:", invoice.number);
    const newDesc = prompt("Enter new description:", invoice.desc);
    const newAmount = prompt("Enter new amount:", invoice.amount);

    if (newNumber && newDesc && newAmount) {
        invoices[index] = { number: newNumber, desc: newDesc, amount: newAmount };
        localStorage.setItem("invoices", JSON.stringify(invoices));
        renderInvoices();
    }
}

// Delete invoice
function deleteInvoice(index) {
    if (confirm("Are you sure you want to delete this invoice?")) {
        invoices.splice(index, 1);
        localStorage.setItem("invoices", JSON.stringify(invoices));
        renderInvoices();
    }
}


 
