/**
 * Cổ thư: mọi chương và đoạn phải có bản Việt, và tìm kiếm bằng tiếng Việt phải ra kết quả.
 */
import assert from 'node:assert/strict';
import { ALL_BOOKS } from '../../lib/classics';
import { CHAPTER_VI, PARAGRAPH_VI, chapterVi, paragraphVi, searchClassicsVi } from '../../lib/i18n/classics-vi';

const HAN = /\p{Script=Han}/u;

let paragraphs = 0;
for (const book of ALL_BOOKS) {
  book.chapters.forEach((chapter, i) => {
    const key = `${book.slug}:${i}`;
    assert.ok(CHAPTER_VI[key], `thiếu tên chương ${key}`);
    const ch = chapterVi(book.slug, i, chapter);
    // Tên chương: phần chữ Hán chỉ được nằm trong ngoặc đơn cuối tên.
    assert.ok(!HAN.test(ch.title.replace(/\s*\([^)]*\)\s*$/, '')), `${key}: tên chương còn chữ Hán ngoài ngoặc: ${ch.title}`);
    assert.ok(!chapter.subtitle || (ch.subtitle && !HAN.test(ch.subtitle)), `${key}: phụ đề chưa dịch`);
    for (const p of chapter.paragraphs) {
      const vi = paragraphVi(p.id);
      assert.ok(vi, `thiếu bản dịch đoạn ${p.id}`);
      assert.ok(!HAN.test(vi), `${p.id}: bản dịch còn chữ Hán`);
      paragraphs++;
    }
  });
}

const known = new Set(ALL_BOOKS.flatMap(b => b.chapters.flatMap(c => c.paragraphs.map(p => p.id))));
for (const id of Object.keys(PARAGRAPH_VI)) assert.ok(known.has(id), `bản dịch cho id không tồn tại: ${id}`);
for (const k of Object.keys(CHAPTER_VI)) {
  const [slug, idx] = k.split(':');
  assert.ok(ALL_BOOKS.find(b => b.slug === slug)?.chapters[Number(idx)], `tên chương cho chương không tồn tại: ${k}`);
}

// Tìm kiếm tiếng Việt: có dấu, không dấu, hoa thường đều khớp.
const withAccent = searchClassicsVi(ALL_BOOKS, 'Thất Sát', 100);
const noAccent = searchClassicsVi(ALL_BOOKS, 'that sat', 100);
assert.ok(withAccent.length > 0, 'tìm "Thất Sát" không ra kết quả');
assert.equal(noAccent.length, withAccent.length, 'tìm không dấu phải ra cùng số kết quả');
assert.ok(searchClassicsVi(ALL_BOOKS, 'SONG LỘC TRIỀU VIÊN').length > 0, 'tìm "song lộc triều viên" không ra');
assert.deepEqual(searchClassicsVi(ALL_BOOKS, '七杀'), [], 'truy vấn chữ Hán do searchClassics xử lý, không phải bản Việt');
assert.deepEqual(searchClassicsVi(ALL_BOOKS, '   '), []);
assert.equal(searchClassicsVi(ALL_BOOKS, 'Tử Vi', 3).length, 3, 'limit không được áp dụng');

// Snippet phải thoát HTML (chỉ <mark> được là thẻ thật).
const hit = searchClassicsVi(ALL_BOOKS, 'Tử Vi', 1)[0];
assert.match(hit.snippet, /<mark>[^<]+<\/mark>/);
assert.ok(!/<(?!\/?mark>)/.test(hit.snippet), 'snippet chứa thẻ HTML lạ');
assert.ok(!HAN.test(hit.chapterTitle.replace(/\s*\([^)]*\)\s*$/, '')), 'tiêu đề chương trong kết quả chưa dịch');

console.log(`classics-vi regression passed (${paragraphs} đoạn, ${Object.keys(CHAPTER_VI).length} chương)`);
