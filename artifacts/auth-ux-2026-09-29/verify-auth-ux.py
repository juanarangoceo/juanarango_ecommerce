import json
import os
import subprocess
import time
from pathlib import Path

BIN = os.environ.get('AGENT_BROWSER_BIN', 'agent-browser')
SESSION = 'nitro-auth-production-qa'
OUT = Path(__file__).resolve().parent
OUT.mkdir(parents=True, exist_ok=True)
checks = []

def run(*args):
    result = subprocess.run([BIN, '--session', SESSION, *args], capture_output=True, text=True, timeout=25)
    if result.returncode:
        raise RuntimeError(result.stderr + result.stdout)
    return result.stdout.strip()

def js(code):
    raw = run('eval', code)
    value = json.loads(raw)
    if isinstance(value, str):
        try: return json.loads(value)
        except ValueError: return value
    return value

def wait_for(code):
    for _ in range(30):
        if js(code): return
        time.sleep(.2)
    raise AssertionError('No se cumplió: ' + code)

def check(name, code):
    result = js(code)
    if not result:
        print(js('JSON.stringify({emailMatch:document.getElementById("email")?.value==="revision@example.com",passwordMatch:document.getElementById("password")?.value==="SoloPruebaLocal2026",terms:document.querySelector("input[name=terms]")?.checked,fields:[...document.querySelectorAll("input:not([type=hidden])")].map(e=>({name:e.name,valueProp:Object.values(e).find(v=>v?.onChange)?.value,checkedProp:Object.values(e).find(v=>v?.onChange)?.checked}))})'), flush=True)
    assert result, (name, result)
    checks.append(name)
    print('PASS ' + name, flush=True)

def open_page(path):
    run('open', 'http://localhost:4322' + path)
    wait_for('Object.keys(document.getElementById("email") || {}).some(k => k.startsWith("__reactProps"))')

def mock(state):
    js('''(() => {
      const realFetch = window.fetch.bind(window);
      window.__authMock = {calls:0, state:STATE, delay:700};
      window.fetch = async (input, init) => {
        if (init?.method === 'POST') {
          if (!new Headers(init.headers).has('Next-Action')) return new Response(null, {status:204});
          window.__authMock.calls++;
          await new Promise(resolve => setTimeout(resolve, window.__authMock.delay));
          return new Response('0:' + JSON.stringify({a:window.__authMock.state,f:''}) + '\\n', {status:200, headers:{'Content-Type':'text/x-component'}});
        }
        return realFetch(input, init);
      };
      return true;
    })()'''.replace('STATE', json.dumps(state)))

def submit():
    js('if (!window.__authMock) throw Error("Sin mock, no enviar"); document.querySelector("form[aria-busy]").requestSubmit(); true')

def layout(name, width, height):
    run('set', 'viewport', str(width), str(height))
    check(name + ': sin desbordamiento', 'document.documentElement.scrollWidth <= innerWidth')
    check(name + ': sin overlay', '!document.querySelector("[data-nextjs-dialog]")')
    run('screenshot', '--full', str(OUT / (name + '.png')))

try:
    run('--args', '--no-sandbox,--disable-dev-shm-usage,--disable-extensions', 'open', 'http://localhost:4322/registro')
    wait_for('Object.keys(document.getElementById("email") || {}).some(k => k.startsWith("__reactProps"))')
    layout('registro-desktop', 1440, 960)
    layout('registro-mobile', 360, 800)
    check('Registro: privacidad enlazada', 'document.querySelector("form[aria-busy] a").href === "https://www.juanarangoecommerce.com/nitro-complete/privacidad"')
    mock({'ok':False, 'error':'No pudimos crear tu cuenta. Revisa los datos e intenta de nuevo.'})
    js('[...document.querySelectorAll("button")].find(b=>b.textContent.includes("Continuar con Google")).click(); true')
    check('Google: estado de envío y bloqueo de doble clic', '[...document.querySelectorAll("button")].some(b=>b.textContent.includes("Abriendo Google") && b.disabled)')
    wait_for('[...document.querySelectorAll("button")].some(b=>b.textContent.includes("Continuar con Google") && !b.disabled)')
    js('window.__authMock.calls=0; true')
    run('find', 'label', 'Correo electrónico', 'fill', 'revision@example.com')
    run('find', 'label', 'Crea una contraseña', 'fill', 'corta')
    check('Registro: contraseña corta rechazada', '!document.getElementById("password").checkValidity()')
    run('find', 'label', 'Crea una contraseña', 'fill', 'SoloPruebaLocal2026')
    js('document.querySelector("button[aria-controls=password]").click(); true')
    wait_for('document.getElementById("password").type === "text"')
    check('Registro: mostrar conserva contraseña', 'document.getElementById("password").value === "SoloPruebaLocal2026" && document.querySelector("button[aria-controls=password]").getAttribute("aria-pressed") === "true"')
    js('document.querySelector("button[aria-controls=password]").click(); true')
    wait_for('document.getElementById("password").type === "password"')
    check('Registro: privacidad obligatoria', '!document.querySelector("form[aria-busy]").checkValidity() && window.__authMock.calls === 0')
    js('document.querySelector("input[name=terms]").click(); true')
    submit()
    check('Registro: envío bloquea doble clic', 'document.querySelector("form[aria-busy]").getAttribute("aria-busy") === "true" && document.querySelector("form[aria-busy] button[type=submit]").disabled && document.getElementById("email").readOnly && document.getElementById("password").readOnly')
    wait_for('!!document.querySelector("[role=alert]")')
    check('Registro: error conserva datos y privacidad', 'document.getElementById("email").value === "revision@example.com" && document.getElementById("password").value === "SoloPruebaLocal2026" && document.querySelector("input[name=terms]").checked')
    check('Registro: error recibe foco y permite reintentar', 'document.activeElement === document.querySelector("[role=alert]") && !document.querySelector("form[aria-busy] button[type=submit]").disabled')
    js('window.__authMock.state = {ok:true,error:null,message:"Te enviamos un correo a revision@example.com. Abre el enlace para confirmar tu cuenta y continuar."}; true')
    submit()
    wait_for('!!document.querySelector("[role=status] h2")')
    check('Registro: confirmación explica el siguiente paso', 'document.querySelector("[role=status]").textContent.includes("Revisa tu correo") && document.querySelector("[role=status]").textContent.includes("spam") && document.querySelector("[role=status] a").getAttribute("href") === "/login" && document.activeElement === document.querySelector("[role=status]") && window.__authMock.calls === 2')
    layout('registro-confirmacion-mobile', 390, 844)
    open_page('/login')
    layout('login-mobile', 360, 800)
    layout('login-desktop', 1440, 960)
    check('Login: enlaces de registro y recuperación', '!!document.querySelector("a[href=\\"/registro\\"]") && !!document.querySelector("a[href=\\"/recuperar\\"]")')
    mock({'error':'Credenciales inválidas.'})
    run('find', 'label', 'Correo electrónico', 'fill', 'revision@example.com')
    run('find', 'label', 'Contraseña', 'fill', 'SoloPruebaLocal2026')
    js('document.querySelector("button[aria-controls=password]").click(); true')
    wait_for('document.getElementById("password").type === "text"')
    js('document.querySelector("button[aria-controls=password]").click(); true')
    wait_for('document.getElementById("password").type === "password"')
    checks.append('Login: mostrar y ocultar contraseña')
    submit()
    check('Login: estado de envío', 'document.querySelector("form[aria-busy]").getAttribute("aria-busy") === "true" && document.querySelector("form[aria-busy] button[type=submit]").disabled')
    wait_for('!!document.querySelector("[role=alert]")')
    check('Login: error conserva datos y enfoca aviso', 'document.getElementById("email").value === "revision@example.com" && document.getElementById("password").value === "SoloPruebaLocal2026" && document.activeElement === document.querySelector("[role=alert]") && window.__authMock.calls === 1')
    errors = run('errors')
    assert not errors, errors
    checks.append('Navegador: sin errores de JavaScript')
    (OUT / 'verification.json').write_text(json.dumps({'date':'2026-09-29','mode':'build de producción local; POSTs simulados en navegador','checks':checks},ensure_ascii=False,indent=2)+'\n')
    print(str(len(checks)) + ' comprobaciones aprobadas',flush=True)
finally:
    run('close')
