import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'vanvas_website_cms_data';

const getInitialState = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading CMS data from localStorage', e);
    }
  }

  return {
    hero: {
      badgeText: "Premier Architectural & Interior Studio",
      headlinePrefix: "Timeless Spaces Sculpted in ",
      highlightWord: "Warmth",
      headlineSuffix: ", Stone & Wood.",
      subtitle: "From grand residences and bespoke walk-in wardrobes to modern corporate headquarters — we curate turnkey interiors that balance ergonomic precision with soulful luxury.",
      ctaPrimaryText: "Book Free 3D Consultation",
      ctaSecondaryText: "Explore Portfolio",
      coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      coverTitle: "Worli Penthouse Residence",
      coverSubtitle: "Smoked Oak & Monolithic Travertine",
      trustRating: "4.9/5 (550+ Homes)",
      warrantyYears: 10,
    },
    stats: [
      { id: 'stat-1', number: 550, suffix: '+', label: 'Bespoke Spaces Delivered', sub: 'Villas, Penthouses & Offices' },
      { id: 'stat-2', number: 99.4, suffix: '%', label: 'Client Satisfaction', sub: 'Based on 400+ Verified Audits' },
      { id: 'stat-3', number: 18, suffix: '+', label: 'Architecture & Design Awards', sub: 'National & Global Recognition' },
      { id: 'stat-4', number: 10, suffix: ' Yrs', label: 'Comprehensive Warranty', sub: 'Zero-Maintenance Peace of Mind' },
    ],
    testimonials: [
      {
        id: "t-1",
        name: "Vikram & Ananya Singhania",
        role: "Villa Owners, Palm Beach Road",
        rating: 5,
        comment: "Vanvas completely elevated our 6,000 sq.ft villa beyond what we could have imagined. Their bespoke walnut woodwork and lighting choreography make our home feel like an Aman resort.",
        projectType: "Full Villa Architecture & Interior",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        featuredOnHome: true,
        published: true
      },
      {
        id: "t-2",
        name: "Rajesh Malhotra",
        role: "Managing Director, Solarium Capital",
        rating: 5,
        comment: "Designing an office for 150+ executives while maintaining an air of quiet luxury and acoustic privacy is tough. Vanvas delivered a world-class workspace that elevated our team's productivity.",
        projectType: "12,000 sq.ft Corporate Office",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
        featuredOnHome: true,
        published: true
      },
      {
        id: "t-3",
        name: "Dr. Rohini Mehta",
        role: "Homeowner, Worli Penthouse",
        rating: 5,
        comment: "The walk-in wardrobe and master suite they crafted are pure magic. The sensor lighting, German sliding systems, and customized jewelry trays make getting ready an absolute joy.",
        projectType: "Walk-in Wardrobe & Suite",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
        featuredOnHome: true,
        published: true
      }
    ],
    estimatorRates: {
      contemporaryRate: 1350,
      luxuryRate: 1950,
      bespokeRate: 2850,
      kitchenCost: 380000,
      wardrobeUnitCost: 160000,
      smartLightingCost: 120000,
      currency: "INR (₹)"
    },
    studios: [
      {
        id: "loc-mumbai",
        city: "Mumbai Flagship Studio",
        address: "Floor 4, The Opus, Worli Sea Face, Mumbai 400018",
        phone: "+91 (022) 8900 4500",
        email: "mumbai@vanvasdesign.com",
        hours: "Mon - Sat: 10:00 AM - 7:30 PM",
        published: true
      },
      {
        id: "loc-bangalore",
        city: "Bengaluru Experience Center",
        address: "100ft Road, HAL 2nd Stage, Indiranagar, Bengaluru 560038",
        phone: "+91 (080) 6700 8900",
        email: "bengaluru@vanvasdesign.com",
        hours: "Mon - Sat: 10:00 AM - 7:30 PM",
        published: true
      },
      {
        id: "loc-delhi",
        city: "Delhi NCR Studio",
        address: "Golf Course Extension Road, Sector 58, Gurugram 122011",
        phone: "+91 (0124) 4300 2100",
        email: "delhi@vanvasdesign.com",
        hours: "Mon - Sat: 10:00 AM - 7:30 PM",
        published: true
      }
    ]
  };
};

const persistState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to persist CMS data', e);
  }
};

const websiteContentSlice = createSlice({
  name: 'websiteContent',
  initialState: getInitialState(),
  reducers: {
    updateHeroContent: (state, action) => {
      state.hero = { ...state.hero, ...action.payload };
      persistState(state);
    },
    updateStats: (state, action) => {
      state.stats = action.payload;
      persistState(state);
    },
    updateEstimatorRates: (state, action) => {
      state.estimatorRates = { ...state.estimatorRates, ...action.payload };
      persistState(state);
    },
    addTestimonial: (state, action) => {
      state.testimonials.unshift({
        ...action.payload,
        id: `t-${Date.now().toString().slice(-4)}`,
        published: true,
        featuredOnHome: true
      });
      persistState(state);
    },
    updateTestimonial: (state, action) => {
      const idx = state.testimonials.findIndex(t => t.id === action.payload.id);
      if (idx !== -1) {
        state.testimonials[idx] = { ...state.testimonials[idx], ...action.payload };
        persistState(state);
      }
    },
    deleteTestimonial: (state, action) => {
      state.testimonials = state.testimonials.filter(t => t.id !== action.payload);
      persistState(state);
    },
    toggleTestimonialPublish: (state, action) => {
      const item = state.testimonials.find(t => t.id === action.payload);
      if (item) {
        item.published = !item.published;
        persistState(state);
      }
    },
    updateStudio: (state, action) => {
      const idx = state.studios.findIndex(s => s.id === action.payload.id);
      if (idx !== -1) {
        state.studios[idx] = { ...state.studios[idx], ...action.payload };
        persistState(state);
      }
    },
    addStudio: (state, action) => {
      state.studios.push({
        ...action.payload,
        id: `loc-${Date.now().toString().slice(-4)}`,
        published: true
      });
      persistState(state);
    },
    deleteStudio: (state, action) => {
      state.studios = state.studios.filter(s => s.id !== action.payload);
      persistState(state);
    }
  }
});

export const {
  updateHeroContent,
  updateStats,
  updateEstimatorRates,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  toggleTestimonialPublish,
  updateStudio,
  addStudio,
  deleteStudio
} = websiteContentSlice.actions;

export default websiteContentSlice.reducer;
