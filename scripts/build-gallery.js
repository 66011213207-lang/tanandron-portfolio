#!/usr/bin/env node
/*
 * Scans assets/gallery/<Category>/* for image files and regenerates the
 * GALLERY_ITEMS array in js/main.js. Run this after adding/removing photos:
 *
 *   node scripts/build-gallery.js
 *
 * Convention: each subfolder of assets/gallery is a category shown as a
 * filter chip on the site (e.g. assets/gallery/Activity/, assets/gallery/Prop/).
 * The image filename becomes the caption (underscores/dashes become spaces).
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const GALLERY_DIR = path.join(ROOT, 'assets', 'gallery');
const MAIN_JS = path.join(ROOT, 'js', 'main.js');
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);

// The filename IS the caption — name files exactly how the caption should read.
// The only cleanup applied: underscores/dashes become spaces, and the very first
// letter is capitalized. Everything else (casing, parentheses, numbers) is preserved
// as typed, so renaming a file is the only way to change what shows on the site.
function humanize(filename) {
  const base = filename.replace(/\.[^.]+$/, '');
  const cleaned = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

// Categories listed here are shown last (in this order) when filtering by "All" —
// used for lower-priority buckets like miscellaneous activity photos.
const LOW_PRIORITY_CATEGORIES = ['Activity', 'Other'];

function collectItems() {
  if (!fs.existsSync(GALLERY_DIR)) return [];
  const categories = fs.readdirSync(GALLERY_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort((a, b) => {
      const aLow = LOW_PRIORITY_CATEGORIES.includes(a);
      const bLow = LOW_PRIORITY_CATEGORIES.includes(b);
      if (aLow !== bLow) return aLow ? 1 : -1;
      if (aLow && bLow) return LOW_PRIORITY_CATEGORIES.indexOf(a) - LOW_PRIORITY_CATEGORIES.indexOf(b);
      return a.localeCompare(b);
    });

  const items = [];
  for (const category of categories) {
    const categoryDir = path.join(GALLERY_DIR, category);
    const files = fs.readdirSync(categoryDir, { withFileTypes: true })
      .filter(f => f.isFile() && IMAGE_EXT.has(path.extname(f.name).toLowerCase()))
      .map(f => f.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    for (const file of files) {
      items.push({
        category,
        title: humanize(file),
        img: `assets/gallery/${category}/${file}`.split(path.sep).join('/'),
      });
    }
  }
  return items;
}

function escape(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function serialize(items) {
  if (!items.length) return '[]';
  const lines = items.map(item =>
    `  { category: '${escape(item.category)}', title: '${escape(item.title)}', img: '${escape(item.img)}' },`
  );
  return `[\n${lines.join('\n')}\n]`;
}

function writeIntoMainJs(items) {
  const src = fs.readFileSync(MAIN_JS, 'utf8');
  const startMarker = '/* GALLERY_ITEMS:START */';
  const endMarker = '/* GALLERY_ITEMS:END */';
  const startIdx = src.indexOf(startMarker);
  const endIdx = src.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1) {
    throw new Error('GALLERY_ITEMS markers not found in js/main.js — did the file structure change?');
  }
  const before = src.slice(0, startIdx + startMarker.length);
  const after = src.slice(endIdx);
  const block = `\nconst GALLERY_ITEMS = ${serialize(items)};\n`;
  fs.writeFileSync(MAIN_JS, before + block + after, 'utf8');
}

const items = collectItems();
writeIntoMainJs(items);

const byCategory = items.reduce((acc, i) => { acc[i.category] = (acc[i.category] || 0) + 1; return acc; }, {});
console.log(`Wrote ${items.length} image(s) into js/main.js`);
if (items.length) {
  for (const [cat, count] of Object.entries(byCategory)) console.log(`  ${cat}: ${count}`);
} else {
  console.log('No images found. Drop files into assets/gallery/<Category>/ and run this again.');
}
