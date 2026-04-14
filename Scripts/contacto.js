document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const mensaje = document.getElementById('mensaje');
        
        const errorNombre = document.getElementById('error-nombre');
        const errorCorreo = document.getElementById('error-correo');
        const errorMensaje = document.getElementById('error-mensaje');

        let isValid = true;

        [errorNombre, errorCorreo, errorMensaje].forEach(el => el.textContent = "");

        if (nombre.value.trim() === "") {
            errorNombre.textContent = "Nombre no registrado";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (correo.value.trim() === "") {
            errorCorreo.textContent = "Correo no registrado";
            isValid = false;
        } else if (!emailRegex.test(correo.value)) {
            errorCorreo.textContent = "Formato de correo inválido";
            isValid = false;
        }

        if (mensaje.value.trim() === "") {
            errorMensaje.textContent = "Mensaje no registrado";
            isValid = false;
        }

        if (isValid) {
            alert(`¡Gracias ${nombre.value}! Tu mensaje ha sido enviado con éxito.`);
            form.reset();
        }
    });
});