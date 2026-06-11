export interface DetailedCompliance {
  antiBacterialEpoxy: boolean;
  properFlowSegregation: boolean;
  mechanicalVentilation: boolean;
  pestProofingReady: boolean;
  personnelSanitationAnteroom: boolean;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  region: 'North' | 'West' | 'East' | 'Central';
  price: number; // in SGD
  type: 'Sale' | 'Lease';
  pricePerSqft: number; // calculated or loaded
  floorAreaSqft: number;
  ceilingHeightM: number;
  floorLoadingKnSqm: number;
  powerSupplyAmps: string;
  sfaApproved: boolean;
  haccpCertified: boolean;
  hasColdRoom: boolean;
  gasSupply: boolean;
  greaseTrapCapacitySq: string;
  address: string;
  description: string;
  image: string;
  images: string[];
  category: 'Central Kitchen' | 'Food Processing' | 'Cold Chain Logistics' | 'Meat & Seafood Hub';
  zone: 'Business 2 (Industrial)' | 'Food Zone';
  tenancyStatus: 'Vacant' | 'Tenanted';
  loadingBays: number;
  complianceScore: number;
  detailedCompliance: DetailedCompliance;
  yearlyTax: number;
  maintenanceFeeMonthly: number;
  tenure?: 'Freehold' | '99-year Leasehold' | '30-year Leasehold' | '60-year Leasehold';
  expectedCompletion?: string;
  developer?: string;
  projectUrl?: string;
  rawCookedSegregatedLifts?: boolean;
  dualKeyProvision?: boolean;
  unitBreakdown?: UnitSpecifications[];
}

export interface UnitSpecifications {
  name: string;
  floors: string;
  heightM: string;
  loadingKn: string;
  powerPhase: string;
  features: string[];
}

export interface SearchFilters {
  query: string;
  region: string;
  category: string;
  type: 'All' | 'Sale' | 'Lease';
  sfaApproved: boolean;
  hasColdRoom: boolean;
  minArea: number;
  maxArea: number;
  minPrice: number;
  maxPrice: number;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  intendedUse: string;
  viewingDate: string;
  message: string;
}

export interface ComplianceAssessment {
  industryType: 'Central Kitchen' | 'Bakery Manufacturing' | 'Meat & Seafood Processing' | 'Cold Chain Storage' | 'Ready-To-Eat Meal Prep';
  floorArea: number;
  hasEpoxyFlooring: boolean;
  hasAnteroom: boolean;
  sewerGreaseTrap: boolean;
  separateRawAndCookedArea: boolean;
  exhaustSystemScrubber: boolean;
  handsFreeSinksInstalled: boolean;
  pestProofAirCurtain: boolean;
}

export interface CalculationResult {
  propertyPrice: number;
  loanAmount: number;
  monthlyRepayment: number;
  buyersStampDuty: number;
  totalUpfront: number;
  annualRentRevenue: number;
  leaseExpensesAnnually: number;
  netYieldPercent: number;
}
