import { mkdir, writeFile } from 'node:fs/promises';

import {
  PHOTO_PHRASE_RULES,
  getPhotoQueryMatch,
} from '../src/backgroundPhotoQueries.js';
import {
  verseLibrary,
} from '../src/constants/verseLibrary.js';

const OUTPUT_PATH = new URL('../docs/default-verse-photo-audit.md', import.meta.url);
const BBE_SOURCE_URL =
  'https://raw.githubusercontent.com/thiagobodruk/bible/master/json/en_bbe.json';

function referenceFor(verse) {
  const end = Number(verse.verseEnd) === Number(verse.verseStart)
    ? ''
    : `-${verse.verseEnd}`;
  return `${verse.label} ${verse.chapter}:${verse.verseStart}${end}`;
}

async function loadBbeBible() {
  const response = await fetch(BBE_SOURCE_URL);
  if (!response.ok) throw new Error(`BBE source returned ${response.status}`);
  return response.json();
}

function passageFromBible(book, verse) {
  const chapter = book?.chapters?.[Number(verse.chapter) - 1];
  if (!chapter) throw new Error('Chapter not found');

  const start = Number(verse.verseStart) - 1;
  const end = Number(verse.verseEnd);
  const text = chapter.slice(start, end).join(' ').replace(/\s+/g, ' ').trim();
  if (!text) throw new Error('Passage not found');
  return text;
}

function statusFor(priority) {
  if (priority >= 100) return { order: 3, label: '🟢 Concrete noun / exact phrase' };
  if (priority === 70) return { order: 2, label: '🟡 Curated faith concept' };
  if (priority === 50) return { order: 1, label: '🟠 Abstract conversion' };
  return { order: 0, label: '🔴 Global fallback' };
}

function markdownText(text) {
  return text.replaceAll('|', '\\|');
}

const bbeBible = await loadBbeBible();
const booksByName = new Map(
  bbeBible.map((book) => [book.name.toLowerCase(), book])
);
booksByName.set('song of songs', booksByName.get('song of solomon'));

const rows = verseLibrary.map((verse, index) => {
  const reference = referenceFor(verse);
  let text;
  try {
    text = passageFromBible(booksByName.get(verse.label.toLowerCase()), verse);
  } catch (error) {
    text = `[Unable to load BBE text: ${error.message}]`;
  }

  const match = getPhotoQueryMatch(text);
  return {
    index: index + 1,
    reference,
    categories: verse.categories,
    text,
    match,
    status: statusFor(match.priority),
  };
});

const statusCounts = new Map();
for (const row of rows) {
  statusCounts.set(row.status.label, (statusCounts.get(row.status.label) || 0) + 1);
}

const report = [
  '# WalkingWithGod: Preselected Verse → Photo Query Audit',
  '',
  `Generated from the current code on 2026-08-25. Total preselected passages: **${rows.length}**.`,
  '',
  'The site uses the English BBE passage for background matching, even when another display language is selected. If BBE is temporarily unavailable, the live site falls back to WEB. The photo query is randomly selected from all matched rules, so this report shows every query that may be sent to Unsplash.',
  '',
  'Phrase rules are global: they apply to every passage containing the wording, not only to the verse that motivated the rule. A visually decisive phrase may suppress incidental matches; theological phrases remain part of the wider candidate pool.',
  '',
  '## Summary',
  '',
  '| Match type | Count |',
  '| --- | ---: |',
  ...[...statusCounts.entries()].map(([label, count]) => `| ${label} | ${count} |`),
  '',
  '## Global phrase sea',
  '',
  '| Phrase rule | Exclusive visual phrase? | Trigger wording | Unsplash queries |',
  '| --- | --- | --- | --- |',
  ...PHOTO_PHRASE_RULES.map((item) =>
    `| \`${item.id}\` | ${item.exclusive ? 'Yes' : 'No'} | ${item.triggers.map((trigger) => `\`${trigger}\``).join(', ')} | ${item.queries.map((query) => `\`${query.replaceAll('-', ' ')}\``).join(', ')} |`
  ),
  '',
  '## Review first: fallback and abstract matches',
  '',
  ...rows
    .filter((row) => row.match.priority <= 50)
    .sort((a, b) => a.status.order - b.status.order || a.index - b.index)
    .flatMap((row) => [
      `### ${row.index}. ${row.reference} — ${row.status.label}`,
      '',
      `- Categories: ${row.categories.map((category) => `\`${category}\``).join(', ')}`,
      `- Matched rules: ${row.match.matchedRuleIds.length ? row.match.matchedRuleIds.map((id) => `\`${id}\``).join(', ') : '**none**'}`,
      `- Suppressed incidental rules: ${row.match.suppressedRuleIds.length ? row.match.suppressedRuleIds.map((id) => `\`${id}\``).join(', ') : '**none**'}`,
      `- Candidate Unsplash queries: ${row.match.candidates.map((query) => `\`${query.replaceAll('-', ' ')}\``).join(', ')}`,
      '',
      `> ${row.text}`,
      '',
    ]),
  '## All preselected passages',
  '',
  '| # | Reference | Categories | BBE passage used for matching | Match type | Matched rule(s) | Suppressed incidental rule(s) | Candidate Unsplash queries |',
  '| ---: | --- | --- | --- | --- | --- | --- | --- |',
  ...rows.map((row) => {
    const rules = row.match.matchedRuleIds.length
      ? row.match.matchedRuleIds.map((id) => `\`${id}\``).join(', ')
      : '**none**';
    const queries = row.match.candidates
      .map((query) => `\`${query.replaceAll('-', ' ')}\``)
      .join(', ');
    const suppressed = row.match.suppressedRuleIds.length
      ? row.match.suppressedRuleIds.map((id) => `\`${id}\``).join(', ')
      : '—';
    return `| ${row.index} | **${row.reference}** | ${row.categories.join(', ')} | ${markdownText(row.text)} | ${row.status.label} | ${rules} | ${suppressed} | ${queries} |`;
  }),
  '',
].join('\n');

await mkdir(new URL('../docs/', import.meta.url), { recursive: true });
await writeFile(OUTPUT_PATH, report, 'utf8');
console.log(`Wrote ${rows.length} passages to ${OUTPUT_PATH.pathname}`);
