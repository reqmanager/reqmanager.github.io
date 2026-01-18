// Screenshot Lightbox functionality
(function() {
    'use strict';

    const modal = document.getElementById('screenshotModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modal-caption');
    const modalClose = document.querySelector('.screenshot-modal__close');
    const modalOverlay = document.querySelector('.screenshot-modal__overlay');
    const screenshotContainers = document.querySelectorAll('.screenshot-container');

    // Open modal with image
    function openModal(imageSrc, caption) {
        modalImage.src = imageSrc;
        modalImage.alt = caption;
        modalCaption.textContent = caption;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Add click handlers to all screenshot containers
    screenshotContainers.forEach(container => {
        container.addEventListener('click', function(e) {
            e.preventDefault();
            const imageSrc = this.getAttribute('data-screenshot');
            const caption = this.getAttribute('data-caption') || '';
            if (imageSrc) {
                openModal(imageSrc, caption);
            }
        });
    });

    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close modal when clicking overlay
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === modalOverlay) {
            closeModal();
        }
    });
})();
