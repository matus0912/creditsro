// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Show sending feedback
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Odosielam...';
    btn.disabled = true;
    
    // Get current date and time for the embed
    const now = new Date();
    const formattedDate = now.toLocaleDateString('sk-SK', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('sk-SK', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Create Discord webhook payload with embed
    const webhookPayload = {
        username: "Credit Consullt Web Form",
        avatar_url: "https://i.imgur.com/TeDvLRk.png", // Fixed static image URL
        embeds: [{
            title: "Nová správa z kontaktného formulára",
            color: 1942395, // A blue color matching the logo
            fields: [
                {
                    name: "👤 Meno",
                    value: formData.name,
                    inline: true
                },
                {
                    name: "📧 Email",
                    value: formData.email,
                    inline: true
                },
                {
                    name: "📱 Telefón",
                    value: formData.phone || "Neuvedené",
                    inline: true
                },
                {
                    name: "💬 Správa",
                    value: formData.message
                }
            ],
            footer: {
                text: `Odoslané: ${formattedDate} o ${formattedTime}`
            }
        }]
    };
    
    // Send data to Discord webhook
    fetch('https://discord.com/api/webhooks/1364650639384379463/lFKfYl9kVf3E7pGC0m8o8qX7ifhsuW4ogrALwm6psQ06juzein2M3V0zLwXThGNui0ph', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookPayload)
    })
    .then(response => {
        if (response.ok) {
            // Reset form
            e.target.reset();
            
            // Show success message
            btn.textContent = 'Odoslané!';
            btn.classList.add('success');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.classList.remove('success');
            }, 3000);
        } else {
            // Show error
            btn.textContent = 'Chyba! Skúste znova.';
            btn.classList.add('error');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                btn.textContent = originalText;
                btn.disabled = false;
                btn.classList.remove('error');
            }, 3000);
        }
    })
    .catch(error => {
        console.error('Error submitting form:', error);
        // Show error
        btn.textContent = 'Chyba! Skúste znova.';
        btn.classList.add('error');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            btn.classList.remove('error');
        }, 3000);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Service card hover effect
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Testimonial slider (auto scroll)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
testimonials.forEach(testimonial => {
    testimonial.style.opacity = '1';
    testimonial.style.transform = 'translateY(0)';
});

// Add typing effect to hero heading
function typeEffect() {
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading) {
        const text = heroHeading.textContent;
        heroHeading.textContent = '';
        heroHeading.style.borderRight = '0.15em solid #fff';
        
        let i = 0;
        function typing() {
            if (i < text.length) {
                heroHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typing, 50);
            } else {
                heroHeading.style.borderRight = 'none';
            }
        }
        
        setTimeout(typing, 500);
    }
}

// Initialize typing effect
window.addEventListener('load', () => {
    typeEffect();
}); 