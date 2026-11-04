/**
 * /library/[book] — 单部古籍目录页
 */

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ALL_BOOKS, getBookBySlug } from '@/lib/classics';
import { bookAuthorVi, bookDynastyVi, bookIntroVi, bookTitleVi } from '@/lib/i18n/pages-extra';
import { chapterVi } from '@/lib/i18n/classics-vi';

export async function generateStaticParams() {
  return ALL_BOOKS.map(b => ({ book: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ book: string }> }) {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) return {};
  return {
    title: `${bookTitleVi(book.title)} · ${bookDynastyVi(book)} · Thư viện nguyên điển cổ thư Tử Vi Đẩu Số`,
    description: bookIntroVi(book),
  };
}

export default async function BookPage({ params }: { params: Promise<{ book: string }> }) {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) notFound();

  return (
    <div style={{ background: 'var(--bg-page)', minHeight: '100vh' }}>
      <div className="px-6 py-4 flex items-center justify-between gap-3"
        style={{ borderBottom: '1px solid rgba(184,146,42,0.15)', background: 'var(--bg-page)' }}>
        <Link href="/library" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.3em', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          ← Thư viện cổ thư
        </Link>
        <div style={{ fontSize: '12px', color: 'var(--tx-3)', letterSpacing: '0.2em', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {bookTitleVi(book.title)}
        </div>
        <Link href="/" style={{ fontSize: '12px', color: 'var(--ac)', letterSpacing: '0.2em', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Trang chủ →
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* 书名信息 */}
        <div className="text-center mb-12">
          <div style={{ fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.3em', marginBottom: '8px' }}>
            {bookDynastyVi(book)} · {bookAuthorVi(book)}
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--tx-0)', letterSpacing: '0.15em', marginBottom: '14px' }}>
            {bookTitleVi(book.title)}
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--tx-2)', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto' }}>
            {bookIntroVi(book)}
          </p>
        </div>

        {/* 章节目录 */}
        <div style={{ background: 'var(--bg-card)', borderRadius: '14px', border: '1px solid rgba(184,146,42,0.2)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(184,146,42,0.15)', fontSize: '11px', color: 'var(--tx-3)', letterSpacing: '0.3em' }}>
            CHAPTERS · Mục lục chương
          </div>
          {book.chapters.map((chapter, i) => {
            const chVi = chapterVi(book.slug, i, chapter);
            return (
            <Link
              key={i}
              href={`/library/${book.slug}/${i}`}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '14px',
                padding: '14px 20px',
                borderBottom: i === book.chapters.length - 1 ? 'none' : '1px dashed rgba(184,146,42,0.15)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'background 0.15s',
              }}
              className="hover:bg-amber-50"
            >
              <div style={{ fontSize: '12px', color: 'var(--ac)', fontWeight: 600, minWidth: '40px', letterSpacing: '0.1em' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '15px', color: 'var(--tx-0)', fontWeight: 500, letterSpacing: '0.08em', marginBottom: '2px' }}>
                  {chVi.title}
                </div>
                {chVi.subtitle && (
                  <div style={{ fontSize: '11px', color: 'var(--tx-3)' }}>
                    {chVi.subtitle}
                  </div>
                )}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--tx-3)', letterSpacing: '0.1em' }}>
                {chapter.paragraphs.length} đoạn
              </div>
              <div style={{ fontSize: '12px', color: 'var(--ac)' }}>→</div>
            </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
