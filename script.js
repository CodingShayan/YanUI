document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Transform hamburger to X
            const spans = menuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'translateY(11px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-11px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when a link is clicked
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
});

// Portfolio Modal Logic
function openPortfolioModal(title, stats, demoUrl) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalStats').textContent = stats;

    const modal = document.getElementById('portfolioModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}



// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const feedback = document.getElementById('form-feedback');

        // Basic Validation
        const tosAgree = document.getElementById('tos-agree');
        if (tosAgree && !tosAgree.checked) {
            feedback.style.display = 'block';
            feedback.style.backgroundColor = '#fee2e2';
            feedback.style.border = '1px solid #ef4444';
            feedback.style.color = '#7f1d1d';
            feedback.innerHTML = 'You must agree to the Terms & Services.';
            return;
        }

        const phone = document.getElementById('phone').value.replace(/\D/g, '');
        if (phone.length < 10) {
            feedback.style.display = 'block';
            feedback.style.backgroundColor = '#fee2e2';
            feedback.style.border = '1px solid #ef4444';
            feedback.style.color = '#7f1d1d';
            feedback.innerHTML = 'Please enter a valid phone number (at least 10 digits).';
            return;
        }

        const originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        btn.style.opacity = '0.7';
        feedback.style.display = 'none';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                contactForm.reset();
                feedback.style.display = 'block';
                feedback.style.backgroundColor = '#ecfdf5';
                feedback.style.border = '1px solid #10b981';
                feedback.style.color = '#065f46';
                feedback.innerHTML = '<h3 style="margin-bottom: 0.5rem; font-size: 1.1rem;">Thanks! Expect a call/text from 908-935-8230 soon.</h3>';
                btn.style.display = 'none'; // Hide button on success
            } else {
                throw new Error('Formspree returned an error');
            }
        } catch (error) {
            console.error(error);
            feedback.style.display = 'block';
            feedback.style.backgroundColor = '#fee2e2';
            feedback.style.border = '1px solid #ef4444';
            feedback.style.color = '#7f1d1d';
            feedback.innerHTML = 'Failed to send — text me directly at 908-935-8230';

            btn.textContent = originalText;
            btn.disabled = false;
            btn.style.opacity = '1';
        }
    });
}
