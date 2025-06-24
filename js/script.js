const carousel = document.querySelector(".testimonials-carousel");
const originalCards = Array.from(carousel.children);
const visibleCards = 3;
let currentIndex = visibleCards;
let autoSlide;
const nav = document.getElementById("testimonials-nav");
let bullets = [];
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

function createBullets() {
    nav.innerHTML = "";
    for (let i = 0; i < originalCards.length; i++) {
        const bullet = document.createElement("span");
        bullet.classList.add("testimonial-bullet");
        if (i === 0) bullet.classList.add("active");
        bullet.dataset.index = i;
        nav.appendChild(bullet);
        bullets.push(bullet);
        bullet.addEventListener("click", () => {
            currentIndex = i + visibleCards;
            updatePosition();
            updateBullets();
            stopAutoSlide();
            startAutoSlide();
        });
    }
}

function updateBullets() {
    let realIndex = (currentIndex - visibleCards + originalCards.length) % originalCards.length;
    bullets.forEach((bullet, i) => {
        bullet.classList.toggle("active", i === realIndex);
    });
}

function cloneCards() {
    const totalCards = originalCards.length;
    for (let i = totalCards - visibleCards; i < totalCards; i++) {
        const clone = originalCards[i].cloneNode(true);
        clone.classList.add("clone");
        carousel.prepend(clone);
    }
    for (let i = 0; i < visibleCards; i++) {
        const clone = originalCards[i].cloneNode(true);
        clone.classList.add("clone");
        carousel.append(clone);
    }
}

cloneCards();

const allCards = carousel.children;
const totalCards = allCards.length;

function updatePosition(animate = true) {
    const percent = 100 / visibleCards;
    if (animate) {
        carousel.style.transition = "transform 0.5s ease";
    } else {
        carousel.style.transition = "none";
    }
    carousel.style.transform = `translateX(-${currentIndex * percent}%)`;
    if (currentIndex >= totalCards - visibleCards) {
        currentIndex = visibleCards;
        setTimeout(() => updatePosition(false), 510);
    } else if (currentIndex < visibleCards) {
        currentIndex = totalCards - 2 * visibleCards;
        setTimeout(() => updatePosition(false), 510);
    } else {
        updateBullets();
    }
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlide = setInterval(nextSlide, 4500);
}

function stopAutoSlide() {
    clearInterval(autoSlide);
}

function nextSlide() {
    currentIndex++;
    updatePosition();
}

function prevSlide() {
    currentIndex--;
    updatePosition();
}

carousel.addEventListener("touchstart", startTouchDrag, { passive: false });
carousel.addEventListener("touchend", endTouchDrag, { passive: false });
carousel.addEventListener("touchmove", dragTouch, { passive: false });

function startTouchDrag(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    carousel.style.transition = "none";
    stopAutoSlide();
}

function dragTouch(e) {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - startX;
    currentTranslate = prevTranslate + delta;
    carousel.style.transform = `translateX(${currentTranslate}px)`;
}

function endTouchDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    const delta = e.changedTouches[0].clientX - startX;
    const cardWidth = carousel.offsetWidth / visibleCards;
    if (delta < -50) {
        nextSlide();
    } else if (delta > 50) {
        prevSlide();
    } else {
        updatePosition();
    }
    prevTranslate = -(currentIndex * cardWidth);
    startAutoSlide();
}

createBullets();
setTimeout(() => {
    updatePosition(false);
    startAutoSlide();
}, 50);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Animated Counter
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment).toLocaleString();
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        updateCount();
    });
}

// Trigger counters on scroll
const counterSection = document.querySelector('.impact-counter');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
    }
}, { threshold: 0.5 });
observer.observe(counterSection);

// Share Button Functionality
document.querySelectorAll('.btn-share').forEach(button => {
    button.addEventListener('click', () => {
        const url = window.location.href;
        const text = button.getAttribute('aria-label')?.replace('Share ', 'Support Uplifters.Net: ') || 'Support Uplifters.Net';
        if (navigator.share) {
            navigator.share({ title: 'Uplifters.Net Donation', text, url }).catch(console.error);
        } else {
            navigator.clipboard.write(url).then(() => alert('Link copied to clipboard!'));
        }
    });
});

// Gallery Functionality
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.image-container img');
    const popup = document.querySelector('.pop-image');
    const popupImg = document.querySelector('.pop-image img');
    const closeBtn = document.querySelector('.pop-image span');

    if (!popup || !popupImg || !closeBtn) return;

    images.forEach(image => {
        image.addEventListener('click', () => {
            popupImg.src = image.src;
            popupImg.alt = image.alt || 'Enlarged gallery image';
            popupImg.classList.add('loading');
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }, { passive: true });
    });

    popupImg.addEventListener('load', () => {
        popupImg.classList.remove('loading');
    }, { passive: true });

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }, { passive: true });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, { passive: true });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, { passive: true });

    popup.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && popup.classList.contains('active')) {
            const focusable = popup.querySelector('span');
            if (document.activeElement !== focusable) {
                focusable.focus();
                e.preventDefault();
            }
        }
    });
});