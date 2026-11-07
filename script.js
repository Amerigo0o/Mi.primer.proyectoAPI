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
});