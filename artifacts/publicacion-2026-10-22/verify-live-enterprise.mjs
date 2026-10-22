// Ensayo de publicación autorizado: un registro ficticio, sin email/WhatsApps/cobros.
// No guarda credenciales, cookies o trazas con datos de otros contactos.
import {spawn} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {parse} from '/home/juan/bot_super_admin/node_modules/dotenv/lib/main.js';
import assert from 'node:assert/strict';
const OUT=new URL('./',import.meta.url).pathname;
const panelEnv=parse(readFileSync('/home/juan/bot_super_admin/.env.local'));
const phone='12025550163',company='Verificación Nitro 22 oct 2026';
const need='PRUEBA TÉCNICA AUTORIZADA de publicación. Verificar conexión web-panel. No contactar; registro ficticio para eliminar al cerrar la revisión.';
const chrome=spawn(`${process.env.HOME}/.cache/ms-playwright/chromium-1187/chrome-linux/chrome`,['--headless=new','--remote-debugging-port=9496','--no-sandbox','--disable-gpu','about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let ws;let seq=0;const pending=new Map(),checks=[],errors=[];
const check=(label,result)=>{assert.ok(result,label);checks.push(label);console.log('PASS '+label);};
try{
 for(let i=0;i<60;i++){try{const tabs=await(await fetch('http://127.0.0.1:9496/json')).json();ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);break;}catch{await pause(100);}}
 await new Promise(r=>ws.addEventListener('open',r));
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push(m.params.args.map(a=>a.description||a.value).join(' '));});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,m=>m.error?reject(m.error):resolve(m.result));ws.send(JSON.stringify({id,method,params}));});
 const js=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text);return r.result?.value;};
 const wait=async expression=>{for(let i=0;i<180;i++){if(await js(expression))return;await pause(200);}throw Error('No se confirmó la condición de la prueba de publicación.');};
 const open=async url=>{await send('Page.navigate',{url});await wait('document.readyState==="complete"');await pause(1000);};
 const fill=async(selector,value)=>{await js(`document.querySelector(${JSON.stringify(selector)}).focus()`);await send('Input.insertText',{text:value});};
 const shot=async(name,clip)=>{const r=await send('Page.captureScreenshot',{format:'png',...(clip?{clip}:{} )});writeFileSync(OUT+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});await send('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});
 if(!process.env.RESUME_PANEL){
 await open('https://www.juanarangoecommerce.com/nitro-complete?utm_source=verificacion-publicacion&utm_campaign=2026-10-22');
 await wait('!!document.querySelector("#empresas input[name=name]")&&Object.keys(document.querySelector("#empresas input[name=name]")).some(k=>k.startsWith("__reactProps"))');
 for(const [key,value] of [['name','Prueba técnica publicación'],['company',company],['phone','+1 202 555 0163'],['need',need]])await fill(`#empresas [name=${key}]`,value);
 await js('const s=document.querySelector("#empresas select");s.value="unknown";s.dispatchEvent(new Event("change",{bubbles:true}));document.querySelector("#empresas input[type=checkbox]").click();document.querySelector("#empresas").scrollIntoView({block:"start"});window.scrollBy(0,-80)');
 await pause(3100);await js('document.querySelector("#empresas button[type=submit]").click()');
 await wait('document.querySelector("#empresas").innerText.includes("Recibimos tu solicitud.")');
 check('formulario del dominio confirma recepción real',true);await shot('solicitud-real-recibida-movil');
 } else check('formulario ya recibido, sin repetir envío',true);
 await send('Emulation.setDeviceMetricsOverride',{width:1366,height:1000,deviceScaleFactor:1,mobile:false});
 await open('https://bot-super-admin.vercel.app/login');await wait('!!document.querySelector("input[type=password]")');
 await fill('input[type=password]',panelEnv.PANEL_PASSWORD);
 await js('document.querySelector("form button").click()');await wait('location.pathname.startsWith("/panel")');
 check('panel real accesible con sesión autorizada',true);
 await open('https://bot-super-admin.vercel.app/panel/conversaciones?filtro=empresas&q='+phone);
 await wait('document.body.innerText.includes('+JSON.stringify(company)+')');
 const contactId=await js(`(()=>{const a=[...document.querySelectorAll('a')].find(a=>a.href.includes('id=')&&a.innerText.includes(${JSON.stringify(company)}));return a?new URL(a.href).searchParams.get('id'):new URL(location.href).searchParams.get('id');})()`);
 check('solicitud localizada en filtro Empresas',!!contactId);
 await open('https://bot-super-admin.vercel.app/panel/conversaciones?filtro=empresas&q='+phone+'&id='+contactId);
 await wait('document.body.innerText.includes("Solicitud empresarial")&&document.body.innerText.includes("PRUEBA TÉCNICA AUTORIZADA")');
 check('panel muestra empresa y necesidad enviadas desde la web',await js('document.body.innerText.includes('+JSON.stringify(company)+')'));
 check('formulario no habilita respuestas automáticas ni ventana WhatsApp',await js('document.body.innerText.includes("todavía no ha escrito al WhatsApp de ventas")&&document.body.innerText.includes("no habilita respuestas automáticas")'));
 await js('[...document.querySelectorAll("article")].find(a=>a.querySelector("h3")?.innerText==="Solicitud empresarial").scrollIntoView({block:"center"})');
 const clip=await js('(()=>{const r=[...document.querySelectorAll("article")].find(a=>a.querySelector("h3")?.innerText==="Solicitud empresarial").getBoundingClientRect();return{x:Math.max(0,r.left+scrollX),y:Math.max(0,r.top+scrollY),width:r.width,height:r.height,scale:1};})()');
 await shot('solicitud-real-en-panel',clip);
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});await pause(500);
 check('panel real móvil sin desbordamiento',await js('document.documentElement.scrollWidth<=innerWidth'));
 check('sin errores de consola ni excepciones en el recorrido real',errors.length===0);
 writeFileSync(OUT+'enterprise-live.json',JSON.stringify({checks,errors,contactId,phone,company,need,name:'Prueba técnica publicación',scope:'Un registro técnico ficticio autorizado para comprobar web → receptor firmado → base del vendedor → panel. Sin email, mensajes ni cobros; eliminar solo este registro al cerrar.'},null,2));
}finally{ws?.close();chrome.kill();}
