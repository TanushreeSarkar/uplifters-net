// GSAP Animations for Uplifters.Net
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Page Load Animation
window.addEventListener('DOMContentLoaded', () => {
    // Hero Section Animation
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.navbar', { y: -100, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.cont-sec', { y: -50, opacity: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .from('.home-info h1', { 
            opacity: 0, 
            y: 50, 
            duration: 1, 
            ease: 'power3.out' 
        }, '-=0.2')
        .from('.home-info h2', { 
            opacity: 0, 
            y: 30, 
            duration: 0.8, 
            ease: 'power2.out' 
        }, '-=0.5')
        .from('.home-info p', { 
            opacity: 0, 
            y: 20, 
            duration: 0.6, 
            ease: 'power2.out' 
        }, '-=0.4')
        .from('.home-info .buttons', { 
            opacity: 0, 
            scale: 0.8, 
            duration: 0.6, 
            ease: 'back.out(1.7)' 
        }, '-=0.3')
        .from('.img-sec img', { 
            opacity: 0, 
            scale: 1.2, 
            rotation: 5, 
            duration: 1, 
            ease: 'power3.out' 
        }, '-=0.8');

    // Counter Section Animation
    gsap.utils.toArray('.counter-box').forEach((box, index) => {
        gsap.from(box, {
            scrollTrigger: {
                trigger: box,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            scale: 0.8,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });

    // Donation Cards Animation
    gsap.utils.toArray('.don-box').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: index % 2 === 0 ? -100 : 100,
            rotation: index % 2 === 0 ? -5 : 5,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });

    // Gallery Images Animation
    gsap.utils.toArray('.image').forEach((img, index) => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            scale: 0.5,
            rotation: 10,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.7)'
        });
    });

    // Testimonial Cards Animation
    gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 80,
            rotationX: 15,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Contact Section Animation
    gsap.from('.contact-card', {
        scrollTrigger: {
            trigger: '.contact-sec',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
    });

    // Heading Animations
    gsap.utils.toArray('.heading h2').forEach((heading) => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Parallax Effect for Hero Image
    gsap.to('.img-sec img', {
        scrollTrigger: {
            trigger: '.home-sec',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        scale: 1.1,
        ease: 'none'
    });

    // Floating Animation for Icons
    gsap.utils.toArray('.counter-box i, .don-icon img').forEach((icon) => {
        gsap.to(icon, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    });

    // Button Hover Effects
    gsap.utils.toArray('.btn1, .btn2').forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Hero Section Animations
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero-badge', { 
            opacity: 0, 
            scale: 0, 
            duration: 0.6, 
            ease: 'back.out(1.7)' 
        })
        .from('.hero-title', { 
            opacity: 0, 
            y: 50, 
            duration: 1, 
            ease: 'power3.out' 
        }, '-=0.3')
        .from('.hero-description', { 
            opacity: 0, 
            y: 30, 
            duration: 0.8, 
            ease: 'power2.out' 
        }, '-=0.5')
        .from('.hero-stats .stat-item', { 
            opacity: 0, 
            scale: 0.5, 
            duration: 0.6, 
            stagger: 0.15, 
            ease: 'back.out(1.7)' 
        }, '-=0.4')
        .from('.hero-buttons', { 
            opacity: 0, 
            y: 20, 
            duration: 0.6, 
            ease: 'power2.out' 
        }, '-=0.3')
        .from('.hero-main-image', { 
            opacity: 0, 
            scale: 1.2, 
            rotation: 5, 
            duration: 1, 
            ease: 'power3.out' 
        }, '-=0.8')
        .from('.floating-card', { 
            opacity: 0, 
            scale: 0, 
            rotation: 180, 
            duration: 0.8, 
            stagger: 0.2, 
            ease: 'back.out(1.7)' 
        }, '-=0.6');

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const hashIndex = href.indexOf('#');
                if (hashIndex !== -1) {
                    const hash = href.substring(hashIndex);
                    const target = document.querySelector(hash);
                    if (target) {
                        const offset = 120;
                        const targetPosition = target.offsetTop - offset;
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });

    // Text Reveal Animation
    gsap.utils.toArray('.heading p.subheading').forEach((text) => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Progress Bar Animation
    gsap.utils.toArray('.progress-bar').forEach((bar) => {
        const width = bar.style.width || '0%';
        gsap.from(bar, {
            scrollTrigger: {
                trigger: bar,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            width: '0%',
            duration: 1.5,
            ease: 'power2.out'
        });
    });

    // Stagger Animation for Social Icons
    gsap.from('.social a', {
        scrollTrigger: {
            trigger: '.cont-sec',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });

    // Navbar Link Hover Animation
    document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// Counter Animation with GSAP
function animateCounterWithGSAP(element, target) {
    const obj = { value: 0 };
    gsap.to(obj, {
        value: target,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = Math.floor(obj.value).toLocaleString();
        }
    });
}

// Export for use in other scripts
window.gsapAnimations = {
    animateCounter: animateCounterWithGSAP
};

