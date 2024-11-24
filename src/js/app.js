// app.js

import { GeneradorPDF } from "./generar_pdf.js";

// Inicializa la clase de generación de PDF
const pdfGenerator = new GeneradorPDF({ filename: "pokedex.pdf" });

// Función para buscar información del Pokémon
function buscarInfoPokemon(query) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al obtener datos del Pokémon: ${response.status}`);
            }
            return response.json();
        });
}

async function convertirImagenABase64(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error al obtener la imagen: ${response.status}`);
        }
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = () => reject("Error al convertir imagen a Base64");
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error("Error en convertirImagenABase64:", error);
        throw error;
    }
}

// Función para renderizar contenido dinámico


async function renderizarContenido(contenedor, datos) {
    try {
        // Rellenar los datos en la tabla
        contenedor.querySelector("#numero-pokedex").textContent = datos.id;
        contenedor.querySelector("#nombre-pokemon").textContent = datos.name.toUpperCase();
        contenedor.querySelector("#generacion").textContent = datos.game_indices.length
            ? datos.game_indices[0].version.name
            : "Desconocida";
        contenedor.querySelector("#tipo-pokemon").textContent = datos.types
            .map(tipo => tipo.type.name)
            .join(", ");

        // Convertir la imagen a Base64
        const imagenBase64 = await convertirImagenABase64(datos.sprites.front_default);

        // Mostrar imagen
        const imageContainer = contenedor.querySelector("#image-container");
        imageContainer.innerHTML = `<img src="${imagenBase64}" alt="${datos.name}" />`;

        // Asegurarse de que el contenedor esté visible
        contenedor.style.display = "block";
    } catch (error) {
        console.error("Error al renderizar contenido:", error);
        alert("Hubo un problema al cargar los datos del Pokémon.");
    }
}

// Manejar búsqueda y mostrar resultados
document.getElementById("search-btn").addEventListener("click", async () => {
    const pokemon = document.getElementById("id-pokemon").value;
    console.log(`Buscando Pokémon: ${pokemon}`);

    try {
        const datosPokemon = await buscarInfoPokemon(pokemon); // Esperar los datos
        const pokedexContainer = document.getElementById("pdf-container");
        renderizarContenido(pokedexContainer, datosPokemon);
    } catch (error) {
        console.error("Error al buscar el Pokémon:", error.message);
        alert("No se encontró el Pokémon. Verifica el nombre o ID.");
    }
});

// Manejar generación de PDF
document.getElementById("generate-pdf-btn").addEventListener("click", () => {
    const pokedexContainer = document.getElementById("pdf-container");
    pdfGenerator.generar(pokedexContainer);
});
