// ============================================================
//  SITE CONFIG — yahan apni details badlo (brand, price, dates)
// ============================================================
module.exports = {
  brand: 'Adify Skills',
  courseName: 'n8n Automation Mastery',
  tagline: 'Zero se AI Automation Expert — 25 Live Classes mein',
  siteUrl: 'https://adifyskills.com/n8n-automation-course/',
  // Notes PDF ke QR codes/links isi domain par point karte hain (live website ka domain, bina / ke end mein)
  publicUrl: 'https://adifyskills.com',

  // ---------- BRAND ----------
  // Logo file public/img/ mein daalo (logo.svg / logo.png) aur path yahan likho.
  logo: '/img/logo.png', // AdifySkills logo (header + footer)
  logoFull: '/img/logo-full.png', // tagline wala logo (PDF watermark/certificate)
  showBrandText: false, // logo ke saath brand naam bhi dikhana hai?
  favicon: '/img/favicon.png',
  // Logo ke brand colors yahan daalo — poori website inhi colors se theme hogi
  brandColors: {
    primary: '#4c1d95',   // main brand color (buttons, highlights)
    secondary: '#0f8a4f', // second color (gradients)
    accent: '#16a34a',    // success / ticks
  },

  // Batch details
  nextBatchStart: '2026-12-01T19:00:00+05:30', // countdown isi date tak chalega
  classTime: '7:00 PM – 9:00 PM IST',
  classDays: 'Monday – Friday (Live on Zoom)',
  totalDays: 25,
  hoursPerClass: 2,
  seatsPerBatch: 60,

  // Pricing (INR) — apne hisaab se badlo
  pricing: {
    currency: '₹',
    plans: [
      {
        id: 'self',
        name: 'Recorded',
        price: 4999,
        mrp: 9999,
        tag: 'Self-paced',
        features: [
          '25 class recordings (50 hours)',
          'All workflow templates (JSON)',
          'Resource library + cheat sheets',
          'Community access',
          'Certificate of completion',
        ],
        missing: ['Live doubt sessions', '1:1 mentor review', 'Placement & freelancing support'],
      },
      {
        id: 'live',
        name: 'Live Cohort',
        price: 9999,
        mrp: 19999,
        tag: 'Most popular',
        featured: true,
        features: [
          '25 live classes × 2 hours',
          'Lifetime recordings + updates',
          '120+ workflow templates (JSON)',
          'Daily assignments + feedback',
          'Weekly doubt-clearing sessions',
          'Capstone project review',
          'Verified certificate',
          'Freelancing starter kit',
        ],
        missing: ['1:1 mentorship calls'],
      },
      {
        id: 'pro',
        name: 'Pro Mentorship',
        price: 19999,
        mrp: 39999,
        tag: 'Career track',
        features: [
          'Everything in Live Cohort',
          '4 × 1:1 mentorship calls',
          'Portfolio + LinkedIn review',
          'Client-proposal templates',
          'Agency SOP pack',
          'Priority support (24h reply)',
          '90-day post-course support',
          'Internship / project referrals',
        ],
        missing: [],
      },
    ],
  },

  contact: {
    phone: '+91 83838 91716',
    whatsapp: '918383891716', // country code ke saath, bina + ke
    email: 'support@adifyskills.com',
    address: 'India (Online, Live)',
  },

  social: {
    youtube: 'https://youtube.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
  },

  instructor: {
    name: 'Lead Instructor',
    title: 'Automation Architect & n8n Trainer',
    bio: 'Real clients ke liye 300+ production workflows banaye hain — lead-gen se lekar AI support agents tak. Har class mein theory kam, live building zyada.',
    highlights: ['8+ years in tech & marketing', '300+ workflows shipped', 'Agency founder', 'n8n community contributor'],
  },
};
