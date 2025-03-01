// Form submission handling
function handleAssessmentRequest(event) {
    event.preventDefault();
    const modal = document.getElementById('assessment-modal');
    modal.style.display = 'block';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('assessment-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking the close button
function closeModal() {
    const modal = document.getElementById('assessment-modal');
    modal.style.display = 'none';
}

// Handle form submission
async function submitAssessmentForm(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    
    try {
        // Show loading state
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        const formData = new FormData(form);
        
        // Get all form values
        const data = {
            timestamp: new Date().toISOString(),
            fullName: formData.get('name'),
            businessName: formData.get('business'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            service: formData.get('service'),
            source: window.location.href
        };

        const scriptURL = 'https://script.google.com/macros/s/AKfycbz4co3UeqHyoDevEU2eBaE4pR353eNUzL-kpZovxgddNx9ht0ZHOR8wEKZ0BY7ejw7S/exec';
        
        // Send data to Google Sheet
        const response = await fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors', // This is important for CORS handling
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Show success message
        form.innerHTML = `
            <div class="success-message">
                <h3>Thank you for your interest!</h3>
                <p>We'll contact you within 24 hours to schedule your free assessment.</p>
            </div>
        `;
        
        // Close the modal after 3 seconds
        setTimeout(() => {
            closeModal();
            // Reset the form
            form.reset();
            form.innerHTML = document.getElementById('form-template').innerHTML;
        }, 3000);

    } catch (error) {
        console.error('Error:', error);
        // Reset button state
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        alert('There was an error submitting your form. Please try again.');
    }
}

// Handle learn more buttons
function handleLearnMore(service) {
    const modal = document.getElementById('assessment-modal');
    const serviceInput = document.getElementById('service-input');
    
    if (serviceInput) {
        serviceInput.value = service;
    }
    
    modal.style.display = 'block';
}
