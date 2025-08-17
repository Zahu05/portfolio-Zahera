// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .achievement-card, .content-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing animation for hero title
function typeWriter() {
    const text = "Hi, I'm Zahera Saiyed";
    const element = document.querySelector('.hero-title');
    let i = 0;
    
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            if (text.charAt(i) === 'Z') {
                element.innerHTML += '<span class="gradient-text">Zahera Saiyed</span>';
                i = text.length;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(type, 100);
        }
    }
    
    // Start typing animation after a short delay
    setTimeout(type, 500);
}

// Initialize typing animation when page loads
window.addEventListener('load', typeWriter);

// Parallax effect for background spheres
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-sphere');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Create mailto link
        const mailtoLink = `mailto:zaherasaiyed63@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        const submitBtn = this.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            this.reset();
        }, 3000);
    });
}

// Skills progress animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(0)';
            item.style.opacity = '1';
        }, index * 100);
    });
}

// Trigger skills animation when skills section is visible
const skillsSection = document.querySelector('.skills-container');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillsObserver.observe(skillsSection);
}

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
    
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }
    
    button.appendChild(circle);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Floating elements animation
function animateFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 20;
            const randomY = (Math.random() - 0.5) * 20;
            icon.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 2000 + (index * 500));
    });
}

// Enhanced floating elements with more complex animations
function createFloatingElements() {
    const heroSection = document.querySelector('.hero');
    
    // Create additional floating tech elements
    for (let i = 0; i < 12; i++) {
        const element = document.createElement('div');
        element.className = 'floating-tech-element';
        element.style.cssText = `
            position: absolute;
            width: ${Math.random() * 15 + 8}px;
            height: ${Math.random() * 15 + 8}px;
            background: linear-gradient(135deg, 
                rgba(0, 212, 255, ${Math.random() * 0.4 + 0.2}) 0%, 
                rgba(0, 184, 212, ${Math.random() * 0.3 + 0.1}) 100%);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatComplex ${Math.random() * 15 + 20}s ease-in-out infinite;
            animation-delay: ${Math.random() * 10}s;
            z-index: 1;
            pointer-events: none;
            filter: blur(1px);
        `;
        heroSection.appendChild(element);
    }
}

// Create pulsing energy lines
function createEnergyLines() {
    const heroSection = document.querySelector('.hero');
    
    for (let i = 0; i < 8; i++) {
        const line = document.createElement('div');
        line.className = 'energy-line';
        line.style.cssText = `
            position: absolute;
            width: 2px;
            height: ${Math.random() * 150 + 80}px;
            background: linear-gradient(180deg, 
                transparent 0%, 
                rgba(0, 212, 255, 0.7) 50%, 
                transparent 100%);
            top: ${Math.random() * 80}%;
            left: ${Math.random() * 100}%;
            animation: energyPulse ${Math.random() * 4 + 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
            z-index: 1;
            pointer-events: none;
            transform-origin: center;
            filter: blur(0.5px);
        `;
        heroSection.appendChild(line);
    }
}

// Create data stream effects
function createDataStreams() {
    const heroSection = document.querySelector('.hero');
    
    for (let i = 0; i < 6; i++) {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.cssText = `
            position: absolute;
            width: 2px;
            height: 80px;
            background: linear-gradient(180deg, 
                rgba(0, 212, 255, 0) 0%, 
                rgba(0, 212, 255, 0.9) 50%, 
                rgba(0, 212, 255, 0) 100%);
            top: ${Math.random() * 50 + 20}%;
            left: ${Math.random() * 100}%;
            animation: dataFlow ${Math.random() * 5 + 8}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
            pointer-events: none;
        `;
        heroSection.appendChild(stream);
    }
}

// Create digital rain effect
function createDigitalRain() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        for (let i = 0; i < 3; i++) {
            const rain = document.createElement('div');
            rain.className = 'digital-rain';
            rain.style.cssText = `
                position: absolute;
                width: 1px;
                height: ${Math.random() * 30 + 15}px;
                background: rgba(0, 212, 255, ${Math.random() * 0.4 + 0.3});
                left: ${Math.random() * 100}%;
                animation: digitalRain ${Math.random() * 8 + 6}s linear infinite;
                animation-delay: ${Math.random() * 8}s;
                z-index: 1;
                pointer-events: none;
            `;
            section.appendChild(rain);
        }
    });
}

// Initialize all animations
window.addEventListener('load', () => {
    animateFloatingElements();
    createFloatingElements();
    createEnergyLines();
    createDataStreams();
    createDigitalRain();
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
        progressBar.style.width = scrollProgress + '%';
    });
}

// Initialize scroll progress
createScrollProgress();

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        // Easter egg activation
        document.body.style.animation = 'rainbow 2s ease infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        // Add rainbow animation CSS
        if (!document.getElementById('rainbow-style')) {
            const rainbowStyle = document.createElement('style');
            rainbowStyle.id = 'rainbow-style';
            rainbowStyle.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(rainbowStyle);
        }
        
        konamiCode = [];
    }
});
