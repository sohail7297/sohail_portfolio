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
    
    // 1. Change your Formspree ID here
    // You can put just the ID (e.g., "xaaaaaa") or the full URL
    const formspreeEndpoint = "https://formspree.io/f/mkolwvjn"; 
    
    const submitButton = contactForm.querySelector('.btn-submit');
    const originalButtonText = submitButton.innerText;
    
    // Get form data
    const formData = new FormData(contactForm);
    
    // Visual feedback: Update button state to loading
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
            // Success State UI transformation
            submitButton.innerText = "Message Sent ✓";
            submitButton.style.backgroundColor = "#10b981"; // Success Green
            submitButton.style.color = "#ffffff";
            contactForm.reset();
            
            // Reset button back to normal after 4 seconds
            setTimeout(() => {
                submitButton.innerText = originalButtonText;
                submitButton.style.backgroundColor = "";
                submitButton.style.color = "";
                submitButton.disabled = false;
            }, 4000);

        } else {
            // Server error handling
            const errorData = await response.json();
            throw new Error(errorData.error || "Form submission failed.");
        }

    } catch (error) {
        console.error("Formspree Error:", error);
        
        // Error State UI feedback
        submitButton.innerText = "Error! Try Again";
        submitButton.style.backgroundColor = "#ef4444"; // Error Red
        submitButton.style.color = "#ffffff";
        submitButton.disabled = false;
        
        setTimeout(() => {
            submitButton.innerText = originalButtonText;
            submitButton.style.backgroundColor = "";
            submitButton.style.color = "";
        }, 4000);
    }
});