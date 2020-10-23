export interface FreeGamesModel {
  title: string;
  id: string;
  namespace: string;
  desription: string;
  effectiveDate: string;
  promotions: {
    promotionalOffers: Array<Offers>;
    upcomingPromotionalOffers: Array<Offers>;
  };
  keyImages: Array<Object>;
}

interface Offers {
  promotionalOffers: Array<{
    startDate: string;
    endDate: string;
    discountSetting: Object;
  }>;
}
