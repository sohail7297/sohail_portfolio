// Wrap code inside a DOM safety frame block to prevent script execution deadlocks
document.addEventListener('DOMContentLoaded', () => {

    const targetCrosshair = document.querySelector('.custom-crosshair');
    const targetBox = document.querySelector('.custom-target-box');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const contactForm = document.getElementById('portfolio-contact-form');

    // Check memory or system state on render layout processes
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    // Toggle click event handling
    themeToggleBtn.addEventListener('click', (e) => {
        // Prevent event bubble pollution
        e.stopPropagation();
        
        document.body.classList.toggle('light-theme');
        
        let theme = 'dark';
        if (document.body.classList.contains('light-theme')) {
            theme = 'light';
        }
        localStorage.setItem('theme', theme);
    });

    // MOUSEMOVE ENGINE WITH VISIBILITY PARAMETERS
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Force visibility overlay states once mouse has safely coordinates inside the viewport
        targetCrosshair.style.opacity = "1";
        targetBox.style.opacity = "1";

        targetCrosshair.style.left = `${posX}px`;
        targetCrosshair.style.top = `${posY}px`;

        targetBox.style.left = `${posX}px`;
        targetBox.style.top = `${posY}px`;
    });

    // Capture action container nodes to trigger layout modifications
    const operationalElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .theme-toggle-btn');
    operationalElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            targetBox.classList.add('cursor-hover');
        });
        elem.addEventListener('mouseleave', () => {
            targetBox.classList.remove('cursor-hover');
        });
    });

    // Formspree API Pipeline Endpoint
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formspreeEndpoint = "https://formspree.io/f/YOUR_FORMSPREE_FORM_ID"; 
        const submitButton = contactForm.querySelector('.btn-submit');
        const originalButtonText = submitButton.innerText;
        const formData = new FormData(contactForm);
        
        submitButton.innerText = "Sending...";
        submitButton.disabled = true;

        try {
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                submitButton.innerText = "Message Sent ✓";
                submitButton.style.backgroundColor = "#10b981"; 
                submitButton.style.color = "#ffffff";
                contactForm.reset();
                
                setTimeout(() => {
                    submitButton.innerText = originalButtonText;
                    submitButton.style.backgroundColor = "";
                    submitButton.style.color = "";
                    submitButton.disabled = false;
                }, 4000);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || "Form submission failed.");
            }
        } catch (error) {
            console.error("Formspree Error:", error);
            submitButton.innerText = "Error! Try Again";
            submitButton.style.backgroundColor = "#ef4444"; 
            submitButton.style.color = "#ffffff";
            submitButton.disabled = false;
            
            setTimeout(() => {
                submitButton.innerText = originalButtonText;
                submitButton.style.backgroundColor = "";
                submitButton.style.color = "";
            }, 4000);
        }
    });
});