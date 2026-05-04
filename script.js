document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();



    // Add subtle 3D hover effects to non-interactive glass cards only
    const cards = document.querySelectorAll('.glass-card:not(.notes-card):not(.rsvp-section)');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            card.style.transition = 'transform 0.5s ease';
        });
    });

    // Countdown Timer Logic
    const targetDate = new Date("May 20, 2026 11:00:00 GMT-0400").getTime();
    
    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "<div style='font-size: 1.5rem; color: var(--orange-primary); font-weight: bold;'>Registration Closed</div>";
            return;
        }
        
        const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
        const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("cd-weeks").innerText = weeks.toString().padStart(2, '0');
        document.getElementById("cd-days").innerText = days.toString().padStart(2, '0');
        document.getElementById("cd-hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("cd-minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("cd-seconds").innerText = seconds.toString().padStart(2, '0');
    };
    
    // Initial call
    updateCountdown();
    // Update every second
    setInterval(updateCountdown, 1000);
});
