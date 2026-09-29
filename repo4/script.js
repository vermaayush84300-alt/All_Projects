const HERO_SLIDES = [
    { img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=420&fit=crop", title: "Great Indian Sale", sub: "Up to 80% off on Electronics" },
    { img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&h=420&fit=crop", title: "Fashion Week Deals", sub: "Trendy styles at unbeatable prices" },
    { img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=420&fit=crop", title: "Smart Home Savings", sub: "Up to 60% off on Home & Kitchen" },
];

const ALL_PRODUCTS = [
    { id: 1, cat: "Electronics", title: "Dell XPS 15 Laptop", price: 89999, mrp: 109999, rating: 4.5, reviews: 2341, brand: "Dell", img: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell/dell-15-intel-3530/media-gallery/laptop-dell-dc15250nt-sl-plastic-usbc-data-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1372&qlt=100,1&resMode=sharp2&size=1372,804&chrss=full", imgs: ["https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/dell/dell-15-intel-3530/media-gallery/laptop-dell-dc15250nt-sl-plastic-usbc-data-gallery-2.psd?fmt=png-alpha&pscan=auto&scl=1&hei=804&wid=1372&qlt=100,1&resMode=sharp2&size=1372,804&chrss=full", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop"], desc: "Intel Core i9, 32GB RAM, 1TB SSD, NVIDIA RTX 4070, 15.6\" OLED Display. Perfect for professionals and creators.", highlights: ["Intel Core i9-13900H", "32 GB DDR5 RAM", "1 TB NVMe SSD", "NVIDIA RTX 4070 8GB", "15.6\" 3.5K OLED 120Hz"] },
    { id: 2, cat: "Electronics", title: "Apple MacBook Pro 14\"", price: 149900, mrp: 179900, rating: 4.8, reviews: 5120, brand: "Apple", img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1611186871525-d6ef96d5faec?w=600&h=600&fit=crop"], desc: "Apple M3 Pro chip, 18GB unified memory, 512GB SSD. The most powerful MacBook ever.", highlights: ["Apple M3 Pro Chip", "18 GB Unified Memory", "512 GB SSD", "Liquid Retina XDR Display", "Up to 18 hours battery"] },
    { id: 3, cat: "Electronics", title: "Samsung 27\" 4K Monitor", price: 32999, mrp: 44999, rating: 4.4, reviews: 876, brand: "Samsung", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&h=600&fit=crop"], desc: "27-inch 4K UHD monitor with IPS panel, 144Hz refresh rate, HDR600.", highlights: ["27\" 4K UHD IPS Panel", "144 Hz Refresh Rate", "HDR 600", "USB-C 90W PD", "Height Adjustable Stand"] },
    { id: 4, cat: "Electronics", title: "Mechanical Gaming Keyboard", price: 5499, mrp: 7999, rating: 4.3, reviews: 3210, brand: "Corsair", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&h=600&fit=crop"], desc: "RGB mechanical keyboard with Cherry MX Red switches, full anti-ghosting, and per-key RGB.", highlights: ["Cherry MX Red Switches", "Per-Key RGB Lighting", "Full N-Key Rollover", "Aluminium Frame", "Detachable USB-C Cable"] },
    { id: 5, cat: "Beauty", title: "MAC Ruby Woo Lipstick", price: 1699, mrp: 2000, rating: 4.7, reviews: 9823, brand: "MAC", img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop"], desc: "Iconic matte red lipstick. Long-lasting, intensely pigmented formula loved by professionals worldwide.", highlights: ["Matte Finish", "Highly Pigmented", "Long-Lasting Formula", "Paraben Free", "3g Net Weight"] },
    { id: 6, cat: "Beauty", title: "Chanel Bleu De Chanel EDP", price: 12500, mrp: 15000, rating: 4.9, reviews: 4512, brand: "Chanel", img: "https://tse1.mm.bing.net/th/id/OIP.W520XVfa4UqqK31psdcw8QHaFl?rs=1&pid=ImgDetMain&o=7&rm=3", imgs: ["https://tse1.mm.bing.net/th/id/OIP.W520XVfa4UqqK31psdcw8QHaFl?rs=1&pid=ImgDetMain&o=7&rm=3"], desc: "An aromatic-woody fragrance for men. Fresh, clean and sensual. 100ml Eau de Parfum.", highlights: ["Aromatic-Woody Scent", "100 ml Bottle", "Long-lasting 8+ hrs", "Top: Citrus & Mint", "Base: Cedarwood & Sandalwood"] },
    { id: 7, cat: "Beauty", title: "The Ordinary Niacinamide 10%", price: 799, mrp: 1200, rating: 4.6, reviews: 18200, brand: "The Ordinary", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=600&fit=crop"], desc: "High-strength vitamin and mineral blemish formula. Reduces appearance of pores and uneven skin tone.", highlights: ["10% Niacinamide", "1% Zinc", "30ml Bottle", "Vegan Formula", "Suitable for All Skin Types"] },
    { id: 8, cat: "Beauty", title: "Maybelline Fit Me Foundation", price: 499, mrp: 750, rating: 4.4, reviews: 7654, brand: "Maybelline", img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop"], desc: "Lightweight, natural-coverage foundation that matches skin tone exactly.", highlights: ["Natural Coverage", "SPF 18", "40 Shades", "Oil-Free Formula", "30 ml"] },
    { id: 9, cat: "Home & Kitchen", title: "De'Longhi Espresso Machine", price: 18999, mrp: 25000, rating: 4.6, reviews: 3411, brand: "De'Longhi", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop"], desc: "Barista-quality espresso at home. 15-bar pressure, integrated milk frother, 1.8L water tank.", highlights: ["15 Bar Pressure", "Built-in Frother", "1.8 L Water Tank", "1450 W Power", "Advanced Thermostat"] },
    { id: 10, cat: "Home & Kitchen", title: "Nutribullet Pro Blender", price: 6499, mrp: 9999, rating: 4.5, reviews: 5622, brand: "NutriBullet", img: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&h=600&fit=crop"], desc: "900W high-speed blender for smoothies, shakes and more. Includes 2 cups, 2 lids.", highlights: ["900 W Motor", "Stainless Blades", "BPA-Free Cups", "2 x 700ml Cups", "Dishwasher Safe"] },
    { id: 11, cat: "Home & Kitchen", title: "Prestige Non-stick Cookware Set", price: 3499, mrp: 5999, rating: 4.3, reviews: 8120, brand: "Prestige", img: "https://bf1af2.akinoncloudcdn.com/products/2024/09/10/41375/73679354-185c-48b3-849b-91d0f2f34c18_size3840_cropCenter.jpg", imgs: ["https://bf1af2.akinoncloudcdn.com/products/2024/09/10/41375/73679354-185c-48b3-849b-91d0f2f34c18_size3840_cropCenter.jpg"], desc: "5-piece non-stick cookware set. Induction compatible, PFOA-free coating.", highlights: ["5-Piece Set", "Induction Compatible", "PFOA-Free Coating", "Hard Anodised Body", "Glass Lids Included"] },
    { id: 12, cat: "Home & Kitchen", title: "Victorinox Chef Knife Set", price: 4299, mrp: 6500, rating: 4.7, reviews: 2890, brand: "Victorinox", img: "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&h=600&fit=crop"], desc: "Swiss-made professional kitchen knife set. High carbon stainless steel, ergonomic fibrox handle.", highlights: ["High Carbon Steel", "Ergonomic Handle", "3-Knife Set", "Dishwasher Safe", "Swiss Made"] },
    { id: 13, cat: "Watches", title: "Fossil Gen 6 Smartwatch", price: 19995, mrp: 28000, rating: 4.4, reviews: 3120, brand: "Fossil", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop"], desc: "Wear OS smartwatch with Snapdragon 4100+, SpO2 sensor, 3-day battery life.", highlights: ["Wear OS by Google", "Snapdragon 4100+", "Heart Rate + SpO2", "1.28\" AMOLED Display", "Water Resistant 3ATM"] },
    { id: 14, cat: "Watches", title: "Titan Edge Ultra Slim Watch", price: 8995, mrp: 12500, rating: 4.6, reviews: 6780, brand: "Titan", img: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&h=600&fit=crop"], desc: "World's slimmest watch at 3.5mm. Sapphire crystal glass, genuine leather strap.", highlights: ["3.5mm Slim Profile", "Sapphire Crystal Glass", "Genuine Leather Strap", "Titanium Case", "5-Year Warranty"] },
    { id: 15, cat: "Mobiles", title: "Apple iPhone 15 Pro 256GB", price: 134900, mrp: 149900, rating: 4.8, reviews: 21300, brand: "Apple", img: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop"], desc: "A17 Pro chip, titanium design, 48MP main camera system, USB-C. The most powerful iPhone ever.", highlights: ["A17 Pro Chip", "48 MP Triple Camera", "Titanium Frame", "USB-C Connectivity", "Always-On Display"] },
    { id: 16, cat: "Mobiles", title: "Samsung Galaxy S24 Ultra", price: 129999, mrp: 144999, rating: 4.7, reviews: 14500, brand: "Samsung", img: "https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1567581935884-3349723552ca?w=600&h=600&fit=crop"], desc: "200MP camera, built-in S Pen, Snapdragon 8 Gen 3, 5000mAh battery.", highlights: ["200 MP Main Camera", "Built-in S Pen", "Snapdragon 8 Gen 3", "5000 mAh Battery", "12 GB RAM"] },
    { id: 17, cat: "Mobiles", title: "OnePlus 12 256GB", price: 64999, mrp: 74999, rating: 4.6, reviews: 9870, brand: "OnePlus", img: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop"], desc: "Snapdragon 8 Gen 3, 100W SuperVOOC fast charging, Hasselblad tuned cameras.", highlights: ["Snapdragon 8 Gen 3", "100W SuperVOOC", "50 MP Hasselblad Camera", "5400 mAh Battery", "16 GB RAM"] },
    { id: 18, cat: "Health", title: "Himalaya Vitamin C Tablets", price: 199, mrp: 299, rating: 4.5, reviews: 12300, brand: "Himalaya", img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=600&fit=crop"], desc: "Vitamin C 500mg with zinc. Boosts immunity, acts as antioxidant, 60 tablets.", highlights: ["500 mg Vitamin C", "Zinc 10 mg", "60 Tablets", "Antioxidant Formula", "Ayurvedic Ingredients"] },
    { id: 19, cat: "Health", title: "MuscleBlaze Whey Protein 2kg", price: 2899, mrp: 3999, rating: 4.6, reviews: 34000, brand: "MuscleBlaze", img: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&h=600&fit=crop"], desc: "25g protein per serving, 5.5g BCAA, low fat. Rich Chocolate flavour.", highlights: ["25 g Protein/Serving", "5.5 g BCAA", "Low Fat & Sugar", "2 kg Pack", "60 Servings"] },
    { id: 20, cat: "Books", title: "Atomic Habits – James Clear", price: 399, mrp: 599, rating: 4.8, reviews: 56200, brand: "James Clear", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=600&fit=crop"], desc: "The #1 New York Times bestseller. Tiny changes, remarkable results. A proven system to build good habits.", highlights: ["320 Pages", "Paperback", "International Bestseller", "Practical Framework", "Clear & Concise Writing"] },
    { id: 21, cat: "Books", title: "The Psychology of Money", price: 349, mrp: 499, rating: 4.7, reviews: 41000, brand: "Morgan Housel", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=600&fit=crop"], desc: "Timeless lessons on wealth, greed, and happiness. 19 short stories about the strange ways people think about money.", highlights: ["256 Pages", "Paperback", "Financial Wisdom", "19 Stories", "Global Bestseller"] },
    { id: 22, cat: "Accessories", title: "Sony WF-1000XM5 Earbuds", price: 19990, mrp: 26990, rating: 4.8, reviews: 8900, brand: "Sony", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop"], desc: "Industry-leading noise cancellation. 8hr battery + 16hr case, LDAC audio, IPX4 water resistant.", highlights: ["Active Noise Cancelling", "8 + 16 Hr Battery", "LDAC Hi-Res Audio", "IPX4 Water Resistant", "Multipoint Connection"] },
    { id: 23, cat: "Accessories", title: "Sony WH-1000XM5 Headphones", price: 24990, mrp: 34990, rating: 4.9, reviews: 12400, brand: "Sony", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"], desc: "Best-in-class noise cancellation, 30hr battery, multipoint pairing, ultra-light design.", highlights: ["Best-in-Class ANC", "30 Hr Battery", "Multipoint Pairing", "Ultra-light 250g", "Hi-Res Wireless Audio"] },
    { id: 24, cat: "Accessories", title: "Anker 65W GaN Charger", price: 2499, mrp: 3999, rating: 4.6, reviews: 22100, brand: "Anker", img: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&h=600&fit=crop"], desc: "65W 3-port GaN fast charger. Charge laptop + 2 devices simultaneously. Ultra compact.", highlights: ["65 W Total Output", "3 Ports (2C + 1A)", "GaN Technology", "Universal Compatibility", "18-Month Warranty"] },
    { id: 25, cat: "Furniture", title: "Durian 3-Seater Sofa", price: 34999, mrp: 54999, rating: 4.5, reviews: 1820, brand: "Durian", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop"], desc: "Premium leatherette 3-seater sofa with high-density foam cushions and solid wood frame.", highlights: ["Leatherette Upholstery", "High-Density Foam", "Solid Wood Frame", "3-Seater", "5-Year Warranty"] },
    { id: 26, cat: "Furniture", title: "Green Soul Ergonomic Chair", price: 18999, mrp: 28000, rating: 4.6, reviews: 5430, brand: "Green Soul", img: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=600&fit=crop"], desc: "Ergonomic office chair with lumbar support, adjustable armrests, breathable mesh back.", highlights: ["Lumbar Support", "Adjustable Armrests", "Breathable Mesh", "Tilt Lock Mechanism", "Upto 130 kg Load"] },
    { id: 27, cat: "Clothing", title: "Levi's 511 Slim Fit Jeans", price: 2999, mrp: 4599, rating: 4.5, reviews: 18900, brand: "Levi's", img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=600&fit=crop"], desc: "Classic slim-fit jeans in stretch denim. Sits below waist, slim through hip and thigh.", highlights: ["99% Cotton, 1% Elastane", "Slim Fit", "5-Pocket Styling", "Machine Washable", "Sizes 28–40"] },
    { id: 28, cat: "Clothing", title: "Nike Air Max 270 Sneakers", price: 9995, mrp: 12995, rating: 4.7, reviews: 32100, brand: "Nike", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop", imgs: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"], desc: "Nike's first lifestyle Air unit offers a super-plush, super-responsive ride.", highlights: ["Max Air 270 Unit", "Mesh Upper", "Foam Midsole", "Rubber Outsole", "Sizes UK 6–12"] },
];

const SECTIONS = [
    { key: "computers", title: "Best Sellers in Computers & Accessories", ids: [1, 2, 3, 4] },
    { key: "beauty", title: "Best Sellers in Beauty", ids: [5, 6, 7, 8] },
    { key: "kitchen", title: "Up to 60% off | Home & Kitchen", ids: [9, 10, 11, 12] },
    { key: "watches", title: "Min. 50% off | Unique Watch Finds", ids: [13, 14] },
    { key: "mobiles", title: "Up to 75% off | Brand Mobiles", ids: [15, 16, 17] },
    { key: "health", title: "Up to 30% off | Medicines & Health", ids: [18, 19] },
    { key: "books", title: "Best Sellers in Books", ids: [20, 21] },
    { key: "accessories", title: "Up to 55% off | Electronics Accessories", ids: [22, 23, 24] },
    { key: "furniture", title: "Up to 40% Off | Trendy Furniture", ids: [25, 26] },
    { key: "clothing", title: "Best Sellers in Clothing & Accessories", ids: [27, 28] },
];

// ─── STATE ───────────────────────────────────────────────────────────────────
let cart = [];
let currentProduct = null;
let currentImgIdx = 0;
let heroIdx = 0;
let heroTimer = null;
let user = null;
let signInStep = 'email';

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = n => '₹' + n.toLocaleString('en-IN');
const disc = (p, m) => Math.round((1 - p / m) * 100);
const stars = r => '★'.repeat(Math.floor(r)) + '☆'.repeat(5 - Math.floor(r));

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('visible');
    setTimeout(() => t.classList.remove('visible'), 2500);
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function renderHero() {
    const s = HERO_SLIDES[heroIdx];
    document.getElementById('hero-img').src = s.img;
    document.getElementById('hero-title').textContent = s.title;
    document.getElementById('hero-sub').textContent = s.sub;
    const dots = document.getElementById('hero-dots');
    dots.innerHTML = '';
    HERO_SLIDES.forEach((_, i) => {
        const b = document.createElement('button');
        b.className = 'hero-dot' + (i === heroIdx ? ' active' : '');
        b.onclick = () => { heroIdx = i; renderHero(); };
        dots.appendChild(b);
    });
}

function heroNav(dir) {
    heroIdx = (heroIdx + dir + HERO_SLIDES.length) % HERO_SLIDES.length;
    renderHero();
}

function startHeroAuto() {
    heroTimer = setInterval(() => heroNav(1), 4000);
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────
function renderSections(sections) {
    const container = document.getElementById('sections-container');
    container.innerHTML = '';
    sections.forEach(sec => {
        const prods = sec.ids.map(id => ALL_PRODUCTS.find(p => p.id === id)).filter(Boolean);
        if (!prods.length) return;
        const secDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        titleDiv.className = 'section-title';
        titleDiv.textContent = sec.title;
        secDiv.appendChild(titleDiv);
        const grid = document.createElement('div');
        grid.className = 'grid';
        prods.forEach(p => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
        <div class="card-title">${p.title}</div>
        <div class="stars">${stars(p.rating)}<span class="rating-val">${p.rating}</span></div>
        <div class="reviews-count">(${p.reviews.toLocaleString()} reviews)</div>
        <div class="price-row">
          <span class="price">${fmt(p.price)}</span>
          <span class="mrp">${fmt(p.mrp)}</span>
          <span class="discount">${disc(p.price, p.mrp)}% off</span>
        </div>
        <button class="add-to-cart-btn">Add to Cart</button>
      `;
            card.querySelector('img').onclick = () => openProduct(p);
            card.querySelector('.card-title').onclick = () => openProduct(p);
            card.querySelector('.stars').onclick = () => openProduct(p);
            card.querySelector('.price-row').onclick = () => openProduct(p);
            card.querySelector('.add-to-cart-btn').onclick = (e) => { e.stopPropagation(); addToCart(p, 1); };
            grid.appendChild(card);
        });
        secDiv.appendChild(grid);
        container.appendChild(secDiv);
    });
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────
function doSearch() {
    const q = document.getElementById('search-input').value.trim().toLowerCase();
    if (!q) { renderSections(SECTIONS); return; }
    const matched = ALL_PRODUCTS.filter(p => p.title.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
    const ids = [...new Set(matched.map(p => p.id))];
    renderSections([{ key: 'search', title: `Results for "${q}"`, ids }]);
}

document.getElementById('search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
    if (e.key === 'Escape') { document.getElementById('search-input').value = ''; renderSections(SECTIONS); }
});

// ─── CART ────────────────────────────────────────────────────────────────────
function addToCart(product, qty) {
    const ex = cart.find(i => i.id === product.id);
    if (ex) ex.qty += qty;
    else cart.push({ ...product, qty });
    updateCartBadge();
    showToast(`"${product.title.slice(0, 30)}..." added to cart`);
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCartBadge();
    renderCart();
}

function clearCart() {
    cart = [];
    updateCartBadge();
    renderCart();
    showToast('Cart cleared');
}

function updateCartBadge() {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    const badge = document.getElementById('cart-badge');
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
}

function renderCart() {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const count = cart.reduce((s, i) => s + i.qty, 0);
    document.getElementById('cart-heading').textContent = `Shopping Cart (${count})`;
    const body = document.getElementById('cart-body');
    const footer = document.getElementById('cart-footer');
    if (!cart.length) {
        body.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><h3>Your cart is empty</h3><p>Add items to get started</p></div>`;
        footer.style.display = 'none';
        return;
    }
    footer.style.display = 'block';
    document.getElementById('cart-subtotal-label').textContent = `Subtotal (${count} item${count !== 1 ? 's' : ''}):`;
    document.getElementById('cart-subtotal-price').textContent = fmt(total);
    body.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.title}" data-id="${item.id}" class="cart-item-img" />
      <div class="cart-item-info">
        <div class="cart-item-title" data-id="${item.id}">${item.title}</div>
        <div class="cart-item-qty">Qty: ${item.qty}</div>
        <div class="cart-item-price">${fmt(item.price * item.qty)}</div>
        <button class="cart-item-remove" data-id="${item.id}">Remove</button>
      </div>
    </div>
  `).join('');
    body.querySelectorAll('.cart-item-img, .cart-item-title').forEach(el => {
        el.onclick = () => {
            closeCart();
            const p = ALL_PRODUCTS.find(x => x.id === +el.dataset.id);
            if (p) openProduct(p);
        };
    });
    body.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.onclick = () => removeFromCart(+btn.dataset.id);
    });
}

function openCart() { renderCart(); document.getElementById('cart-overlay').classList.remove('hidden'); document.getElementById('cart-side').classList.add('open'); }
function closeCart() { document.getElementById('cart-overlay').classList.add('hidden'); document.getElementById('cart-side').classList.remove('open'); }

function checkout() {
    if (!user) { closeCart(); openSignIn(); return; }
    showToast('Order placed successfully! 🎉');
}

// ─── PRODUCT MODAL ───────────────────────────────────────────────────────────
function openProduct(p) {
    currentProduct = p;
    currentImgIdx = 0;
    document.getElementById('modal-breadcrumb').innerHTML = `${p.cat} &rsaquo; <strong>${p.brand}</strong>`;
    document.getElementById('pd-main-img').src = p.imgs[0];
    document.getElementById('pd-title').textContent = p.title;
    document.getElementById('pd-brand').innerHTML = `by <span>${p.brand}</span>`;
    document.getElementById('pd-rating-row').innerHTML = `<span class="stars">${stars(p.rating)}<span class="rating-val">${p.rating}</span></span><span class="ratings-link">${p.reviews.toLocaleString()} ratings</span>`;
    document.getElementById('pd-price-row').innerHTML = `<span class="pd-price">${fmt(p.price)}</span><span class="pd-mrp">${fmt(p.mrp)}</span><span class="pd-discount">${disc(p.price, p.mrp)}% off</span>`;
    document.getElementById('pd-desc').textContent = p.desc;
    document.getElementById('pd-highlights').innerHTML = p.highlights.map(h => `<div class="pd-highlight"><span class="check">✓</span><span>${h}</span></div>`).join('');
    // thumbs
    const thumbsDiv = document.getElementById('pd-thumbs');
    if (p.imgs.length > 1) {
        thumbsDiv.style.display = 'flex';
        thumbsDiv.innerHTML = p.imgs.map((im, i) => `<img src="${im}" alt="" class="pd-thumb ${i === 0 ? 'active' : ''}" data-idx="${i}" />`).join('');
        thumbsDiv.querySelectorAll('.pd-thumb').forEach(t => {
            t.onclick = () => {
                currentImgIdx = +t.dataset.idx;
                document.getElementById('pd-main-img').src = p.imgs[currentImgIdx];
                thumbsDiv.querySelectorAll('.pd-thumb').forEach(x => x.classList.remove('active'));
                t.classList.add('active');
            };
        });
    } else {
        thumbsDiv.style.display = 'none';
    }
    // right panel
    document.getElementById('pdr-price').textContent = fmt(p.price);
    document.getElementById('pdr-mrp').textContent = fmt(p.mrp);
    document.getElementById('pdr-savings').textContent = `You save ${fmt(p.mrp - p.price)} (${disc(p.price, p.mrp)}%)`;
    document.getElementById('pdr-seller').textContent = `${p.brand} Official Store`;
    document.getElementById('pd-qty').value = 1;
    document.getElementById('product-overlay').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProduct() {
    document.getElementById('product-overlay').classList.add('hidden');
    document.body.style.overflow = '';
    currentProduct = null;
}

function addCurrentToCart() {
    if (!currentProduct) return;
    const qty = +document.getElementById('pd-qty').value;
    addToCart(currentProduct, qty);
    closeProduct();
}

function buyNow() {
    if (!currentProduct) return;
    const qty = +document.getElementById('pd-qty').value;
    addToCart(currentProduct, qty);
    closeProduct();
    openCart();
}

function openSignIn() { document.getElementById('signin-overlay').classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
function closeSignIn() { document.getElementById('signin-overlay').classList.add('hidden'); document.body.style.overflow = ''; signInStep = 'email'; document.getElementById('signin-step-email').style.display = 'block'; document.getElementById('signin-step-password').style.display = 'none'; }
function toggleSignIn() { user ? signOut() : openSignIn(); }

function backToEmail() {
    signInStep = 'email';
    document.getElementById('signin-step-email').style.display = 'block';
    document.getElementById('signin-step-password').style.display = 'none';
}

function doSignIn() {
    if (signInStep === 'email') {
        const email = document.getElementById('signin-email-input').value.trim();
        if (!email.includes('@')) { showToast('Enter a valid email'); return; }
        signInStep = 'password';
        document.getElementById('signin-email-display').textContent = email;
        document.getElementById('signin-step-email').style.display = 'none';
        document.getElementById('signin-step-password').style.display = 'block';
        setTimeout(() => document.getElementById('signin-pass-input').focus(), 50);
        return;
    }
    const pass = document.getElementById('signin-pass-input').value;
    if (pass.length < 4) { showToast('Password must be 4+ characters'); return; }
    const email = document.getElementById('signin-email-input').value.trim();
    user = { name: email.split('@')[0], email };
    closeSignIn();
    updateUserUI();
    showToast('Signed in successfully! 🎉');
}

function signOut() { user = null; updateUserUI(); showToast('Signed out'); }

function updateUserUI() {
    document.getElementById('nav-greeting').textContent = user ? `Hello, ${user.name}` : 'Hello, sign in';
    const ps = document.getElementById('page-signin');
    if (user) {
        ps.innerHTML = `
      <div class="welcome-name">Welcome back, ${user.name}! 👋</div>
      <div class="welcome-email">You're signed in as ${user.email}</div>
      <button class="signout-btn" onclick="signOut()">Sign Out</button>
    `;
    } else {
        ps.innerHTML = `
      <h3>See personalised recommendations</h3>
      <button class="page-signin-btn" onclick="openSignIn()">Sign in</button>
      <p>New customer? <a onclick="openSignIn()">Start here.</a></p>
    `;
    }
}
renderHero();
startHeroAuto();
renderSections(SECTIONS);