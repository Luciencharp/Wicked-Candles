import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Heart, ChevronRight, Star, Menu } from 'lucide-react';

// Product Data
const PRODUCTS = [
  {
    id: 1,
    name: "Toxic Masculinity",
    scent: "Axe Body Spray",
    description: "The overwhelming scent of unsolicited gym advice and locker room confidence. Notes of ego, protein powder, and explaining things you already know.",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1602874797272-611f5324e3ec?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1602874797272-611f5324e3ec?w=800&q=80",
      "https://images.unsplash.com/photo-1602874801030-0f26c968d0e7?w=800&q=80"
    ],
    burnTime: "40+ hours",
    wax: "Natural Soy Wax Blend",
    wick: "100% Cotton",
    category: "Best Sellers",
    featured: true
  },
  {
    id: 2,
    name: "Gaslight Glow",
    scent: "Burnt Yankee Candle",
    description: "That's not what happened and you know it. Smells like selective memory, false narratives, and making you question your own reality.",
    price: 28.00,
    image: "https://res.cloudinary.com/dkyouxkqm/image/upload/v1767714863/ChatGPT_Image_Jan_6_2026_12_55_19_AM_rfohji.png",
    images: [
      "https://res.cloudinary.com/dkyouxkqm/image/upload/v1767714863/ChatGPT_Image_Jan_6_2026_12_55_19_AM_rfohji.png",
      "https://res.cloudinary.com/dkyouxkqm/image/upload/v1767714863/ChatGPT_Image_Jan_6_2026_12_55_19_AM_rfohji.png"
    ],
    burnTime: "40+ hours",
    wax: "Natural Soy Wax Blend",
    wick: "100% Cotton",
    category: "Best Sellers",
    featured: true
  },
  {
    id: 3,
    name: "Mansplain Musk",
    scent: "Cheap Cologne",
    description: "Let me explain why you're wrong about everything. Notes of condescension, unsolicited advice, and actually it's pronounced...",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&q=80",
      "https://images.unsplash.com/photo-1602991503601-33f040a47f0c?w=800&q=80"
    ],
    burnTime: "40+ hours",
    wax: "Natural Soy Wax Blend",
    wick: "100% Cotton",
    category: "Best Sellers",
    featured: true
  }
];

const REVIEWS = [
  {
    name: "Sarah K.",
    rating: 5,
    title: "Finally, a candle that gets it!",
    text: "I bought 'Toxic Masculinity' as a joke gift for my brother and he actually loved it. The scent is surprisingly good and the name makes everyone laugh.",
    verified: true
  },
  {
    name: "Mike R.",
    rating: 5,
    title: "Best gag gift ever",
    text: "Got 'Mansplain Musk' for my dad on Father's Day. He thought it was hilarious and now it's a running joke in our family.",
    verified: true
  },
  {
    name: "Jessica T.",
    rating: 5,
    title: "Quality + Humor = Perfect",
    text: "These candles are actually really well made. Burns evenly, smells great, and the names are absolutely chef's kiss.",
    verified: true
  }
];

const WickedSite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const updateQuantity = (id, change) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigateTo = (page, product = null) => {
    setCurrentPage(page);
    setSelectedProduct(product);
    setActiveImage(0);
    window.scrollTo(0, 0);
  };

  // Navigation Component
  const Navigation = () => (
    <nav style={{
      position: 'sticky',
      top: 0,
      background: '#ffffff',
      borderBottom: '1px solid #e8e8e8',
      zIndex: 999,
      padding: '1rem 2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div
          onClick={() => navigateTo('home')}
          style={{
            fontSize: '1.75rem',
            fontWeight: '800',
            letterSpacing: '-0.01em',
            cursor: 'pointer',
            textTransform: 'uppercase'
          }}
        >
          WICK'ED
        </div>

        <div style={{
          display: 'flex',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <button
            onClick={() => navigateTo('shop')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#1a1a1a'
            }}
          >
            Shop
          </button>
          <button
            onClick={() => navigateTo('about')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#1a1a1a'
            }}
          >
            About
          </button>
          <button
            onClick={() => navigateTo('faq')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#1a1a1a'
            }}
          >
            FAQ
          </button>
          <button
            onClick={() => navigateTo('contact')}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              color: '#1a1a1a'
            }}
          >
            Contact
          </button>

          <button
            onClick={() => setShowCart(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              padding: '0.5rem'
            }}
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: 0,
                right: 0,
                background: '#1a1a1a',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                color: '#fff'
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );

  // Homepage
  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section style={{
        padding: '6rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #f8f8f8 0%, #e8e8e8 100%)'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            fontWeight: '900',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            A Scent For Every
            <br />
            <span style={{ fontStyle: 'italic' }}>Personality</span>
          </h1>
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '2.5rem',
            color: '#555',
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            Gift your friends & family a candle that captures their best traits. Premium scents with personality.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            style={{
              padding: '1rem 3rem',
              background: '#1a1a1a',
              color: '#fff',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '700',
              borderRadius: '30px',
              cursor: 'pointer',
              letterSpacing: '0.05em'
            }}
          >
            SHOP NOW
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: '6rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            Best Sellers
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem'
          }}>
            {PRODUCTS.map(product => (
              <div
                key={product.id}
                onClick={() => navigateTo('product', product)}
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  aspectRatio: '1/1',
                  background: '#f8f8f8',
                  marginBottom: '1.5rem',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '0.5rem',
                  fontStyle: 'italic'
                }}>
                  {product.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#999',
                  marginBottom: '1rem'
                }}>
                  Scent: {product.scent}
                </p>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: '800'
                }}>
                  ${product.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section style={{ padding: '6rem 2rem', background: '#f8f8f8' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            What Our Customers Say
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {REVIEWS.map((review, idx) => (
              <div
                key={idx}
                style={{
                  background: '#ffffff',
                  padding: '2rem',
                  borderRadius: '12px',
                  border: '1px solid #e8e8e8'
                }}
              >
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1rem' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#1a1a1a" stroke="none" />
                  ))}
                </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  marginBottom: '0.75rem'
                }}>
                  {review.title}
                </h4>
                <p style={{
                  color: '#555',
                  lineHeight: 1.6,
                  marginBottom: '1rem'
                }}>
                  "{review.text}"
                </p>
                <div style={{
                  fontSize: '0.9rem',
                  color: '#999',
                  fontWeight: '600'
                }}>
                  {review.name}
                  {review.verified && <span style={{ color: '#4CAF50', marginLeft: '0.5rem' }}>✓ Verified</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section style={{ padding: '6rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            marginBottom: '2rem'
          }}>
            Crafted for Quality
          </h2>
          <p style={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            color: '#555',
            marginBottom: '3rem'
          }}>
            Our candles celebrate the quirks that make everyone unique. Each scent is hand-poured with premium soy wax and named for those unforgettable personality traits. The perfect gift for people who don't take themselves too seriously.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {[
              'Natural Soy Wax',
              '40+ Hour Burn',
              'Cotton Wicks',
              'Cruelty Free'
            ].map(feature => (
              <div key={feature}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '0.5rem'
                }}>
                  🕯️
                </div>
                <div style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: '#1a1a1a'
                }}>
                  {feature}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  // Shop Page
  const ShopPage = () => (
    <div style={{ padding: '4rem 2rem', background: '#ffffff', minHeight: '80vh' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '900',
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          All Candles
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '3rem'
        }}>
          {PRODUCTS.map(product => (
            <div
              key={product.id}
              onClick={() => navigateTo('product', product)}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                aspectRatio: '1/1',
                background: '#f8f8f8',
                marginBottom: '1.5rem',
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                fontStyle: 'italic'
              }}>
                {product.name}
              </h3>
              <p style={{
                fontSize: '0.9rem',
                color: '#999',
                marginBottom: '1rem'
              }}>
                Scent: {product.scent}
              </p>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '800'
              }}>
                ${product.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Product Detail Page
  const ProductPage = ({ product }) => {
    if (!product) return <div>Product not found</div>;

    return (
      <div style={{ padding: '4rem 2rem', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start'
          }}>
            {/* Product Images */}
            <div>
              <div style={{
                aspectRatio: '1/1',
                background: '#f8f8f8',
                marginBottom: '1rem',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <img
                  src={product.images[activeImage]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem' }}>
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    style={{
                      width: '80px',
                      height: '80px',
                      background: '#f8f8f8',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: activeImage === idx ? '2px solid #1a1a1a' : 'none'
                    }}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: '700',
                letterSpacing: '0.1em',
                color: '#999',
                marginBottom: '1rem',
                textTransform: 'uppercase'
              }}>
                {product.category}
              </div>
              
              <h1 style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '900',
                marginBottom: '1rem',
                fontStyle: 'italic',
                lineHeight: 1.1
              }}>
                {product.name}
              </h1>
              
              <div style={{
                fontSize: '1.1rem',
                color: '#666',
                marginBottom: '2rem',
                fontWeight: '600'
              }}>
                Scent: {product.scent}
              </div>
              
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                marginBottom: '2rem'
              }}>
                ${product.price}
              </div>
              
              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: '#555',
                marginBottom: '2.5rem'
              }}>
                {product.description}
              </p>
              
              <button
                onClick={() => addToCart(product)}
                style={{
                  width: '100%',
                  padding: '1.25rem',
                  background: '#1a1a1a',
                  color: '#fff',
                  border: 'none',
                  fontSize: '1rem',
                  fontWeight: '700',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  marginBottom: '2rem'
                }}
              >
                ADD TO CART
              </button>
              
              <div style={{
                borderTop: '1px solid #e8e8e8',
                paddingTop: '2rem'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  Product Details
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.95rem',
                  color: '#666'
                }}>
                  <div>• Burn Time: {product.burnTime}</div>
                  <div>• Wax: {product.wax}</div>
                  <div>• Wick: {product.wick}</div>
                  <div>• Cruelty-Free & Non-Toxic</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // About Page
  const AboutPage = () => (
    <div style={{ padding: '4rem 2rem', background: '#ffffff', minHeight: '80vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '900',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          About Wick'ed
        </h1>
        
        <div style={{
          fontSize: '1.15rem',
          lineHeight: 1.8,
          color: '#555'
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            We started Wick'ed because we believe the best gifts celebrate what makes someone uniquely them – whether that's their confidence, their quirkiness, or their lovably frustrating habits.
          </p>
          
          <p style={{ marginBottom: '1.5rem' }}>
            Each candle is hand-poured with premium soy wax and named for those unforgettable personality traits we all recognize. From "Toxic Masculinity" to "Gaslight Glow," our candles are the perfect gift for friends and family who appreciate humor and quality in equal measure.
          </p>
          
          <p style={{ marginBottom: '1.5rem' }}>
            Quality is our priority. Every Wick'ed candle burns for 40+ hours, uses 100% cotton wicks, and is completely non-toxic and cruelty-free. We believe the best gifts are both meaningful and memorable.
          </p>
          
          <p>
            Find the perfect scent that captures someone's personality. Your friends and family will love the laugh – and the luxury.
          </p>
        </div>
      </div>
    </div>
  );

  // FAQ Page
  const FAQPage = () => {
    const faqs = [
      {
        q: "How long do the candles burn?",
        a: "Each Wick'ed candle has a burn time of 40+ hours with proper care."
      },
      {
        q: "What are the candles made of?",
        a: "Our candles are made with natural soy wax blend, 100% cotton wicks, and premium fragrance oils. They're non-toxic, cruelty-free, and free from harmful chemicals."
      },
      {
        q: "Do they actually smell good?",
        a: "Yes! Despite the hilarious names, these are premium candles with carefully crafted scents. They smell amazing."
      },
      {
        q: "Are these good gifts?",
        a: "Absolutely! They're perfect for that friend who has a sense of humor and appreciates quality products."
      },
      {
        q: "What's your return policy?",
        a: "We want you to love your candles! If you're not satisfied, contact us within 30 days for a return or exchange."
      },
      {
        q: "Do you offer wholesale or custom candles?",
        a: "Yes! Contact us for wholesale inquiries or custom candle orders for events, businesses, or special occasions."
      }
    ];

    return (
      <div style={{ padding: '4rem 2rem', background: '#ffffff', minHeight: '80vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '900',
            marginBottom: '3rem',
            textAlign: 'center'
          }}>
            FAQ
          </h1>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{
                padding: '2rem',
                background: '#f8f8f8',
                borderRadius: '12px'
              }}>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  {faq.q}
                </h3>
                <p style={{
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  color: '#555'
                }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Contact Page
  const ContactPage = () => (
    <div style={{ padding: '4rem 2rem', background: '#ffffff', minHeight: '80vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: '900',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Contact Us
        </h1>
        
        <p style={{
          fontSize: '1.1rem',
          textAlign: 'center',
          color: '#555',
          marginBottom: '3rem'
        }}>
          Questions about our candles? Looking for the perfect gift? Want to create custom scents? Drop us a line!
        </p>
        
        <form style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          <input
            type="text"
            placeholder="Name"
            style={{
              padding: '1rem 1.25rem',
              fontSize: '1rem',
              border: '2px solid #e8e8e8',
              borderRadius: '8px',
              outline: 'none'
            }}
          />
          <input
            type="email"
            placeholder="Email"
            style={{
              padding: '1rem 1.25rem',
              fontSize: '1rem',
              border: '2px solid #e8e8e8',
              borderRadius: '8px',
              outline: 'none'
            }}
          />
          <textarea
            placeholder="Message"
            rows={6}
            style={{
              padding: '1rem 1.25rem',
              fontSize: '1rem',
              border: '2px solid #e8e8e8',
              borderRadius: '8px',
              outline: 'none',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '1.25rem',
              background: '#1a1a1a',
              color: '#fff',
              border: 'none',
              fontSize: '1rem',
              fontWeight: '700',
              borderRadius: '30px',
              cursor: 'pointer',
              letterSpacing: '0.05em'
            }}
          >
            SEND MESSAGE
          </button>
        </form>
        
        <div style={{
          marginTop: '3rem',
          textAlign: 'center',
          color: '#666'
        }}>
          <p>Email: hello@wickedcandles.com</p>
          <p>Follow us @wickedcandles</p>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer style={{
      background: '#1a1a1a',
      color: '#ffffff',
      padding: '4rem 2rem 2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        <div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            marginBottom: '1rem',
            textTransform: 'uppercase'
          }}>
            WICK'ED
          </h3>
          <p style={{
            opacity: 0.8,
            fontSize: '0.95rem',
            lineHeight: 1.6
          }}>
            A scent for every personality. Hand-poured candles that celebrate what makes you, you.
          </p>
        </div>
        
        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Shop
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            opacity: 0.8
          }}>
            <button onClick={() => navigateTo('shop')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
              All Candles
            </button>
            <button onClick={() => navigateTo('shop')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
              Best Sellers
            </button>
          </div>
        </div>
        
        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            About
          </h4>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            opacity: 0.8
          }}>
            <button onClick={() => navigateTo('about')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
              Our Story
            </button>
            <button onClick={() => navigateTo('faq')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
              FAQ
            </button>
            <button onClick={() => navigateTo('contact')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
              Contact
            </button>
          </div>
        </div>
        
        <div>
          <h4 style={{
            fontSize: '1rem',
            fontWeight: '700',
            marginBottom: '1rem'
          }}>
            Newsletter
          </h4>
          <p style={{
            opacity: 0.8,
            fontSize: '0.9rem',
            marginBottom: '1rem'
          }}>
            New scents & gift ideas
          </p>
          <input
            type="email"
            placeholder="your@email.com"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '0.9rem'
            }}
          />
        </div>
      </div>
      
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        paddingTop: '2rem',
        textAlign: 'center',
        opacity: 0.6,
        fontSize: '0.9rem'
      }}>
        © 2024 Wick'ed Candles. A scent for every personality.
      </div>
    </footer>
  );

  return (
    <div style={{
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
      background: '#ffffff',
      minHeight: '100vh'
    }}>
      <Navigation />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'product' && <ProductPage product={selectedProduct} />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'faq' && <FAQPage />}
      {currentPage === 'contact' && <ContactPage />}
      
      <Footer />

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <>
          <div
            onClick={() => setShowCart(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
              zIndex: 1999
            }}
          />
          <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: '480px',
            background: '#ffffff',
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.2)',
            animation: 'slideInRight 0.3s ease-out'
          }}>
            <div style={{
              padding: '2rem',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                margin: 0
              }}>
                Cart ({cartCount})
              </h2>
              <button
                onClick={() => setShowCart(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.5rem'
                }}
              >
                <X size={28} />
              </button>
            </div>

            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '2rem'
            }}>
              {cart.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  color: '#999'
                }}>
                  <p style={{ fontSize: '1.1rem' }}>Your cart is empty</p>
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {cart.map(item => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '1rem',
                        padding: '1rem',
                        background: '#f8f8f8',
                        borderRadius: '8px'
                      }}
                    >
                      <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#e8e8e8',
                        borderRadius: '6px',
                        overflow: 'hidden',
                        flexShrink: 0
                      }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{
                          fontSize: '1rem',
                          fontWeight: '700',
                          marginBottom: '0.25rem'
                        }}>
                          {item.name}
                        </h3>
                        <p style={{
                          fontSize: '0.85rem',
                          color: '#999',
                          marginBottom: '1rem'
                        }}>
                          {item.scent}
                        </p>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            padding: '0.25rem 0.75rem'
                          }}>
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.25rem'
                              }}
                            >
                              <Minus size={14} />
                            </button>
                            <span style={{
                              minWidth: '20px',
                              textAlign: 'center',
                              fontWeight: '600'
                            }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.25rem'
                              }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span style={{
                            fontSize: '1.25rem',
                            fontWeight: '800'
                          }}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div style={{
                padding: '2rem',
                borderTop: '1px solid #f0f0f0',
                background: '#f8f8f8'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  fontWeight: '800'
                }}>
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    setShowCart(false);
                    setShowCheckout(true);
                  }}
                  style={{
                    width: '100%',
                    padding: '1.25rem',
                    background: '#1a1a1a',
                    border: 'none',
                    borderRadius: '30px',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    letterSpacing: '0.05em'
                  }}
                >
                  CHECKOUT
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <>
          <div
            onClick={() => setShowCheckout(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)',
              zIndex: 2999
            }}
          />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: '#ffffff',
            borderRadius: '16px',
            zIndex: 3000,
            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              padding: '2rem',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{
                fontSize: '1.75rem',
                fontWeight: '800',
                margin: 0
              }}>
                Checkout
              </h2>
              <button
                onClick={() => setShowCheckout(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={28} />
              </button>
            </div>

            <div style={{ padding: '2rem' }}>
              <div style={{
                background: '#f9f5f2',
                padding: '1.5rem',
                marginBottom: '2rem',
                borderRadius: '8px',
                border: '1px solid #e8dfd7'
              }}>
                <p style={{
                  margin: 0,
                  fontSize: '0.9rem',
                  color: '#666'
                }}>
                  🎭 Demo checkout - no real payment. In production, integrates with Stripe/Shopify/PayPal.
                </p>
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  marginBottom: '1rem'
                }}>
                  Order Summary
                </h3>
                {cart.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0.75rem 0',
                      borderBottom: '1px solid #f5f5f5'
                    }}
                  >
                    <span>{item.name} × {item.quantity}</span>
                    <span style={{ fontWeight: '700' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '1.25rem 0',
                  fontSize: '1.5rem',
                  fontWeight: '800'
                }}>
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  style={{
                    padding: '1rem',
                    fontSize: '1rem',
                    border: '1px solid #e8e8e8',
                    borderRadius: '8px'
                  }}
                />
                <input
                  type="email"
                  placeholder="Email"
                  style={{
                    padding: '1rem',
                    fontSize: '1rem',
                    border: '1px solid #e8e8e8',
                    borderRadius: '8px'
                  }}
                />
                <input
                  type="text"
                  placeholder="Card Number (4242 4242 4242 4242)"
                  style={{
                    padding: '1rem',
                    fontSize: '1rem',
                    border: '1px solid #e8e8e8',
                    borderRadius: '8px'
                  }}
                />
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    style={{
                      flex: 1,
                      padding: '1rem',
                      fontSize: '1rem',
                      border: '1px solid #e8e8e8',
                      borderRadius: '8px'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    style={{
                      flex: 1,
                      padding: '1rem',
                      fontSize: '1rem',
                      border: '1px solid #e8e8e8',
                      borderRadius: '8px'
                    }}
                  />
                </div>

                <button
                  onClick={() => {
                    alert(`🎉 Mock Order Placed!\n\nTotal: $${cartTotal.toFixed(2)}`);
                    setShowCheckout(false);
                    setCart([]);
                  }}
                  style={{
                    marginTop: '1rem',
                    padding: '1.25rem',
                    background: '#1a1a1a',
                    border: 'none',
                    borderRadius: '30px',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    letterSpacing: '0.05em'
                  }}
                >
                  COMPLETE PURCHASE
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        
        * { box-sizing: border-box; }
        body { margin: 0; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f5f5f5; }
        ::-webkit-scrollbar-thumb { background: #1a1a1a; border-radius: 4px; }
      `}</style>
    </div>
  );
};

export default WickedSite;