export const initialKPIs = [
  {
    id: "total-revenue",
    title: "Total Executed Revenue",
    value: "₹ 4.82 Cr",
    change: "+18.4%",
    isPositive: true,
    period: "vs last month",
    iconName: "TrendingUp"
  },
  {
    id: "active-projects",
    title: "Active On-Site Projects",
    value: "28",
    change: "+4 new",
    isPositive: true,
    period: "12 in handover stage",
    iconName: "Home"
  },
  {
    id: "new-leads",
    title: "Consultation Inquiries",
    value: "142",
    change: "+24.8%",
    isPositive: true,
    period: "38 pending review",
    iconName: "Users"
  },
  {
    id: "conversion-rate",
    title: "3D to Contract Ratio",
    value: "68.5%",
    change: "+5.2%",
    isPositive: true,
    period: "industry benchmark 42%",
    iconName: "Sparkles"
  }
];

export const monthlyRevenueData = [
  { month: "Jan", revenue: 28.5, consultations: 45, target: 25 },
  { month: "Feb", revenue: 34.2, consultations: 52, target: 30 },
  { month: "Mar", revenue: 42.0, consultations: 68, target: 35 },
  { month: "Apr", revenue: 39.5, consultations: 60, target: 35 },
  { month: "May", revenue: 48.2, consultations: 84, target: 40 },
  { month: "Jun", revenue: 56.4, consultations: 95, target: 45 },
  { month: "Jul", revenue: 62.0, consultations: 110, target: 50 },
  { month: "Aug", revenue: 58.8, consultations: 104, target: 50 },
  { month: "Sep", revenue: 71.5, consultations: 128, target: 55 },
  { month: "Oct", revenue: 78.2, consultations: 142, target: 60 },
];

export const categoryDistributionData = [
  { name: "Luxury Residential", value: 45, color: "#5C381E" },
  { name: "Corporate HQ", value: 25, color: "#8B5A2B" },
  { name: "Bespoke Wardrobes", value: 18, color: "#C5A059" },
  { name: "Gourmet Kitchens", value: 12, color: "#D3C5B4" },
];

export const initialProjectsList = [
  {
    id: "proj-101",
    title: "The Elysian Grand Penthouse",
    client: "Vikram Singhania",
    clientEmail: "vikram.s@singhaniagroup.com",
    clientPhone: "+91 98200 45112",
    category: "Residential",
    subcategory: "Penthouse & Living",
    location: "Worli Sea Face, Mumbai",
    area: "4,850 sq.ft",
    budget: "₹ 85 Lakhs",
    progress: 85,
    status: "In Execution",
    startDate: "2026-05-10",
    deadline: "2026-10-15",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    leadArchitect: "Aarav Deshmukh",
    materials: ["Italian Travertine", "Smoked Walnut Wood", "Brushed Brass"],
    highlights: ["Double-height living lounge", "Bespoke floating bar in nero marquina", "Smart motorized acoustic panels"]
  },
  {
    id: "proj-102",
    title: "Solarium Capital Corporate Office",
    client: "Rajesh Malhotra",
    clientEmail: "rmalhotra@solariumcap.com",
    clientPhone: "+91 98190 88231",
    category: "Commercial / Office",
    subcategory: "Executive Suite & Boardrooms",
    location: "BKC, Mumbai",
    area: "12,400 sq.ft",
    budget: "₹ 1.65 Cr",
    progress: 60,
    status: "In Execution",
    startDate: "2026-06-01",
    deadline: "2026-11-30",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    leadArchitect: "Kabir Varma",
    materials: ["Fluted Oak Slats", "Acoustic Felt", "Black Stainless Steel"],
    highlights: ["24-seater solid oak conference table", "Circadian adaptive lighting system"]
  },
  {
    id: "proj-103",
    title: "Aurelia Master Suite & Walk-in Closet",
    client: "Dr. Rohini Mehta",
    clientEmail: "dr.rohini@mehtahospitals.org",
    clientPhone: "+91 97001 22987",
    category: "Wardrobes",
    subcategory: "Walk-in & Dressing",
    location: "Jubilee Hills, Hyderabad",
    area: "950 sq.ft",
    budget: "₹ 24 Lakhs",
    progress: 100,
    status: "Completed",
    startDate: "2026-07-15",
    deadline: "2026-08-30",
    image: "https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80",
    leadArchitect: "Meera Sen",
    materials: ["Tinted Fluted Glass", "Champagne Aluminum", "Velvet Lined Drawers"],
    highlights: ["Dehumidified watch & jewelry cases", "Touchless infrared cabinet illumination"]
  },
  {
    id: "proj-104",
    title: "Monolith Minimalist Gourmet Kitchen",
    client: "Siddharth Oberoi",
    clientEmail: "siddharth@oberoiventures.com",
    clientPhone: "+91 98334 11098",
    category: "Modular Kitchen",
    subcategory: "Island & Prep Zone",
    location: "Indiranagar, Bangalore",
    area: "620 sq.ft",
    budget: "₹ 18 Lakhs",
    progress: 40,
    status: "3D Approved",
    startDate: "2026-08-20",
    deadline: "2026-10-05",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    leadArchitect: "Aarav Deshmukh",
    materials: ["Dekton Sintered Stone", "Anti-fingerprint Matt Lacquer", "Smoked Walnut"],
    highlights: ["Concealed spice racks & pocket doors", "Under-counter dual zone wine cellar"]
  },
  {
    id: "proj-105",
    title: "Sereno Japandi Master Sanctuary",
    client: "Ananya & Rohan Mehra",
    clientEmail: "ananya.mehra@gmail.com",
    clientPhone: "+91 99100 33452",
    category: "Residential",
    subcategory: "Master Bedroom",
    location: "Golf Course Road, Gurgaon",
    area: "720 sq.ft",
    budget: "₹ 22 Lakhs",
    progress: 95,
    status: "Snagging / Handover",
    startDate: "2026-06-15",
    deadline: "2026-09-25",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=80",
    leadArchitect: "Meera Sen",
    materials: ["White Oak", "Natural Lime Plaster", "Linen Bedding"],
    highlights: ["Handcrafted lime-wash headboard wall", "Concealed ambient reading fixtures"]
  }
];

export const initialConsultationsList = [
  {
    id: "lead-201",
    name: "Karan Johar",
    email: "karan.j@dharmaprod.com",
    phone: "+91 98201 99001",
    spaceType: "Residential Penthouse / Villa",
    budget: "₹ 50 Lakhs - ₹ 1 Crore",
    city: "Mumbai (Bandra West)",
    status: "New",
    date: "2026-09-20",
    notes: "Requires complete turnkey design for 5,200 sq.ft duplex. Emphasize private cinema & walk-in closet."
  },
  {
    id: "lead-202",
    name: "Pooja Hegde",
    email: "pooja.office@hegdegroup.in",
    phone: "+91 98450 12389",
    spaceType: "Commercial Office HQ",
    budget: "₹ 1 Crore+ Ultra Luxury",
    city: "Bengaluru (Outer Ring Rd)",
    status: "Moodboard Sent",
    date: "2026-09-19",
    notes: "8,000 sq.ft fintech head office. Wants acoustic biophilic design and executive terrace lounge."
  },
  {
    id: "lead-203",
    name: "Aditya Roy Kapur",
    email: "aditya.rk@gmail.com",
    phone: "+91 98110 56743",
    spaceType: "Custom Wardrobes & Closets",
    budget: "₹ 15 Lakhs - ₹ 25 Lakhs",
    city: "Delhi NCR (Chhatarpur)",
    status: "Site Visit Scheduled",
    date: "2026-09-18",
    notes: "Two large master walk-in wardrobes with central accessory islands and fluted glass sliders."
  },
  {
    id: "lead-204",
    name: "Sanjana Sanghi",
    email: "sanjana.s@studiofashion.com",
    phone: "+91 98210 77412",
    spaceType: "Modular Kitchen",
    budget: "₹ 15 Lakhs - ₹ 25 Lakhs",
    city: "Mumbai (Juhu)",
    status: "Contract Signed",
    date: "2026-09-16",
    notes: "Open island kitchen with Miele appliances integration and waterfall quartz island."
  }
];

export const initialWardrobeCatalog = [
  {
    id: "ward-01",
    name: "The Milano Grand Walk-In Suite",
    category: "Walk-In Dressing",
    subtitle: "Open-Concept Boutique Storage with Island",
    startingPrice: "₹ 4.5 Lakhs",
    featuresCount: 5,
    leadTime: "3-4 Weeks",
    popularFinish: "Smoked American Walnut",
    status: "Active"
  },
  {
    id: "ward-02",
    name: "Lumina Tinted Glass Sliding System",
    category: "Sliding Wardrobe",
    subtitle: "Space-Maximizing Ultra-Slim Profile",
    startingPrice: "₹ 2.2 Lakhs",
    featuresCount: 5,
    leadTime: "2-3 Weeks",
    popularFinish: "Bronze Tinted Reeded Glass",
    status: "Active"
  },
  {
    id: "ward-03",
    name: "Walnut Fluted Sovereign Wardrobe",
    category: "Hinged Wardrobe",
    subtitle: "Warm Natural Wood Texture with Brass Hardware",
    startingPrice: "₹ 2.8 Lakhs",
    featuresCount: 5,
    leadTime: "3 Weeks",
    popularFinish: "Solid Fluted Walnut",
    status: "Active"
  },
  {
    id: "ward-04",
    name: "Kashmir Cashmere Matte Wardrobe",
    category: "Minimalist System",
    subtitle: "Anti-Fingerprint Seamless Monolith Finish",
    startingPrice: "₹ 1.9 Lakhs",
    featuresCount: 5,
    leadTime: "2 Weeks",
    popularFinish: "Warm Cashmere Taupe",
    status: "Active"
  }
];
