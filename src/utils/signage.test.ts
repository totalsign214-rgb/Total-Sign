import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CONFIRMED_SERVICES,
  EXTRA_CATALOGUE_MEDIA,
  FAQ_ITEMS,
  FAQ_TOPICS,
  GALLERY_PROJECTS,
} from '../data/business';
import {
  buildGoogleMapsDirectionsUrl,
  buildGoogleMapsEmbedUrl,
  buildInstagramProfileUrl,
  buildPhotoCatalogueEntries,
  buildWhatsAppQuoteUrl,
  filterCatalogueEntries,
  filterFaqsByTopic,
  filterGalleryByCategory,
  filterServicesByCategory,
  formatInstagramHandle,
  isShopOpenAt,
  validateQuoteInput,
} from './signage';

test('filterServicesByCategory returns all or category-specific services', () => {
  const all = filterServicesByCategory(CONFIRMED_SERVICES, 'All');
  assert.equal(all.length, CONFIRMED_SERVICES.length);

  const led = filterServicesByCategory(CONFIRMED_SERVICES, '3D & LED Signs');
  assert.equal(led.length, 2);
  assert.ok(led.every((s) => s.category === '3D & LED Signs'));
});

test('filterGalleryByCategory filters projects cleanly', () => {
  const prints = filterGalleryByCategory(GALLERY_PROJECTS, 'Prints & Glass');
  assert.equal(prints.length, 1);
  assert.equal(prints[0].id, 'translite-mall-display');
});

test('buildPhotoCatalogueEntries flattens project media and extras without dropping videos', () => {
  const entries = buildPhotoCatalogueEntries(
    GALLERY_PROJECTS,
    EXTRA_CATALOGUE_MEDIA
  );
  assert.equal(entries.length, 26);
  const photos = filterCatalogueEntries(entries, 'All', 'Photos');
  const videos = filterCatalogueEntries(entries, 'All', 'Videos');
  assert.equal(photos.length, 16);
  assert.equal(videos.length, 10);

  const cncPhotos = filterCatalogueEntries(
    entries,
    'CNC & Fabrication',
    'Photos'
  );
  assert.equal(cncPhotos.length, 1);
  assert.equal(cncPhotos[0].suggestedService, 'CNC & Laser Cutting Fabrication');
});

test('filterFaqsByTopic filters timelines, warranty, materials, and order questions cleanly', () => {
  assert.equal(filterFaqsByTopic(FAQ_ITEMS, 'All').length, FAQ_ITEMS.length);
  for (const topic of FAQ_TOPICS.filter((t) => t !== 'All')) {
    const matched = filterFaqsByTopic(FAQ_ITEMS, topic);
    assert.ok(matched.length >= 1, `Expected at least 1 FAQ item for ${topic}`);
    assert.ok(matched.every((item) => item.topic === topic));
  }
});

test('validateQuoteInput catches missing name and invalid phone', () => {
  const invalid = validateQuoteInput({
    name: 'A',
    phone: '12345',
    service: '',
    dimensions: '',
    notes: '',
  });
  assert.ok(invalid.name);
  assert.ok(invalid.phone);
  assert.ok(invalid.service);

  const valid = validateQuoteInput({
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    service: '3D Acrylic & Channel Letters',
    dimensions: '12ft x 3ft',
    notes: 'Shopfront in Ranchi',
  });
  assert.deepEqual(valid, {});
});

test('buildWhatsAppQuoteUrl encodes details into wa.me URL', () => {
  const url = buildWhatsAppQuoteUrl('918789487848', {
    name: 'Anita',
    service: 'LED Boards & Neon Light Work',
  });
  assert.ok(url.startsWith('https://wa.me/918789487848?text='));
  assert.ok(url.includes('Anita'));
  assert.ok(url.includes('LED%20Boards'));
});

test('Google Maps URL builders format coordinates cleanly', () => {
  const dirUrl = buildGoogleMapsDirectionsUrl(23.361649, 85.327284);
  assert.equal(
    dirUrl,
    'https://www.google.com/maps/dir/?api=1&destination=23.361649,85.327284'
  );

  const embedUrl = buildGoogleMapsEmbedUrl(23.361649, 85.327284, 'SIGN & SIGNAGE');
  assert.ok(embedUrl.includes('output=embed'));
  assert.ok(embedUrl.includes('23.361649'));
});

test('isShopOpenAt reflects Mon-Sat 10:30 to 20:00 and Sunday closed', () => {
  assert.equal(isShopOpenAt(0, 14, 0), false); // Sunday closed
  assert.equal(isShopOpenAt(1, 10, 29), false); // Monday 10:29 AM closed
  assert.equal(isShopOpenAt(1, 10, 30), true); // Monday 10:30 AM open
  assert.equal(isShopOpenAt(6, 19, 59), true); // Saturday 7:59 PM open
  assert.equal(isShopOpenAt(6, 20, 0), false); // Saturday 8:00 PM closed
});

test('Instagram profile helpers normalize handles and URLs cleanly', () => {
  assert.equal(formatInstagramHandle('signandsignage'), '@signandsignage');
  assert.equal(formatInstagramHandle('@signandsignage'), '@signandsignage');
  assert.equal(
    formatInstagramHandle('https://www.instagram.com/signandsignage/?hl=en'),
    '@signandsignage'
  );
  assert.equal(
    buildInstagramProfileUrl('@signandsignage'),
    'https://www.instagram.com/signandsignage/'
  );
  assert.equal(
    buildInstagramProfileUrl('https://www.instagram.com/signandsignage/'),
    'https://www.instagram.com/signandsignage/'
  );
  assert.equal(buildInstagramProfileUrl(null), null);
});

