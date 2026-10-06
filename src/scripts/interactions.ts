const menu=document.querySelector<HTMLDetailsElement>('.mobile-menu');
menu?.addEventListener('click',event=>{if((event.target as Element).closest('a'))menu.open=false});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.open){menu.open=false;menu.querySelector('summary')?.focus();}});
const rhythm=document.querySelector<HTMLSelectElement>('#rhythm-select');
const panels=Array.from(document.querySelectorAll<HTMLElement>('[data-rhythm]'));
const setRhythm=()=>panels.forEach(panel=>panel.hidden=panel.dataset.rhythm!==rhythm?.value);
rhythm?.addEventListener('change',setRhythm);if(rhythm){rhythm.disabled=false;setRhythm();}
document.querySelectorAll<HTMLAnchorElement>('[data-open-practice]').forEach(link=>link.addEventListener('click',()=>{const practice=document.querySelector<HTMLDetailsElement>(`#practica-${link.dataset.openPractice}`);if(practice)practice.open=true;}));
document.querySelectorAll<HTMLAnchorElement>('[data-pick]').forEach(link=>link.addEventListener('click',()=>{const interest=document.querySelector<HTMLSelectElement>('#interest');if(interest)interest.value=link.dataset.pick!;}));
const form=document.querySelector<HTMLFormElement>('.contact-form');
if(form){
 const fields=Array.from(form.querySelectorAll<HTMLInputElement|HTMLTextAreaElement>('input[required],textarea[required]'));
 const status=form.querySelector<HTMLElement>('.form-status')!;const submit=form.querySelector<HTMLButtonElement>('[type=submit]')!;const original=submit.innerHTML;submit.disabled=false;
 const validate=(field:HTMLInputElement|HTMLTextAreaElement)=>{let error='';const value=field.value.trim();if(!value)error='Completa este campo.';else if(field.type==='email'&&!field.validity.valid)error='Escribe un correo válido.';else if(field.name==='message'&&value.length<10)error='Escribe al menos 10 caracteres.';else if(field.maxLength>0&&value.length>field.maxLength)error=`Usa un máximo de ${field.maxLength} caracteres.`;field.setAttribute('aria-invalid',String(!!error));const label=document.getElementById(`${field.id}-error`);if(label)label.textContent=error;return !error;};
 fields.forEach(field=>{field.addEventListener('blur',()=>{field.dataset.touched='true';validate(field);});field.addEventListener('input',()=>{if(field.dataset.touched)validate(field);status.textContent='';delete status.dataset.state;});});
 form.addEventListener('submit',async event=>{event.preventDefault();const checks=fields.map(validate);if(checks.some(valid=>!valid)){status.textContent=form.dataset.error!;status.dataset.state='error';fields.find(field=>field.getAttribute('aria-invalid')==='true')?.focus();return;}submit.disabled=true;submit.textContent=form.dataset.loading!;form.setAttribute('aria-busy','true');await new Promise(resolve=>setTimeout(resolve,280));status.textContent=form.dataset.success!;status.dataset.state='success';submit.disabled=false;submit.innerHTML=original;form.removeAttribute('aria-busy');});
}
