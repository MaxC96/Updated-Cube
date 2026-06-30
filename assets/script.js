const menuButton=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');if(menuButton&&nav){menuButton.addEventListener('click',()=>{nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false');});}

// Gotham Solutions Assistant
(function(){
  const widget = document.querySelector('.gotham-ai-widget');
  if(!widget) return;

  const toggle = widget.querySelector('.gotham-ai-toggle');
  const panel = widget.querySelector('.gotham-ai-panel');
  const close = widget.querySelector('.gotham-ai-close');
  const messages = widget.querySelector('.gotham-ai-messages');
  const form = widget.querySelector('.gotham-ai-form');
  const input = form.querySelector('input');

  const responses = {
    expense: "Gotham helps organizations identify savings opportunities through contract reviews, invoice analysis, vendor accountability, service validation, and Technology Expense Management. A good first step is a focused review of current contracts, invoices, and recurring services.",
    infrastructure: "Gotham supports infrastructure planning across network design, cloud communications, SD-WAN, connectivity, low voltage coordination, relocation planning, and implementation oversight.",
    managed: "Gotham can help evaluate, source, and coordinate managed services across IT support, cybersecurity, backup, endpoint strategy, cloud platforms, and vendor management.",
    contact: "You can call Gotham Solutions Group at 212-542-1300 or email info@gothamsolutionsgroup.com. For the fastest start, share what you want to reduce, modernize, or simplify."
  };

  function addMessage(text, type){
    const msg = document.createElement('div');
    msg.className = 'gotham-ai-message ' + type;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function answer(text){
    const q = text.toLowerCase();
    if(q.includes('expense') || q.includes('cost') || q.includes('save') || q.includes('invoice')){
      return responses.expense;
    }
    if(q.includes('infrastructure') || q.includes('network') || q.includes('sd-wan') || q.includes('cabling') || q.includes('design')){
      return responses.infrastructure;
    }
    if(q.includes('managed') || q.includes('support') || q.includes('cyber') || q.includes('backup')){
      return responses.managed;
    }
    if(q.includes('contact') || q.includes('call') || q.includes('email') || q.includes('consultation')){
      return responses.contact;
    }
    return "Gotham Solutions Group focuses on expense reduction strategy, infrastructure design, and managed services. To get specific guidance, call 212-542-1300 or ask about one of those areas here.";
  }

  toggle.addEventListener('click', () => panel.classList.toggle('open'));
  close.addEventListener('click', () => panel.classList.remove('open'));

  widget.querySelectorAll('[data-question]').forEach(button => {
    button.addEventListener('click', () => {
      const key = button.getAttribute('data-question');
      addMessage(button.textContent, 'user');
      addMessage(responses[key], 'bot');
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = input.value.trim();
    if(!text) return;
    addMessage(text, 'user');
    input.value = '';
    setTimeout(() => addMessage(answer(text), 'bot'), 250);
  });
})();






/* Valued Clients stable 5x5 rotating logo wall */
document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll(".client-logo-batch-grid").forEach(function(grid){
    const originalCards = Array.from(grid.querySelectorAll(".client-logo-card"));
    const logos = originalCards.map(function(card){
      const img = card.querySelector("img");
      return img ? { src: img.getAttribute("src"), alt: img.getAttribute("alt") || "Client logo" } : null;
    }).filter(Boolean);

    if(!logos.length) return;

    const pageSize = Math.min(25, logos.length);
    let offset = 0;
    let activeLayer = 0;
    let isRotating = false;

    grid.innerHTML = "";
    grid.classList.add("client-logo-stable-wall");
    grid.setAttribute("data-active-layer", "0");

    // Warm the browser cache before the first rotation so the crossfade stays fluid.
    logos.forEach(function(logo){
      const preload = new Image();
      preload.src = logo.src;
    });

    const slots = [];
    for(let i = 0; i < pageSize; i++){
      const figure = document.createElement("figure");
      figure.className = "client-logo-card client-logo-slot";

      const imgA = document.createElement("img");
      imgA.className = "client-logo-img client-logo-layer-a";

      const imgB = document.createElement("img");
      imgB.className = "client-logo-img client-logo-layer-b";
      imgB.setAttribute("aria-hidden", "true");

      figure.appendChild(imgA);
      figure.appendChild(imgB);

      figure.style.setProperty("--client-slot-delay", (i * 55) + "ms");
      figure.style.setProperty("--client-reveal-delay", (i * 42) + "ms");
      grid.appendChild(figure);
      slots.push({ figure, layers: [imgA, imgB] });
    }

    function logoAt(index){
      return logos[index % logos.length];
    }

    function setImage(img, logo){
      img.src = logo.src;
      img.alt = logo.alt;
    }

    slots.forEach(function(slot, i){
      setImage(slot.layers[0], logoAt(offset + i));
    });

    grid.classList.add("client-logo-reveal-ready");
    function revealLogos(){
      grid.classList.add("logos-in-view");
    }
    if(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      revealLogos();
    } else if("IntersectionObserver" in window){
      const revealObserver = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            revealLogos();
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
      revealObserver.observe(grid);
    } else {
      revealLogos();
    }

    function rotate(){
      if(isRotating) return;
      isRotating = true;

      const nextOffset = (offset + pageSize) % logos.length;
      const nextLayer = activeLayer === 0 ? 1 : 0;
      grid.classList.add("is-switching");

      slots.forEach(function(slot, i){
        setImage(slot.layers[nextLayer], logoAt(nextOffset + i));
        slot.layers[nextLayer].removeAttribute("aria-hidden");
        slot.layers[activeLayer].setAttribute("aria-hidden", "true");
        slot.figure.style.setProperty("--client-slot-delay", (i * 85) + "ms");
      });

      requestAnimationFrame(function(){
        requestAnimationFrame(function(){
          grid.setAttribute("data-active-layer", String(nextLayer));
        });
      });

      window.setTimeout(function(){
        offset = nextOffset;
        activeLayer = nextLayer;
        slots.forEach(function(slot){
          slot.figure.style.removeProperty("--client-slot-delay");
        });
        grid.classList.remove("is-switching");
        isRotating = false;
      }, 3800);
    }

    if(logos.length > pageSize){
      setInterval(rotate, 9800);
    }
  });
});


// Subtle section reveal animations
(function(){
  const targets = Array.from(document.querySelectorAll('main > section:not(.six-rubik-section):not(.gotham-partners-rubik-section), .site-footer'));
  if(!targets.length) return;
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    targets.forEach(el => el.classList.add('is-revealed'));
    return;
  }
  targets.forEach(el => el.classList.add('scroll-reveal'));
  if(!('IntersectionObserver' in window)){
    targets.forEach(el => el.classList.add('is-revealed'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  targets.forEach(el => observer.observe(el));
})();
