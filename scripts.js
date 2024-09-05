fetch('https://xmljatsredalyc.org//wp-json/wp/v2/posts')
  .then(res => res.json())
  .then(posts => {
    posts.forEach((post, index) => {
      if (post.excerpt && post.excerpt.rendered && post.link) {
        const liga = post.link;
        const parrafoRen = stripHTML(post.excerpt.rendered);
        const quitar = 'Continuar leyendo →'
        const parrafoRendered = removeSubstring(parrafoRen, quitar)
        const parrafoId = `intro-${index + 1}`;
        const parrafo = document.getElementById(parrafoId);

        if (parrafo) {
          const salto = document.createElement('br');
          const url = document.createElement('a');
          url.href = liga;
          url.textContent = "Continuar leyendo →";
          url.target = '_blank';
          url.className = 'cuerpoLink';
          parrafo.innerHTML = parrafoRendered;
          parrafo.appendChild(salto);
          parrafo.appendChild(url);
        }
      }

      if (post.title && post.title.rendered && post.link) {
        const titleRendered = post.title.rendered;
        const linkUrl = post.link
        const titleId = `titulo-${index + 1}`;
        const titulo = document.getElementById(titleId);
        if (titulo) {
          const enlace = document.createElement('a');
          enlace.href = linkUrl;
          enlace.textContent = titleRendered; // Establecer el texto del enlace
          enlace.target = '_blank'; // Abrir en una nueva pestaña (opcional)
          enlace.className = 'tituloLink';
          // Limpiar el contenido del elemento antes de agregar el nuevo enlace
          titulo.innerHTML = '';
          titulo.appendChild(enlace);
        }
      }
    });
  })
  .catch(error => console.error('Error:', error));

function stripHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.innerText || div.textContent || '';
}

function removeSubstring(text, substring) {
  return text.replace(substring, '');
}