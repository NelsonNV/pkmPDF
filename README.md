# Pokédex Web App

## Descripción

Esta aplicación es una Pokédex que permite buscar información sobre cualquier Pokémon utilizando la [PokeAPI](https://pokeapi.co/). La información incluye el número de Pokédex, el nombre, la generación, los tipos del Pokémon y su imagen. Además, permite generar un archivo PDF con los datos mostrados.

## Características

1. **Buscar Pokémon por nombre o ID**: Introduce el nombre o ID del Pokémon en el campo de búsqueda para obtener sus datos.
2. **Renderizar información del Pokémon**: Muestra la información relevante del Pokémon, incluyendo una imagen.
3. **Generar un archivo PDF**: Descarga los datos del Pokémon en formato PDF con un solo clic.

## Uso

1. Abre `index.html` en tu navegador.
2. Escribe el nombre o ID de un Pokémon en el campo de búsqueda y haz clic en "Buscar Pokémon".
3. La información del Pokémon aparecerá en el contenedor debajo.
4. Haz clic en "Generar PDF" para descargar los datos del Pokémon en formato PDF.

## Estructura del código

### `generar_pdf.js`
- **Clase `GeneradorPDF`**: Encargada de la generación de archivos PDF utilizando `html2pdf.js`.
- **Método principal**:
  - `generar(content)`: Convierte el contenido HTML proporcionado en un archivo PDF.

### `app.js`
- **Funciones principales**:
  - `buscarInfoPokemon(query)`: Consulta la PokeAPI para obtener información de un Pokémon por nombre o ID.
  - `convertirImagenABase64(url)`: Convierte una imagen a formato Base64 para ser usada en la app.
  - `renderizarContenido(contenedor, datos)`: Llena el contenedor con los datos obtenidos del Pokémon, incluyendo su imagen.
  - Manejadores para:
    - **Botón de búsqueda**: Ejecuta la búsqueda del Pokémon y renderiza la información en pantalla.
    - **Botón de generación de PDF**: Genera un archivo PDF con la información mostrada.

### `index.html`
- Estructura base de la aplicación:
  - Campo de entrada para el nombre o ID del Pokémon.
  - Contenedor que muestra la información del Pokémon: número de Pokédex, nombre, generación, tipos y su imagen.
  - Botón para generar el PDF con los datos obtenidos.

## Notas importantes sobre imágenes en PDF

Para que una imagen pueda ser incluida en el PDF generado, debe estar presente como un atributo `src` en formato **Base64** o **blob** dentro de un tag `<img>`. Esto se debe a que **URLs externas no son compatibles directamente con las herramientas de generación de PDF como `html2pdf.js`**.

- En esta aplicación, el método `convertirImagenABase64(url)` convierte la URL de la imagen del Pokémon proporcionada por la PokeAPI a formato Base64.
- Una vez convertida, la imagen es asignada al atributo `src` del tag `<img>` que se renderiza en la interfaz. Esto asegura que la imagen se incluya correctamente en el PDF generado.

### Ejemplo:

1. La URL original de la imagen, como:  
   `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png`
2. Se convierte a Base64 mediante `convertirImagenABase64(url)`.
3. El resultado es algo como:  
   ```html
   <img src="data:image/png;base64,iVBORw0KGgoAAAANS..." alt="pikachu">
   ```
4. Esto permite que la imagen sea procesada y almacenada correctamente en el PDF generado.

## Dependencias

- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js): Librería utilizada para convertir el contenido HTML en archivos PDF.

## Notas

- La información de la generación del Pokémon puede no estar disponible para algunos Pokémon.
- Si el Pokémon no es encontrado, se muestra un mensaje de error al usuario.
- El diseño se centra en la funcionalidad y puede ser adaptado según necesidades.

---

¡Gracias por explorar esta Pokédex web!
