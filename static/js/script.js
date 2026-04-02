// AtmosAI — Premium Script
// Rain, Lightning, Page Loader, Form Interactions

document.addEventListener('DOMContentLoaded', () => {

    /* =============================================
       PAGE LOADER — hide after window loads
    ============================================= */
    const loader = document.getElementById('page-loader');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => loader.classList.add('hidden'), 350);
        });
        setTimeout(() => loader && loader.classList.add('hidden'), 2500);
    }

    /* =============================================
       FORM SUBMIT — loading state
    ============================================= */
    const form = document.getElementById('prediction-form');
    const btn  = document.getElementById('submit-btn');
    if (form && btn) {
        form.addEventListener('submit', () => {
            btn.textContent = 'Analysing Climate Data…';
            btn.style.opacity = '0.7';
            btn.disabled = true;
            if (loader) {
                loader.classList.remove('hidden');
                const t = loader.querySelector('.loader-text');
                if (t) t.textContent = 'Running Model';
            }
        });
    }

    /* =============================================
       INPUT — label accent on focus
    ============================================= */
    document.querySelectorAll('.field input').forEach(input => {
        input.addEventListener('focus',  () => {
            const lbl = input.previousElementSibling;
            if (lbl) lbl.style.color = 'var(--accent)';
        });
        input.addEventListener('blur', () => {
            const lbl = input.previousElementSibling;
            if (lbl) lbl.style.color = '';
        });
    });

    /* =============================================
       HISTORY CARDS — stagger delay
    ============================================= */
    document.querySelectorAll('.history-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.07}s`;
    });

    /* =============================================
       RAIN GENERATOR
    ============================================= */
    const rainScene = document.querySelector('.rain-scene');
    if (rainScene) {
        const DROP_COUNT = 80; /* Lighter rain */
        for (let i = 0; i < DROP_COUNT; i++) {
            const drop = document.createElement('div');
            drop.classList.add('raindrop');

            const leftPct  = Math.random() * 110 - 5;         // -5% … 105%
            const height   = Math.random() * 55 + 18;          // 18px … 73px
            const dur      = (Math.random() * 0.7 + 0.55).toFixed(2); // 0.55s … 1.25s
            const delay    = (Math.random() * 4).toFixed(2);   // 0s … 4s
            const opacity  = (Math.random() * 0.3 + 0.25).toFixed(2); // 0.25 … 0.55

            drop.style.left           = `${leftPct}%`;
            drop.style.height         = `${height}px`;
            drop.style.setProperty('--rain-dur',   `${dur}s`);
            drop.style.setProperty('--rain-delay', `-${delay}s`); // negative = already in progress
            drop.style.opacity        = opacity;

            rainScene.appendChild(drop);
        }
    }

    /* =============================================
       LIGHTNING ENGINE
    ============================================= */
    const lightningOverlay = document.querySelector('.lightning-overlay');
    const lightningBolt    = document.querySelector('.lightning-bolt');

    function makeBoltPath() {
        // Random jagged SVG polyline coordinates
        const x     = Math.random() * 60 + 20;  // start x: 20%..80% of viewport
        const steps = Math.floor(Math.random() * 4) + 5;
        let points  = `${x},0 `;
        let cx = x;
        for (let i = 1; i <= steps; i++) {
            cx += (Math.random() - 0.45) * 40;
            const cy = (100 / steps) * i;
            points += `${cx.toFixed(1)},${cy.toFixed(1)} `;
        }
        return points.trim();
    }

    function triggerLightning() {
        if (!lightningOverlay || !lightningBolt) return;

        // Flash the overlay
        lightningOverlay.classList.remove('flash');
        void lightningOverlay.offsetWidth; // reflow
        lightningOverlay.classList.add('flash');

        // Animate the bolt SVG
        const svg = lightningBolt.querySelector('polyline');
        if (svg) svg.setAttribute('points', makeBoltPath());
        lightningBolt.classList.remove('show');
        void lightningBolt.offsetWidth;
        lightningBolt.classList.add('show');

        // Optional double-flash
        if (Math.random() > 0.5) {
            setTimeout(() => {
                lightningOverlay.classList.remove('flash');
                void lightningOverlay.offsetWidth;
                lightningOverlay.classList.add('flash');
            }, 120);
        }

        // Schedule next strike: every 5–18 seconds randomly
        const nextStrike = Math.random() * 13000 + 5000;
        setTimeout(triggerLightning, nextStrike);
    }

    // Start first strike after 2–7 seconds
    const firstStrike = Math.random() * 5000 + 2000;
    setTimeout(triggerLightning, firstStrike);

});
