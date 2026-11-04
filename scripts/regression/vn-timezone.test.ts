import assert from 'node:assert/strict';
import { formToBirthInfo, formToSearchParams, searchParamsToForm, calcTrueSolarBranch } from '../../lib/ziwei/share';
import { VN_PROVINCES, ALL_PROVINCES } from '../../lib/ziwei/cities-vn';
import type { BirthFormState } from '../../components/BirthForm';

function form(over: Partial<BirthFormState>): BirthFormState {
  return {
    name: '', year: '2000', month: '1', day: '31', clockHour: '23', clockMinute: '30',
    unknownTime: false, province: '', city: '', longitude: 120, gender: 'male', ...over,
  };
}
const pick = (b: ReturnType<typeof formToBirthInfo>) => ({ year: b.year, month: b.month, day: b.day, hour: b.hour });

// Dữ liệu: 63 tỉnh/thành, tên duy nhất, kinh độ nằm trong lãnh thổ VN, múi giờ UTC+7.
assert.equal(VN_PROVINCES.length, 63);
assert.equal(new Set(ALL_PROVINCES.map(p => p.name)).size, ALL_PROVINCES.length, 'tên tỉnh không được trùng');
for (const p of VN_PROVINCES) {
  assert.equal(p.utcOffsetMinutes, 420, p.name);
  assert.ok(p.cities.length >= 1, p.name);
  for (const c of p.cities) assert.ok(c.longitude > 102 && c.longitude < 110, `${p.name}/${c.name} kinh độ ${c.longitude}`);
}

// Hà Nội 23:30 giờ VN: kinh độ 105.85 > 105 nên giờ mặt trời thật ≈ 23:33 → giờ Tý muộn, lập theo ngày kế tiếp.
// Nếu vẫn lấy kinh tuyến 120° của Bắc Kinh thì ra 22:34 (giờ Hợi, cùng ngày) — đây là lỗi cần chặn.
const hanoi = form({ province: 'Hà Nội', city: 'Hà Nội', longitude: 105.85, utcOffsetMinutes: 420 });
assert.deepEqual(pick(formToBirthInfo(hanoi)), { year: 2000, month: 2, day: 1, hour: 0 });
assert.equal(formToBirthInfo(hanoi).utcOffsetMinutes, 420);
assert.deepEqual(pick(formToBirthInfo({ ...hanoi, utcOffsetMinutes: undefined })), { year: 2000, month: 1, day: 31, hour: 11 });

// Đà Nẵng 22:50 → +12,9 phút = 23:03 → chuyển ngày.
assert.deepEqual(
  pick(formToBirthInfo(form({ province: 'Đà Nẵng', city: 'Đà Nẵng', longitude: 108.22, utcOffsetMinutes: 420, clockHour: '22', clockMinute: '50' }))),
  { year: 2000, month: 2, day: 1, hour: 0 },
);

// Giờ trên form (calcTrueSolarBranch) và giờ trong BirthInfo phải cùng một kết quả.
for (const p of VN_PROVINCES) {
  for (const c of p.cities) {
    for (const h of [0, 5, 11, 17, 22, 23]) {
      const f = form({ province: p.name, city: c.name, longitude: c.longitude, utcOffsetMinutes: 420, clockHour: String(h), clockMinute: '45' });
      assert.equal(formToBirthInfo(f).hour, calcTrueSolarBranch(h, 45, c.longitude, 420), `${p.name}/${c.name} ${h}:45`);
    }
  }
}

// Chưa chọn nơi sinh thì không kèm múi giờ.
assert.equal(formToBirthInfo(form({ utcOffsetMinutes: 420 })).utcOffsetMinutes, undefined);

// Link chia sẻ giữ được múi giờ; giá trị bậy bị bỏ; Bắc Kinh (480) không ghi thừa vào URL.
const params = formToSearchParams(hanoi);
assert.equal(params.get('tz'), '420');
assert.equal(searchParamsToForm(params)?.utcOffsetMinutes, 420);
assert.equal(formToSearchParams({ ...hanoi, utcOffsetMinutes: 480 }).has('tz'), false);
assert.equal(searchParamsToForm(new URLSearchParams('y=2000&m=1&d=1&tz=abc'))?.utcOffsetMinutes, undefined);
assert.equal(searchParamsToForm(new URLSearchParams('y=2000&m=1&d=1&tz=99999'))?.utcOffsetMinutes, undefined);
assert.equal(searchParamsToForm(new URLSearchParams('y=2000&m=1&d=1'))?.utcOffsetMinutes, undefined);

console.log('vn-timezone regression passed');
