const countryContainer = document.querySelector("#countryContainer");
const filterInput = document.querySelector("#filterInput");

// clicked value
const buttons = document.querySelectorAll("button");

// Add click event listener to each button
buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    // Get the value of the clicked button
    const value = event.target.textContent

    // You can now use the 'value' for filtering
    console.log("Clicked:", value);
    renderCountries("", value);
  });
});
// clicked value

// const continentButtons = document.querySelectorAll('button[class^="continent-"]');

// continentButtons.forEach(button => {
//     button.addEventListener('click', () => {
//         const continent = button.classList[0].split('-')[1];
//         renderCountries(continent);
//     });
// });

function createCountryCard(country) {
  console.log(country);
  const card = document.createElement("div");
  card.classList.add("country-card");

  const flag = document.createElement("img");
  flag.classList.add("flag");
  flag.src = country.flags.svg;
  flag.alt = `${country.name.common} Flag`;

  const name = document.createElement("h2");
  name.textContent = country.name.common;

  const capital = document.createElement("p");
  capital.textContent = `Capital: ${country.capital}`;

  card.appendChild(flag);
  card.appendChild(name);
  card.appendChild(capital);

  countryContainer.appendChild(card);
}

async function renderCountries(value, region) {
    const query = region.toLowerCase() === 'all' ? '' : 'region'
  async function getCountries(region) {
    console.log(region);
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/${region === 'ALL' ? '' : 'region'}/${region?.toLowerCase()}`
      );
      const countries = await response.json();
      return countries;
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  const countries = await getCountries(region);
  console.log(countries);
  countryContainer.innerHTML = "";

  countries?.forEach((country) => {
    if (
      value === "" ||
      country.region.includes(value)
    ) {
      createCountryCard(country);
    }
  });
}

filterInput.addEventListener("input", () => {
  const filterValue = filterInput.value.toLowerCase();
  const countryCards = document.querySelectorAll(".country-card");

  countryCards.forEach((card) => {
    const countryName = card.querySelector("h2").textContent.toLowerCase();
    if (countryName.includes(filterValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

renderCountries();