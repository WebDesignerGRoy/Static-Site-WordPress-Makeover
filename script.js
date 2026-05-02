// ================================
// Mobile Menu Toggle
// ================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        
        // Animate menu items
        if (nav.style.display === 'block') {
            nav.style.position = 'absolute';
            nav.style.top = '100%';
            nav.style.left = '0';
            nav.style.right = '0';
            nav.style.background = '#ffffff';
            nav.style.padding = '20px';
            nav.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            nav.style.animation = 'slideDown 0.3s ease-out';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        const isClickInsideNav = nav?.contains(event.target);
        const isClickOnToggle = mobileMenuToggle?.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && nav?.style.display === 'block') {
            nav.style.display = 'none';
        }
    }
});

// ================================
// Smooth Scrolling
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu after clicking
            if (window.innerWidth <= 768 && nav) {
                nav.style.display = 'none';
            }
        }
    });
});

// ================================
// Gallery Lightbox
// ================================

const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        const closeLightbox = () => {
            lightbox.remove();
            document.body.style.overflow = 'auto';
        };
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    });
});

// ================================
// Form Validation & Submission
// ================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const inputs = this.querySelectorAll('input, textarea');
        
        // Simple validation
        let isValid = true;
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#e31e24';
                
                setTimeout(() => {
                    input.style.borderColor = '#444';
                }, 2000);
            }
        });
        
        if (isValid) {
            // Show success message
            const submitBtn = this.querySelector('.btn-send');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sent Successfully!';
            submitBtn.style.background = '#27ae60';
            submitBtn.style.borderColor = '#27ae60';
            
            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = 'transparent';
                submitBtn.style.borderColor = 'white';
            }, 3000);
        }
    });
}

// ================================
// Scroll Animations
// ================================

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

// Observe elements for animation
document.querySelectorAll('.category-card, .video-item, .gallery-item').forEach(el => {
    observer.observe(el);
});

// ================================
// Video Thumbnail Click Handler
// ================================

const videoThumbnails = document.querySelectorAll('.video-thumbnail');

videoThumbnails.forEach(thumbnail => {
    const playButton = thumbnail.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            // This could open the video in a modal or redirect to YouTube
            console.log('Video play clicked');
            
            // Example: Show alert (replace with actual video modal logic)
            alert('Video playback functionality can be implemented here');
        });
    }
});

// ================================
// Lazy Loading Images
// ================================

const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ================================
// Header Scroll Effect
// ================================

let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
    }
    
    lastScroll = currentScroll;
});

// ================================
// Add Lightbox Styles Dynamically
// ================================

const lightboxStyles = `
    <style>
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.3s ease-out;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            animation: zoomIn 0.3s ease-out;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 40px;
            color: white;
            cursor: pointer;
            font-weight: 300;
            transition: transform 0.3s ease;
        }
        
        .lightbox-close:hover {
            transform: scale(1.2);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes zoomIn {
            from {
                transform: scale(0.8);
                opacity: 0;
            }
            to {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', lightboxStyles);

// ================================
// Responsive Navigation Handler
// ================================

function handleResize() {
    if (window.innerWidth > 768) {
        if (nav) {
            nav.style.display = '';
            nav.style.position = '';
            nav.style.top = '';
            nav.style.left = '';
            nav.style.right = '';
            nav.style.background = '';
            nav.style.padding = '';
            nav.style.boxShadow = '';
        }
    }
}

window.addEventListener('resize', handleResize);

// ================================
// Page Load Animation
// ================================

window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ================================
// Console Welcome Message
// ================================

console.log('%c👋 Welcome to Rayn Productions!', 'color: #e31e24; font-size: 20px; font-weight: bold;');
console.log('%cEvent Management & Production Services', 'color: #666; font-size: 14px;');
