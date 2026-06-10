import React, { useState, useMemo } from 'react';
import { Landmark, TrendingUp, DollarSign, Calculator, Percent, Sparkles, HelpCircle, FileText, AlertCircle } from 'lucide-react';
import { performInvestmentMetrics } from '../utils';

export default function YieldCalculator() {
  const [isLeaseMode, setIsLeaseMode] = useState(false);
  const [propertyPrice, setPropertyPrice] = useState(6500000); // Default $6.5M SGD representation
  const [monthlyRent, setMonthlyRent] = useState(25000); // Rent rate $25k for calculating yield
  const [ltvPercent, setLtvPercent] = useState(70); // 70% Loan to Value
  const [interestRate, setInterestRate] = useState(3.5); // 3.5% SGD SORA rate + bank margin
  const [loanTenure, setLoanTenure] = useState(20); // 20 Years tenure
  const [areaSqft, setAreaSqft] = useState(12000); // 12,000 sqft
  const [maintenanceFeeMonthly, setMaintenanceFeeMonthly] = useState(850);
  const [yearlyTax, setYearlyTax] = useState(15000);

  // Compute metrics dynamically using our utilities
  const financialResult = useMemo(() => {
    return performInvestmentMetrics(
      propertyPrice,
      isLeaseMode,
      monthlyRent,
      ltvPercent,
      interestRate,
      loanTenure,
      areaSqft,
      maintenanceFeeMonthly,
      yearlyTax
    );
  }, [propertyPrice, isLeaseMode, monthlyRent, ltvPercent, interestRate, loanTenure, areaSqft, maintenanceFeeMonthly, yearlyTax]);

  // Handle QuickPresets
  const applyPreset = (presetType: 'central' | 'logistics' | 'processing') => {
    if (presetType === 'central') {
      setPropertyPrice(5200000);
      setMonthlyRent(18500);
      setAreaSqft(8500);
      setMaintenanceFeeMonthly(650);
      setYearlyTax(11500);
    } else if (presetType === 'logistics') {
      setPropertyPrice(14500000);
      setMonthlyRent(48000);
      setAreaSqft(35000);
      setMaintenanceFeeMonthly(1800);
      setYearlyTax(32000);
    } else {
      setPropertyPrice(8900000);
      setMonthlyRent(32000);
      setAreaSqft(19000);
      setMaintenanceFeeMonthly(1100);
      setYearlyTax(22400);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Intro section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase font-bold text-haccp-teal tracking-widest block mb-1">
            Singapore Property Stamp Duty & Yield Analytics
          </span>
          <h2 className="font-display text-xl font-bold text-primary">
            Food Industrial Acquisition & ROI Planner
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Evaluate acquisition cashflows, mortgage expenses, and net rental yields. This calculator integrates Singapore commercial Buyer’s Stamp Duty (BSD) rates up to the latest 5% marginal bracket.
          </p>
        </div>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-haccp-teal/10">
          <Landmark className="h-8 w-8 text-haccp-teal" />
        </div>
      </div>

      {/* Financial presets pills */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Load Preprogrammed Models:
        </span>
        <button
          onClick={() => applyPreset('central')}
          className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-primary hover:border-primary transition-all cursor-pointer"
        >
          $5.2M Central Kitchen Suite
        </button>
        <button
          onClick={() => applyPreset('logistics')}
          className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-primary hover:border-primary transition-all cursor-pointer"
        >
          $14.5M Tuas Logistics ASRS
        </button>
        <button
          onClick={() => applyPreset('processing')}
          className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 bg-white text-primary hover:border-primary transition-all cursor-pointer"
        >
          $8.9M Pork & Seafood Processing Hub
        </button>
      </div>

      {/* Grid structure holding Form and Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pointer-events-auto">
        {/* Left Column: Form Parameters (5 cols) */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 h-fit h-full">
          <h3 className="font-display text-base font-bold text-primary border-b border-slate-100 pb-3 mb-6 flex items-center gap-2">
            <Calculator className="h-4 w-4 text-haccp-teal" />
            Parameter Controls
          </h3>

          <div className="space-y-6">
            {/* Property Valuation / Price */}
            <div>
              <label htmlFor="propertyPriceInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2">
                Property Price (SGD $)
              </label>
              <input
                id="propertyPriceInput"
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-xs font-bold font-mono rounded border border-slate-200 bg-slate-50 p-2.5 text-primary focus:outline-none focus:border-haccp-teal focus:bg-white"
              />
              <p className="text-[10px] text-slate-500 mt-1">Estimations use current fair market commercial valuation.</p>
            </div>

            {/* Simulated Rent Income */}
            <div>
              <label htmlFor="monthlyRentInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2">
                Projected Monthly Rental Yield (SGD $)
              </label>
              <input
                id="monthlyRentInput"
                type="number"
                value={monthlyRent}
                onChange={(e) => setMonthlyRent(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full text-xs font-bold font-mono rounded border border-slate-200 bg-slate-50 p-2.5 text-primary focus:outline-none focus:border-haccp-teal focus:bg-white"
              />
              <p className="text-[10px] text-slate-500 mt-1">Average SFA food unit leases hover around $2.20 – $2.80 psf.</p>
            </div>

            {/* Loan To Value Ratio */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="ltvInput" className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                  Loan-to-Value (LTV %)
                </label>
                <span className="text-xs text-primary font-mono font-bold">
                  {ltvPercent}%
                </span>
              </div>
              <input
                id="ltvInput"
                type="range"
                min="30"
                max="85"
                step="5"
                value={ltvPercent}
                onChange={(e) => setLtvPercent(parseInt(e.target.value))}
                className="w-full accent-haccp-teal cursor-pointer"
              />
              <span className="text-[9px] text-slate-400 block mt-1">Commercial loans historically peak around 70-80% of valuation.</span>
            </div>

            {/* Interest Rate */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="interestRateInput" className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                  Bank Interest Rate SORA
                </label>
                <span className="text-xs text-primary font-mono font-bold">
                  {interestRate}% p.a.
                </span>
              </div>
              <input
                id="interestRateInput"
                type="range"
                min="1.5"
                max="6"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full accent-haccp-teal cursor-pointer"
              />
            </div>

            {/* Loan Tenure */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="loanTenureInput" className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                  Amortization Tenure
                </label>
                <span className="text-xs text-primary font-mono font-bold">
                  {loanTenure} Years
                </span>
              </div>
              <input
                id="loanTenureInput"
                type="range"
                min="5"
                max="30"
                step="1"
                value={loanTenure}
                onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                className="w-full accent-haccp-teal cursor-pointer"
              />
            </div>

            {/* Dimensions */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
              <div>
                <label htmlFor="areaSqftInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-1.5">
                  Size (sqft)
                </label>
                <input
                  id="areaSqftInput"
                  type="number"
                  value={areaSqft}
                  onChange={(e) => setAreaSqft(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-xs font-mono rounded border border-slate-200 bg-slate-50 p-2 text-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="maintInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-1.5">
                  Monthly Maintenance
                </label>
                <input
                  id="maintInput"
                  type="number"
                  value={maintenanceFeeMonthly}
                  onChange={(e) => setMaintenanceFeeMonthly(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-xs font-mono rounded border border-slate-200 bg-slate-50 p-2 text-primary focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="yearlyTaxInput" className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-1.5">
                  Annual Property Tax (SGD)
                </label>
                <input
                  id="yearlyTaxInput"
                  type="number"
                  value={yearlyTax}
                  onChange={(e) => setYearlyTax(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full text-xs font-mono rounded border border-slate-200 bg-slate-50 p-2 text-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Right Column: Financial Breakdown Output (7 cols) */}
        <section className="lg:col-span-7 space-y-6">
          {/* Main Yield Box */}
          <div className="bg-primary text-white border border-slate-800 rounded-lg p-6">
            <span className="text-[10px] bg-haccp-teal text-white font-bold uppercase tracking-widest px-2.5 py-1 rounded inline-block">
              PROJECTED INVESTMENT YIELD
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mt-6">
              <div>
                <span className="text-slate-400 block text-xs uppercase tracking-wider font-semibold">
                  Net Rental Yield (Annual)
                </span>
                <span className="text-5xl font-extrabold text-white block mt-2 font-mono">
                  {financialResult.netYieldPercent}%
                </span>
                <p className="text-[10px] text-slate-400 mt-2 leading-normal">
                  Calculated as: <span className="text-slate-200 font-medium">(Gross Rent minus Operating Costs) / Asset Price</span>.
                </p>
              </div>

              {/* Core metrics visual columns */}
              <div className="space-y-3.5 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Gross Annual Rent Revenue:</span>
                  <strong className="text-white font-mono">${financialResult.annualRentRevenue.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Annual Operating Expenses:</span>
                  <strong className="text-white font-mono">${financialResult.leaseExpensesAnnually.toLocaleString()}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Total Stamp Duty:</span>
                  <strong className="text-white font-mono">${financialResult.buyersStampDuty.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Capital Allocation & Cashflows */}
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h4 className="font-display font-semibold text-sm text-primary mb-5 border-b border-slate-100 pb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-haccp-teal" />
              Capital Requirements & Cash Flows
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Upfront cashbox */}
              <div className="bg-[#F6F9FC] border border-slate-200 rounded-md p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-[#EBF0F5] flex items-center justify-center font-bold text-xs text-[#00A699]">
                    $
                  </div>
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Total Capital Upfront Needed
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-primary font-mono block">
                    ${financialResult.totalUpfront.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Estimated downpayment (${(propertyPrice * (1 - ltvPercent / 100)).toLocaleString()}) plus Buyer’s Stamp Duty (${financialResult.buyersStampDuty.toLocaleString()}).
                  </span>
                </div>
              </div>

              {/* Debt box */}
              <div className="bg-[#F6F9FC] border border-slate-200 rounded-md p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded bg-[#EBF0F5] flex items-center justify-center font-bold text-xs text-primary">
                    %
                  </div>
                  <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                    Estimated Monthly Mortgage
                  </span>
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-primary font-mono block">
                    ${financialResult.monthlyRepayment.toLocaleString()} / mo
                  </span>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Amortizing initial principal of ${financialResult.loanAmount.toLocaleString()} at fixed {interestRate}% over {loanTenure} years.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SFA BSD Tier Rules breakdown for transparency */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <h5 className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wide mb-2">
              <AlertCircle className="h-4 w-4 text-[#00A699]" />
              Singapore Non-Residential Stamp Duty Breakdown (BSD 2026)
            </h5>
            <div className="space-y-1.5 text-[11px] text-slate-500 leading-normal">
              <p>Estimating Buyer’s Stamp Duty (BSD) for industrial spaces follows standard Inland Revenue Authority of Singapore (IRAS) non-residential marginal rates:</p>
              <ul className="list-disc list-inside space-y-1 pl-1 font-mono">
                <li>0.0% – $180,000 portion is taxed at 1.0%</li>
                <li>$180,001 – $360,000 portion is taxed at 2.0%</li>
                <li>$360,001 – $1,000,000 portion is taxed at 3.0%</li>
                <li>$1,000,001 – $1,500,000 portion is taxed at 4.0%</li>
                <li>Portion remaining above $1,500,000 is taxed at 5.0%</li>
              </ul>
              <div className="bg-white border border-slate-200 rounded p-2.5 mt-3 text-xs font-semibold text-primary flex justify-between">
                <span>Calculated BSD stamp contribution for ${propertyPrice.toLocaleString()}:</span>
                <span className="text-haccp-teal font-mono">${financialResult.buyersStampDuty.toLocaleString()} SGD</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
