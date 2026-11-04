/**
 * /library/[book]/[chapter] — 单章节阅读页
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_BOOKS, getChapter } from '@/lib/classics';
import { bookDynastyVi, bookTitleVi } from '@/lib/i18n/pages-extra';
import { chapterVi, paragraphVi } from '@/lib/i18n/classics-vi';

export async function generateStaticParams() {
  return ALL_BOOKS.flatMap(b =>
    b.chapters.map((_, i) => ({ book: b.slug, chapter: String(i) }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ book: string; chapter: string }> }) {
  const { book: bookSlug, chapter: chIdx } = await params;
  const result = getChapter(bookSlug, parseInt(chIdx));
  if (!result) return {};
  const ch = chapterVi(result.book.slug, result.chapterIdx, result.chapter);
  return {
    title: `${ch.title} · ${bookTitleVi(result.book.title)} · Cổ thư Tử Vi Đẩu Số`,
    description: ch.subtitle || `${bookTitleVi(result.book.title)} · nguyên văn ${ch.title}`,
  };
}

export default async function ChapterPage({ params }: { params: Promise<{ book: string; chapter: string }> }) {
  const { book: bookSlug, chapter: chIdx } = await params;
  const result = getChapter(bookSlug, parseInt(chIdx));
  if (!result) notFound();

  const { book, chapter, chapterIdx } = result;
  const prevIdx = chapterIdx - 1;
  const nextIdx = chapterIdx + 1;
  const chVi = chapterVi(book.slug, chapterIdx, chapter);
  const chTitleAt = (i: number) => chapterVi(book.slug, i, book.chapters[i]).title;

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="px-6 py-4 flex items-center justify-between gap-3"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href={`/library/${book.slug}`} style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.3em', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0, maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          ← {bookTitleVi(book.title)} · Mục lục
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.15em', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {chVi.title}
        </div>
        <Link href="/library" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Thư viện cổ thư →
        </Link>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* 标题 */}
        <div className="text-center mb-10">
          <div style={{ fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.25em', marginBottom: '8px' }}>
            {bookTitleVi(book.title)} · {bookDynastyVi(book)}
          </div>
          <h1 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.15em', marginBottom: '8px' }}>
            {chVi.title}
          </h1>
          {chVi.subtitle && (
            <div style={{ fontSize: '13px', color: 'var(--tx-2)', letterSpacing: '0.1em' }}>
              {chVi.subtitle}
            </div>
          )}
        </div>

        {/* 段落 */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid rgba(184,146,42,0.2)', padding: '32px 28px' }}>
          {chapter.paragraphs.map((p, i) => (
            <div
              key={p.id}
              id={p.id}
              style={{
                marginBottom: i === chapter.paragraphs.length - 1 ? 0 : '20px',
                paddingBottom: i === chapter.paragraphs.length - 1 ? 0 : '20px',
                borderBottom: i === chapter.paragraphs.length - 1 ? 'none' : '1px dashed rgba(184,146,42,0.15)',
                scrollMarginTop: '80px',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '12px',
              }}>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--ac)',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  minWidth: '24px',
                }}>
                  {String(p.idx).padStart(2, '0')}
                </span>
                <p style={{
                  flex: 1,
                  fontSize: '16px',
                  color: 'var(--tx-0)',
                  lineHeight: 2,
                  letterSpacing: '0.04em',
                  fontFamily: '"PingFang SC", "Hiragino Sans GB", serif',
                }}>
                  {p.text}
                </p>
              </div>
              {(p.translation ?? paragraphVi(p.id)) && (
                <div style={{
                  marginTop: '8px',
                  marginLeft: '36px',
                  padding: '8px 12px',
                  background: 'rgba(184,146,42,0.05)',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: 'var(--tx-2)',
                  lineHeight: 1.8,
                }}>
                  <span style={{ fontSize: '10px', color: 'var(--ac)', marginRight: '6px' }}>Dịch nghĩa</span>
                  {p.translation ?? paragraphVi(p.id)}
                </div>
              )}
              {p.niNote && (
                <div style={{
                  marginTop: '8px',
                  marginLeft: '36px',
                  padding: '8px 12px',
                  background: 'rgba(196,90,45,0.05)',
                  borderRadius: '6px',
                  fontSize: '13px',
                  color: 'var(--tx-2)',
                  lineHeight: 1.8,
                }}>
                  <span style={{ fontSize: '10px', color: 'var(--ji)', marginRight: '6px' }}>Chú của Nghê sư</span>
                  {p.niNote}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* 章节导航 */}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
          {prevIdx >= 0 ? (
            <Link
              href={`/library/${book.slug}/${prevIdx}`}
              style={{
                flex: 1,
                padding: '14px 18px',
                background: 'var(--bg-card)',
                border: '1px solid rgba(184,146,42,0.2)',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'var(--tx-0)',
              }}
            >
              <div style={{ fontSize: '10px', color: 'var(--tx-3)', letterSpacing: '0.2em', marginBottom: '2px' }}>← Chương trước</div>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{chTitleAt(prevIdx)}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}
          {nextIdx < book.chapters.length ? (
            <Link
              href={`/library/${book.slug}/${nextIdx}`}
              style={{
                flex: 1,
                padding: '14px 18px',
                background: 'var(--bg-card)',
                border: '1px solid rgba(184,146,42,0.2)',
                borderRadius: '10px',
                textDecoration: 'none',
                color: 'var(--tx-0)',
                textAlign: 'right',
              }}
            >
              <div style={{ fontSize: '10px', color: 'var(--tx-3)', letterSpacing: '0.2em', marginBottom: '2px' }}>Chương sau →</div>
              <div style={{ fontSize: '13px', fontWeight: 500 }}>{chTitleAt(nextIdx)}</div>
            </Link>
          ) : <div style={{ flex: 1 }} />}
        </div>
      </article>
    </div>
  );
}
