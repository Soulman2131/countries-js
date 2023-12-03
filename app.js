const app = document.getElementById("app");
// const searchInput = document.getElementById("searchInput");
// const rangeInput = document.getElementById("rangeInput");
const btn = document.querySelectorAll(".btn");

let countries = [];
let orderMethod = "minToMax";

const fetchCountries = async () => {
  await fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => (countries = data));
  displayCountries();
};

const displayCountries = () => {
  app.innerHTML = countries
    .filter((country) =>
      country.translations.fra.common
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    )
    .sort((a, b) => {
      if (orderMethod === "maxToMin") {
        return b.population - a.population;
      } else if (orderMethod === "minToMin") {
        return a.population - b.population;
      } else if (orderMethod === "alphabetical") {
        return a.translations.fra.common.localeCompare(
          b.translations.fra.common
        );
      }
    })
    .slice(0, rangeInput.value)
    .map((country) => {
      return `
      <li class="card">
        <img src=${country.flags.svg} alt="drapeau ${
        country.translations.fra.common
      }" >
        <div class="card-infos">
          <h2>  ${country.translations.fra.common} </h2>
          <h4> Capital: ${country.capital} </h4>
          <p> Population: ${country.population.toLocaleString()} habitants </p>
        </div>
      </li>
    
    `;
    })
    .join("");
};
fetchCountries();

//AEL INPUT SEARCH
rangeInput.addEventListener("input", (e) => fetchCountries(e.target.value));
searchInput.addEventListener("input", (e) => fetchCountries(e.target.value));

// BUTTON
btn.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(e.target.id);
    orderMethod = e.target.id;
    displayCountries();
  });
});
