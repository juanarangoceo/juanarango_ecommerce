// Uso: node cdp.mjs <url> <width> <height> <out-prefix> [reducedMotion] [js-to-eval...]
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";

const [url, w, h, out, reduced = "0", ...evals] = process.argv.slice(2);
const CHROME = `${process.env.HOME}/.cache/ms-playwright/chromium-1187/chrome-linux/chrome`;
const port = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${port}`, "--no-sandbox", "--hide-scrollbars", "--disable-gpu", "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let ws;
for (let i = 0; i < 50; i++) {
  try {
    const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
    const page = list.find((t) => t.type === "page");
    if (page) { ws = new WebSocket(page.webSocketDebuggerUrl); break; }
  } catch {}
  await sleep(200);
}
await new Promise((r) => ws.addEventListener("open", r));
let id = 0;
const pending = new Map();
ws.addEventListener("message", (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async (expr) => (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +h, deviceScaleFactor: 1, mobile: +w < 800 });
if (reduced === "1") await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
await send("Page.navigate", { url });
await sleep(6000);

for (const e of evals) console.log(JSON.stringify(await evaluate(e)));

const shot = async (name, full) => {
  const params = { format: "png" };
  if (full) {
    const height = await evaluate("document.documentElement.scrollHeight");
    params.clip = { x: 0, y: 0, width: +w, height, scale: 1 };
    params.captureBeyondViewport = true;
  }
  const r = await send("Page.captureScreenshot", params);
  writeFileSync(name, Buffer.from(r.result.data, "base64"));
};
if (out !== "-") {
  await shot(`${out}-viewport.png`, false);
  const sels = (process.env.SHOTS || "").split("|").filter(Boolean);
  for (const [i, sel] of sels.entries()) {
    await evaluate(`(() => { const el = document.querySelector(${JSON.stringify(sel)}); if (el) el.scrollIntoView({ block: "start" }); window.scrollBy(0, -80); })()`);
    await sleep(1200);
    await shot(`${out}-${i + 1}.png`, false);
  }
}
ws.close();
proc.kill();
process.exit(0);
