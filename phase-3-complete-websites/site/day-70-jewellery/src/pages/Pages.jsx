import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Minus, Plus } from 'lucide-react';
import { products, categories, blogs, money, referenceAssets } from '../data/store';
import { useCart } from '../context/CartContext';
import { ProductGrid, SectionHeading, Reveal } from '../components/Sections';

export function NotFoundPage() {
  return <PageHero eyebrow="404 · PAGE NOT FOUND" title="This page has wandered off." copy="The page you're looking for may have moved or no longer exists." />;
}

export function PageHero({ eyebrow, title, copy }) {
  return <div className="page-hero"><div className="container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{copy && <p>{copy}</p>}</div></div>;
}

export function CategoryPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const cat = categories.find((item) => item.slug === slug) || (slug === 'all' ? { name: 'All Jewellery' } : null);
  if (!cat) return <NotFoundPage />;
  const [sort, setSort] = useState('name');
  const [filter, setFilter] = useState(searchParams.get('filter') === 'sale' ? 'sale' : 'all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [karat, setKarat] = useState('all');
  const list = useMemo(() => {
    let result = slug === 'all' ? [...products] : products.filter((product) => product.category === slug);
    if (filter === 'sale') result = result.filter((product) => product.oldPrice);
    if (karat !== 'all') result = result.filter((product) => product.karat === karat);
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    else result.sort((a, b) => products.indexOf(a) - products.indexOf(b));
    return result;
  }, [slug, sort, filter, karat]);
  return <><section className="section category-listing"><div className="container"><div className="listing-toolbar"><span>{cat.name}</span><div><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="name">Alphabetical (A-Z)</option><option value="featured">Newest Arrivals</option></select><button type="button" className={filterOpen ? 'filter-active' : ''} onClick={() => setFilterOpen(value => !value)} aria-expanded={filterOpen}>Filter</button></div></div>{filterOpen && <div className="category-filter-panel"><div><b>Categories</b>{categories.map(item=><Link key={item.slug} to={'/category/'+item.slug}>{item.name}</Link>)}</div><div><b>Offers</b><button type="button" onClick={()=>setFilter(value=>value==='sale'?'all':'sale')} className={filter==='sale'?'filter-active':''}>On Sale</button><button type="button" onClick={()=>setFilter('all')} className={filter==='all'?'filter-active':''}>All Products</button></div><div><b>Gold Karats</b>{['all','24K','22K','18K','14K'].map(value=><button type="button" key={value} className={karat===value?'filter-active':''} onClick={()=>setKarat(value)}>{value==='all'?'All Karats':value}</button>)}</div></div>}{list.length ? <ProductGrid items={list}/> : <p className="empty-state">No pieces match this selection.</p>}</div></section></>;
}

export function ProductPage() {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);
  if (!product) return <NotFoundPage />;
  const cart = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('Description');
  const gallery = [...new Set([product.image, product.hoverImage].filter(Boolean))];
  const [activeImage, setActiveImage] = useState(product.image);
  useEffect(() => { setActiveImage(product.image); setQty(1); setTab('Description'); }, [id, product.image]);
  const addAndCheckout = () => { cart.add(product, qty); cart.setOpen(false); navigate('/checkout'); };
  return <>
    <div className="container breadcrumbs"><Link to="/">Home</Link> / <Link to={'/category/' + product.category}>{categories.find((item) => item.slug === product.category)?.name}</Link> / {product.name}</div>
    <section className="section product-detail"><div className="container detail-grid">
      <Reveal className="detail-gallery"><div className="detail-image"><img src={activeImage} alt={product.alt}/></div>{gallery.length > 1 && <div className="gallery-thumbnails" role="group" aria-label="Product images">{gallery.map((image, index) => <button type="button" key={image} className={activeImage === image ? 'active' : ''} onClick={() => setActiveImage(image)} aria-label={`Show product image ${index + 1}`} aria-pressed={activeImage === image}><img src={image} alt=""/></button>)}</div>}</Reveal>
      <Reveal className="detail-info" delay={.12}><span className="eyebrow">THE SIGNATURE EDIT</span><h1>{product.name}</h1><div className="detail-price">{product.oldPrice && <del>{money(product.oldPrice)} USD</del>} <strong>{money(product.price)} USD</strong></div><p className="detail-description">An elegant expression of considered design. Crafted to bring a subtle touch of brilliance to every moment, this piece is made to be treasured.</p><div className="stock"><span/> In stock · Ready to ship</div>
        <div className="purchase-row"><div className="qty-control large"><button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity"><Minus size={14}/></button><span aria-live="polite">{qty}</span><button type="button" onClick={() => setQty((value) => Math.min(99, value + 1))} aria-label="Increase quantity"><Plus size={14}/></button></div><button type="button" className="button button-dark" onClick={() => cart.add(product, qty)}>Add to Cart <ArrowUpRight size={15}/></button></div>
        <button type="button" className="button button-outline full" onClick={addAndCheckout}>Buy Now</button>
        <div className="product-specs"><div><span>SKU</span><b>{product.sku}</b></div><div><span>STOCK</span><b>Available</b></div><div><span>GOLD KARAT</span><b>{product.karat}</b></div><div><span>GOLD WEIGHT</span><b>{product.weight}</b></div><div><span>GOLD COLOR</span><b>{product.color}</b></div></div>
      </Reveal>
    </div></section>
    <section className="section detail-tabs"><div className="container"><div className="tabs" role="tablist" aria-label="Product information">{['Description', 'Specification', 'Reviews'].map((name) => <button type="button" role="tab" aria-selected={tab === name} className={tab === name ? 'active' : ''} onClick={() => setTab(name)} key={name}>{name}</button>)}</div><div className="tab-content" role="tabpanel">{tab === 'Description' ? <p>A timeless piece with a modern point of view. Thoughtfully selected materials and refined details make this design an effortless addition to your jewellery wardrobe.</p> : tab === 'Specification' ? <div className="spec-table"><span>Gold Karat</span><b>{product.karat}</b><span>Gold Weight</span><b>{product.weight}</b><span>Gold Colour</span><b>{product.color}</b><span>SKU</span><b>{product.sku}</b></div> : <div><p>Reviews are coming soon. We would love to hear about your experience with this piece.</p></div>}</div></div></section>
    <section className="section"><div className="container"><SectionHeading eyebrow="YOU MAY ALSO LOVE" title="Complete the look"/><ProductGrid items={products.filter((item) => item.id !== product.id).slice(0, 4)}/></div></section>
  </>;
}

export function AboutPage() {
  const team = [
    ['John Carter','CEO & Co-Founder',referenceAssets.team[0]],
    ['Rosie Chan','CTO & Co-Founder',referenceAssets.team[1]],
    ['Alex Smith','VP of Sales',referenceAssets.team[2]],
    ['R. Sophia','VP of Sales',referenceAssets.team[3]]
  ];
  const testimonials = [
    ['Sarah Doe','Customer',referenceAssets.testimonials[0]],
    ['Evelyn Scott','Customer',referenceAssets.testimonials[1]],
    ['Tracy Shaw','Customer',referenceAssets.testimonials[2]],
    ['Mia Armas','Customer',referenceAssets.testimonials[3]],
    ['Ava Brooks','Customer',referenceAssets.testimonials[4]]
  ];
  const testimonialCopy = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspee varius enim in eros elementum tristi. Duis cursus, mi quis viverra ornare, eros dolor.';
  return <>
    <section className="about-intro"><div className="container about-intro-grid"><div><span className="eyebrow">ABOUT JEWELLERYZ</span><h1>We are passionate innovators, dedicated to <em>transforming ideas into impactful solutions.</em></h1><p>we help brands thrive in a dynamic market.</p></div><img src={referenceAssets.about[0]} alt="Jewelleryz about page editorial"/></div></section>
    <section className="section about-story"><div className="container about-story-grid"><img src={referenceAssets.about[1]} alt="Jewelleryz about visual"/><div><span className="eyebrow">OUR STORY</span><h2>About Us</h2><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aper.</p><div className="about-values"><div><img src={referenceAssets.about[2]} alt=""/><h3>Our Mission</h3><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aper.</p></div><div><img src={referenceAssets.about[3]} alt=""/><h3>Our Vision</h3><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aper.</p></div></div><Link className="button button-dark" to="/category/rings">Buy Now <ArrowUpRight size={15}/></Link></div></div></section>
    <section className="about-stats"><div className="container about-stats-grid"><div><strong>94%</strong><b>Customer satisfaction</b><p>Lorem ipsum dolor sit am et consectet adipiscing.</p></div><div><strong>$200K</strong><b>Monthly Sales</b><p>Lorem ipsum dolor sit am et consectet adipiscing.</p></div><div><strong>7%</strong><b>Capital raised</b><p>Lorem ipsum dolor sit am et consectet adipiscing.</p></div><div><strong>1%</strong><b>Company growth</b><p>Lorem ipsum dolor sit am et consectet adipiscing.</p></div></div></section>
    <section className="section about-team"><div className="container"><SectionHeading eyebrow="MEET THE PEOPLE" title="Our Team" copy="Our team at ElectronicZ is comprised of passionate individuals dedicated to bringing you the best in electronic innovation.onal."/><div className="about-team-grid">{team.map(([name,role,image])=><article key={name}><img src={image} alt={name}/><h3>{name}</h3><p>{role}</p></article>)}</div></div></section>
    <section className="section about-testimonials soft-section"><div className="container"><SectionHeading eyebrow="KIND WORDS" title="Testimonials" copy="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."/><div className="about-testimonial-grid">{testimonials.map(([name,role,image])=><article key={name}><p>{testimonialCopy}</p><div><img src={image} alt={name}/><span><b>{name}</b><small>{role}</small></span></div></article>)}</div></div></section>
  </>;
}

export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name.trim() || !data.message.trim()) { setError('Please complete the required fields.'); return; }
    try {
      const messages = JSON.parse(localStorage.getItem('jz-contact-messages') || '[]');
      localStorage.setItem('jz-contact-messages', JSON.stringify([...messages, { ...data, submittedAt: new Date().toISOString() }]));
      setSent(true); setError(''); form.reset();
    } catch { setError('Your message could not be saved. Please try again.'); }
  };
  return <><PageHero eyebrow="WE'D LOVE TO HEAR FROM YOU" title="Get in touch" copy="Questions, thoughtful notes or a little help choosing a piece — we're here."/><section className="section"><div className="container contact-layout"><div className="contact-info"><span className="eyebrow">CONTACT DETAILS</span><h2>Let's start<br/><em>a conversation.</em></h2><p>Our team is here to help with product enquiries, orders and everything in between.</p><div className="contact-detail"><small>MAIL US</small><a href="mailto:jewelleryz@nexoy.com">jewelleryz@nexoy.com</a></div><div className="contact-detail"><small>CALL US</small><a href="tel:+14155550022">(415) 555-0XX2</a></div><div className="contact-detail"><small>ADDRESS</small><span>North Carolina, USA</span></div></div>
    <form className="contact-form" onSubmit={submit}><h3>Send us a message</h3><div className="form-row"><label>Your name<input name="name" required minLength="2" maxLength="80" autoComplete="name" placeholder="Name"/></label><label>Email address<input name="email" type="email" required maxLength="254" autoComplete="email" placeholder="Email"/></label></div><label>Subject<input name="subject" maxLength="120" placeholder="How can we help?"/></label><label>Message<textarea name="message" required minLength="10" maxLength="2000" rows="5" placeholder="Write your message..."/></label><button className="button button-dark" type="submit">Send message <ArrowUpRight size={15}/></button>{sent && <p className="success-note" role="status">Thank you. Your message has been received in this demo.</p>}{error && <p className="form-error" role="alert">{error}</p>}</form>
  </div></section></>;
}

export function BlogPage() {
  return <><PageHero eyebrow="THE JOURNAL" title="Notes on style" copy="Stories, inspiration and a closer look at the details we love."/><section className="section"><div className="container blog-grid blog-grid-page">{blogs.map((blog, index) => <Reveal key={blog.id}><Link className="blog-card" to={'/post/' + blog.id}><div className="blog-image"><img src={blog.image} alt={blog.title}/><span>0{index + 1}</span></div><div className="blog-meta"><span>{blog.category}</span><span>{blog.date}</span></div><h3>{blog.title}</h3><p>{blog.body}</p><span className="text-link">Read story <ArrowUpRight size={14}/></span></Link></Reveal>)}</div></section></>;
}

export function BlogDetail() {
  const { id } = useParams();
  const blog = blogs.find((item) => item.id === id);
  if (!blog) return <NotFoundPage />;
  const [query, setQuery] = useState('');
  const author = id === 'jewelry-trends-to-elevate-your-style' || id === 'how-to-make-your-jewelry-stand-out' ? 'Clifton Strosin' : 'Harold Kozey';
  const popular = blogs.filter(item => item.id !== id && item.title.toLowerCase().includes(query.toLowerCase())).slice(0,4);
  return <><div className="container breadcrumbs"><Link to="/blog"><ArrowLeft size={14}/> Journal</Link></div><div className="article-layout container"><article className="article"><div className="article-head"><span className="eyebrow">{blog.category}</span><h1>{blog.title}</h1><div className="article-byline">{author} <span>·</span> {blog.date}</div></div><img className="article-cover" src={blog.image} alt={blog.title}/><div className="article-body"><h2>The Art of Choosing the Perfect Jewelry for Every Occasion</h2><p>Jewelry is more than just an accessory; it’s a statement of style, emotion, and personal expression. Whether you're dressing up for a wedding or adding a subtle touch to your daily look, the right jewelry can elevate any outfit. In this post, we'll guide you through selecting the perfect pieces for every occasion.</p><h2>1. Understand the Occasion</h2><p>Before picking out your jewelry, consider the event or moment you're dressing for. Are you attending a formal gathering or a casual day out? Formal events may call for more elaborate pieces like statement necklaces or diamond earrings, while casual outings are perfect for minimalist designs.</p><h2>2. Match Jewelry with Your Outfit</h2><p>Your jewelry should complement, not compete with, your outfit. Bold jewelry goes well with simple, monochromatic outfits. Minimalist jewelry shines when paired with patterned or textured clothing. Gemstone jewelry adds a pop of color to neutral outfits.</p><h2>3. Mixing Metals: The New Trend</h2><p>Gone are the days when you had to choose between gold or silver. Mixing metals is now a trendy way to add a modern twist to your look. You can combine gold, silver, rose gold, and even platinum for a unique, layered style.</p><h2>4. Caring for Your Jewelry</h2><p>Proper care is essential to maintain the shine and longevity of your jewelry. Store jewelry properly in individual pouches or boxes, avoid water exposure and clean regularly with a soft cloth.</p><blockquote>“Jewelry has the power to be this one little thing that makes you feel unique.” — Elizabeth Taylor</blockquote><h2>Conclusion</h2><p>Choosing the right jewelry is about more than just style—it’s about finding pieces that resonate with you. Whether it's a wedding, an evening out, or a simple day at work, let your jewelry speak volumes about who you are.</p><Link className="text-link" to="/category/necklace">Explore the collection <ArrowUpRight size={15}/></Link></div></article><aside className="article-sidebar"><form onSubmit={event=>event.preventDefault()}><input aria-label="Search articles" placeholder="Search…" value={query} onChange={event=>setQuery(event.target.value)}/><button type="submit" aria-label="Search"><ArrowUpRight size={15}/></button></form><h3>Popular Post</h3>{popular.map(item=><Link to={'/post/'+item.id} key={item.id} className="popular-post"><span>{item.category}</span><small>{item.date}</small><b>{item.title}</b></Link>)}<h3>Categories</h3>{['Wedding','Jewellery','Diamond','Rings'].map(name=><Link key={name} to="/blog" className="sidebar-category">› {name}</Link>)}<h3>Tags</h3><div className="article-tags">{['Bangles','Casual','Ceremony','Outing','Offers','Latest'].map(tag=><span key={tag}>{tag}</span>)}</div></aside></div></>;
}

export function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState('');
  const submit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity() || cart.items.length === 0 || placed) return;
    const customer = Object.fromEntries(new FormData(event.currentTarget).entries());
    const order = { id: `JZ-${Date.now()}`, customer, items: cart.items, subtotal: cart.subtotal, createdAt: new Date().toISOString() };
    try {
      const orders = JSON.parse(localStorage.getItem('jz-orders') || '[]');
      localStorage.setItem('jz-orders', JSON.stringify([...orders, order]));
      cart.clear(); cart.setOpen(false); setPlaced(true); setError('');
    } catch { setError('The demo order could not be saved in this browser. Please try again.'); }
  };
  return <><PageHero eyebrow="ALMOST YOURS" title="Checkout" copy="A few details and your new favourite piece will be on its way."/><section className="section"><div className="container checkout-layout"><form className="checkout-form" onSubmit={submit}><h2>Billing details</h2><div className="form-row"><label>First name<input name="firstName" required minLength="2" autoComplete="given-name"/></label><label>Last name<input name="lastName" required minLength="2" autoComplete="family-name"/></label></div><label>Email address<input name="email" type="email" required autoComplete="email"/></label><label>Street address<input name="address" required minLength="5" autoComplete="street-address"/></label><div className="form-row"><label>City<input name="city" required autoComplete="address-level2"/></label><label>Postal code<input name="postalCode" required autoComplete="postal-code"/></label></div><label>Country<select name="country" required defaultValue=""><option value="" disabled>Select country</option><option>India</option><option>United States</option><option>United Kingdom</option><option>Canada</option></select></label><label>Order notes<textarea name="notes" rows="3" maxLength="1000" placeholder="Optional notes"/></label><h2>Payment</h2><div className="payment-note">Secure payment · Demo checkout (no real payment is collected)</div><button className="button button-dark full" type="submit" disabled={!cart.items.length || placed}>{placed ? 'Order placed' : `Place order · ${money(cart.subtotal)}`}</button>{placed && <p className="success-note" role="status">Thank you! Your demo order has been saved successfully. <button type="button" className="inline-link" onClick={() => navigate('/')}>Continue shopping</button></p>}{error && <p className="form-error" role="alert">{error}</p>}</form>
    <aside className="order-summary"><h3>Your order</h3>{cart.items.length ? cart.items.map((item) => <div className="summary-line" key={item.id}><img src={item.image} alt={item.alt || item.name}/><div><b>{item.name}</b><span>Qty {item.qty}</span></div><strong>{money(item.price * item.qty)}</strong></div>) : <p>Your cart is empty. <Link to="/category/rings">Continue shopping</Link></p>}<div className="subtotal"><span>Subtotal</span><b>{money(cart.subtotal)}</b></div><div className="subtotal"><span>Shipping</span><b>Calculated at checkout</b></div><div className="subtotal total"><span>Total</span><b>{money(cart.subtotal)}</b></div></aside>
  </div></section></>;
}


const infoContent = {
  faq: { eyebrow: 'HERE TO HELP', title: 'Frequently asked questions', copy: 'Helpful answers about shopping with Jewelleryz.', sections: [
    ['How can I place an order?', 'Browse a collection, open a product and choose Add to Cart. When you are ready, continue to checkout and enter your delivery details.'],
    ['Can I change or cancel an order?', 'Contact our customer care team as soon as possible with your order reference. Changes depend on whether the order has entered fulfilment.'],
    ['How can I track my order?', 'Once an order is dispatched, tracking details are normally shared with the email address used at checkout.'],
    ['What payment methods are accepted?', 'The current website includes a demonstration checkout only. No real payment is collected or processed.'],
    ['How should I care for my jewellery?', 'Keep pieces dry, store them separately and clean gently with a soft, lint-free cloth. Visit our Jewellery Care page for more guidance.']
  ]},
  shipping: { eyebrow: 'DELIVERY & RETURNS', title: 'Shipping & returns', copy: 'The details that help your treasured pieces reach you with care.', sections: [
    ['Order processing', 'Orders are prepared with care. Processing and dispatch estimates should be confirmed with customer care before purchase.'],
    ['Delivery information', 'Delivery availability, charges and estimated arrival dates depend on the destination. The current checkout is a front-end demonstration and does not create a real shipment.'],
    ['Returns and exchanges', 'If you need help with a return or exchange, contact jewelleryz@nexoy.com with your order reference and reason for your request. Items should remain in their original condition and packaging.'],
    ['Need assistance?', 'Our team can help with order questions at jewelleryz@nexoy.com.']
  ]},
  care: { eyebrow: 'KEEP THE GLOW', title: 'Jewellery care guide', copy: 'A few thoughtful habits help preserve the beauty of your favourite pieces.', sections: [
    ['Store pieces separately', 'Keep jewellery in a soft pouch or lined box to reduce scratches and tangling. Fasten chains before storing.'],
    ['Avoid moisture and chemicals', 'Remove jewellery before swimming, showering, exercising or applying perfume, lotions and household cleaners.'],
    ['Clean gently', 'Wipe with a clean, soft cloth after wearing. Avoid abrasive materials and harsh cleaning products.'],
    ['Schedule professional care', 'For delicate settings or valuable pieces, consult a qualified jeweller for inspection and cleaning.']
  ]},
  size: { eyebrow: 'THE RIGHT FIT', title: 'Size guide', copy: 'Use these simple tips as a starting point when choosing your fit.', sections: [
    ['Ring sizing', 'Measure an existing ring that fits comfortably across its inside diameter, or wrap a narrow strip of paper around the base of your finger and measure its circumference. Measure at the end of the day when fingers are warm.'],
    ['Bracelet sizing', 'Measure your wrist snugly with a flexible tape and add your preferred amount of ease. A closer fit feels secure; extra ease creates a looser drape.'],
    ['Necklace lengths', 'Necklace placement varies with body shape and neckline. Compare the stated chain length with a piece you already own to understand where it will sit.'],
    ['Between sizes?', 'For the most accurate fit, ask a professional jeweller or contact our team before ordering.']
  ]},
  privacy: { eyebrow: 'YOUR INFORMATION', title: 'Privacy policy', copy: 'A clear explanation of how this demonstration website handles information.', sections: [
    ['Information you enter', 'Contact and checkout forms on this demonstration site are front-end experiences. Demo orders may be stored locally in your browser; no payment is processed.'],
    ['Local browser storage', 'Cart contents and demo order details may be saved in localStorage so they remain available between visits on the same browser.'],
    ['Third-party services', 'Some product and editorial images are loaded from externally hosted image sources and may make requests to those providers.'],
    ['Questions', 'For privacy questions, contact jewelleryz@nexoy.com. This sample policy should be reviewed and replaced with legally approved terms before a real store launches.']
  ]},
  terms: { eyebrow: 'PLEASE READ', title: 'Terms & conditions', copy: 'Important information about using this demonstration storefront.', sections: [
    ['Demonstration website', 'This website is a front-end demonstration. Product availability, pricing, checkout and order confirmation are illustrative and do not constitute a real purchase.'],
    ['Product information', 'Product descriptions, specifications and images are provided for demonstration purposes and may not represent a live inventory.'],
    ['Intellectual property', 'Brand assets and content should only be used by their respective rights holders. Do not reproduce content without appropriate permission.'],
    ['Updates', 'These terms may be updated as the demonstration evolves. A production store should publish terms reviewed for its operating jurisdiction.']
  ]}
};

export function InfoPage({ type }) {
  const content = infoContent[type] || infoContent.faq;
  return <>
    <PageHero eyebrow={content.eyebrow} title={content.title} copy={content.copy}/>
    <section className="section info-page-section"><div className="container info-page-container">
      {content.sections.map(([heading, body], index) => <article className="info-page-item" key={heading}>
        {type === 'faq' ? <details><summary><span>{heading}</span><b>+</b></summary><p>{body}</p></details> : <><span className="info-index">0{index + 1}</span><div><h2>{heading}</h2><p>{body}</p></div></>}
      </article>)}
      <div className="info-contact-note"><p>Still need a hand?</p><Link className="button button-dark" to="/contact">Contact our team <ArrowUpRight size={15}/></Link></div>
    </div></section>
  </>;
}
