import { test } from "node:test";
import assert from "node:assert/strict";
import { estimateRecharge } from "./recharge-estimate";
const packs = [{ units: 100, priceCop: 16000 }, { units: 500, priceCop: 69000 }, { units: 1000, priceCop: 129000 }];
test("el cálculo ofrece una compra real y conserva el excedente", () => {
  assert.deepEqual(estimateRecharge(100, 3, packs), { units: 300, pack: packs[1], packCount: 1, totalCop: 69000 });
  assert.equal(estimateRecharge(500, 3, packs).totalCop, 258000);
  assert.equal(estimateRecharge(100, 1, packs).totalCop, 16000);
});
test("rechaza referencias de consumo inválidas", () => {
  for (const value of [NaN, Infinity, 0, -5]) assert.throws(() => estimateRecharge(value, 3, packs));
});
