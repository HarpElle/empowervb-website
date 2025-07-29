// Contact information configuration
// This file centralizes contact details to make updates easier

export const CONTACT_INFO = {
  // Primary email address - change this single value to update across the site
  email: 'empowervbclub@gmail.com', // Temporarily changed from info@empowervb.com
  phone: '(262) 235-3232',
  
  // Email display text (for when we want to show the email address)
  emailDisplay: 'empowervbclub@gmail.com', // Temporarily changed from info@empowervb.com
  
  // Mailto links
  emailLink: 'mailto:empowervbclub@gmail.com', // Temporarily changed from mailto:info@empowervb.com
};

// Helper function to get email for API endpoints
export function getContactEmail() {
  return CONTACT_INFO.email;
}

// Helper function to get email link for frontend
export function getEmailLink() {
  return CONTACT_INFO.emailLink;
}

// Helper function to get email display text
export function getEmailDisplay() {
  return CONTACT_INFO.emailDisplay;
} 