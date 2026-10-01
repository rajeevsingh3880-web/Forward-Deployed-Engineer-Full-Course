// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you at ${email}.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Add shadow to header on scroll
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop;
});

// Add fade-in animation to sections when they come into view
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.about-content, .skill-card, .project-card, .experience-item, .contact-content').forEach(el => {
    observer.observe(el);
});

// Add fade-in styles dynamically
const style = document.createElement('style');
style.textContent = `
    .about-content, .skill-card, .project-card, .experience-item, .contact-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .about-content.visible, .skill-card.visible, .project-card.visible, .experience-item.visible, .contact-content.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);