// Sponsorship tier definitions for Empower Volleyball Club
export const sponsorshipTiers = {
  platinum: {
    name: 'Platinum Level',
    price: '$1,500+',
    color: 'empower-coral',
    priority: 1,
    logoSize: 'large',
    benefits: [
      'Logo placement on game jerseys or shorts (subject to USA Volleyball regulations)',
      'All Gold Level benefits included',
      'Exclusive naming rights opportunity for team events',
      'Dedicated email blast to all team families',
      'Team-signed thank you poster/photo for business display',
      'Custom promotional opportunities and VIP recognition',
      'Priority rotating banner advertisement on website homepage',
      'Professional promotional flyers distributed at tournaments'
    ],
    displayFeatures: {
      homepage: true,
      featuredSection: true,
      logoWidth: '200px',
      testimonialSpace: true
    }
  },
  gold: {
    name: 'Gold Level',
    price: '$1,000',
    color: 'empower-navy',
    priority: 2,
    logoSize: 'medium',
    benefits: [
      'Logo placement on team practice apparel and equipment bags',
      'All Silver Level benefits included',
      'Priority rotating banner advertisement on website homepage',
      'Professional promotional flyers (50-100 copies) at tournaments',
      'Social media story highlights and extended content features',
      'Recognition in all team communications and event programs'
    ],
    displayFeatures: {
      homepage: true,
      featuredSection: false,
      logoWidth: '150px',
      testimonialSpace: false
    }
  },
  silver: {
    name: 'Silver Level',
    price: '$500',
    color: 'empower-lilac',
    priority: 3,
    logoSize: 'medium',
    benefits: [
      'Custom 3x5 ft banner displayed at all practices and local events',
      'All Bronze Level benefits included',
      'Three social media features throughout the season',
      'Verbal recognition at local tournaments and scrimmages',
      'Enhanced website placement with priority positioning'
    ],
    displayFeatures: {
      homepage: true,
      featuredSection: false,
      logoWidth: '120px',
      testimonialSpace: false
    }
  },
  bronze: {
    name: 'Bronze Level',
    price: '$250',
    color: 'empower-mid-gray',
    priority: 4,
    logoSize: 'small',
    benefits: [
      'Logo placement on empowervb.com with direct link to your business',
      'One professional social media feature post per season',
      'Recognition in family newsletter distributed to all team families',
      'Digital marketing exposure to 50+ engaged families'
    ],
    displayFeatures: {
      homepage: false,
      featuredSection: false,
      logoWidth: '100px',
      testimonialSpace: false
    }
  }
};

// Sponsor benefits for display
export const sponsorshipBenefits = [
  {
    icon: 'visibility',
    title: 'Brand Visibility',
    description: 'Reach our engaged community of families, athletes, and volleyball enthusiasts throughout Wisconsin.'
  },
  {
    icon: 'community',
    title: 'Community Impact',
    description: 'Support young female athletes in developing confidence, leadership, and excellence both on and off the court.'
  },
  {
    icon: 'partnership',
    title: 'Authentic Partnership',
    description: 'Join a values-driven organization that prioritizes character development alongside athletic achievement.'
  },
  {
    icon: 'growth',
    title: 'Growing Audience',
    description: 'Connect with our expanding network as we establish ourselves as a premier volleyball destination.'
  },
  {
    icon: 'recognition',
    title: 'Year-Round Recognition',
    description: 'Receive ongoing appreciation and recognition throughout our season and beyond.'
  },
  {
    icon: 'values',
    title: 'Shared Values',
    description: 'Align your brand with our core values of empowerment, excellence, teamwork, family, and integrity.'
  }
];

// Budget ranges for inquiry form
export const budgetRanges = [
  { value: 'under-250', label: 'Under $250' },
  { value: '250', label: '$250 (Bronze Level)' },
  { value: '500', label: '$500 (Silver Level)' },
  { value: '1000', label: '$1,000 (Gold Level)' },
  { value: '1500-plus', label: '$1,500+ (Platinum Level)' },
  { value: 'custom', label: 'Custom Package' }
];

// Helper functions
export function getTierByName(tierName) {
  return sponsorshipTiers[tierName];
}

export function getAllTiers() {
  return Object.entries(sponsorshipTiers).map(([key, tier]) => ({
    key,
    ...tier
  })).sort((a, b) => a.priority - b.priority);
}

export function getTiersByPriority() {
  return getAllTiers();
} 