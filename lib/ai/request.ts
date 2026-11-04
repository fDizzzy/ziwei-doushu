// Kiểm tra và dựng lại payload của /api/interpret. Mọi thứ từ client đều coi là không đáng tin:
// chart được dựng lại từ các trường đã kiểm (kiểu, miền giá trị, độ dài), trường lạ bị bỏ.
import type { BirthInfo, DaXian, LunarInfo, Palace, Star, ZiweiChart } from '../ziwei/types';

export class InvalidRequestError extends Error {}

export interface ChatMessage { role: 'user' | 'assistant'; content: string }

export const LIMITS = {
  bodyBytes: 400_000,
  messages: 40,
  messageChars: 20_000,
  totalChars: 80_000,
} as const;

const fail = (what: string): never => { throw new InvalidRequestError(what); };

function obj(v: unknown, what: string): Record<string, unknown> {
  if (typeof v !== 'object' || v === null || Array.isArray(v)) fail(what);
  return v as Record<string, unknown>;
}
function int(v: unknown, min: number, max: number, what: string): number {
  if (typeof v !== 'number' || !Number.isInteger(v) || v < min || v > max) fail(what);
  return v as number;
}
function str(v: unknown, max: number, what: string): string {
  if (typeof v !== 'string' || v.length === 0 || v.length > max) fail(what);
  return v as string;
}
const optStr = (v: unknown, max: number, what: string) => (v === undefined || v === null ? undefined : str(v, max, what));
const optInt = (v: unknown, min: number, max: number, what: string) => (v === undefined || v === null ? undefined : int(v, min, max, what));
const optBool = (v: unknown) => (typeof v === 'boolean' ? v : undefined);
function arr(v: unknown, max: number, what: string): unknown[] {
  if (!Array.isArray(v) || v.length > max) fail(what);
  return v as unknown[];
}
function oneOf<T extends string>(v: unknown, allowed: readonly T[], what: string): T {
  if (typeof v !== 'string' || !(allowed as readonly string[]).includes(v)) fail(what);
  return v as T;
}

const SIHUA = ['禄', '权', '科', '忌'] as const;

function star(v: unknown): Star {
  const s = obj(v, 'star');
  return {
    name: str(s.name, 8, 'star.name'),
    type: oneOf(s.type, ['major', 'minor', 'lucky', 'sha'] as const, 'star.type'),
    siHua: s.siHua == null || s.siHua === '' ? undefined : oneOf(s.siHua, SIHUA, 'star.siHua'),
    brightness: s.brightness == null ? undefined : oneOf(s.brightness, ['bright', 'normal', 'dim'] as const, 'star.brightness'),
    brightnessRaw: s.brightnessRaw == null ? undefined : oneOf(s.brightnessRaw, ['庙', '旺', '得', '利', '平', '不', '闲', '陷', '地'] as const, 'star.brightnessRaw'),
  };
}

function palace(v: unknown): Palace {
  const p = obj(v, 'palace');
  const age = p.daXianAge == null ? undefined : arr(p.daXianAge, 2, 'palace.daXianAge');
  return {
    branch: int(p.branch, 0, 11, 'palace.branch'),
    stem: int(p.stem, 0, 9, 'palace.stem'),
    name: str(p.name, 8, 'palace.name'),
    stars: arr(p.stars, 60, 'palace.stars').map(star),
    daXianAge: age && age.length === 2 ? [int(age[0], 0, 150, 'age'), int(age[1], 0, 150, 'age')] : undefined,
    isCurrentDaXian: optBool(p.isCurrentDaXian),
    isMingGong: optBool(p.isMingGong),
    isShenGong: optBool(p.isShenGong),
    selfSihua: p.selfSihua == null ? undefined : arr(p.selfSihua, 8, 'palace.selfSihua').map(m => {
      const o = obj(m, 'selfSihua');
      return { siHua: oneOf(o.siHua, SIHUA, 'selfSihua.siHua'), starName: str(o.starName, 8, 'selfSihua.starName') };
    }),
    oppositeBranch: optInt(p.oppositeBranch, 0, 11, 'palace.oppositeBranch'),
    isEmpty: optBool(p.isEmpty),
    borrowedFromBranch: optInt(p.borrowedFromBranch, 0, 11, 'palace.borrowedFromBranch'),
    borrowedFromName: optStr(p.borrowedFromName, 8, 'palace.borrowedFromName'),
    borrowedStars: p.borrowedStars == null ? undefined : arr(p.borrowedStars, 20, 'palace.borrowedStars').map(s => str(s, 8, 'borrowedStars')),
  };
}

function daXian(v: unknown): DaXian {
  const d = obj(v, 'daXian');
  const sh = d.siHua == null ? undefined : obj(d.siHua, 'daXian.siHua');
  return {
    startAge: int(d.startAge, 0, 150, 'daXian.startAge'),
    endAge: int(d.endAge, 0, 150, 'daXian.endAge'),
    palaceBranch: int(d.palaceBranch, 0, 11, 'daXian.palaceBranch'),
    palaceName: str(d.palaceName, 8, 'daXian.palaceName'),
    stemIndex: optInt(d.stemIndex, 0, 9, 'daXian.stemIndex'),
    stemName: optStr(d.stemName, 2, 'daXian.stemName'),
    siHua: sh && {
      stemIndex: int(sh.stemIndex, 0, 9, 'siHua.stemIndex'),
      stemName: str(sh.stemName, 2, 'siHua.stemName'),
      lu: str(sh.lu, 8, 'siHua.lu'), quan: str(sh.quan, 8, 'siHua.quan'),
      ke: str(sh.ke, 8, 'siHua.ke'), ji: str(sh.ji, 8, 'siHua.ji'),
    },
  };
}

export function parseChart(v: unknown): ZiweiChart {
  const c = obj(v, 'chart');
  const b = obj(c.birthInfo, 'birthInfo');
  const l = obj(c.lunarInfo, 'lunarInfo');
  // Không giữ name/province/city/longitude: không cần cho luận giải và là dữ liệu cá nhân.
  const birthInfo: BirthInfo = {
    year: int(b.year, 1800, 2200, 'birth.year'),
    month: int(b.month, 1, 12, 'birth.month'),
    day: int(b.day, 1, 31, 'birth.day'),
    hour: int(b.hour, 0, 11, 'birth.hour'),
    gender: oneOf(b.gender, ['male', 'female'] as const, 'birth.gender'),
  };
  const pillars = l.fourPillars == null ? undefined : arr(l.fourPillars, 4, 'fourPillars').map(s => str(s, 4, 'pillar'));
  const lunarInfo: LunarInfo = {
    lunarYear: int(l.lunarYear, 1800, 2200, 'lunarYear'),
    lunarMonth: int(l.lunarMonth, -12, 12, 'lunarMonth'),
    lunarDay: int(l.lunarDay, 1, 30, 'lunarDay'),
    yearStem: int(l.yearStem, 0, 9, 'yearStem'),
    yearBranch: int(l.yearBranch, 0, 11, 'yearBranch'),
    isLeapMonth: l.isLeapMonth === true,
    fourPillars: pillars && pillars.length === 4 ? (pillars as [string, string, string, string]) : undefined,
  };
  const palaces = arr(c.palaces, 12, 'palaces').map(palace);
  if (palaces.length !== 12) fail('palaces.length');
  const daXians = arr(c.daXians, 14, 'daXians').map(daXian);
  return {
    birthInfo,
    lunarInfo,
    mingGongBranch: int(c.mingGongBranch, 0, 11, 'mingGongBranch'),
    shenGongBranch: int(c.shenGongBranch, 0, 11, 'shenGongBranch'),
    wuxingJu: int(c.wuxingJu, 2, 6, 'wuxingJu'),
    wuxingJuName: str(c.wuxingJuName, 8, 'wuxingJuName'),
    ziweiPos: int(c.ziweiPos, 0, 11, 'ziweiPos'),
    palaces,
    daXians,
    currentAge: int(c.currentAge, 0, 150, 'currentAge'),
    currentDaXianIndex: int(c.currentDaXianIndex, -2, 13, 'currentDaXianIndex'),
    mingZhu: optStr(c.mingZhu, 8, 'mingZhu'),
    shenZhu: optStr(c.shenZhu, 8, 'shenZhu'),
    yinYangGender: optStr(c.yinYangGender, 8, 'yinYangGender'),
  };
}

export function parseMessages(v: unknown): ChatMessage[] {
  const raw = arr(v, LIMITS.messages, 'messages');
  let total = 0;
  const out: ChatMessage[] = raw.map(m => {
    const o = obj(m, 'message');
    const content = str(o.content, LIMITS.messageChars, 'message.content');
    total += content.length;
    return { role: oneOf(o.role, ['user', 'assistant'] as const, 'message.role'), content };
  });
  if (total > LIMITS.totalChars) fail('messages.total');
  // API yêu cầu bắt đầu bằng lượt của người dùng và kết thúc bằng lượt của người dùng.
  while (out.length && out[0].role !== 'user') out.shift();
  if (out.length === 0 || out[out.length - 1].role !== 'user') fail('messages.order');
  return out;
}

export function parseInterpretRequest(body: unknown): { chart: ZiweiChart; messages: ChatMessage[] } {
  const o = obj(body, 'body');
  return { chart: parseChart(o.chart), messages: parseMessages(o.messages) };
}
