import assert from 'node:assert/strict';
import { generateChart } from '../../lib/ziwei/algorithm';
import { tv, tvGanzhi, tvText } from '../../lib/i18n/vi';

assert.equal(tv('紫微'), 'Tử Vi');
assert.equal(tv('命宫'), 'Mệnh');
assert.equal(tv('兄弟'), 'Huynh Đệ');
assert.equal(tv('兄弟宫'), 'Huynh Đệ');
assert.equal(tv('không-có-trong-bảng'), 'không-có-trong-bảng');
assert.equal(tvGanzhi('壬午'), 'Nhâm Ngọ');
assert.equal(tvText('天机化禄'), 'Thiên Cơ Hóa Lộc');
assert.equal(tvText('紫微、天府同宫'), 'Tử Vi、Thiên Phủ 同宫');

// Mọi tên engine sinh ra phải có bản Việt, nếu không UI sẽ lẫn chữ Hán.
const missing = new Set<string>();
const need = (name: string | undefined) => { if (name && tv(name) === name) missing.add(name); };
for (let y = 1930; y <= 2020; y += 9) {
  for (let h = 0; h < 12; h++) {
    for (const gender of ['male', 'female'] as const) {
      const chart = generateChart({ year: y, month: 1 + ((y + h) % 12), day: 5 + (y % 20), hour: h, gender });
      need(chart.wuxingJuName);
      need(chart.mingZhu);
      need(chart.shenZhu);
      need(chart.yinYangGender);
      for (const p of chart.palaces) {
        need(p.name);
        for (const s of p.stars) { need(s.name); need(s.brightnessRaw); need(s.siHua); }
      }
    }
  }
}
assert.deepEqual([...missing], [], `thiếu bản Việt cho: ${[...missing].join(' ')}`);

console.log('vi-terms regression passed');
