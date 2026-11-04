/**
 * Mô tả / điều kiện / nguồn của cách cục phải được dịch hết ở UI Việt hóa.
 * Chuỗi tĩnh trong patterns.ts tra bảng; chuỗi ghép động (tên sao, địa chi) đi qua quy tắc regex,
 * nên ngoài quét tĩnh còn quét lá số thật và gọi thẳng từng mẫu động.
 *
 * patterns.ts có `server-only` (chưa cài trong repo), nên giải nó thành module rỗng trước khi import.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as nodeModule from 'node:module';

type HookResult = { url?: string; format?: string; source?: string; shortCircuit?: boolean };
const { registerHooks } = nodeModule as unknown as {
  registerHooks(hooks: {
    resolve(specifier: string, context: unknown, next: (s: string, c: unknown) => HookResult): HookResult;
    load(url: string, context: unknown, next: (u: string, c: unknown) => HookResult): HookResult;
  }): void;
};
const SERVER_ONLY_STUB = 'data:text/javascript,';
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === 'server-only') return { url: SERVER_ONLY_STUB, shortCircuit: true };
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url === SERVER_ONLY_STUB) return { format: 'commonjs', source: '', shortCircuit: true };
    return nextLoad(url, context);
  },
});

const HAN = /\p{Script=Han}/u;

async function main() {
  const { generateChart } = await import('../../lib/ziwei/algorithm');
  const { detectPatterns } = await import('../../lib/ziwei/patterns');
  const { tvPatternText, tvPatternList } = await import('../../lib/i18n/patterns-vi');
  const { tvPatternName, tvKeyword, tvNature } = await import('../../lib/i18n/chart-extra');

  // 1. Quét tĩnh: mọi chuỗi Hán trong patterns.ts (bỏ chú thích, bỏ mẫu động) phải dịch được,
  //    trừ các mảnh nằm bên trong mẫu động (đã có quy tắc riêng, kiểm ở bước 3).
  const src = readFileSync(new URL('../../lib/ziwei/patterns.ts', import.meta.url), 'utf8')
    .split('\n').map(l => l.replace(/^\s*\/\/.*$/, '').replace(/\s\/\/ .*$/, '')).join('\n')
    .replace(/\/\*[\s\S]*?\*\//g, '');
  const literalRe = /'((?:[^'\\\n]|\\.)*)'|"((?:[^"\\\n]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g;
  const TEMPLATE_FRAGMENTS = new Set([
    '同宫', '会照', '三方会照', '命', '迁', '身', '武曲', '太阴', '贪狼',
    '本盘破格条件已触发，发力打折。', '未宫日月双美尤佳。', '丑宫日月同宫力量较平。',
    '武曲化禄属正财，宜实业、金融。', '太阴化禄属阴财、不动产。', '贪狼化禄属人脉财、桃花财。',
  ]);
  const untranslated: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = literalRe.exec(src))) {
    const s = m[1] ?? m[2] ?? m[3];
    if (!HAN.test(s) || s.includes('${') || TEMPLATE_FRAGMENTS.has(s)) continue;
    const translators = [tvPatternText, tvPatternName, tvKeyword, tvNature];
    if (translators.every(fn => HAN.test(fn(s)))) untranslated.push(s);
  }
  assert.deepEqual(untranslated, [], `chuỗi cách cục chưa có bản Việt:\n${untranslated.join('\n')}`);

  // 2. Gọi thẳng từng mẫu động.
  const dyn: string[] = [
    '贪狼同宫火星', '贪狼会照铃星',
    '贪狼遇火星同宫，主突发横财、突如其来的机遇。古书云“贪狼遇火铃，必发横财”，但来得快去得也快，宜见好就收。',
    '贪狼遇铃星三方会照，主突发横财、突如其来的机遇。古书云“贪狼遇火铃，必发横财”，但来得快去得也快，宜见好就收。本盘破格条件已触发，发力打折。',
    '太阳太阴同入未宫',
    '太阳太阴于未宫同宫，阴阳平衡，文武兼备。主异性缘佳、事业顺遂、名声远播。未宫日月双美尤佳。',
    '太阳太阴于丑宫同宫，阴阳平衡，文武兼备。主异性缘佳、事业顺遂、名声远播。丑宫日月同宫力量较平。',
    '巨门太阳同入寅宫',
    '巨门太阳同申宫，太阳化解巨门暗曜，主以口才、传媒、外语、专业立业。寅宫为佳，申宫力减。怕巨门化忌则官非。',
    '巨门入命于子宫',
    '武曲化禄坐命，主生财顺利、人缘佳、机缘多。武曲化禄属正财，宜实业、金融。',
    '太阴化禄坐命，主生财顺利、人缘佳、机缘多。太阴化禄属阴财、不动产。',
    '贪狼化禄坐命，主生财顺利、人缘佳、机缘多。贪狼化禄属人脉财、桃花财。',
    '天机化禄坐命，主生财顺利、人缘佳、机缘多。',
    '天机化禄坐命宫',
    '廉贞化忌坐命宫，需留意自身固执、心理障碍或健康隐患，凡事退一步思考。化忌不一定坏，代表此星能量需要特别关注。',
    '廉贞化忌坐迁移宫，外出、远行、人际关系易有波折，宜守不宜动。',
    '廉贞化忌坐命宫', '廉贞化忌坐迁宫',
    '天同化禄入财帛宫，主财源畅通、收入稳定。倪师讲化禄是「正财」象征——这个化禄星所代表的能力（天同的核心特质）是你赚钱的主轴。配禄存或天马则财源更广。',
    '天同化禄入财帛宫',
    '七杀化权入官禄宫，主事业有掌控力、能担当独当一面的职位。化权代表权力与执行力——七杀化权说明你在事业上能成为决策者或核心执行者，宜走管理或技术权威路线。',
    '七杀化权入官禄宫',
    '文曲化科入身宫，主名声、文书、学术运。倪师讲化科是「贵人星」——文曲化科带来的是被人看重的特质，宜从事文书、教育、研究、咨询、文创等“以名取利”的方向。',
    '文曲化科入命宫',
    '机月同梁需天机、太阴、天同、天梁四星齐会三方四正方为完整真格；本盘只会齐其中 3 颗（天机、太阴、天同），缺天梁未会，并非完整真格，力量减一档。文质带谋，宜公职、教研、医疗、服务等靠积累与稳定的行业，关键看缺位星与四化的配合。',
    '三方四正会天机、太阴、天同（机月同梁缺天梁）',
  ];
  for (const s of dyn) {
    const out = tvPatternText(s);
    assert.ok(!HAN.test(out), `mẫu động chưa dịch hết: ${s} -> ${out}`);
  }
  assert.equal(tvPatternText('贪狼同宫火星'), 'Tham Lang đồng cung Hỏa Tinh');
  assert.equal(tvPatternText('太阳太阴同入未宫'), 'Thái Dương, Thái Âm cùng nhập cung Mùi');
  assert.equal(tvPatternText('三方四正会天机、太阴、天同（机月同梁缺天梁）'), 'Tam phương tứ chính hội Thiên Cơ, Thái Âm, Thiên Đồng (Cơ Nguyệt Đồng Lương thiếu Thiên Lương)');
  assert.equal(tvPatternList(['文昌', '文曲']), 'Văn Xương, Văn Khúc');

  // 3. Quét lá số thật: mọi cách cục phát hiện được đều không còn chữ Hán sau khi dịch.
  const seen = new Set<string>();
  let patternsChecked = 0;
  for (let y = 1930; y <= 2020; y += 5) {
    for (let h = 0; h < 12; h++) {
      for (const gender of ['male', 'female'] as const) {
        const chart = generateChart({ year: y, month: 1 + ((y + h) % 12), day: 3 + ((y * 7 + h) % 26), hour: h, gender });
        for (const p of detectPatterns(chart)) {
          const c = p.conditions;
          const texts = [
            tvPatternName(p.name), tvPatternText(p.description), p.source ? tvPatternText(p.source) : '',
            c ? tvPatternList(c.required) : '', c?.bonus ? tvPatternList(c.bonus) : '', c?.breaking ? tvPatternList(c.breaking) : '',
          ];
          for (const t of texts) assert.ok(!HAN.test(t), `${y}/${h}/${gender} ${p.name}: còn chữ Hán trong "${t}"`);
          seen.add(p.name);
          patternsChecked++;
        }
      }
    }
  }
  // 4. Người nổi tiếng: mỗi id trong famous.ts (đọc từ mã nguồn vì file có server-only) phải có bản Việt không còn chữ Hán.
  const { FAMOUS_VI } = await import('../../lib/i18n/famous-vi');
  const famousSrc = readFileSync(new URL('../../lib/ziwei/famous.ts', import.meta.url), 'utf8');
  const ids = [...famousSrc.matchAll(/^\s*id:\s*'([^']+)'/gm)].map(x => x[1]);
  assert.ok(ids.length >= 11, 'không đọc được id trong famous.ts');
  for (const id of ids) {
    const v = FAMOUS_VI[id];
    assert.ok(v, `thiếu bản Việt cho người nổi tiếng ${id}`);
    for (const t of [v.name, v.description, v.notable]) assert.ok(!HAN.test(t), `${id}: còn chữ Hán trong "${t}"`);
  }

  // 5. Giới thiệu 14 chính tinh trên trang /knowledge.
  const { STAR_BRIEF_VI } = await import('../../lib/i18n/knowledge-vi');
  const seoSrc = readFileSync(new URL('../../lib/seo/knowledge.ts', import.meta.url), 'utf8');
  const briefBlock = seoSrc.slice(seoSrc.indexOf('STAR_BRIEF_SEO'));
  const briefKeys = [...briefBlock.matchAll(/^\s*'([^']+)':\s*'/gm)].map(x => x[1]);
  assert.equal(briefKeys.length, 14, 'không đọc đủ 14 chính tinh trong STAR_BRIEF_SEO');
  for (const k of briefKeys) {
    assert.ok(STAR_BRIEF_VI[k], `thiếu bản Việt giới thiệu sao ${k}`);
    assert.ok(!HAN.test(STAR_BRIEF_VI[k]), `${k}: còn chữ Hán`);
  }

  // 6. Component client không được import giá trị từ module `server-only` (import type thì được, vì bị xóa khi build).
  const { readdirSync, statSync } = await import('node:fs');
  const root = new URL('../../', import.meta.url);
  const walk = (dir: URL): URL[] => readdirSync(dir).flatMap(n => {
    if (n === 'node_modules' || n === '.next' || n.startsWith('.')) return [];
    const u = new URL(n + (statSync(new URL(n, dir)).isDirectory() ? '/' : ''), dir);
    return u.pathname.endsWith('/') ? walk(u) : /\.tsx?$/.test(n) ? [u] : [];
  });
  const sources = [...walk(new URL('lib/', root)), ...walk(new URL('components/', root)), ...walk(new URL('app/', root))];
  const serverOnly = sources.filter(u => /^\s*import\s+'server-only'/m.test(readFileSync(u, 'utf8')))
    .map(u => u.pathname.replace(/^.*\/(lib\/.*)\.tsx?$/, '@/$1'));
  assert.ok(serverOnly.length >= 2, 'không tìm thấy module server-only nào');
  for (const u of sources) {
    const code = readFileSync(u, 'utf8');
    if (!/^\s*['"]use client['"]/.test(code)) continue;
    for (const mod of serverOnly) {
      const re = new RegExp(`^\\s*import\\s+(?!type\\b)[^;]*from\\s+['"]${mod.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'm');
      assert.ok(!re.test(code), `${u.pathname} ('use client') import giá trị từ module server-only ${mod}`);
    }
  }

  assert.ok(patternsChecked > 100, `quét quá ít cách cục (${patternsChecked})`);
  console.log(`patterns-vi regression passed (${seen.size} cách cục khác nhau, ${patternsChecked} lượt)`);
}

main().catch(e => { console.error(e); process.exit(1); });
