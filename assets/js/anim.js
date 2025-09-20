/* Unified GSAP animation helpers */
(function(){
  if(typeof gsap==='undefined') return;
  const ease = 'power2.out';
  function enter(selector, opts){
    const o = Object.assign({stagger:0.08,duration:0.45,fromY:16}, opts||{});
    gsap.set(selector,{opacity:0,y:o.fromY});
    gsap.to(selector,{opacity:1,y:0,stagger:o.stagger,duration:o.duration,ease});
  }
  function revealOnScroll(selector, opts){
    const o = Object.assign({rootMargin:'0px 0px -10% 0px',once:true,fromY:16,duration:0.45,stagger:0.08}, opts||{});
    const elements = document.querySelectorAll(selector);
    if(!elements.length) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach((e)=>{
        if(e.isIntersecting){
          const el = e.target;
          gsap.fromTo(el,{opacity:0,y:o.fromY},{opacity:1,y:0,duration:o.duration,ease});
          if(o.once) io.unobserve(el);
        }
      });
    },{root:null,rootMargin:o.rootMargin,threshold:0.1});
    elements.forEach((el,i)=>{
      el.style.willChange='opacity, transform';
      setTimeout(()=>io.observe(el), i*o.stagger*1000);
    });
  }
  function bindButtonBounce(selector){
    document.addEventListener('click',(e)=>{
      const btn = e.target.closest(selector);
      if(!btn) return;
      gsap.fromTo(btn,{scale:1},{scale:0.98,duration:0.08,yoyo:true,repeat:1,ease:'power1.out'});
    });
  }
  window.AnimKit = { enter, revealOnScroll, bindButtonBounce };
})();
