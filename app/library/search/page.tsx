/**
 * /library/search?q=xxx — 搜索结果页
 */

import Link from 'next/link';
import { ALL_BOOKS, searchClassics, getParagraphById } from '@/lib/classics';
import { bookTitleVi } from '@/lib/i18n/pages-extra';
import { chapterVi, searchClassicsVi } from '@/lib/i18n/classics-vi';

export const metadata = {
  title: 'Tìm kiếm · Thư viện nguyên điển cổ thư',
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const q = sp.q?.trim() || '';
  const hanHits = (q ? searchClassics(q, 50) : []).map(h => {
    const ctx = getParagraphById(h.paragraphId);
    return ctx ? { ...h, chapterTitle: chapterVi(h.bookSlug, ctx.chapterIdx, ctx.chapter).title } : h;
  });
  const seen = new Set(hanHits.map(h => h.paragraphId));
  const hits = [...hanHits, ...searchClassicsVi(ALL_BOOKS, q, 50).filter(h => !seen.has(h.paragraphId))].slice(0, 50);

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="px-6 py-4 flex items-center justify-between gap-3"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/library" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.3em', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          ← Thư viện cổ thư
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.2em', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Kết quả tìm kiếm
        </div>
        <Link href="/" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Trang chủ →
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <div style={{ fontSize: '13px', color: 'var(--tx-3)', letterSpacing: '0.15em', marginBottom: '4px' }}>
            Từ khóa tìm kiếm
          </div>
          <h1 style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.1em' }}>
            「{q || '(trống)'}」
          </h1>
          <div style={{ fontSize: '12px', color: 'var(--tx-3)', marginTop: '8px' }}>
            Tìm thấy <strong style={{ color: 'var(--ac)' }}>{hits.length}</strong> đoạn nguyên văn cổ thư khớp
          </div>
        </div>

        {hits.length === 0 ? (
          <div style={{
            background: 'var(--bg-card)',
            padding: '40px 20px',
            borderRadius: '12px',
            textAlign: 'center',
            color: 'var(--tx-2)',
            border: '1px solid rgba(184,146,42,0.15)',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.4 }}>📜</div>
            {q ? (
              <>
                <div style={{ fontSize: '14px', marginBottom: '6px' }}>Chưa tìm thấy từ khóa này trong các cổ thư đã thu thập</div>
                <div style={{ fontSize: '11px', color: 'var(--tx-3)', lineHeight: 1.7 }}>
                  Chúng tôi đang bổ sung nội dung liên tục. Bạn có thể tìm bằng chữ Hán (khớp nguyên văn) hoặc bằng tiếng Việt (khớp bản dịch nghĩa, gõ không dấu cũng được), ví dụ:<br />
                  <span style={{ color: 'var(--ac)' }}>Thất Sát triều đẩu (七杀朝斗) / song lộc triều viên (双禄朝垣) / Hóa Kỵ (化忌) / Tử Vi (紫微) / cung Mệnh (命宫) / Cơ Nguyệt Đồng Lương (机月同梁)</span>
                </div>
              </>
            ) : (
              <div style={{ fontSize: '13px' }}>Vui lòng nhập từ khóa cần tìm</div>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {hits.map((hit, i) => {
              const ctx = getParagraphById(hit.paragraphId);
              const chapterIdx = ctx?.chapterIdx ?? 0;
              return (
                <Link
                  key={i}
                  href={`/library/${hit.bookSlug}/${chapterIdx}#${hit.paragraphId}`}
                  style={{
                    display: 'block',
                    background: 'var(--bg-card)',
                    padding: '16px 20px',
                    borderRadius: '10px',
                    border: '1px solid rgba(184,146,42,0.18)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '11px',
                    color: 'var(--tx-3)',
                    marginBottom: '8px',
                    letterSpacing: '0.1em',
                  }}>
                    <span style={{ color: 'var(--ac)', fontWeight: 600 }}>{bookTitleVi(hit.bookTitle)}</span>
                    <span style={{ opacity: 0.5 }}>·</span>
                    <span>{hit.chapterTitle}</span>
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      color: 'var(--tx-0)',
                      lineHeight: 1.9,
                      letterSpacing: '0.02em',
                    }}
                    dangerouslySetInnerHTML={{ __html: hit.snippet }}
                  />
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        mark { background: rgba(184,146,42,0.3); color: #8b6a14; padding: 0 2px; border-radius: 2px; font-weight: 600; }
      `}</style>
    </div>
  );
}
