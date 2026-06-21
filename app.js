const themeToggleBtn = document.getElementById('theme-toggle');
const contactForm = document.getElementById('portfolio-contact-form');

// Check local storage or system preference on load
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
}

// Click event listener to swap states
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    // Save selection to memory
    let theme = 'dark';
    if (document.body.classList.contains('light-theme')) {
        theme = 'light';
    }
    localStorage.setItem('theme', theme);
});

// Advanced Formspree Fetch Integration
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Replace with your actual Formspree ID or URL link
    const formspreeEndpoint = "https://formspree.io/f/mkolwvjn"; 
    
    const submitButton = contactForm.querySelector('.btn-submit');
    const originalButtonText = submitButton.innerText;
    
    const formData = new FormData(contactForm);
    
    submitButton.innerText = "Sending...";
    submitButton.disabled = true;

    try {
        const response = await fetch(formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
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