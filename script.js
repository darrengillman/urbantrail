// Image carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelectorAll('.carousel-slide');
        let currentSlide = 0;
        
        if (slides.length <= 1) return; // Don't run carousel if only one image
        
        function showSlide(index) {
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Change slide every 4 seconds
        setInterval(nextSlide, 4000);
    });
    
    
    
    
    // Email signup form handling
	const emailForm = document.querySelector('#email-form');
	if (emailForm) {
		 emailForm.addEventListener('submit', async function(e) {
			  e.preventDefault();
			  
			  const email = document.querySelector('#email-input').value;
			  const button = this.querySelector('button');
			  const messageDiv = document.querySelector('#form-message');
			  
			  // Show loading state
			  button.textContent = 'Submitting...';
			  button.disabled = true;
			  messageDiv.style.display = 'none';
			  
			  try {
					const formData = new FormData();
					formData.append('email', email);
					
					const response = await fetch('/api/signup', {
						 method: 'POST',
						 body: formData
					});
					
					const result = await response.json();
					
					if (response.ok) {
						 messageDiv.innerHTML = `<p style="color: #27ae60; font-weight: bold;">${result.message}</p>`;
						 this.reset(); // Clear the form
					} else {
						 messageDiv.innerHTML = `<p style="color: #e74c3c; font-weight: bold;">Error: ${result.message || 'Please try again.'}</p>`;
					}
					
			  } catch (error) {
					console.error('Error:', error);
					messageDiv.innerHTML = '<p style="color: #e74c3c; font-weight: bold;">Sorry, there was an error. Please try again.</p>';
			  }
			  
			  // Reset button
			  button.textContent = 'Notify Me';
			  button.disabled = false;
			  messageDiv.style.display = 'block';
		 });
	}
      
    // Smooth scrolling for anchor links
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
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for loading effect
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.link-card, .faq-item, .measure-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add fade-in animation for content sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe content sections
    const sections = document.querySelectorAll('.content-section, .intro-section, .registration-section, .quick-links');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});
