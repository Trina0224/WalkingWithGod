import { mkdir, writeFile } from 'node:fs/promises';

import {
  getPhotoQueryMatch,
} from '../src/backgroundPhotoQueries.js';
import {
  verseLibrary,
} from '../src/constants/verseLibrary.js';

const OUTPUT_PATH = new URL('../docs/default-verse-photo-audit.md', import.meta.url);
const CONCURRENCY = 6;

function referenceFor(verse) {
  const end = Number(verse.verseEnd) === Number(verse.verseStart)
    ? ''
    : `-${verse.verseEnd}`;
  return `${verse.label} ${verse.chapter}:${verse.verseStart}${end}`;
}

function extractPassage(payload) {
  return Object.values(payload || {})
    .flatMap((chapter) => chapter.verses || [])
    .map((verse) => verse.text?.trim())
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchPassage(reference, attempt = 1) {
  const url = `https://query.getbible.net/v2/web/${encodeURIComponent(reference)}`;
  const response = await fetch(url);
  if (response.ok) {
    const text = extractPassage(await response.json());
    if (text) return text;
  }

  if (attempt < 3) {
    await new Promise((resolve) => setTimeout(resolve, attempt * 750));
    return fetchPassage(reference, attempt + 1);
  }
  throw new Error(`GetBible returned ${response.status}`);
}

async function mapConcurrent(items, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, worker)
  );
  return results;
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

const rows = await mapConcurrent(verseLibrary, async (verse, index) => {
  const reference = referenceFor(verse);
  let text;
  try {
    text = await fetchPassage(reference);
  } catch (error) {
    text = `[Unable to load WEB text: ${error.message}]`;
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
  'The site always uses the English WEB passage for background matching, even when another display language is selected. The photo query is randomly selected from the candidate list, so this report shows every query that may be sent to Unsplash.',
  '',
  '## Summary',
  '',
  '| Match type | Count |',
  '| --- | ---: |',
  ...[...statusCounts.entries()].map(([label, count]) => `| ${label} | ${count} |`),
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
      `- Candidate Unsplash queries: ${row.match.candidates.map((query) => `\`${query.replaceAll('-', ' ')}\``).join(', ')}`,
      '',
      `> ${row.text}`,
      '',
    ]),
  '## All preselected passages',
  '',
  '| # | Reference | Categories | WEB passage used for matching | Match type | Matched rule(s) | Candidate Unsplash queries |',
  '| ---: | --- | --- | --- | --- | --- | --- |',
  ...rows.map((row) => {
    const rules = row.match.matchedRuleIds.length
      ? row.match.matchedRuleIds.map((id) => `\`${id}\``).join(', ')
      : '**none**';
    const queries = row.match.candidates
      .map((query) => `\`${query.replaceAll('-', ' ')}\``)
      .join(', ');
    return `| ${row.index} | **${row.reference}** | ${row.categories.join(', ')} | ${markdownText(row.text)} | ${row.status.label} | ${rules} | ${queries} |`;
  }),
  '',
].join('\n');

await mkdir(new URL('../docs/', import.meta.url), { recursive: true });
await writeFile(OUTPUT_PATH, report, 'utf8');
console.log(`Wrote ${rows.length} passages to ${OUTPUT_PATH.pathname}`);
