import { CalculationResult } from './types';

/**
 * Calculates Singapore Non-Residential/Commercial Buyer's Stamp Duty (BSD)
 * Based on the latest IRAS rules:
 * - First $180,000: 1%
 * - Next $180,000: 2%
 * - Next $640,000 (up to $1,000,000): 3%
 * - Next $500,000 (up to $1,500,000): 4%
 * - Remaining amount above $1,500,000: 5%
 */
export function calculateCommercialBSD(price: number): number {
  if (price <= 0) return 0;
  
  let bsd = 0;
  let remaining = price;

  // First $180,000
  const tier1 = Math.min(remaining, 180000);
  bsd += tier1 * 0.01;
  remaining -= tier1;

  // Next $180,000
  if (remaining > 0) {
    const tier2 = Math.min(remaining, 180000);
    bsd += tier2 * 0.02;
    remaining -= tier2;
  }

  // Next $640,000
  if (remaining > 0) {
    const tier3 = Math.min(remaining, 640000);
    bsd += tier3 * 0.03;
    remaining -= tier3;
  }

  // Next $500,000
  if (remaining > 0) {
    const tier4 = Math.min(remaining, 500000);
    bsd += tier4 * 0.04;
    remaining -= tier4;
  }

  // Remaining above $1,500,000
  if (remaining > 0) {
    bsd += remaining * 0.05;
  }

  return Math.round(bsd);
}

/**
 * Calculates monthly mortgage payment
 * Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateMonthlyPayment(principal: number, annualRate: number, tenureYears: number): number {
  if (principal <= 0 || annualRate <= 0 || tenureYears <= 0) return 0;
  const monthlyRate = (annualRate / 100) / 12;
  const totalMonths = tenureYears * 12;
  
  const temp = Math.pow(1 + monthlyRate, totalMonths);
  const payment = principal * (monthlyRate * temp) / (temp - 1);
  
  return Math.round(payment);
}

export function performInvestmentMetrics(
  price: number,
  isLease: boolean,
  monthlyRent: number,
  ltvPercent: number,
  interestRate: number,
  tenureYears: number,
  areaSqft: number,
  maintenanceFeeMonthly: number,
  yearlyTax: number
): CalculationResult {
  const loanAmt = isLease ? 0 : Math.round(price * (ltvPercent / 100));
  const monthlyAmortization = isLease ? 0 : calculateMonthlyPayment(loanAmt, interestRate, tenureYears);
  
  const bsd = isLease ? 0 : calculateCommercialBSD(price);
  
  // Upfront cost (Downpayment + BSD)
  const downpayment = isLease ? (monthlyRent * 3) : Math.round(price * (1 - ltvPercent / 100)); // 3 months deposit for lease
  const totalUpfront = downpayment + bsd;

  // Revenue & Expenses
  const annualRentRevenue = isLease ? 0 : (monthlyRent * 12);
  const leaseExpensesAnnually = (maintenanceFeeMonthly * 12) + yearlyTax;
  
  // Net yield for Sale property
  const netYieldPercent = isLease 
    ? 0 
    : price > 0 
      ? parseFloat((((annualRentRevenue - leaseExpensesAnnually) / price) * 100).toFixed(2)) 
      : 0;

  return {
    propertyPrice: price,
    loanAmount: loanAmt,
    monthlyRepayment: monthlyAmortization,
    buyersStampDuty: bsd,
    totalUpfront: totalUpfront,
    annualRentRevenue: annualRentRevenue,
    leaseExpensesAnnually: leaseExpensesAnnually,
    netYieldPercent: netYieldPercent
  };
}
