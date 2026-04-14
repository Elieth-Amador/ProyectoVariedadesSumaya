
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donationsForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        
        const nombre = document.getElementById('nombre');
        const correo = document.getElementById('correo');
        const monto = document.getElementById('monto');
        
        const errorNombre = document.getElementById('error-nombre');
        const errorCorreo = document.getElementById('error-correo');
        const errorMonto = document.getElementById('error-monto');

        
        [errorNombre, errorCorreo, errorMonto].forEach(el => el.textContent = "");
        let isValid = true;

        
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

        
        if (monto.value.trim() === "") {
            errorMonto.textContent = "Monto no registrado";
            isValid = false;
        } else if (parseFloat(monto.value) <= 0) {
            errorMonto.textContent = "El monto debe ser mayor a 0";
            isValid = false;
        }

        
        if (isValid) {
            alert(`¡Gracias ${nombre.value}! Tu solicitud de donación ha sido enviada.`);
            form.reset();
        }
    });
});