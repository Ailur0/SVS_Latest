/* Registers live preview panes so non-technical editors can see roughly what
   each entry will look like on the real site while they edit, instead of
   staring at a bare form. Plain JS (no build step) — uses the `h` (hyperscript)
   and `createClass` globals the Decap CMS CDN bundle exposes. */
(function () {
  var CATEGORY_COLORS = {
    Materials: { bg: '#dbeafe', fg: '#1d4ed8' },
    'Packaging Design': { bg: '#ede9fe', fg: '#6d28d9' },
    'Food Grade': { bg: '#d1fae5', fg: '#047857' },
    Manufacturing: { bg: '#fef3c7', fg: '#b45309' },
    Procurement: { bg: '#ffedd5', fg: '#c2410c' },
    Sustainability: { bg: '#ccfbf1', fg: '#0f766e' },
  };

  var BASE_STYLE = {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1f2933',
    maxWidth: 760,
    margin: '0 auto',
    padding: '32px 24px',
    lineHeight: 1.6,
  };

  function humanize(key) {
    var withSpaces = key.replace(/([A-Z])/g, ' $1');
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  }

  function toPlain(value) {
    return value && typeof value.toJS === 'function' ? value.toJS() : value;
  }

  // ── Blog post preview ────────────────────────────────────────────────────

  var BlogPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var title = entry.getIn(['data', 'title']) || 'Untitled post';
      var category = entry.getIn(['data', 'category']) || '';
      var description = entry.getIn(['data', 'description']) || '';
      var readTime = entry.getIn(['data', 'readTime']);
      var faqs = toPlain(entry.getIn(['data', 'faqs'])) || [];
      var colors = CATEGORY_COLORS[category] || { bg: '#e5e7eb', fg: '#374151' };

      return h('div', { style: BASE_STYLE },
        h('div', { style: { display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 } },
          h('span', {
            style: {
              background: colors.bg, color: colors.fg, fontSize: 12, fontWeight: 600,
              padding: '4px 10px', borderRadius: 999,
            },
          }, category),
          readTime
            ? h('span', { style: { fontSize: 12, color: '#6b7280' } }, readTime + ' min read')
            : null
        ),
        h('h1', { style: { fontSize: 30, fontWeight: 700, margin: '0 0 16px', lineHeight: 1.25 } }, title),
        description
          ? h('div', {
              style: {
                background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)',
                borderRadius: 12, padding: '14px 16px', marginBottom: 28, fontSize: 15, color: '#374151',
              },
            }, description)
          : null,
        h('div', { className: 'svs-article-body' }, this.props.widgetFor('body')),
        faqs.length
          ? h('div', { style: { marginTop: 36 } },
              h('h2', { style: { fontSize: 20, fontWeight: 700, marginBottom: 12 } }, 'Frequently Asked Questions'),
              faqs.map(function (faq, i) {
                return h('div', {
                  key: i,
                  style: { border: '1px solid #e5e7eb', borderRadius: 10, padding: '12px 16px', marginBottom: 8 },
                },
                  h('p', { style: { fontWeight: 600, margin: '0 0 6px' } }, faq.question),
                  h('p', { style: { margin: 0, color: '#4b5563', fontSize: 14 } }, faq.answer)
                );
              })
            )
          : null
      );
    },
  });

  // ── Product preview ──────────────────────────────────────────────────────

  var ProductPreview = createClass({
    render: function () {
      var entry = this.props.entry;
      var name = entry.getIn(['data', 'name']) || 'Unnamed product';
      var capacity = entry.getIn(['data', 'capacity']) || '';
      var closure = entry.getIn(['data', 'closure']) || '';
      var applications = entry.getIn(['data', 'applications']) || '';
      var imagePath = entry.getIn(['data', 'image']);
      var tags = toPlain(entry.getIn(['data', 'tags'])) || [];
      var imageUrl = imagePath ? this.props.getAsset(imagePath).toString() : null;

      return h('div', { style: BASE_STYLE },
        h('div', {
          style: {
            border: '1px solid #e5e7eb', borderRadius: 16, padding: 20, maxWidth: 340,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          },
        },
          h('div', {
            style: {
              aspectRatio: '1 / 1', background: '#f3f4f6', borderRadius: 10, marginBottom: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
            },
          },
            imageUrl
              ? h('img', { src: imageUrl, style: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' } })
              : h('span', { style: { color: '#9ca3af', fontSize: 13 } }, 'No image yet')
          ),
          h('h3', { style: { fontSize: 18, fontWeight: 700, margin: '0 0 4px' } }, name),
          h('p', { style: { fontSize: 13, color: '#6b7280', margin: '0 0 12px' } }, [capacity, closure].filter(Boolean).join(' · ')),
          h('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 } },
            tags.map(function (tag) {
              return h('span', {
                key: tag,
                style: {
                  background: 'rgba(37,99,235,0.08)', color: '#1d4ed8', fontSize: 11, fontWeight: 600,
                  padding: '3px 8px', borderRadius: 999,
                },
              }, tag);
            })
          ),
          applications
            ? h('div', {},
                h('p', { style: { fontSize: 12, fontWeight: 600, margin: '0 0 2px' } }, 'Applications:'),
                h('p', { style: { fontSize: 13, color: '#6b7280', margin: 0 } }, applications)
              )
            : null
        )
      );
    },
  });

  // ── Generic static-page preview (About / Quality / Customization / Contact) ─

  function renderPageValue(value) {
    value = toPlain(value);
    if (value === null || value === undefined || value === '') return null;

    if (Array.isArray(value)) {
      return h('div', { style: { margin: '4px 0 16px' } },
        value.map(function (item, i) {
          return h('div', {
            key: i,
            style: { padding: '10px 0', borderTop: i ? '1px solid #eef0f2' : 'none' },
          }, renderPageValue(item));
        })
      );
    }

    if (typeof value === 'object') {
      return h('div', {},
        Object.keys(value).map(function (key) {
          var v = value[key];
          var isPrimitive = typeof v !== 'object' || v === null;
          return h('div', { key: key, style: { margin: '2px 0' } },
            h('span', { style: { fontWeight: 600, color: '#374151' } }, humanize(key) + ': '),
            isPrimitive ? h('span', { style: { color: '#4b5563' } }, String(v)) : renderPageValue(v)
          );
        })
      );
    }

    return h('p', { style: { margin: '0 0 8px', color: '#374151' } }, String(value));
  }

  var PagePreview = createClass({
    render: function () {
      var data = toPlain(this.props.entry.get('data')) || {};
      return h('div', { style: BASE_STYLE },
        Object.keys(data).map(function (key) {
          return h('div', { key: key, style: { marginBottom: 20 } },
            h('h2', { style: { fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.4, color: '#9ca3af', margin: '0 0 6px' } }, humanize(key)),
            renderPageValue(data[key])
          );
        })
      );
    },
  });

  CMS.registerPreviewTemplate('blog', BlogPreview);
  CMS.registerPreviewTemplate('products', ProductPreview);
  ['about', 'quality', 'customization', 'contact'].forEach(function (fileName) {
    CMS.registerPreviewTemplate(fileName, PagePreview);
  });

  CMS.registerPreviewStyle(
    'body { margin: 0; } ' +
    '.svs-article-body h2 { font-size: 20px; font-weight: 700; margin: 28px 0 12px; } ' +
    '.svs-article-body p { color: #374151; margin: 0 0 14px; } ' +
    '.svs-article-body ul, .svs-article-body ol { color: #374151; padding-left: 20px; margin: 0 0 14px; } ' +
    '.svs-article-body table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; } ' +
    '.svs-article-body th, .svs-article-body td { border: 1px solid #e5e7eb; padding: 8px 10px; text-align: left; } ' +
    '.svs-article-body th { background: #f9fafb; } ' +
    '.svs-article-body a { color: #2563eb; }',
    { raw: true }
  );
})();
