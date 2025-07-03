document.addEventListener('DOMContentLoaded', function() {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- Animate Sections on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    
    // --- Typing Animation ---
    if (document.querySelector('.role-text')) {
        new Typed('.role-text', {
            strings: ['An aspiring Full Stack Developer.', 'Exploring AI and Cloud Technologies.'],
            typeSpeed: 70,
            backSpeed: 50,
            loop: true
        });
    }

    // --- Handle Form Submission with AJAX ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const form = event.target;
            const data = new FormData(form);
            const submitButton = form.querySelector('input[type="submit"]');

            submitButton.value = "Sending...";
            
            try {
                const response = await fetch(form.action, { method: form.method, body: data, headers: { 'Accept': 'application/json' } });
                if (response.ok) {
                    formStatus.textContent = "Thanks! Your message was sent successfully.";
                    formStatus.className = 'success';
                    form.reset();
                } else {
                    const responseData = await response.json();
                    formStatus.textContent = responseData.errors ? responseData.errors.map(e => e.message).join(", ") : "Oops! There was a problem.";
                    formStatus.className = 'error';
                }
            } catch (error) {
                formStatus.textContent = "Oops! A network error occurred.";
                formStatus.className = 'error';
            }

            submitButton.value = "Send Message";
            setTimeout(() => { 
                formStatus.className = ''; 
                formStatus.textContent = ''; 
            }, 6000);
        });
    }
});