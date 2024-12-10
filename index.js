
const form = document.querySelector("form");
const input = document.querySelector("#pokemonInput");
const imageContainer = document.querySelector("#pokemonImage");


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const userInput = input.value.toLowerCase().trim();

    imageContainer.innerHTML = "";

    if (!userInput) {
        imageContainer.innerHTML = "<p>Please enter a Pokémon name.</p>";
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then((data) => {

            const pokemonSprite = data.sprites.front_default;

            const img = document.createElement("img");
            img.src = pokemonSprite;
            img.alt = userInput;
            img.classList.add("loaded");

            imageContainer.innerHTML = "";
            imageContainer.appendChild(img);
        })

        .catch((error) => {

            imageContainer.innerHTML = `<p>${error.message}</p>`;
        });
});
