// Solo lectura: landing, imágenes y reproducción de muestras locales. No envía formularios.
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';
const OUT=new URL('./',import.meta.url).pathname;
const origin=process.env.REVIEW_ORIGIN||'http://localhost:4322';
const chrome=spawn(`${process.env.HOME}/.cache/ms-playwright/chromium-1187/chrome-linux/chrome`,['--headless=new','--remote-debugging-port=9498','--no-sandbox','--disable-gpu','--autoplay-policy=no-user-gesture-required','about:blank'],{stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let ws;let seq=0;const pending=new Map(),checks=[],errors=[];
const check=(name,value)=>{assert.ok(value,name);checks.push(name);console.log('PASS '+name);};
try {
  for(let i=0;i<60;i++){try{const tabs=await(await fetch('http://127.0.0.1:9498/json')).json();ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);break;}catch{await delay(100);}}
  await new Promise(r=>ws.addEventListener('open',r));
  ws.addEventListener('message',e=>{const m=JSON.parse(e.data);if(m.id){pending.get(m.id)?.(m);pending.delete(m.id);}if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);});
  const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,m=>m.error?reject(m.error):resolve(m.result));ws.send(JSON.stringify({id,method,params}));});
  const js=async expression=>{const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result?.value;};
  const wait=async expr=>{for(let i=0;i<120;i++){if(await js(expr))return;await delay(150);}throw Error('Timeout: '+expr);};
  const shot=async name=>{const r=await send('Page.captureScreenshot',{format:'png'});writeFileSync(OUT+name+'.png',Buffer.from(r.data,'base64'));};
  const scroll=async id=>{await js(`document.querySelector(${JSON.stringify(id)}).scrollIntoView({block:'start'});window.scrollBy(0,-90)`);await delay(500);};
  await send('Page.enable');await send('Runtime.enable');await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:process.env.NORMAL_MOTION?'no-preference':'reduce'}]});
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1050,deviceScaleFactor:1,mobile:false});
  await send('Page.navigate',{url:origin+'/nitro-complete?utm_source=revision-local'});
  await wait('document.readyState==="complete" && !!document.querySelector("#voz audio")');
  await wait('Object.keys(document.querySelector("#voz audio")).some(k=>k.startsWith("__reactProps"))');
  await delay(1000);
  check('hero comunica Colombia, voz, pagos y recargas',await js('document.querySelector("h1").innerText.includes("Con voz, pagos y seguimiento")&&document.body.innerText.includes("pesos colombianos")&&document.body.innerText.includes("recargas en pesos")'));
  check('sin reproducción automática de muestras',await js('[...document.querySelectorAll("#voz audio")].every(a=>a.paused&&a.preload==="none"&&!a.autoplay)'));
  check('no planes públicos y schema COP',await js('!document.body.innerText.includes("Nitro 5K")&&[...document.querySelectorAll("script[type=\\"application/ld+json\\"]")].some(s=>s.textContent.includes("COP"))'));
  await shot('hero-escritorio');
  await scroll('#voz');
  await wait('[...document.querySelectorAll("#voz img")].every(i=>i.complete&&i.naturalWidth>0)');
  await shot('voz-escritorio');
  check('muestras Sara y Carlos con retratos cargados',await js('document.querySelectorAll("#voz audio").length===2&&[...document.querySelectorAll("#voz img")].every(i=>i.complete&&i.naturalWidth>0)'));
  await js('document.querySelectorAll("#voz audio")[0].play()');await wait('Number.isFinite(document.querySelectorAll("#voz audio")[0].duration)');
  check('muestra Sara reproduce audio real',await js('document.querySelectorAll("#voz audio")[0].duration>5&&!document.querySelectorAll("#voz audio")[0].paused'));
  await js('document.querySelectorAll("#voz audio")[1].play()');await wait('Number.isFinite(document.querySelectorAll("#voz audio")[1].duration)');
  check('muestra Carlos reproduce y pausa Sara',await js('document.querySelectorAll("#voz audio")[1].duration>5&&!document.querySelectorAll("#voz audio")[1].paused&&document.querySelectorAll("#voz audio")[0].paused'));
  await js('document.querySelectorAll("#voz audio")[1].pause()');
  check('llamadas separan voz clonada y saldo',await js('document.querySelector("#voz").innerText.includes("no consume turnos")&&document.querySelector("#voz").innerText.includes("no aplica a llamadas")'));
  await scroll('#integraciones');await js('document.querySelectorAll("#integraciones article")[1].scrollIntoView({block:"center"})');
  await wait('[...document.querySelectorAll("#integraciones img")].every(i=>i.complete&&i.naturalWidth>0)');
  check('logos originales cargan, pagos y transportadoras',await js('document.querySelectorAll("#integraciones img").length===17&&[...document.querySelectorAll("#integraciones img")].every(i=>i.complete&&i.naturalWidth>0)'));
  await js('document.querySelector("#integraciones article").scrollIntoView({block:"center"})');await delay(400);await shot('integraciones-escritorio');
  check('Confío para compradores requiere cuenta del comercio',await js('document.querySelector("#integraciones").innerText.includes("Conectas tu cuenta Confío")&&document.querySelector("#integraciones").innerText.includes("según tu cuenta Confío")'));
  check('17TRACK indica saldo por guía y disponibilidad',await js('document.querySelector("#integraciones").innerText.includes("saldo por guía")&&document.querySelector("#integraciones").innerText.includes("Disponibilidad según guía y transportadora")'));
  check('Skydropx claramente no disponible',await js('document.querySelector("#integraciones aside").innerText.includes("En preparación")&&document.querySelector("#integraciones aside").innerText.includes("todavía no está disponible")'));
  await scroll('#shopify');await js('document.querySelector("#shopify details summary").click()');
  check('herramientas se pueden explorar sin abandonar landing',await js('document.querySelector("#shopify details").open&&document.querySelector("#shopify details").innerText.includes("CSV")'));await shot('herramientas-escritorio');
  for(const width of [360,390,768,1440]){
    await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<768});await delay(200);
    check('sin desbordamiento a '+width+' px',await js('document.documentElement.scrollWidth<=innerWidth'));
  }
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:900,deviceScaleFactor:1,mobile:true});
  await scroll('#voz');await shot('voz-movil');await js('document.querySelector("#voz article").scrollIntoView({block:"center"})');await delay(300);await shot('llamadas-movil');
  await js('document.querySelector("#integraciones article").scrollIntoView({block:"center"})');await delay(300);await shot('pagos-movil');
  await js('document.querySelectorAll("#integraciones article")[1].scrollIntoView({block:"center"})');await delay(300);await shot('seguimiento-movil');
  await scroll('#shopify');await shot('herramientas-movil');
  await js('window.scrollTo(0,0)');await delay(300);await shot('hero-movil');
  await scroll('#preguntas');await js('[...document.querySelectorAll("#preguntas button")].find(b=>b.innerText.includes("seguimiento y las guías")).click()');
  check('FAQ visible y schema alineados a disponibilidad',await js('document.querySelector("#preguntas").innerText.includes("todavía no está disponible")&&[...document.querySelectorAll("script[type=\\"application/ld+json\\"]")].some(s=>s.textContent.includes("Skydropx está en preparación"))'));
  await js('window.addEventListener("click", e=>e.preventDefault(),{once:true});document.querySelector("a[data-sales-whatsapp=product_hero]").click()');
  check('WhatsApp conserva campaña sin abrir ni enviar mensajes',await js('decodeURIComponent([...document.querySelectorAll("a")].find(a=>a.href.includes("wa.me")&&a.href.includes("revision-local")).href).includes("revision-local")'));
  await js('const unavailable=document.querySelector("#voz audio");unavailable.src="/nitro/voces/muestra-inexistente.mp3";unavailable.load();unavailable.play().catch(()=>{})');
  await wait('!!document.querySelector("#voz [role=status]")');
  check('fallo de audio muestra alternativa accesible',await js('document.querySelector("#voz [role=status] a").getAttribute("href").includes("sara.mp3")'));
  check('sin excepciones JavaScript',errors.length===0);
  writeFileSync(OUT+(process.env.NORMAL_MOTION?'verification-normal-motion.json':'verification.json'),JSON.stringify({checks,errors,origin,scope:'Solo lectura y muestras locales; no envíos de formularios, pagos, llamadas reales ni cambios en NitroBot.'},null,2));
}finally{ws?.close();chrome.kill();}
