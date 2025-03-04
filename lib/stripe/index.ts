/**
 * Stripe Integration Module
 */

// Re-export types
export * from './types';

// Re-export API functions
export * from './api/client';
export * from './api/service';

// Default export with main functions
const StripeModule = {
  // Account management
  getUserStripeAccounts: async (userId: string) => {
    const { getUserStripeAccounts } = await import('./api/service');
    return getUserStripeAccounts(userId);
  },

  // Volume data for charts
  getGrossVolumeData: async (apiKey: string, period: string) => {
    const { getDailyVolumeData } = await import('./api/client');
    return getDailyVolumeData(apiKey, period as import('./types').TimePeriod);
  },
};

export default StripeModule;
