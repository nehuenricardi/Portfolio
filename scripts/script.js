// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Referencias a elementos del DOM
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');
    const progressBars = document.querySelectorAll('.progreso');
    const contactForm = document.getElementById('formulario-contacto');

    // Cambiar estilo de la barra de navegación al hacer scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        }

        // Animar barras de progreso cuando son visibles
        animateOnScroll();
    });

    // Menú hamburguesa para dispositivos móviles
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Cerrar menú móvil al hacer clic en un enlace
    links.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Animación de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Función para animar elementos cuando son visibles en la pantalla
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animar barras de progreso cuando son visibles
    function animateOnScroll() {
        progressBars.forEach(bar => {
            if (isElementInViewport(bar)) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    }

    // Iniciar animación de barras de progreso
    animateOnScroll();

    // Manejar envío del formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;

            // Aquí normalmente enviarías los datos a un servidor
            // Para este ejemplo, solo mostraremos una alerta
            alert(`Gracias ${nombre} por tu mensaje. Te contactaremos pronto en ${email}.`);

            // Limpiar formulario
            contactForm.reset();
        });
    }

    // Animación para las tarjetas de proyectos
    const proyectoCards = document.querySelectorAll('.proyecto-card');

    proyectoCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animación de entrada para secciones
    const sections = document.querySelectorAll('.section');

    function fadeInSections() {
        sections.forEach(section => {
            if (isElementInViewport(section) && !section.classList.contains('visible')) {
                section.classList.add('visible');
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }

    // Aplicar estilos iniciales a las secciones
    sections.forEach(section => {
        if (section.id !== 'inicio') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
    });

    // Ejecutar fadeIn en scroll
    window.addEventListener('scroll', fadeInSections);

    // Ejecutar fadeIn al cargar la página
    fadeInSections();
});

// POPUPS para demos de proyectos

const demoPopupPomodoro = document.getElementById('demoPopupPomodoro');
const btnDemoPomodoro = document.getElementById('btn-demo-pomodoro');

const demoPopupNasapp = document.getElementById('demoPopupNasapp');
const btnDemoNasapp = document.getElementById('btn-demo-nasapp');

// Función para abrir popup
function abrirPopup(popup) {
  if (popup) {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Evitar scroll fondo
  }
}

// Función para cerrar popup
function cerrarPopup(popup) {
  if (popup) {
    popup.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restaurar scroll
  }
}

// Abrir popup PomodoroApp
if (btnDemoPomodoro) {
  btnDemoPomodoro.addEventListener('click', () => abrirPopup(demoPopupPomodoro));
}

// Abrir popup NasApp
if (btnDemoNasapp) {
  btnDemoNasapp.addEventListener('click', () => abrirPopup(demoPopupNasapp));
}

// Cerrar popup al hacer click en la X (cerrar) para ambos popups
document.querySelectorAll('.popup .close-popup').forEach(closeBtn => {
  closeBtn.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    cerrarPopup(popup);
  });
});

// Cerrar popup al hacer click fuera del contenido para ambos popups
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup') && e.target.classList.contains('active')) {
    cerrarPopup(e.target);
  }
});