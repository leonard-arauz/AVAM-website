const $=(selector,scope=document)=>scope.querySelector(selector);
const $$=(selector,scope=document)=>[...scope.querySelectorAll(selector)];
function toast(message){const old=$('.toast');if(old)old.remove();const el=document.createElement('div');el.className='toast';el.textContent=message;$('.app').append(el);setTimeout(()=>el.remove(),3000)}
$$('[data-go]').forEach(el=>el.addEventListener('click',()=>location.href=el.dataset.go));
$$('[data-role]').forEach(card=>card.addEventListener('click',()=>{const group=card.closest('[data-role-group]');$$('[data-role]',group).forEach(item=>{item.classList.remove('selected');const check=$('.role-check',item);if(check)check.remove()});card.classList.add('selected');const check=document.createElement('span');check.className='role-check';check.textContent='✓';card.append(check);group.dataset.selected=card.dataset.role;const continueButton=$('[data-role-continue]');if(continueButton)continueButton.disabled=false}));
const roleContinue=$('[data-role-continue]');if(roleContinue)roleContinue.addEventListener('click',()=>{const role=$('[data-role-group]').dataset.selected;const nested=location.pathname.includes('/adulto-mayor/')||location.pathname.includes('/colaborador/');location.href=role==='colaborador'?(nested?'../colaborador/inicio.html':'colaborador/inicio.html'):(nested?'../adulto-mayor/inicio.html':'adulto-mayor/inicio.html')});
$$('.quick-chip').forEach(chip=>chip.addEventListener('click',()=>{const input=$('.composer input');if(input){input.value=chip.textContent.trim();input.focus()}}));
$$('[data-send]').forEach(button=>button.addEventListener('click',()=>{const composer=button.closest('.composer');const input=$('input',composer);if(!input.value.trim())return;const list=$('.messages');const bubble=document.createElement('div');bubble.className='bubble outgoing';bubble.textContent=input.value.trim();list.append(bubble);input.value='';list.scrollIntoView({behavior:'smooth',block:'end'});setTimeout(()=>{const reply=document.createElement('div');reply.className='bubble incoming';reply.textContent='Gracias. He registrado la información y continuaremos con tu solicitud.';list.append(reply);reply.scrollIntoView({behavior:'smooth',block:'end'})},550)}));
$$('.composer input').forEach(input=>input.addEventListener('keydown',event=>{if(event.key==='Enter')$('[data-send]',input.parentElement)?.click()}));
$$('.star').forEach((star,index,stars)=>star.addEventListener('click',()=>{$$('.star',star.parentElement).forEach((item,i)=>item.classList.toggle('on',i<=index));star.parentElement.dataset.rating=index+1}));
$$('[data-toast]').forEach(button=>button.addEventListener('click',()=>toast(button.dataset.toast)));
$$('.toggle').forEach(toggle=>toggle.addEventListener('click',()=>{toggle.classList.toggle('on');toggle.setAttribute('aria-pressed',toggle.classList.contains('on'));toast(toggle.classList.contains('on')?'Estás disponible para trabajar':'Disponibilidad desactivada')}));
$$('[data-filter]').forEach(tab=>tab.addEventListener('click',()=>{$$('[data-filter]').forEach(item=>item.classList.remove('active'));tab.classList.add('active');$$('[data-status]').forEach(card=>card.hidden=card.dataset.status!==tab.dataset.filter)}));
$$('[data-search]').forEach(input=>input.addEventListener('input',()=>{const query=input.value.toLowerCase();$$('[data-search-item]').forEach(item=>item.hidden=!item.textContent.toLowerCase().includes(query))}));
$$('[data-chat]').forEach(item=>item.addEventListener('click',()=>toast(`Abriendo conversación con ${item.dataset.chat}`)));
const visualViewport=window.visualViewport;
let viewportBaseline=visualViewport?.height||window.innerHeight;
function syncVisualViewport(){const height=visualViewport?.height||window.innerHeight;const fieldFocused=document.activeElement?.matches('input, textarea, [contenteditable="true"]');if(!fieldFocused)viewportBaseline=Math.max(viewportBaseline,height);const keyboardOpen=Boolean(fieldFocused&&viewportBaseline-height>120);document.documentElement.style.setProperty('--visual-viewport-height',`${Math.round(height)}px`);document.body.classList.toggle('keyboard-open',keyboardOpen)}
visualViewport?.addEventListener('resize',syncVisualViewport);
visualViewport?.addEventListener('scroll',syncVisualViewport);
window.addEventListener('orientationchange',()=>setTimeout(()=>{viewportBaseline=visualViewport?.height||window.innerHeight;syncVisualViewport()},250));
document.addEventListener('focusin',()=>setTimeout(syncVisualViewport,50));
document.addEventListener('focusout',()=>setTimeout(syncVisualViewport,250));
syncVisualViewport();
