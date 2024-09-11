function pagina(num) {
    if (num === 1) {
        absorber('https://xmljatsredalyc.org/wp-json/wp/v2/posts');
    } else
        if (num === 2) {
            absorber('https://xmljatsredalyc.org//wp-json/wp/v2/posts?page=2')
        }

}

function absorber(liga) {
    fetch(liga)
        .then(res => res.json())
        .then(posts => {
            const contenedorID = "contenedor-tarjetas";
            const contenedor = document.getElementById(contenedorID);
            contenedor.innerHTML = "";

            posts.forEach((post, index) => {
                if (post.title && post.title.rendered && post.excerpt && post.excerpt.rendered && post.link) {
                    const titleRendered = post.title.rendered;
                    const excerptRendered = stripHTML(post.excerpt.rendered);
                    const quitar = 'Continuar leyendo →';
                    const parrafo = removeSubstring(excerptRendered, quitar);
                    const link = post.link;

                    //Contenedor de cada carta
                    const carta = document.createElement('div');
                    carta.className = "w3-card-4";
                    carta.style = "width: 390px; height: fit-content;";
                    carta.id = `intro-${index + 1}`;
                    contenedor.appendChild(carta);

                    //header de cada carta
                    const headCarta = document.createElement('header');
                    headCarta.className = "w3-container";
                    carta.appendChild(headCarta);

                    //titulo de las cartas, se inserta en el header, tiene un formato de link
                    const tituloCarta = document.createElement('h3');
                    headCarta.appendChild(tituloCarta);
                    const url = document.createElement('a');
                    url.href = link;
                    url.textContent = titleRendered;
                    url.className = "link-titulo";
                    url.target = '_blank';
                    tituloCarta.appendChild(url);

                    //contenedor para insertar el texto de cada carta
                    const cuerpoCarta = document.createElement('div');
                    cuerpoCarta.className = "w3-container";
                    cuerpoCarta.style = "padding: 35px;";
                    cuerpoCarta.id = `cuerpo-${index + 1}`;
                    carta.appendChild(cuerpoCarta);

                    //texto de las cartas
                    const linkTexto = document.createElement('a');
                    linkTexto.href = link;
                    linkTexto.textContent = 'Continuar leyendo →';
                    linkTexto.className = 'link-texto';
                    linkTexto.target = '_blank';
                    const textoCarta = document.createElement('p');
                    textoCarta.textContent = parrafo;
                    textoCarta.className = "texto-cartas";
                    cuerpoCarta.appendChild(textoCarta);
                    cuerpoCarta.appendChild(linkTexto);

                }
            });
        })
        .catch(error => console.error('Error:', error));
}
function stripHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString;
    return div.innerText || div.textContent || '';
}

function removeSubstring(text, substring) {
    return text.replace(substring, '');
}
