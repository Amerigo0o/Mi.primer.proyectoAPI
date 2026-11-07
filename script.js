// 1. Buscamos y guardamos los elementos de la página usando sus ID
const inputNombre = document.getElementById('nombreInput');
const botonEnviar = document.getElementById('enviarBtn');
const mensajeSalida = document.getElementById('mensajeSalida');

// 2. Le decimos al botón de enviar que "escuche" cuando hagan clic
botonEnviar.addEventListener('click', function() {
    // Capturamos lo que el usuario escribió en el input
    const valorUsuario = inputNombre.value;

    mensajeSalidaclassList.remove('mensaje-oculto'); 
    mensajeSalida.classList.add('mensaje-salida');

    // Validamos si el usuario escribió algo o está vacío
    if (valorUsuario.trim() === "") {
        mensajeSalida.style.color = "#f87171"; // Rojo para error
        mensajeSalida.style.borderColor = "#f87171"; 
        mensajeSalida.textContent = "No se te olvide escribir algo velocista.";
    } else {
        mensajeSalida.style.color = "#38bdf8"; // Azul
        mensajeSalida.style.borderColor = "#38bdf8"; 
        mensajeSalida.textContent = "¡Hola, " + valorUsuario + "! Acabas de programar tu primera interacción con JavaScript.";
    }
});

// 3. Buscamos el nuevo botón de la API y le agregamos un evento de clic
const botonApi = document.getElementById('apiBtn');
botonApi.addEventListener('click', function() {
    // Lógica para buscar consejo web
    mensajeSalida.classList.remove('mensaje-oculto'); 
    mensajeSalida.classList.add('mensaje-salida'); 
    mensajeSalida.style.color = "#38bdf8";
    mensajeSalida.style.borderColor = "#38bdf8";
    mensajeSalida.textContent = "Conectando con el servidor...";

    fetch('https://api.adviceslip.com/advice')
        .then(respuesta => respuesta.json())
        .then(datos => {
            const consejoIngles = datos.slip.advice;

            return fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(consejoIngles)}&langpair=en|es`);
        })
        .then(respuestaTraduccion => respuestaTraduccion.json())
        .then(datosTraduccion => {
            const consejoTraducido = datosTraduccion.responseData.translatedText;
            mensajeSalida.textContent = "Consejo web: " + consejoTraducido;
        })
        .catch(error => {
            mensajeSalida.style.color = "#f87171";
            mensajeSalida.style.borderColor = "#f87171";
            mensajeSalida.textContent = "Error al conectar con el servidor.";
        });

    // Hacemos la solicitud a la API con fetch
    fetch('https://api.adviceslip.com/advice')
        .then(respuesta => respuesta.json())
        .then(datos => {
            const consejoAleatorio = datos.slip.advice;
            mensajeSalida.textContent = "Consejo web: " + consejoAleatorio;
        })
        .catch(error => {
            mensajeSalida.style.color = "#f87171";
            mensajeSalida.style.borderColor = "#f87171";
            mensajeSalida.textContent = "Error al conectar con el servidor.";
        });

// 1. Al iniciar la app, cargamos los favoritos guardados (o un array vacío si no hay nada)
let favoritos = JSON.parse(localStorage.getItem('mis_consejos')) || [];

// Referencias a elementos del DOM (asegúrate de que tus IDs coincidan)
const btnFavorito = document.getElementById('btn-favorito');
const listaFavoritos = document.getElementById('lista-favoritos');

// Función para renderizar la lista en la interfaz
function mostrarFavoritos() {
    listaFavoritos.innerHTML = ''; // Limpiamos la lista antes de volver a pintarla
    
    favoritos.forEach((consejo, index) => {
        const li = document.createElement('li');
        li.textContent = consejo;
        
        // (Opcional) Botón para eliminar un favorito individual
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = '❌';
        btnEliminar.onclick = () => eliminarFavorito(index);
        
        li.appendChild(btnEliminar);
        listaFavoritos.appendChild(li);
    });
}

// 2. Guardar el consejo actual al hacer clic en el botón
btnFavorito.addEventListener('click', () => {
    // Supongamos que 'parrafoConsejo' es el elemento donde muestras el texto traducido
    const textoConsejo = document.getElementById('parrafoConsejo').textContent;

    // Validar que haya texto y que no esté duplicado ya en favoritos
    if (textoConsejo && !favoritos.includes(textoConsejo)) {
        favoritos.push(textoConsejo);
        
        // Guardar en el navegador convirtiendo el array a texto (JSON)
        localStorage.setItem('mis_consejos', JSON.stringify(favoritos));
        
        // Actualizar la vista
        mostrarFavoritos();
    }
});

// Función para eliminar un favorito
function eliminarFavorito(index) {
    favoritos.splice(index, 1);
    localStorage.setItem('mis_consejos', JSON.stringify(favoritos));
    mostrarFavoritos();
}

// Ejecutar al cargar la página para mostrar los favoritos guardados previamente
mostrarFavoritos();
});