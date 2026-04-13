document.addEventListener("DOMContentLoaded", () => {
    const MIN_AGE = 18;
    const form = document.getElementById("helpForm");

    // Expresiones Regulares
    const regex = {
        name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        id: /^\d{13,14}$/,
        phone: /^\d{8}$/,
        empty: /^\s*$/
    };

    const calculateAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
        return age;
    };

    const showError = (id, message) => {
        const errorSpan = document.getElementById(`${id}-error`);
        const input = document.getElementById(id);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.add('active');
            input.classList.add('input-error');
        }
    };

    const clearErrors = () => {
        document.querySelectorAll('.error-message').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('input, textarea, select').forEach(i => i.classList.remove('input-error'));
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();
        let isValid = true;

        const data = {
            nombre: document.getElementById("nombre").value.trim(),
            identidad: document.getElementById("identidad").value.trim(),
            nacimiento: document.getElementById("nacimiento").value,
            telefono: document.getElementById("telefono").value.trim(),
            correo: document.getElementById("correo").value.trim(),
            mensaje: document.getElementById("mensaje").value.trim()
        };

        // Validaciones
        if (!regex.name.test(data.nombre)) {
            showError("nombre", "Nombre no válido (mínimo 3 letras).");
            isValid = false;
        }

        if (!regex.id.test(data.identidad)) {
            showError("identidad", "Ingrese 13 o 14 dígitos numéricos.");
            isValid = false;
        }

        if (regex.empty.test(data.nacimiento)) {
            showError("nacimiento", "La fecha es requerida.");
            isValid = false;
        } else if (calculateAge(data.nacimiento) < MIN_AGE) {
            showError("nacimiento", `Debes ser mayor de ${MIN_AGE} años.`);
            isValid = false;
        }

        if (!regex.phone.test(data.telefono)) {
            showError("telefono", "El teléfono debe tener 8 dígitos.");
            isValid = false;
        }

        if (!regex.email.test(data.correo)) {
            showError("correo", "Correo electrónico no válido.");
            isValid = false;
        }

        if (data.mensaje.split(/\s+/).length < 5) {
            showError("mensaje", "La propuesta debe tener al menos 5 palabras.");
            isValid = false;
        }

        if (isValid) {
            alert("¡Éxito! Tu solicitud para Variedades Sumaya ha sido enviada.");
            form.reset();
        } else {
            // Focus al primer error
            const firstError = document.querySelector('.input-error');
            if (firstError) firstError.focus();
        }
    });
});