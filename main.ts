import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// Snooze Button Roast — make.fun bounty u-carbon-forge-snooze-button-roast-14cbafc6
// One line roasting an alarm clock that rings at 6 AM on a Saturday.
// The entry is written to /output/entry.txt and must satisfy the gate:
// 1-200 UTF-8 characters, a single line, no trailing newline, not only
// whitespace. This program validates the line before writing it, writes
// it with no trailing newline, then reads it back and compares it
// byte-for-byte so any mismatch fails loudly instead of silently.

const LINE = 'My alarm clock went off at 6 AM on a Saturday like rent was due, so I hit snooze and reminded it the weekend has a strict no-eviction policy.';

// Gate: entry must be 1-200 characters, a single line, no trailing newline.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes('\n') || LINE.includes('\r')) {
  throw new Error('Line must be a single line with no newline characters');
}
if (LINE.trim().length === 0) {
  throw new Error('Line must not be only whitespace');
}

mkdirSync('/output', { recursive: true });
writeFileSync('/output/entry.txt', LINE, 'utf8');

// Read back and compare byte-for-byte: the file on disk must be exactly
// the line we intended, with no added newline or encoding surprise.
const readBack = readFileSync('/output/entry.txt', 'utf8');
if (readBack !== LINE) {
  throw new Error('Verification failed: /output/entry.txt does not match the line byte-for-byte');
}
if (readBack.endsWith('\n')) {
  throw new Error('Verification failed: /output/entry.txt has a trailing newline');
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
console.log(LINE);
