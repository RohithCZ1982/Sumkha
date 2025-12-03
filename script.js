// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for fade-in animations
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
    
    // Observe experience cards
    const cards = document.querySelectorAll('.experience-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Portfolio video hover functionality
    const portfolioVideos = document.querySelectorAll('.portfolio-video-element');
    portfolioVideos.forEach(video => {
        const portfolioItem = video.closest('.portfolio-item');
        
        portfolioItem.addEventListener('mouseenter', function() {
            video.play().catch(e => {
                // Autoplay was prevented, which is fine
            });
        });
        
        portfolioItem.addEventListener('mouseleave', function() {
            video.pause();
            video.currentTime = 0;
        });
        
        portfolioItem.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    });
    
    // Observe portfolio items for fade-in
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // External video link functionality
    const videoModal = document.getElementById('videoModal');
    const videoModalIframe = document.getElementById('videoModalIframe');
    const videoModalClose = document.querySelector('.video-modal-close');
    const portfolioVideoLinks = document.querySelectorAll('.portfolio-video-link');
    
    // Function to convert YouTube URL to embed URL
    function getYouTubeEmbedUrl(url) {
        let videoId = null;
        
        // Handle youtu.be short links
        if (url.includes('youtu.be/')) {
            const match = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
            if (match && match[1]) {
                videoId = match[1];
            }
        }
        // Handle youtube.com/watch?v= format
        else if (url.includes('youtube.com/watch')) {
            const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
            if (match && match[1]) {
                videoId = match[1];
            }
        }
        // Handle youtube.com/embed/ format
        else if (url.includes('youtube.com/embed/')) {
            const match = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
            if (match && match[1]) {
                videoId = match[1];
            }
        }
        // Handle youtube.com/v/ format
        else if (url.includes('youtube.com/v/')) {
            const match = url.match(/\/v\/([a-zA-Z0-9_-]{11})/);
            if (match && match[1]) {
                videoId = match[1];
            }
        }
        
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
        }
        
        return null;
    }
    
    // Function to convert Vimeo URL to embed URL
    function getVimeoEmbedUrl(url) {
        const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
        const match = url.match(regExp);
        if (match && match[1]) {
            return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
        }
        return null;
    }
    
    // Function to open video modal
    function openVideoModal(videoUrl) {
        let embedUrl = null;
        
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            embedUrl = getYouTubeEmbedUrl(videoUrl);
        } else if (videoUrl.includes('vimeo.com')) {
            embedUrl = getVimeoEmbedUrl(videoUrl);
        }
        
        if (embedUrl) {
            videoModalIframe.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            console.error('Could not convert video URL to embed format:', videoUrl);
            alert('Unable to load video. Please check the video URL.');
        }
    }
    
    // Function to close video modal
    function closeVideoModal() {
        videoModal.classList.remove('active');
        videoModalIframe.innerHTML = '';
        document.body.style.overflow = '';
    }
    
    // Add click event to video link items
    portfolioVideoLinks.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('data-video-url');
            if (videoUrl) {
                openVideoModal(videoUrl);
            }
        });
    });
    
    // Close modal on close button click
    if (videoModalClose) {
        videoModalClose.addEventListener('click', closeVideoModal);
    }
    
    // Close modal on background click
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
    
    // Mobile Menu Toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    function toggleMobileMenu() {
        if (!mobileMenuToggle || !nav) return;
        
        const isActive = nav.classList.contains('active');
        
        if (isActive) {
            // Close menu
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        } else {
            // Open menu
            nav.classList.add('active');
            mobileMenuToggle.classList.add('active');
        }
    }
    
    if (mobileMenuToggle && nav) {
        // Multiple event listeners for maximum compatibility
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            toggleMobileMenu();
        });
        
        mobileMenuToggle.addEventListener('touchstart', function(e) {
            e.stopPropagation();
            toggleMobileMenu();
        }, { passive: false });
        
        // Close menu when a nav link is clicked (reuse navLinks from above)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside (with delay to avoid immediate close)
        setTimeout(function() {
            document.addEventListener('click', function(event) {
                if (!nav.classList.contains('active')) return;
                
                const isClickInsideNav = nav.contains(event.target);
                const isClickOnToggle = mobileMenuToggle.contains(event.target);
                
                if (!isClickInsideNav && !isClickOnToggle) {
                    nav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        }, 200);
    }
    
    // Go to Top Button functionality
    const goToTopButton = document.getElementById('goToTop');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            goToTopButton.classList.add('show');
        } else {
            goToTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top when button is clicked
    if (goToTopButton) {
        goToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

