const API_BASE = document.body?.dataset?.apiBase || `${window.location.origin.replace(/\/$/, '')}/api`;
const AUTH_STORAGE_KEY = 'upliftersAuth';
const state = {
    user: null,
    tokens: null,
    campaigns: []
};

const authNavItem = document.getElementById('authNavItem');
const userNavItem = document.getElementById('userNavItem');
const userNameEl = document.getElementById('userName');
const logoutBtn = document.getElementById('logoutBtn');
const authStatusEl = document.getElementById('auth-status');
const contactStatusEl = document.getElementById('contact-status');
const donationStatusEl = document.getElementById('donation-status');
const testimonialStatusEl = document.getElementById('testimonial-status');
const donationCampaignSelect = document.getElementById('donation-campaign');
const donationNameInput = document.getElementById('donation-name');
const donationEmailInput = document.getElementById('donation-email');
const authModal = document.getElementById('authModal');

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
    const popup = document.querySelector('.pop-image');
    const popupImg = document.querySelector('.pop-image img');
    const closeBtn = document.querySelector('.pop-image span');
    const imageContainer = document.querySelector('.image-container');

    if (!popup || !popupImg || !closeBtn || !imageContainer) return;

    imageContainer.addEventListener('click', (event) => {
        const targetImg = event.target.closest('img');
        if (!targetImg) return;
        popupImg.src = targetImg.src;
        popupImg.alt = targetImg.alt || 'Enlarged gallery image';
        popupImg.classList.add('loading');
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
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

// Backend integration helpers
const getModal = (modalElement) => {
    if (!modalElement || !window.bootstrap?.Modal) return null;
    return window.bootstrap.Modal.getOrCreateInstance(modalElement);
};

const setStatus = (element, message = '') => {
    if (element) {
        element.textContent = message;
    }
};

const persistAuth = () => {
    if (state.user && state.tokens) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ user: state.user, tokens: state.tokens }));
    } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
    }
};

const loadStoredAuth = () => {
    const saved = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!saved) return;
    try {
        const parsed = JSON.parse(saved);
        state.user = parsed.user;
        state.tokens = parsed.tokens;
    } catch (error) {
        console.error('Failed to parse auth state', error);
    }
};

const updateAuthUI = () => {
    if (state.user) {
        authNavItem?.classList.add('d-none');
        userNavItem?.classList.remove('d-none');
        if (userNameEl) {
            userNameEl.textContent = state.user.firstName || state.user.email;
        }
        if (donationNameInput && state.user.firstName) {
            donationNameInput.value = `${state.user.firstName} ${state.user.lastName || ''}`.trim();
        }
        if (donationEmailInput) {
            donationEmailInput.value = state.user.email;
        }
    } else {
        authNavItem?.classList.remove('d-none');
        userNavItem?.classList.add('d-none');
        if (donationNameInput) donationNameInput.value = '';
        if (donationEmailInput) donationEmailInput.value = '';
    }
};

const setAuthState = ({ user, tokens }) => {
    state.user = user;
    state.tokens = tokens;
    persistAuth();
    updateAuthUI();
};

const clearAuthState = () => {
    state.user = null;
    state.tokens = null;
    persistAuth();
    updateAuthUI();
};

const refreshSession = async () => {
    if (!state.tokens?.refreshToken) return false;
    try {
        const response = await fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ refreshToken: state.tokens.refreshToken })
        });
        if (!response.ok) {
            clearAuthState();
            return false;
        }
        const payload = await response.json();
        state.tokens = payload.data.tokens;
        persistAuth();
        return true;
    } catch (error) {
        clearAuthState();
        return false;
    }
};

const apiFetch = async (path, options = {}, tryRefresh = true) => {
    const config = { ...options };
    config.headers = config.headers ? { ...config.headers } : {};

    if (!(config.body instanceof FormData) && config.method && config.method !== 'GET') {
        config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
    }

    if (state.tokens?.accessToken) {
        config.headers.Authorization = `Bearer ${state.tokens.accessToken}`;
    }

    config.credentials = config.credentials || 'include';

    let response;
    try {
        response = await fetch(`${API_BASE}${path}`, config);
    } catch (networkError) {
        throw new Error('Unable to connect to the server right now.');
    }

    if (response.status === 401 && tryRefresh && state.tokens?.refreshToken) {
        const refreshed = await refreshSession();
        if (refreshed) {
            return apiFetch(path, options, false);
        }
    }

    let data = null;
    try {
        data = await response.json();
    } catch (error) {
        data = null;
    }

    if (!response.ok) {
        throw new Error(data?.message || 'Something went wrong');
    }

    return data;
};

const handleLogin = async (event) => {
    event.preventDefault();
    setStatus(authStatusEl, 'Signing in...');
    try {
        const payload = {
            email: document.getElementById('login-email').value,
            password: document.getElementById('login-password').value
        };
        const response = await apiFetch('/auth/login', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        setAuthState(response.data);
        setStatus(authStatusEl, 'Welcome back!');
        getModal(authModal)?.hide();
    } catch (error) {
        setStatus(authStatusEl, error.message);
    }
};

const handleRegister = async (event) => {
    event.preventDefault();
    setStatus(authStatusEl, 'Creating your account...');
    try {
        await apiFetch('/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                firstName: document.getElementById('register-first-name').value,
                lastName: document.getElementById('register-last-name').value,
                email: document.getElementById('register-email').value,
                password: document.getElementById('register-password').value
            })
        });
        setStatus(authStatusEl, 'Registration successful! Please log in.');
        document.getElementById('login-tab')?.click();
    } catch (error) {
        setStatus(authStatusEl, error.message);
    }
};

const handleLogout = async () => {
    try {
        if (state.tokens?.refreshToken) {
            await apiFetch('/auth/logout', {
                method: 'POST',
                body: JSON.stringify({ refreshToken: state.tokens.refreshToken })
            });
        }
    } catch (error) {
        console.warn('Logout warning:', error.message);
    } finally {
        clearAuthState();
    }
};

const handleContactSubmit = async (event) => {
    event.preventDefault();
    setStatus(contactStatusEl, 'Sending...');
    try {
        await apiFetch('/contact', {
            method: 'POST',
            body: JSON.stringify({
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                subject: document.getElementById('contact-subject').value,
                message: document.getElementById('contact-message').value
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        setStatus(contactStatusEl, 'Thanks! We will reach out shortly.');
        event.target.reset();
    } catch (error) {
        setStatus(contactStatusEl, error.message);
    }
};

const ensureAuthenticated = () => {
    if (!state.user) {
        setStatus(authStatusEl, 'Please login to continue.');
        getModal(authModal)?.show();
        return false;
    }
    return true;
};

const handleDonationSubmit = async (event) => {
    event.preventDefault();
    if (!ensureAuthenticated()) return;
    setStatus(donationStatusEl, 'Processing your donation...');
    try {
        const payload = {
            name: donationNameInput.value,
            email: donationEmailInput.value,
            amount: Number(document.getElementById('donation-amount').value),
            currency: 'USD',
            campaignId: document.getElementById('donation-campaign').value || undefined,
            paymentMethod: document.getElementById('donation-method').value,
            metadata: {
                message: document.getElementById('donation-message').value
            }
        };
        await apiFetch('/donations', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        setStatus(donationStatusEl, 'Thank you! Receipt emailed shortly.');
        event.target.reset();
    } catch (error) {
        setStatus(donationStatusEl, error.message);
    }
};

const handleTestimonialSubmit = async (event) => {
    event.preventDefault();
    if (!ensureAuthenticated()) return;
    setStatus(testimonialStatusEl, 'Submitting...');
    try {
        await apiFetch('/testimonials', {
            method: 'POST',
            body: JSON.stringify({
                name: document.getElementById('testimonial-name').value,
                content: document.getElementById('testimonial-content').value,
                rating: Number(document.getElementById('testimonial-rating').value)
            })
        });
        setStatus(testimonialStatusEl, 'Thank you for sharing! Pending approval.');
        event.target.reset();
    } catch (error) {
        setStatus(testimonialStatusEl, error.message);
    }
};

const fetchMetrics = async () => {
    try {
        const response = await apiFetch('/metrics/summary', { method: 'GET' }, false);
        if (!response?.data) return;
        const counterEls = document.querySelectorAll('.counter');
        const metricMap = response.data.impactMetrics.reduce((acc, metric) => {
            acc[metric.type] = metric.value;
            return acc;
        }, {});
        counterEls.forEach((counter) => {
            const key = counter.dataset.metric;
            if (key && metricMap[key] !== undefined) {
                counter.dataset.target = metricMap[key];
            }
        });
    } catch (error) {
        console.warn('Metrics fetch failed:', error.message);
    }
};

const fetchTestimonials = async () => {
    try {
        const response = await apiFetch('/testimonials', { method: 'GET' }, false);
        if (!response?.data?.length) return;
        const cards = document.querySelectorAll('.testimonial-card');
        cards.forEach((card, index) => {
            const testimonial = response.data[index % response.data.length];
            const contentEl = card.querySelector('p');
            const nameEl = card.querySelector('h5');
            const roleEl = card.querySelector('small');
            if (contentEl) contentEl.textContent = testimonial.content;
            if (nameEl) nameEl.textContent = testimonial.name;
            if (roleEl) {
                roleEl.textContent = testimonial?.rating
                    ? `Impact score ${testimonial.rating}/5`
                    : 'Community member';
            }
        });
    } catch (error) {
        console.warn('Testimonials fetch failed:', error.message);
    }
};

const fetchGallery = async () => {
    const container = document.querySelector('.image-container');
    if (!container) return;
    try {
        const response = await apiFetch('/gallery', { method: 'GET' }, false);
        if (!response?.data) return;
        container.innerHTML = '';
        response.data.slice(0, 8).forEach((item) => {
            const div = document.createElement('div');
            div.className = 'image';
            div.innerHTML = `<img src="${item.mediaUrl}" alt="${item.title || 'Gallery item'}" loading="lazy">`;
            container.appendChild(div);
        });
    } catch (error) {
        console.warn('Gallery fetch failed:', error.message);
    }
};

const fetchCampaigns = async () => {
    if (!donationCampaignSelect) return;
    try {
        const response = await apiFetch('/campaigns', { method: 'GET' }, false);
        state.campaigns = response?.data || [];
        donationCampaignSelect.innerHTML = '<option value="">General Fund</option>';
        state.campaigns.forEach((campaign) => {
            const option = document.createElement('option');
            option.value = campaign._id;
            option.textContent = campaign.title;
            donationCampaignSelect.appendChild(option);
        });
    } catch (error) {
        console.warn('Campaign fetch failed:', error.message);
    }
};

const initDynamicContent = () => {
    loadStoredAuth();
    updateAuthUI();
    fetchMetrics();
    fetchTestimonials();
    fetchGallery();
    fetchCampaigns();

    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    document.getElementById('register-form')?.addEventListener('submit', handleRegister);
    logoutBtn?.addEventListener('click', handleLogout);
    document.getElementById('contact-form')?.addEventListener('submit', handleContactSubmit);
    document.getElementById('donation-form')?.addEventListener('submit', handleDonationSubmit);
    document.getElementById('testimonial-form')?.addEventListener('submit', handleTestimonialSubmit);
};

initDynamicContent();