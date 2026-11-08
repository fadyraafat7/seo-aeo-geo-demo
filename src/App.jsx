import { useState } from 'react';
import { strategies, tools, sources } from './content.js';

function Icon({ name, size = 20, ...props }) {
  const paths = {
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    external: <><path d="M14 4h6v6M20 4 10 14M10 5H5v15h15v-5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    code: <><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></>,
    message: <path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-3H3V6a2 2 0 0 1 2-2Z" />,
    spark: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z" /><path d="M20 2v4M18 4h4" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    book: <><path d="M12 5v16M3 3c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2Z" /></>,
    chart: <><path d="M4 4v16h17M8 15l4-5 4 2 5-7" /></>,
    gauge: <><path d="M4 18a9 9 0 1 1 16 0M12 13l5-5M7 18h10" /><circle cx="12" cy="13" r="1.5" /></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7v1" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    terminal: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 8 4 4-4 4M13 16h4" /></>,
    layers: <><path d="m12 3 10 5-10 5L2 8l10-5ZM2 12l10 5 10-5M2 16l10 5 10-5" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.info}</svg>;
}

function Logo() {
  return <a href="#overview" className="brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span><span>signal<span className="brand-light">lab</span><span className="brand-dot">.</span></span></a>;
}

function Sidebar() {
  return <aside className="sidebar">
    <Logo />
    <div className="workspace-label">THE LEARNING WORKSPACE</div>
    <nav aria-label="Main navigation" className="side-nav">
      <a className="nav-current" href="#overview"><Icon name="grid" />Overview<span className="nav-dot" /></a>
      <a href="#example"><Icon name="book" />The live example</a>
      <a href="#implementation"><Icon name="code" />Under the hood</a>
      <a href="#toolkit"><Icon name="gauge" />Measurement toolkit<span className="nav-count">6</span></a>
    </nav>
    <div className="sidebar-divider" />
    <div className="workspace-label">EXPLORE THE FUNDAMENTALS</div>
    <nav aria-label="Learning topics" className="topic-nav">
      {Object.entries(strategies).map(([key, item]) => <a href={`#concept-${key.toLowerCase()}`} key={key}><span className={`topic-dot ${item.color}`} />{key}<span>{key === 'SEO' ? 'Search' : key === 'AEO' ? 'Answers' : 'AI discovery'}</span></a>)}
    </nav>
    <div className="side-bottom">
      <div className="built-note"><span className="react-orbit">⚛</span><div>Built with React<span>Pre-rendered. Then interactive.</span></div></div>
      <div className="local-note"><span />Local learning project</div>
    </div>
  </aside>;
}

function Hero() {
  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-copy">
      <div className="eyebrow"><span className="mini-line" /> A PRACTICAL GUIDE FOR REACT DEVELOPERS</div>
      <h1 id="hero-title">Good content.<br />Built to be <span>found.</span></h1>
      <p>One React page. Three ways to be discovered.<br className="desktop-break" /> Explore SEO, AEO, and GEO in a working example.</p>
      <div className="hero-actions"><a className="button primary" href="#example">Explore the example<Icon name="arrow" size={17} /></a><a className="text-link" href="#implementation"><Icon name="code" size={17} />See how it works</a></div>
      <div className="hero-footnote"><Icon name="check" size={14} /> Real implementation <span>·</span> Explained in plain English</div>
    </div>
    <div className="discovery-map" aria-label="One useful page supports search results, direct answers, and AI references">
      <div className="map-grid" />
      <svg className="map-lines" viewBox="0 0 400 270" fill="none" aria-hidden="true"><path d="M100 135H155Q180 135 180 90V53Q180 38 210 38H252M100 135H252M100 135H155Q180 135 180 180V221Q180 236 210 236H252" stroke="#c8c9d7" strokeWidth="1.5" /></svg>
      <div className="map-source"><Icon name="code" size={25} /><strong>Your page</strong><span>Useful by design</span></div>
      {['SEO', 'AEO', 'GEO'].map((key, index) => <div key={key} className={`map-destination destination-${index} ${strategies[key].color}`}><span className="map-icon"><Icon name={strategies[key].icon} size={18} /></span><div><strong>{key}</strong><span>{['Search results', 'Direct answers', 'AI references'][index]}</span></div><Icon name="check" size={15} /></div>)}
      <div className="map-caption">ONE FOUNDATION. CONNECTED OPPORTUNITIES.</div>
    </div>
  </section>;
}

function Concepts() {
  return <section className="concepts" aria-label="The three discovery strategies">{Object.entries(strategies).map(([key, item], i) => <a href="#example" className={`concept ${item.color}`} id={`concept-${key.toLowerCase()}`} key={key}>
    <div className="concept-top"><span className="concept-icon"><Icon name={item.icon} size={21} /></span><span className="concept-number">0{i + 1}</span></div>
    <h2>{key}<span>{item.name}</span></h2><p>{item.line}</p><span className="concept-link">{['Get discovered', 'Be the answer', 'Become a reference'][i]}<Icon name="arrow" size={16} /></span>
  </a>)}</section>;
}

function ExampleArticle({ selected }) {
  return <article className={`example-article focus-${selected.toLowerCase()}`} aria-labelledby="article-title">
    <div className="article-top"><span className="article-category">REACT DEVELOPMENT</span><span className="article-reading">A worked example</span></div>
    <div className="annotated-title"><span className="annotation seo-marker">SEO · DESCRIPTIVE HEADING</span><h2 id="article-title">How do you make a React page discoverable?</h2></div>
    <div className="article-byline"><span className="author-avatar">SL</span><span>By <strong>Signal Lab</strong></span><span className="byline-separator">/</span><span>Educational example</span></div>
    <div className="direct-answer" data-direct-answer><span className="annotation aeo-marker">AEO · ANSWER FIRST</span><p>Pre-render your main content into HTML, add descriptive page metadata, and answer the visitor’s question clearly. Support your advice with original sources and make the page easy to crawl.</p></div>
    <h3>Start with these three steps</h3>
    <ol className="article-steps">
      <li><span>01</span><div><strong>Deliver readable HTML.</strong><p>Generate the article at build time, then hydrate it with React for interactive features.</p></div></li>
      <li><span>02</span><div><strong>Make the purpose obvious.</strong><p>Use a focused title, one main page heading, a useful description, and a preferred canonical URL.</p></div></li>
      <li><span>03</span><div><strong>Show where your advice comes from.</strong><p>Link to original documentation and distinguish a working example from measured results.</p></div></li>
    </ol>
    <div className="article-evidence" data-evidence><span className="annotation geo-marker">GEO · TRACEABLE EVIDENCE</span><Icon name="book" size={18} /><p><strong>Why pre-render?</strong> Google can render JavaScript, but other crawlers may not. Google’s <a href={sources[0][2]} target="_blank" rel="noreferrer">JavaScript SEO guide<Icon name="external" size={12} /></a> recommends considering server rendering or pre-rendering.</p></div>
    <div className="article-limit"><Icon name="info" size={15} /><span>This example demonstrates implementation. It does not claim rankings, traffic, or AI citations.</span></div>
  </article>;
}

function Example({ selected, setSelected }) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const item = strategies[selected];
  async function copy() {
    try { await navigator.clipboard.writeText(item.code); setCopied(true); setCopyError(false); setTimeout(() => setCopied(false), 2000); }
    catch { setCopyError(true); }
  }
  return <section id="example" className="section-block">
    <div className="section-heading"><div><div className="eyebrow section-eyebrow">LEARN BY LOOKING</div><h2>One page. Every layer explained.</h2><p>Pick a lens to see what each part contributes.</p></div><span className="tag"><span />Working React example</span></div>
    <div className="example-shell">
      <div className="example-toolbar"><div role="tablist" aria-label="Optimization lens" className="lens-tabs">{Object.keys(strategies).map((key, index) => <button type="button" role="tab" id={`tab-${key}`} aria-controls="lens-panel" aria-selected={selected === key} tabIndex={selected === key ? 0 : -1} onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const keys = Object.keys(strategies); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (index + (event.key === 'ArrowRight' ? 1 : 2)) % 3; setSelected(keys[next]); document.getElementById(`tab-${keys[next]}`).focus(); } }} className={selected === key ? `selected ${strategies[key].color}` : ''} onClick={() => setSelected(key)} key={key}><Icon name={strategies[key].icon} size={16} />{key}<span>lens</span></button>)}</div><button className={`code-toggle ${showCode ? 'active' : ''}`} onClick={() => setShowCode(!showCode)} aria-pressed={showCode}><Icon name="code" size={16} /><span>{showCode ? 'Show article' : 'View code'}</span></button></div>
      <div className="example-content">
        <div className="browser-preview"><div className="browser-bar"><div className="browser-dots"><i /><i /><i /></div><span><Icon name="layers" size={12} />your-domain.com /</span><Icon name="external" size={13} /></div>
          <div hidden={showCode}><ExampleArticle selected={selected} /></div>
          {showCode && <div className="code-view"><div className="code-view-heading"><span>{item.file}</span><button onClick={copy}>{copied ? 'Copied!' : 'Copy snippet'}</button></div><pre><code>{item.code}</code></pre><p role="status">{copyError ? 'Clipboard unavailable. Select the code above to copy it.' : 'Illustrative excerpt. See the source files for the complete implementation.'}</p></div>}
        </div>
        <div className={`lens-explainer ${item.color}`} id="lens-panel" role="tabpanel" aria-labelledby={`tab-${selected}`}><span className="lens-pill"><Icon name={item.icon} size={14} />THE {selected} LENS</span><h3>{item.label}</h3><p>{item.why}</p><div className="explainer-rule" />{item.details.map(([title, description], i) => <div className="explanation" key={title}><span className="explanation-number">{i + 1}</span><div><h4>{title}</h4><p>{description}</p></div></div>)}<div className="source-pointer"><Icon name="code" size={15} /><span>{item.file}</span></div></div>
      </div>
    </div>
  </section>;
}

function PageChecks() {
  const [results, setResults] = useState(null);
  function runChecks() {
    const schema = [...document.querySelectorAll('script[type="application/ld+json"]')];
    let validSchema = false;
    try { validSchema = schema.some(node => JSON.parse(node.textContent)['@graph']?.some(item => item['@type'] === 'Article')); } catch { /* Display a failed check below. */ }
    setResults([
      ['A descriptive document title', document.title.includes('React SEO')],
      ['A page-specific meta description', !!document.querySelector('meta[name="description"]')?.content],
      ['A configured canonical URL (not the example domain)', (() => { try { const canonical = new URL(document.querySelector('link[rel="canonical"]')?.href); return canonical.protocol === 'https:' && canonical.hostname !== 'example.com' && !canonical.hostname.endsWith('.example.com'); } catch { return false; } })()],
      ['One main page heading', document.querySelectorAll('h1').length === 1],
      ['A direct answer in the document', !!document.querySelector('[data-direct-answer]')?.textContent.trim()],
      ['Evidence linked to an original source', !!document.querySelector('[data-evidence] a[href^="https://developers.google.com"]')],
      ['Parseable Article JSON-LD', validSchema],
    ]);
  }
  return <div className="checks-card"><div className="checks-icon"><Icon name="terminal" size={23} /></div><div className="checks-copy"><h3>Check what this page actually implements.</h3><p>Inspect the current document for seven foundations. This is a code check, not a search ranking score.</p></div><button className="button dark" onClick={runChecks}><Icon name="check" size={16} />{results ? 'Run again' : 'Run page checks'}</button>{results && <div className="check-results" aria-live="polite"><div className="checks-summary">{results.filter(([, passed]) => passed).length} of {results.length} document checks passed<span>Initial HTML is verified separately by npm run check.</span></div>{results.map(([name, passed]) => <div className={`check-result ${passed ? 'passed' : 'failed'}`} key={name}><Icon name={passed ? 'check' : 'info'} size={16} /><span>{name}</span><strong>{passed ? 'Present' : 'Review'}</strong></div>)}</div>}</div>;
}

function Toolkit() {
  const [filter, setFilter] = useState('All tools');
  const [url, setUrl] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [error, setError] = useState('');
  function prepare(event) {
    event.preventDefault();
    try {
      const parsed = new URL(url.trim());
      if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.port || !parsed.hostname.includes('.') || parsed.hostname.endsWith('.localhost') || parsed.hostname === 'localhost' || parsed.hostname === 'example.com' || parsed.hostname.endsWith('.example.com') || /^\d+(\.\d+){3}$/.test(parsed.hostname)) throw new Error();
      parsed.hash = ''; setSubmitted(parsed.href); setError('');
    } catch { setError('Enter a public HTTPS URL, such as https://your-domain.com. Local and example URLs cannot be tested remotely.'); setSubmitted(''); }
  }
  return <section id="toolkit" className="section-block">
    <div className="section-heading"><div><div className="eyebrow section-eyebrow">MEASURE WHAT MATTERS</div><h2>Your measurement toolkit.</h2><p>Different tools answer different questions. There is no universal SEO, AEO, or GEO score.</p></div><a className="text-link small" href="/answer-review.csv" download><Icon name="download" size={16} />Get the worksheet</a></div>
    <div className="tool-filters" role="group" aria-label="Filter measurement tools">{['All tools', 'SEO', 'AEO', 'GEO'].map(value => <button key={value} aria-pressed={filter === value} className={filter === value ? 'active' : ''} onClick={() => setFilter(value)}>{value}{value === 'All tools' && <span>6</span>}</button>)}<span className="tool-filter-note">A practical starting set · categories overlap</span></div>
    <div className="tool-grid">{tools.filter(tool => filter === 'All tools' || tool.category === filter).map(tool => <div className="tool-card" key={tool.name}><div className="tool-top"><span className="tool-icon"><Icon name={tool.icon} size={22} /></span><span className={`category-badge ${strategies[tool.category].color}`}>{tool.category}</span></div><span className="tool-label">{tool.label}</span><h3>{tool.name}</h3><p>{tool.description}</p><div className="tool-limitation"><Icon name="info" size={14} /><span>{tool.limitation}</span></div><a href={tool.href} download={tool.download || undefined} target={tool.download ? undefined : '_blank'} rel={tool.download ? undefined : 'noreferrer'}>{tool.cta}<Icon name={tool.download ? 'download' : 'external'} size={15} /></a></div>)}</div>
    <div className="url-launcher"><div><span className="eyebrow section-eyebrow">READY TO TEST A LIVE SITE?</span><h3>Bring your own URL.</h3><p>Prepare links to independent tools. Nothing is submitted until you open a tool.</p></div><form onSubmit={prepare} noValidate><label htmlFor="public-url">Public page URL</label><div className="url-input-row"><input id="public-url" type="url" value={url} onChange={event => { setUrl(event.target.value); setSubmitted(''); setError(''); }} placeholder="https://your-domain.com" aria-describedby="url-feedback" /><button className="button dark" type="submit">Prepare tests<Icon name="arrow" size={16} /></button></div><div id="url-feedback" role="status">{error && <p className="form-error">{error}</p>}{submitted && <div className="prepared-links"><a href={`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(submitted)}`} target="_blank" rel="noreferrer">PageSpeed Insights<Icon name="external" size={13} /></a><a href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(submitted)}`} target="_blank" rel="noreferrer">Rich Results Test<Icon name="external" size={13} /></a><span>Tools receive this URL when opened.</span></div>}</div></form></div>
    <PageChecks />
  </section>;
}

function Implementation() {
  return <section className="section-block" id="implementation"><div className="section-heading"><div><div className="eyebrow section-eyebrow">UNDER THE HOOD</div><h2>A small project. An intentional foundation.</h2><p>Follow the HTML from build time to the browser.</p></div><span className="tag"><Icon name="code" size={14} />React + Vite</span></div>
    <div className="pipeline">{[['01', 'Write in React', 'src/App.jsx', 'Semantic content, direct answers, accessible interactions.'], ['02', 'Generate the HTML', 'scripts/prerender.mjs', 'Render once at build time. Add metadata and JSON-LD.'], ['03', 'Add interactivity', 'src/entry-client.jsx', 'Hydrate existing HTML. Keep the article available without JS.']].map(([n, title, file, description]) => <div className="pipeline-step" key={n}><span>{n}</span><h3>{title}</h3><code>{file}</code><p>{description}</p></div>)}</div>
    <div className="implementation-note"><Icon name="info" size={18} /><p><strong>Before you publish:</strong> set <code>SITE_URL</code> in <code>.env</code> to your real HTTPS origin and rebuild. The canonical, social tags, sitemap, and structured data all use it. Analytics and webmaster accounts require your own setup; no tracking is connected in this demo.</p></div>
  </section>;
}

function Questions() {
  return <section className="questions section-block" aria-labelledby="faq-heading"><div><div className="eyebrow section-eyebrow">A FEW GOOD QUESTIONS</div><h2 id="faq-heading">Clear answers.<br />No magic switches.</h2><p>Useful implementation beats promises.</p></div><div className="faq-list">
    {[
      ['Does React prevent my site from ranking?', 'No. Search engines can process JavaScript, but support varies by crawler. This project pre-renders its main content so it is available in the original HTML, before JavaScript runs.'],
      ['Do I need special AI markup or an llms.txt file?', 'Google says no special AI files or schema.org markup are required for its AI search features. Structured data should describe what is actually on your page. Other systems have their own access policies.'],
      ['Is there a single AEO or GEO score?', 'There is no universal score. Track a defined set of questions, cited URLs, answer accuracy, referral visits, and business outcomes. Record the engine, date, and context because answers vary.'],
      ['Can I measure everything while running locally?', 'You can inspect HTML, run local checks, and use Lighthouse locally. Search Console, remote URL testing, search visibility, and real AI citations require a public site and, in some cases, account verification.'],
    ].map(([question, answer]) => <details key={question}><summary>{question}<Icon name="chevron" size={17} /></summary><p>{answer}</p></details>)}
    </div></section>;
}

export default function App() {
  const [selected, setSelected] = useState('SEO');
  return <><a className="skip-link" href="#main">Skip to content</a><Sidebar /><div className="app-content"><header className="topbar"><div className="breadcrumb">Workspace<Icon name="chevron" size={13} /><span>Search visibility lab</span></div><a href="#sources" className="topbar-resource"><Icon name="book" size={16} />Source library<Icon name="external" size={13} /></a></header><main id="main"><div className="page-container" id="overview"><div className="page-kicker"><span className="status-dot" />THE SEARCH VISIBILITY LAB<span className="edition">REACT EDITION / 01</span></div><Hero /><Concepts /><Example selected={selected} setSelected={setSelected} /><Toolkit /><Implementation /><Questions /><section className="sources-section" id="sources" aria-labelledby="sources-heading"><div><Icon name="book" size={19} /><h2 id="sources-heading">Built on original sources.</h2><p>Read the documentation behind the example.</p></div><div className="source-links">{sources.map(([title, publisher, href]) => <a key={title} href={href} target="_blank" rel="noreferrer"><span>{title}<small>{publisher}</small></span><Icon name="external" size={14} /></a>)}</div></section><footer><Logo /><p>A working example, not a ranking promise.</p><a href="#overview">Back to top ↑</a></footer></div></main></div></>;
}
