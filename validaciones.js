document.getElementById('formularioContacto').addEventListener('submit', function (event) {
    let errores = [];

    let nombre = document.querySelector('input[type="text"]').value.trim();
    let email = document.querySelector('input[type="email"]').value.trim();
    let telefono = document.querySelector('input[type="tel"]').value.trim();
    let mensaje = document.querySelector('textarea').value.trim();

    if (nombre === '') {
        errores.push('El campo "Nombre completo" es obligatorio.');
    }

    if (email === '') {
        errores.push('El campo correo electrónico es obligatorio.');
    } else {
        // Validar formato del correo electrónico
        let regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!regexEmail.test(email)) {
            errores.push('El correo electrónico no es válido.');
        }
    }

    if (telefono === '') {
        errores.push('El campo "Teléfono" es obligatorio.');
    } else if (!/^\d+$/.test(telefono)) {
        errores.push('El teléfono solo debe contener números.');
    }


    if (mensaje === '') {
        errores.push('El campo "Mensaje" es obligatorio.');
    }

    if (errores.length > 0) {
        event.preventDefault(); // Evita que se envíe el formulario
        document.getElementById('errores').innerHTML = errores.join('<br>');
    }
});

// función para "leer mas" en las descripciones de cabañas
function configurarLeerMas() {
    const cards = document.querySelectorAll('#cabanas .card');
    
    cards.forEach(card => {
        const descripcion = card.querySelector('.card-text');
        const textoCompleto = descripcion.textContent;
        const textoCorto = textoCompleto.substring(0, 100) + '...';
        
        // aplicar solo si el texto es suficientemente largo
        if (textoCompleto.length > 120) {
            descripcion.textContent = textoCorto;
            
            const botonLeerMas = document.createElement('button');
            botonLeerMas.textContent = 'Leer más';
            botonLeerMas.className = 'btn btn-link p-0 text-decoration-none';
            
            descripcion.insertAdjacentElement('afterend', botonLeerMas);
            
            botonLeerMas.addEventListener('click', function() {
                if (descripcion.textContent === textoCorto) {
                    descripcion.textContent = textoCompleto;
                    botonLeerMas.textContent = 'Leer menos';
                } else {
                    descripcion.textContent = textoCorto;
                    botonLeerMas.textContent = 'Leer más';
                }
            });
        }
    });
}


// funcion de sistema de filtrado por tipo de cabaña
// se crea la interfaz de filtros
function configurarFiltros() {
    const filtroHTML = `
        <div class="filtro-cabanas mb-4 p-3 bg-light rounded">
            <h4 class="text-center mb-3">Filtrar Cabañas</h4>
            <div class="d-flex justify-content-center gap-3">
                <button class="btn btn-outline-primary btn-filtrar" data-tipo="todas">Todas</button>
                <button class="btn btn-outline-primary btn-filtrar" data-tipo="arrayán">Arrayán</button>
                <button class="btn btn-outline-primary btn-filtrar" data-tipo="pasarela">Pasarela</button>
                <button class="btn btn-outline-primary btn-filtrar" data-tipo="tinaja">Tinajas</button>
            </div>
        </div>
    `;
    
    const seccionCabanas = document.getElementById('cabanas');
    seccionCabanas.insertAdjacentHTML('afterbegin', filtroHTML);
    
    document.querySelectorAll('.btn-filtrar').forEach(boton => {
        boton.addEventListener('click', function() {
            const tipo = this.getAttribute('data-tipo');
            filtrarCabanas(tipo);
        });
    });
}
//funcion de filtado
function filtrarCabanas(tipo) {
    const cabanas = document.querySelectorAll('#cabanas .col-md-4');
    
    cabanas.forEach(cabana => {
        const titulo = cabana.querySelector('.card-title').textContent.toLowerCase();
        const mostrar = tipo === 'todas' || titulo.includes(tipo);
        
        cabana.style.display = mostrar ? 'block' : 'none';
        cabana.classList.toggle('d-none', !mostrar);
    });
}

//efecto de mostrar/ocultar una sección de testimonios
function configurarTestimonios() {
    //se añaden sección de testimonios
    const testimoniosHTML = `
        <section id="testimonios" class="container mt-5">
            <div class="bg-light p-5 rounded shadow-lg">
                <h2 class="text-center mb-4">Testimonios</h2>
                <button id="btnToggleTestimonios" class="btn btn-outline-secondary mb-3">Mostrar Testimonios</button>
                <div id="contenidoTestimonios" class="d-none">
                    <div class="testimonio mb-4">
                        <p class="fst-italic">"Excelente atención y ubicación. Las cabañas son muy acogedoras."</p>
                        <p class="fw-bold">- María González</p>
                    </div>
                    <div class="testimonio mb-4">
                        <p class="fst-italic">"La cabaña Pasarela superó todas nuestras expectativas. ¡Volveremos!"</p>
                        <p class="fw-bold">- Carlos Mendoza</p>
                    </div>
                </div>
            </div>
        </section>
    `;
    
    const seccionUbicacion = document.getElementById('ubicacion');
    seccionUbicacion.insertAdjacentHTML('beforebegin', testimoniosHTML);
//eventos   
    document.getElementById('btnToggleTestimonios').addEventListener('click', function() {
        const contenido = document.getElementById('contenidoTestimonios');
        contenido.classList.toggle('d-none');
        this.textContent = contenido.classList.contains('d-none') ? 'Mostrar Testimonios' : 'Ocultar Testimonios';
    });
}

//cuando el DOM este cargado, se ejecuta:
document.addEventListener('DOMContentLoaded', function() {
    configurarLeerMas();
    configurarFiltros();
    configurarTestimonios();
});







//sprint 3

//manejo de evento (formulario) de JQuery

//validación mejorada del formulario con animaciones
$('#formularioContacto').on('submit', function(e) {
    e.preventDefault();
    let isValid = true;
    const $form = $(this);
    
    //resetea errores
    $('.form-control').removeClass('is-invalid');
    $('#errores').empty().hide();
    
    //validar cada campo
    $form.find('[required]').each(function() {
        const $field = $(this);
        if ($field.val().trim() === '') {
            $field.addClass('is-invalid animate__animated animate__headShake');
            isValid = false;
            setTimeout(() => $field.removeClass('animate__headShake'), 1000);
        }
    });
    
    //validación exclusiva para el email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const $email = $('#email');
    if (!emailRegex.test($email.val())) {
        $email.addClass('is-invalid animate__animated animate__headShake');
        isValid = false;
        setTimeout(() => $email.removeClass('animate__headShake'), 1000);
    }
    
    if (isValid) {
        // Animación de envío
        $form.find('button[type="submit"]')
            .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...')
            .prop('disabled', true);
        
        // Simular envío (reemplazar con AJAX real)
        setTimeout(() => {
            $form.hide();
            $('#errores')
                .removeClass('text-danger')
                .addClass('text-success animate__animated animate__fadeInUp')
                .html('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.')
                .show();
        }, 1500);
    } else {
        $('#errores')
            .addClass('animate__animated animate__fadeIn')
            .html('Por favor completa todos los campos requeridos correctamente.')
            .show();
    }
});

// Evento para limpiar errores al enfocar campos
$('.form-control').on('focus', function() {
    $(this).removeClass('is-invalid');
});








//efecto 1. scroll y navbar dinamico
$(document).ready(function() {
    //efecto 1: Scroll suave para enlaces internos
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        if (target !== '#') {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 70
            }, 800);
        }
    });

    //efecto 2: navbar que cambia al hacer scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('navbar-scrolled');
            $('.navbar').removeClass('bg-dark');
            $('.navbar').css('background-color', 'rgba(44, 62, 80, 0.95)');
            $('.navbar').css('box-shadow', '0 2px 10px rgba(0, 0, 0, 0.2)');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
            $('.navbar').addClass('bg-dark');
            $('.navbar').css('background-color', '');
            $('.navbar').css('box-shadow', 'none');
        }
    });

    //efecto 3: Animación de tarjetas al aparecer
    $('.card').each(function(i) {
        $(this).delay(200 * i).css('opacity', 0).animate({
            opacity: 1,
            marginTop: 0
        }, 600);
    });
});