// Add animation class to elements as they enter viewport
document.addEventListener('DOMContentLoaded', function() {
    const faders = document.querySelectorAll('.fade-in-up');
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            }
        });
    },
    appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // Add appear class to elements that are already in view on load
    faders.forEach(fader => {
        if (fader.getBoundingClientRect().top < window.innerHeight &&
            fader.getBoundingClientRect().bottom >= 0) {
            fader.classList.add('appear');
        }
    });
});