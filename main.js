// document.documentElement.setAttribute('lang', 'fr')

const countries = [
  "United States",
  "Canada",
  "Germany",
  "France",
  "Australia",
  "Brazil",
  "India",
  "Japan",
  "China",
  "South Korea",
  "South Africa",
  "Russia",
  "Italy",
  "Mexico",
  "Netherlands",
  "Spain",
  "Sweden",
  "Switzerland",
  "Turkey",
  "United Kingdom",
  "Argentina",
  "Chile",
  "Colombia",
  "Denmark",
  "Finland",
  "Greece",
  "Hungary",
  "Ireland",
  "Israel",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Saudi Arabia",
  "Singapore",
  "Thailand",
  "Ukraine",
  "United Arab Emirates",
  "Vietnam",
  "Malaysia",
];
let interval;

const amounts = Array.from(
  { length: 40 },
  () => Math.floor(Math.random() * (5000 - 300 + 1)) + 300
);

function currencyFormatter(amount) {
  const fmt = new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });
  return fmt.format(amount);
}

function showPopup() {
  const popup = document.getElementById("popup");

  // Generate random values for the popup
  const country = countries[Math.floor(Math.random() * countries.length)];
  let amount = amounts[Math.floor(Math.random() * amounts.length)];
  amount = currencyFormatter(amount);
  const action = Math.random() > 0.5 ? "deposited" : "withdrew";

  // Set the content and display the popup
  popup.innerHTML = `Someone from ${country} just ${action} <span class="font-mono font-bold">${amount}</span>`;
  popup.classList.add("show");

  // Hide the popup after 5 seconds
  setTimeout(() => {
    popup.classList.remove("show");
    popup.classList.add("hide");
  }, 5000);

  // Remove the 'hide' class after the animation completes to reset for the next display
  setTimeout(() => {
    popup.classList.remove("hide");
  }, 5500);
}

window.addEventListener("DOMContentLoaded", () => {
  let tm = setTimeout(() => {
    showPopup();
    clearTimeout(tm);
  }, 10000);

  interval = setInterval(showPopup, 60000);
});

window.addEventListener("unload", () => {
  clearInterval(interval);
});

const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitBtn = document.getElementById("form-submit-btn");
  submitBtn.disabled = true;
  submitBtn.innerText = "please wait..";
  let data = new FormData(event.target);

  fetch("https://formspree.io/f/xrbgalqk", {
    method: "POST",
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit";
      if (res.ok) {
        alert("We have received your message. Thank you!");
        contactForm.reset();
        return res.json();
      } else {
        return res.json().then((data) => {
          throw new Error(data.error || "Error submitting the form.");
        });
      }
    })
    .catch((err) => {
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit";
      console.error("error while submitting contactForm", err.message);
    });
});

// get refferal if any
const href = window.location.href
const urlObj = new URL(href);
const refferal = urlObj.searchParams.get('r')
if (refferal) {
  document.cookie = `refferal=${refferal}; path=/; domain=.financial-growths.com; secure; samesite=lax`;
}

  // function googleTranslateElementInit() {
  //   new google.translate.TranslateElement(
  //     { pageLanguage: 'fr', includedLanguages: 'fr,en' },
  //     'google_translate_element'
  //   );
  // }
