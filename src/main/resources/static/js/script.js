// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link (exclude notification button)
    navLinks.querySelectorAll('.nav-link:not(.notification-btn)').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !navLinks.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
}

// Notification Dropdown Toggle - SIMPLE AND CLEAN
function initNotificationDropdown() {
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');

    if (!notificationBtn) {
        console.error('Notification button not found!');
        return;
    }
    
    if (!notificationDropdown) {
        console.error('Notification dropdown not found!');
        return;
    }
    
    console.log('Notification dropdown initialized');
    console.log('Button found:', notificationBtn);
    console.log('Dropdown found:', notificationDropdown);

    // Function to position dropdown below the button
    function positionDropdown() {
        const btnRect = notificationBtn.getBoundingClientRect();
        const dropdownWidth = 350; // Approximate width
        const dropdownHeight = 400; // Approximate max height
        
        // Calculate position - center dropdown on button
        let top = btnRect.bottom + 10;
        
        // Calculate button center (including the badge if visible)
        const buttonCenterX = btnRect.left + (btnRect.width / 2);
        
        // Calculate left position so dropdown center aligns with button center
        let left = buttonCenterX - (dropdownWidth / 2);
        
        // Ensure dropdown stays in viewport
        if (top + dropdownHeight > window.innerHeight) {
            // Position above button if not enough space below
            top = btnRect.top - dropdownHeight - 10;
            if (top < 0) {
                top = 10; // Fallback to top of viewport
            }
        }
        
        // Ensure dropdown doesn't go off left edge
        if (left < 10) {
            left = 10;
        }
        
        // Ensure dropdown doesn't go off right edge
        if (left + dropdownWidth > window.innerWidth - 10) {
            left = window.innerWidth - dropdownWidth - 10;
        }
        
        // Apply positioning
        notificationDropdown.style.position = 'fixed';
        notificationDropdown.style.top = top + 'px';
        notificationDropdown.style.left = left + 'px';
        notificationDropdown.style.right = 'auto';
        notificationDropdown.style.width = dropdownWidth + 'px';
        
        // Remove any vertical line or border
        notificationDropdown.style.borderLeft = '1px solid var(--neutral-gray)';
        notificationDropdown.style.borderTop = 'none';
        notificationDropdown.style.borderBottom = 'none';
        notificationDropdown.style.borderRight = 'none';
    }

    // Flag to track button clicks
    let isButtonClick = false;

    // Toggle dropdown on button click
    notificationBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation(); // Prevent other handlers from executing
        
        // Set flag to prevent immediate closing
        isButtonClick = true;
        setTimeout(() => {
            isButtonClick = false;
        }, 200);
        
        console.log('Notification button clicked');
        const isActive = notificationDropdown.classList.contains('active');
        
        if (isActive) {
            // Hide dropdown
            console.log('Hiding dropdown');
            notificationDropdown.classList.remove('active');
            notificationDropdown.style.display = 'none';
        } else {
            // Show dropdown - position first, then make visible
            console.log('Showing dropdown');
            // Position before showing
            positionDropdown();
            // Then make visible
            notificationDropdown.style.display = 'flex';
            // Force reflow to ensure display is set
            notificationDropdown.offsetHeight;
            // Add active class
            notificationDropdown.classList.add('active');
            
            // Debug info
            const rect = notificationDropdown.getBoundingClientRect();
            console.log('Dropdown shown and positioned');
            console.log('Dropdown position:', {
                top: rect.top,
                right: rect.right,
                left: rect.left,
                bottom: rect.bottom,
                width: rect.width,
                height: rect.height,
                display: window.getComputedStyle(notificationDropdown).display,
                visibility: window.getComputedStyle(notificationDropdown).visibility,
                opacity: window.getComputedStyle(notificationDropdown).opacity,
                zIndex: window.getComputedStyle(notificationDropdown).zIndex
            });
        }
    }, true); // Use capture phase to execute before other handlers

    // Update position on scroll
    window.addEventListener('scroll', function() {
        if (notificationDropdown.classList.contains('active')) {
            positionDropdown();
        }
    }, true);

    // Update position on resize
    window.addEventListener('resize', function() {
        if (notificationDropdown.classList.contains('active')) {
            positionDropdown();
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        // Skip if this is the button click
        if (isButtonClick) {
            return;
        }
        
        // Check if click is outside both button and dropdown
        const clickedInsideButton = notificationBtn.contains(e.target) || e.target.closest('.notifications-wrapper');
        const clickedInsideDropdown = notificationDropdown.contains(e.target);
        
        if (notificationDropdown.classList.contains('active') &&
            !clickedInsideButton &&
            !clickedInsideDropdown) {
            console.log('Closing dropdown - clicked outside');
            notificationDropdown.classList.remove('active');
            notificationDropdown.style.display = 'none';
        }
    }, false); // Use bubble phase (after capture phase)
}

// Initialize notification dropdown when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNotificationDropdown);
} else {
    initNotificationDropdown();
}

// Smooth Scroll to Sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Close mobile menu if open
        if (navLinks && window.innerWidth <= 768) {
            navLinks.classList.remove('active');
        }
        
        const offset = 80; // Account for sticky navbar
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Dynamic Loading of More Activity Cards
const showMoreBtn = document.getElementById('showMoreBtn');
const activitiesGrid = document.getElementById('activitiesGrid');
const showMoreWrapper = document.querySelector('.show-more-wrapper');

// Additional activity data
const additionalActivities = [
    {
        category: 'outdoor',
        categoryLabel: 'Outdoor',
        title: 'Sunset Picnic',
        description: 'Enjoy a relaxing evening picnic while watching the sunset. Bring your favorite snacks!',
        tags: ['📅 Saturday, 6:00 PM', '📍 Riverside Park', '👥 8 spots left']
    },
    {
        category: 'wellness',
        categoryLabel: 'Wellness',
        title: 'Morning Run Club',
        description: 'Join our weekly running group for a 5K morning run. All paces welcome!',
        tags: ['📅 Monday, 7:00 AM', '📍 City Park', '👥 15 spots left']
    },
    {
        category: 'social',
        categoryLabel: 'Social',
        title: 'Art Gallery Visit',
        description: 'Explore the latest contemporary art exhibition with fellow art enthusiasts.',
        tags: ['📅 Sunday, 2:00 PM', '📍 Modern Art Gallery', '👥 10 spots left']
    },
    {
        category: 'outdoor',
        categoryLabel: 'Outdoor',
        title: 'Kayaking Adventure',
        description: 'Paddle through calm waters and enjoy the scenic views. Equipment provided.',
        tags: ['📅 Saturday, 10:00 AM', '📍 Lake View', '👥 4 spots left']
    },
    {
        category: 'wellness',
        categoryLabel: 'Wellness',
        title: 'Pilates Class',
        description: 'Strengthen your core and improve flexibility in this beginner-friendly class.',
        tags: ['📅 Wednesday, 6:30 PM', '📍 Fitness Studio', '👥 12 spots left']
    },
    {
        category: 'social',
        categoryLabel: 'Social',
        title: 'Trivia Night',
        description: 'Test your knowledge and have fun at our weekly trivia competition!',
        tags: ['📅 Thursday, 7:00 PM', '📍 Local Pub', '👥 20 spots left']
    }
];

let loadedCount = 0;

if (showMoreBtn && activitiesGrid) {
    showMoreBtn.addEventListener('click', () => {
        // Add blur effect
        showMoreWrapper.classList.add('blurred');
        
        // Load next 3 activities
        const activitiesToLoad = additionalActivities.slice(loadedCount, loadedCount + 3);
        
        activitiesToLoad.forEach((activity, index) => {
            setTimeout(() => {
                const card = createActivityCard(activity, loadedCount + index);
                activitiesGrid.appendChild(card);
                
                // Trigger animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translate3d(0, 0, 0)';
                }, 50);
            }, index * 150);
        });
        
        loadedCount += 3;
        
        // Hide button if all activities are loaded
        if (loadedCount >= additionalActivities.length) {
            setTimeout(() => {
                showMoreBtn.style.opacity = '0';
                showMoreBtn.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    showMoreBtn.style.display = 'none';
                    showMoreWrapper.classList.remove('blurred');
                }, 300);
            }, 500);
        }
    });
}

function createActivityCard(activity, index) {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    
    const isPremium = index % 3 === 0 && index > 0;
    if (isPremium) {
        card.classList.add('premium');
    }
    
    const imageClass = activity.category === 'wellness' ? 'wellness-image' : 
                      activity.category === 'outdoor' ? 'outdoor-image' : 'social-image';
    
    card.innerHTML = `
        ${isPremium ? '<div class="premium-badge">Premium</div>' : ''}
        <div class="card-image ${imageClass}"></div>
        <div class="card-content">
            <div class="card-category ${activity.category}">${activity.categoryLabel}</div>
            <h3 class="card-title">${activity.title}</h3>
            <p class="card-description">${activity.description}</p>
            <div class="card-tags">
                ${activity.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                <button class="tag tag-participate">Participă</button>
            </div>
        </div>
    `;
    
    return card;
}

// Intersection Observer for Fade-in Animations (optimized)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translate3d(0, 0, 0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all activity cards
document.querySelectorAll('.activity-card').forEach(card => {
    observer.observe(card);
});

// Ripple Effect on Buttons
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
document.querySelectorAll('.btn, .floating-btn').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn, .floating-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0) translateZ(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
        will-change: transform, opacity;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4) translateZ(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll behavior for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Add scroll-triggered animations (optimized)
let lastScrollTop = 0;
let ticking = false;
const navbar = document.querySelector('.navbar');

function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transform = 'translate3d(0, -100%, 0)';
    } else {
        navbar.style.transform = 'translate3d(0, 0, 0)';
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true });

navbar.style.transition = 'transform 0.3s ease-in-out';

