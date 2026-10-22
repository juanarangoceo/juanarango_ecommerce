// Revisión de solo lectura de la franja y Nitro 3D. No formularios ni mensajes externos.
import {spawn} from 'node:child_process';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const OUT=new URL('./',import.meta.url).pathname;
const origin=process.env.REVIEW_ORIGIN||'http://localhost:4322';
const chrome=spawn(`${process.env.HOME}/.cache/ms-playwright/chromium-1187/chrome-linux/chrome`,['--headless=new','--remote-debugging-port=9497','--no-sandbox','--disable-gpu','about:blank'],{stdio:'ignore'});
const pause=ms=>new Promise(r=>setTimeout(r,ms));let ws;let seq=0;const pending=new Map(),errors=[],checks=[];
const check=(name,result)=>{assert.ok(result,name);checks.push(name);console.log('PASS '+name);};
try{
 for(let i=0;i<60;i++){try{const tabs=await(await fetch('http://127.0.0.1:9497/json')).json();ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);break;}catch{await pause(100);}}
 await new Promise(r=>ws.addEventListener('open',r));
 ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.text);if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push(m.params.args.map(a=>a.description||a.value).join(' '));});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,m=>m.error?reject(m.error):resolve(m.result));ws.send(JSON.stringify({id,method,params}));});
 const js=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.text);return r.result?.value;};
 const wait=async expression=>{for(let i=0;i<120;i++){if(await js(expression))return;await pause(150);}throw Error('Timeout: '+expression);};
 const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png'});writeFileSync(OUT+name+'.png',Buffer.from(r.data,'base64'));};
 await send('Page.enable');await send('Runtime.enable');await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:process.env.NORMAL_MOTION?'no-preference':'reduce'}]});
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 await send('Page.navigate',{url:origin+'/nitro-complete'});await wait('document.readyState==="complete"&&!!document.querySelector("#logos-integraciones")');
 await wait('[...document.querySelectorAll("#logos-integraciones img")].every(i=>i.complete&&i.naturalWidth>0)');await pause(1500);
 check('Nitro 3D original restaurado',await js('!![...document.images].find(i=>i.getAttribute("src")==="/nitro/live/body.webp")&&!![...document.querySelectorAll("[role=button]")].find(e=>e.getAttribute("aria-label")?.startsWith("Nitro, tu asesor"))'));
 check('Saturno retirado del HTML',await js('!document.querySelector("#nitro-orbita")&&![...document.images].some(i=>i.src.includes("orbita-colombia"))'));
 check('18 logos en una sola fila',await js('document.querySelectorAll("#logos-integraciones li").length===18&&new Set([...document.querySelectorAll("#logos-integraciones li")].map(e=>Math.round(e.getBoundingClientRect().top))).size===1'));
 check('franja inmediatamente debajo del header',await js('Math.abs(document.querySelector("#logos-integraciones").getBoundingClientRect().top-document.querySelector("header").getBoundingClientRect().bottom)<2'));
 check('todos los logos caben en escritorio',await js('document.querySelector("#logos-integraciones").scrollWidth<=document.querySelector("#logos-integraciones").clientWidth'));
 check('Con sonido sigue retirado',await js('!document.querySelector("#video").innerText.includes("Con sonido")'));
 await shot('hero-escritorio');
 const live='[...document.querySelectorAll("[role=button]")].find(e=>e.getAttribute("aria-label")?.startsWith("Nitro, tu asesor"))';
 await wait('Object.keys('+live+').some(k=>k.startsWith("__reactProps"))');
 const previousGreeting=await js(live+'.querySelector("[aria-live] p").textContent');
 await js(live+'.click()');await pause(500);
 check('Nitro responde al saludo',await js(live+'.querySelector("[aria-live] p").textContent')!==previousGreeting);
 const animation=await js('getComputedStyle([...document.images].find(i=>i.getAttribute("src")==="/nitro/live/body.webp").parentElement.parentElement).animationName');
 check('animación respeta preferencia de movimiento',process.env.NORMAL_MOTION?animation!=='none':animation==='none');
 for(const width of [360,390,768,1440]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});await pause(250);
  check('sin desbordamiento de página a '+width,await js('document.documentElement.scrollWidth<=innerWidth'));
  check('fila se mantiene única a '+width,await js('new Set([...document.querySelectorAll("#logos-integraciones li")].map(e=>Math.round(e.getBoundingClientRect().top))).size===1'));
 }
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});
 await js('window.scrollTo(0,0)');await pause(200);await shot('hero-movil');
 await js('document.querySelector("#logos-integraciones").focus();document.querySelector("#logos-integraciones").scrollLeft=10000');await pause(500);
 check('desplazamiento horizontal permite llegar al último logo',await js('(()=>{const a=document.querySelector("#logos-integraciones"),b=a.querySelector("li:last-child").getBoundingClientRect();return a.scrollLeft>0&&b.right<=a.getBoundingClientRect().right;})()'));
 await wait('[...document.querySelectorAll("#logos-integraciones img")].every(i=>i.complete&&i.naturalWidth>0)');
 check('logos originales cargan',true);await shot('logos-movil-final');
 await js(live+'.scrollIntoView({block:"center"})');await pause(200);await shot('nitro-3d-movil');
 check('sin errores de consola ni excepciones JS',errors.length===0);
 writeFileSync(OUT+(process.env.NORMAL_MOTION?'verification-normal-motion.json':'verification.json'),JSON.stringify({origin,checks,errors,scope:'Navegación local de solo lectura; sin envíos ni cambios en NitroBot.'},null,2));
}finally{ws?.close();chrome.kill();}
