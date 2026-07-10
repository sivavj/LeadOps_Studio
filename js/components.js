/**
 * LeadOps Studio - Premium Conversion & UI Components
 * Dynamically injected across all pages for consistency and SEO maintenance.
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu is critical for above-the-fold navigation
  initMobileMenu();

  // Defer non-critical UI components to improve TBT and LCP
  const deferComponents = () => {
    initStatsCounter();
    injectFloatingWhatsApp();
    injectExitIntentPopup();
    injectStickyMobileCTA();
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(() => deferComponents());
  } else {
    setTimeout(deferComponents, 100);
  }
});

/* ==========================================
   1. MOBILE MENU INITIALIZATION
   ========================================== */
function initMobileMenu() {
  const btn = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("hidden");
    });
    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add("hidden");
      }
    });
  }
}

/* ==========================================
   2. STATS COUNTER ANIMATION
   ========================================== */
function initStatsCounter() {
  const counters = document.querySelectorAll(".stats-counter");
  if (counters.length === 0) return;

  const animateCounter = (counter) => {
    const target = parseFloat(counter.getAttribute("data-target"));
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();
    const isDecimal = counter.getAttribute("data-decimal") === "true";

    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing out quadratic
      const easeProgress = progress * (2 - progress);
      const currentValue = easeProgress * target;

      if (isDecimal) {
        counter.textContent = currentValue.toFixed(1);
      } else {
        counter.textContent = Math.floor(currentValue);
      }

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        counter.textContent = isDecimal ? target.toFixed(1) : target;
      }
    };

    requestAnimationFrame(updateValue);
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(counter => observer.observe(counter));
}

/* ==========================================
   3. FLOATING WHATSAPP WIDGET
   ========================================== */
function injectFloatingWhatsApp() {
  // Check if existing basic widget is present and remove it to avoid duplicates
  const existingBasic = document.querySelector('a[href*="wa.me"][class*="fixed"]');
  if (existingBasic) {
    existingBasic.remove();
  }

  // Create widget container
  const widget = document.createElement("div");
  widget.className = "fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none transition-all duration-300";
  widget.id = "premium-whatsapp-widget";

  // Build the DOM content with premium tooltip
  widget.innerHTML = `
    <!-- Tooltip -->
    <div id="wa-tooltip" class="mb-3 bg-white text-gray-800 text-[13px] font-medium py-2 px-4 rounded-xl shadow-xl border border-blue-50/50 flex items-center gap-2 transform translate-y-2 opacity-0 transition-all duration-500 pointer-events-auto max-w-[260px] md:max-w-xs">
      <span class="flex h-2 w-2 relative">
        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span>👋 Chat with our AI Growth Specialist</span>
      <button id="close-wa-tooltip" aria-label="Close tooltip" class="text-gray-400 hover:text-gray-600 font-bold ml-1 text-sm">&times;</button>
    </div>
    
    <!-- Button -->
    <a href="https://wa.me/919626756956?text=Hi%20LeadOps%20Studio%0AI’d%20like%20to%20book%20a%20FREE%20AI%20Growth%20Audit%20for%20my%20business."
       target="_blank"
       rel="noopener"
       class="pointer-events-auto bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] transform hover:scale-105 transition-all duration-300 relative group flex items-center justify-center">
      <!-- Pulsing Ring -->
      <span class="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping group-hover:animate-none"></span>
      
      <!-- Icon -->
      <svg class="w-7 h-7 relative z-10" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </a>
  `;

  document.body.appendChild(widget);

  // Show tooltip after 3.5 seconds
  setTimeout(() => {
    const tooltip = document.getElementById("wa-tooltip");
    if (tooltip && !localStorage.getItem("wa_tooltip_dismissed")) {
      tooltip.classList.remove("translate-y-2", "opacity-0");
    }
  }, 3500);

  // Close tooltip logic
  document.getElementById("close-wa-tooltip")?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const tooltip = document.getElementById("wa-tooltip");
    if (tooltip) {
      tooltip.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => tooltip.remove(), 500);
    }
    localStorage.setItem("wa_tooltip_dismissed", "true");
  });
}

/* ==========================================
   4. EXIT INTENT POPUP
   ========================================== */
function injectExitIntentPopup() {
  if (localStorage.getItem("exit_popup_dismissed")) return;

  const modal = document.createElement("div");
  modal.id = "exit-intent-modal";
  modal.className = "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300";

  modal.innerHTML = `
    <!-- Card -->
    <div class="relative w-full max-w-lg bg-white rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-100 transform scale-95 transition-all duration-300 flex flex-col">
      
      <!-- Glow gradient -->
      <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-[#10b981]"></div>

      <!-- Close Button -->
      <button id="close-exit-modal" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-all duration-200 z-10" aria-label="Close modal">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Content -->
      <div class="p-8 md:p-10 flex-grow">
        <div class="mb-6">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 mb-3 border border-blue-100/50">
            🎁 Limited-Time Offer
          </span>
          <h3 class="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
            Wait! Grab Your Free <br class="hidden sm:inline" />AI Growth Audit
          </h3>
          <p class="text-[14px] md:text-[15px] text-slate-600 mt-2 leading-relaxed">
            Before you leave, let our team check your Google visibility, site speed, and automation opportunities. We'll send you a custom video report.
          </p>
        </div>

        <!-- Form -->
        <form id="exit-modal-form" class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Business Name</label>
            <input type="text" required name="business_name" placeholder="e.g. Tiruppur Medical Clinic" 
              class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder-slate-400" />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">Website Address (Optional)</label>
            <input type="url" name="website" placeholder="e.g. www.myclinic.in" 
              class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder-slate-400" />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1.5">WhatsApp Number</label>
            <input type="tel" required name="whatsapp" placeholder="e.g. +91 98765 43210" 
              class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all placeholder-slate-400" />
          </div>
          
          <button type="submit" 
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mt-2">
            <span>Generate Free Video Audit</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </form>
      </div>

      <!-- Footer message -->
      <div class="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center">
        <p class="text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <svg class="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          No credit card required. Sent via WhatsApp within 24h.
        </p>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Triggering Mechanism
  let shown = false;

  // Exit intent for desktop
  document.addEventListener("mouseleave", (e) => {
    if (e.clientY < 50 && !shown) {
      triggerModal();
    }
  });

  // Time delay for mobile (12 seconds)
  setTimeout(() => {
    if (!shown) {
      triggerModal();
    }
  }, 12000);

  function triggerModal() {
    shown = true;
    modal.classList.remove("pointer-events-none", "opacity-0");
    const card = modal.querySelector(".relative");
    if (card) {
      card.classList.remove("scale-95");
      card.classList.add("scale-100");
    }
  }

  function dismissModal() {
    modal.classList.add("pointer-events-none", "opacity-0");
    const card = modal.querySelector(".relative");
    if (card) {
      card.classList.remove("scale-100");
      card.classList.add("scale-95");
    }
    localStorage.setItem("exit_popup_dismissed", "true");
  }

  document.getElementById("close-exit-modal")?.addEventListener("click", dismissModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) dismissModal();
  });

  // Form submission
  document.getElementById("exit-modal-form")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const bName = formData.get("business_name") || "";
    const web = formData.get("website") || "";
    const wa = formData.get("whatsapp") || "";

    // Redirect to WhatsApp or open whatsapp with details
    const textMsg = `Hi LeadOps Studio 👋, I just requested a Free AI Growth Audit from the Exit Intent Popup.\n\nBusiness Name: ${bName}\nWebsite: ${web}\nWhatsApp: ${wa}`;

    localStorage.setItem("exit_popup_dismissed", "true");

    // Open Whatsapp in new window & redirect current tab to thank you page
    window.open(`https://wa.me/919626756956?text=${encodeURIComponent(textMsg)}`, "_blank");
    window.location.href = "/thank-you.html";
  });
}

/* ==========================================
   5. STICKY MOBILE CTA
   ========================================== */
function injectStickyMobileCTA() {
  const cta = document.createElement("div");
  cta.id = "sticky-mobile-cta";
  cta.className = "fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-100 p-3 flex items-center justify-between gap-3 shadow-[0_-10px_20px_rgba(0,0,0,0.04)] z-[49] transform translate-y-full transition-all duration-300 md:hidden";

  cta.innerHTML = `
    <div class="flex-grow">
      <p class="text-xs font-semibold text-slate-800 leading-tight">LeadOps Studio</p>
      <p class="text-[10px] text-slate-500">Book Your Free AI Audit</p>
    </div>
    <div class="flex items-center gap-2">
      <!-- Call Button -->
      <a href="tel:+919626756956" 
         class="bg-slate-100 text-slate-800 p-2.5 rounded-xl hover:bg-slate-200 transition-all">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>
      <!-- Audit Button -->
      <a href="/audit.html" 
         class="bg-blue-600 text-white font-semibold px-4 py-2.5 rounded-xl text-xs shadow-md hover:bg-blue-700 transition-all flex items-center gap-1.5">
        <span>Book Free Audit</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  `;

  document.body.appendChild(cta);

  window.addEventListener("scroll", () => {
    const waWidget = document.getElementById("premium-whatsapp-widget");
    if (window.scrollY > 300) {
      cta.classList.remove("translate-y-full");
      if (waWidget) {
        waWidget.style.bottom = "80px";
      }
    } else {
      cta.classList.add("translate-y-full");
      if (waWidget) {
        waWidget.style.bottom = "";
      }
    }
  });
}

/* ==========================================
   6. LAZY-LOADED ANALYTICS SYSTEM (LCP & TBT OPTIMIZED)
   ========================================== */
function loadAnalytics() {
  if (window.analyticsLoaded) return;
  window.analyticsLoaded = true;

  // 1. Google Tag Manager
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    var script = d.createElement(s);
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(script, f);
  })(window, document, "script", "dataLayer", "GTM-TPM5JR28");

  // 2. Google Analytics (gtag.js)
  var scriptGA = document.createElement("script");
  scriptGA.async = true;
  scriptGA.src = "https://www.googletagmanager.com/gtag/js?id=G-HC42XS9W2G";
  document.head.appendChild(scriptGA);

  scriptGA.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-HC42XS9W2G");
  };
}

// User interactions that trigger analytics loading
const interactionEvents = ["mousemove", "scroll", "touchstart", "click"];
interactionEvents.forEach((event) => {
  window.addEventListener(event, loadAnalytics, { passive: true, once: true });
});

// Fallback to load analytics after 3.5 seconds
window.addEventListener("load", () => {
  setTimeout(loadAnalytics, 3500);
});
