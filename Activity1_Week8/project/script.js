document.addEventListener('DOMContentLoaded', () => {
   
    const gallery = document.getElementById('gallery');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    
    const imageWidth = document.querySelector('.image-item').offsetWidth + 16; 
    
    let currentPosition = 0;
    
    
    function updateButtons() {
        prevBtn.disabled = currentPosition <= 0;
        nextBtn.disabled = currentPosition >= gallery.scrollWidth - gallery.clientWidth;
    }
    
    
    prevBtn.addEventListener('click', () => {
        currentPosition -= imageWidth;
        if (currentPosition < 0) currentPosition = 0;
        gallery.scrollTo({
            left: currentPosition,
            behavior: 'smooth'
        });
        updateButtons();
    });
    
   
    nextBtn.addEventListener('click', () => {
        currentPosition += imageWidth;
        if (currentPosition > gallery.scrollWidth - gallery.clientWidth) {
            currentPosition = gallery.scrollWidth - gallery.clientWidth;
        }
        gallery.scrollTo({
            left: currentPosition,
            behavior: 'smooth'
        });
        updateButtons();
    });
    
  
    updateButtons();
    
    
    window.addEventListener('resize', () => {
        updateButtons();
    });
    
 
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && !prevBtn.disabled) {
            prevBtn.click();
        } else if (e.key === 'ArrowRight' && !nextBtn.disabled) {
            nextBtn.click();
        }
    });
});