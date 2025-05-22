// Lógica del Nuevo Carrusel
const sliderContainer = document.getElementById('imageCarousel');
const slides = Array.from(sliderContainer.querySelectorAll('.slider-single'));
const totalSlides = slides.length;
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;
let mouseStartX = 0;
let mouseEndX = 0;
let isDragging = false;
const slideRepeat = true; 

function updateSlidesClass() {
    slides.forEach((slide, index) => {
        // Reset classes
        slide.classList.remove('slide-active', 'slide-preactive', 'slide-proactive', 'slide-preactivede', 'slide-proactivede');
        
        // Apply new classes
        if (index === currentSlide) {
            slide.classList.add('slide-active');
        } else if (index === (currentSlide - 1 + totalSlides) % totalSlides) {
            slide.classList.add('slide-preactive');
        } else if (index === (currentSlide + 1) % totalSlides) {
            slide.classList.add('slide-proactive');
        } else if (index === (currentSlide - 2 + totalSlides) % totalSlides && totalSlides > 3) { 
                slide.classList.add('slide-preactivede');
        } else if (index === (currentSlide + 2) % totalSlides && totalSlides > 3) { 
                slide.classList.add('slide-proactivede');
        }
    });
}


function slideNext() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidesClass();
}

function slidePrev() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidesClass();
}

if (slides.length > 0) {
    setTimeout(() => {
        updateSlidesClass(); 
        slides.forEach(slide => void slide.offsetWidth); // Force reflow
        currentSlide = 0; 
        updateSlidesClass();
    }, 50); 
}

if (document.querySelector('[data-carousel-next]')) {
    document.querySelector('[data-carousel-next]').addEventListener('click', slideNext);
}
if (document.querySelector('[data-carousel-prev]')) {
    document.querySelector('[data-carousel-prev]').addEventListener('click', slidePrev);
}

if (sliderContainer) {
    const sliderContent = sliderContainer.querySelector('.slider-content');

    sliderContent.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContent.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    sliderContent.addEventListener('mousedown', (e) => {
        mouseStartX = e.screenX;
        isDragging = true;
        sliderContent.classList.add('grabbing'); 
    });

    document.addEventListener('mouseup', (e) => { 
        if (!isDragging) return;
        mouseEndX = e.screenX;
        isDragging = false;
        sliderContent.classList.remove('grabbing'); 
        handleMouseSwipe();
    });
    
    document.addEventListener('mousemove', (e) => { 
        if (isDragging) {
            e.preventDefault();
        }
    });

    sliderContainer.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
        slideNext();
    } else if (touchEndX - touchStartX > swipeThreshold) {
        slidePrev();
    }
}

function handleMouseSwipe() {
    const swipeThreshold = 50;
    if (mouseStartX - mouseEndX > swipeThreshold) {
        slideNext();
    } else if (mouseEndX - mouseStartX > swipeThreshold) {
        slidePrev();
    }
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

// Modal Logic
const messageModal = document.getElementById('messageModal');
const modalMessageContent = document.getElementById('modalMessageContent'); // Changed ID
const menuModal = document.getElementById('menuModal');

function showOrderInfo() {
    const stepsHTML = `
        <div class="order-steps-container">
            <h4>Pasos para Realizar tu Pedido</h4>
            <ul class="order-steps-list">
                <li><strong>1. Anticipación:</strong> Realiza tu pedido con al menos <strong>2 días</strong> de anticipación para garantizar calidad y personalización.</li>
                <li><strong>2. Especificaciones:</strong> Indícanos los productos que deseas y sus detalles: cobertura, color, diseño, tipo de masa, etc.</li>
                <li><strong>3. Pago:</strong> Agenda tu pedido realizando un adelanto del <strong>50%</strong> por transferencia.</li>
                <li><strong>4. Envío:</strong> Coordinamos el envío de tu compra. (Los precios no incluyen domicilio).</li>
            </ul>
            <div class="order-contact-info">
                <p class="mt-4"><strong>Información Adicional:</strong></p>
                <p>Puedes cotizar tus cajitas a partir de 6 unidades.</p>
                <p>El precio final se cotizará dependiendo de la cantidad, diseño o frases.</p>
                <p class="mt-6">Contáctanos por:</p>
                <p><a href="https://wa.me/573021015128?text=Hola%2C%20estoy%20interesado%20en%20comprar%20minidonas" target="_blank">WhatsApp (+57 302 1015128)</a></p>
                <p>o DM en <a href="https://www.instagram.com/gentle__bite/" target="_blank">Instagram @gentle__bite</a></p>
            </div>
        </div>
    `;
    if (modalMessageContent) modalMessageContent.innerHTML = stepsHTML;
    if (messageModal) messageModal.style.display = "block";
}


function openMenuModal() {
    if (menuModal) menuModal.style.display = "block";
}

function closeModal(modalId) {
    const modalToClose = document.getElementById(modalId);
    if (modalToClose) {
        modalToClose.style.display = "none";
    }
}

window.onclick = function(event) {
    if (event.target == messageModal) {
        closeModal('messageModal');
    }
    if (event.target == menuModal) {
        closeModal('menuModal');
    }
}