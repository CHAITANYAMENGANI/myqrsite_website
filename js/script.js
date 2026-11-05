// Initialize Lucide icons
    window.addEventListener('DOMContentLoaded', () => {
      lucide.createIcons();
      initQRGenerator();
    });

    // Mobile Navigation Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking any mobile link
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });

    // Toast Notification Utility
    let toastTimeout;
    function showToast(message) {
      const toast = document.getElementById('toast');
      const toastMessage = document.getElementById('toast-message');
      toastMessage.textContent = message;
      
      clearTimeout(toastTimeout);
      toast.classList.remove('translate-y-32', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');

      toastTimeout = setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-32', 'opacity-0');
      }, 3500);
    }

    // Phone Simulator Tab Navigation
    function switchPhoneTab(tabName) {
      // Hide all phone screens
      document.querySelectorAll('.phone-screen').forEach(screen => {
        screen.classList.add('hidden');
      });
      // Deactivate all tab highlights
      document.querySelectorAll('.phone-tab').forEach(tab => {
        tab.classList.remove('text-champagne-800', 'border-b-2', 'border-champagne-600');
        tab.classList.add('text-onyx-800/60');
      });

      // Show the selected screen
      const targetScreen = document.getElementById('screen-' + tabName);
      if (targetScreen) {
        targetScreen.classList.remove('hidden');
      }

      // Highlight active button
      const activeTabBtn = document.getElementById('tab-' + tabName);
      if (activeTabBtn) {
        activeTabBtn.classList.remove('text-onyx-800/60');
        activeTabBtn.classList.add('text-champagne-800', 'border-b-2', 'border-champagne-600');
      }

      // Re-trigger icon rendering if needed
      lucide.createIcons();
    }

    // Mock RSVP Submission inside Smartphone
    function handleMockRSVP(e) {
      e.preventDefault();
      showToast('RSVP submitted successfully! Recorded in host dashboard.');
      setTimeout(() => {
        switchPhoneTab('gallery');
      }, 1200);
    }

    // Trigger Mock Photo Upload in Phone Gallery
    function triggerMockPhotoUpload() {
      const gallery = document.getElementById('gallery-grid');
      const newCard = document.createElement('div');
      newCard.className = 'relative rounded-xl overflow-hidden aspect-square group shadow-sm animate-pulse';
      newCard.innerHTML = `
        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80" alt="Just Uploaded" class="w-full h-full object-cover">
        <div class="absolute bottom-1 left-1 bg-emerald-700/80 backdrop-blur-sm text-[8px] text-white px-1.5 py-0.5 rounded">Just Now!</div>
      `;
      gallery.prepend(newCard);
      showToast('✨ Photo uploaded to Live Reception Wall!');
      setTimeout(() => newCard.classList.remove('animate-pulse'), 1000);
    }

    // Filter Templates by Category
    function filterTemplates(category) {
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(btn => {
        btn.classList.remove('bg-champagne-700', 'text-white');
        btn.classList.add('bg-white', 'text-onyx-800');
      });
      event.target.classList.remove('bg-white', 'text-onyx-800');
      event.target.classList.add('bg-champagne-700', 'text-white');

      const cards = document.querySelectorAll('.template-card');
      cards.forEach(card => {
        const itemCategory = card.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    }

    // Template Preview Modal Handlers
    function openPreviewModal(title, category, imgUrl) {
      const modal = document.getElementById('preview-modal');
      document.getElementById('modal-title').textContent = title;
      document.getElementById('modal-category').textContent = category.toUpperCase() + ' DESIGN';
      document.getElementById('modal-image').src = imgUrl;

      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100', 'pointer-events-auto');
      modal.querySelector('div').classList.remove('scale-95');
      modal.querySelector('div').classList.add('scale-100');
    }

    function closePreviewModal() {
      const modal = document.getElementById('preview-modal');
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.classList.remove('opacity-100', 'pointer-events-auto');
      modal.querySelector('div').classList.add('scale-95');
      modal.querySelector('div').classList.remove('scale-100');
    }

    // Accordion FAQ Toggle
    function toggleFAQ(button) {
      const content = button.nextElementSibling;
      const icon = button.querySelector('i');
      const isHidden = content.classList.contains('hidden');
      
      // Close all other open FAQs
      document.querySelectorAll('.faq-content').forEach(item => item.classList.add('hidden'));
      document.querySelectorAll('#faq-accordion i').forEach(ic => ic.classList.remove('rotate-180'));

      if (isHidden) {
        content.classList.remove('hidden');
        icon.classList.add('rotate-180');
      }
    }

    // Dynamic QR Generator Demo
    let qrInstance = null;
    let qrFgColor = '#75542B';
    let qrBgColor = '#FAF5ED';

    function initQRGenerator() {
      const container = document.getElementById('qrcode-container');
      container.innerHTML = '';
      qrInstance = new QRCode(container, {
        text: 'https://myqrsite.com/aria-and-liam-2026',
        width: 140,
        height: 140,
        colorDark: qrFgColor,
        colorLight: qrBgColor,
        correctLevel: QRCode.CorrectLevel.H
      });
    }

    function setQRPalette(fg, bg, label) {
      qrFgColor = fg;
      qrBgColor = bg;
      document.getElementById('palette-label').textContent = label;
      updateGeneratedQR();
    }

    function updateGeneratedQR() {
      const name = document.getElementById('qr-name-input').value.trim() || 'Our Wedding';
      const sub = document.getElementById('qr-sub-input').value.trim() || 'Save The Date';

      // Update badge text
      document.getElementById('qr-badge-title').textContent = name;
      document.getElementById('qr-badge-subtitle').textContent = sub;

      // Generate Monogram (first letters)
      const parts = name.split('&').length > 1 ? name.split('&') : name.split(' ');
      let initials = 'QR';
      if (parts.length >= 2) {
        initials = (parts[0].trim()[0] || '') + (parts[1].trim()[0] || '');
      } else if (name.length > 0) {
        initials = name.slice(0, 2).toUpperCase();
      }
      document.getElementById('qr-badge-monogram').textContent = initials.toUpperCase();

      // Recreate QR with new colors
      const container = document.getElementById('qrcode-container');
      container.innerHTML = '';
      const encodedUrl = 'https://myqrsite.com/' + encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));

      qrInstance = new QRCode(container, {
        text: encodedUrl,
        width: 140,
        height: 140,
        colorDark: qrFgColor,
        colorLight: qrBgColor,
        correctLevel: QRCode.CorrectLevel.H
      });

      showToast(`Generated custom QR badge for ${name}!`);
    }

    function downloadBadgeMock() {
      showToast('Downloading high-res print vector (SVG & 300 DPI PDF)...');
    }

    function handleNewsletter(e) {
      e.preventDefault();
      showToast('Thank you for subscribing! Check your inbox for wedding planning checklists.');
      e.target.reset();
    }
