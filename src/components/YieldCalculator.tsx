import React, { useState, useMemo } from 'react';
import { Landmark, TrendingUp, DollarSign, Calculator, Percent, Sparkles, HelpCircle, FileText, AlertCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
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

  const exportToPDF = () => {
    const doc = new jsPDF();
    const rightLimit = 196;
    
    // Top Color Accent Bar
    doc.setFillColor(0, 166, 153); // #00A699 HACCP Teal
    doc.rect(14, 15, rightLimit - 14, 3, 'F');
    
    // Header Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); // slate-900 / primary
    doc.text("SINGAPORE FOOD FACTORY ROI ASSESSMENT REPORT", 14, 27);
    
    // Timestamp & Authority Stamp
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139); // slate-500
    const formattedDate = new Date().toLocaleString('en-SG', {
      timeZone: 'Asia/Singapore',
      dateStyle: 'long',
      timeStyle: 'short'
    }) + " (SGT Singapore Local Time)";
    doc.text(`Generated on: ${formattedDate}  |  Compiled via Acquisition ROI Planner`, 14, 33);
    
    // Soft divider line
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.line(14, 37, rightLimit, 37);
    
    // Executive Key Metrics Summary Panel (colored background card)
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(14, 42, rightLimit - 14, 36, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, 42, rightLimit - 14, 36, 'S');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(0, 166, 153); // teal
    doc.text("EXECUTIVE ADVISORY & SUMMARY", 20, 49);
    
    // Labels
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text("PROPERTY PRICE", 20, 56);
    doc.text("PROJECTED NET YIELD", 110, 56);
    doc.text("UPFRONT CASH REQUIRED", 20, 68);
    doc.text("EST. MONTHLY MORTGAGE", 110, 68);
    
    // Values
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(`SGD $${propertyPrice.toLocaleString()}`, 20, 62);
    doc.setTextColor(0, 166, 153); // teal highlight
    doc.text(`${financialResult.netYieldPercent}% p.a.`, 110, 62);
    
    doc.setTextColor(15, 23, 42);
    doc.text(`SGD $${financialResult.totalUpfront.toLocaleString()}`, 20, 74);
    doc.text(`SGD $${financialResult.monthlyRepayment.toLocaleString()} / mo`, 110, 74);
    
    // 1. INPUT PARAMETERS Table Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text("1. SEED INVESTMENT & ACQUISITION INPUTS", 14, 86);
    
    // Input Variables Table (Grid Styled)
    autoTable(doc, {
      startY: 90,
      head: [['Assessment Parameter', 'Input Configuration', 'SRA / IRAS Local Industry Context']],
      body: [
        ['Target Property Price', `SGD $${propertyPrice.toLocaleString()}`, `Fair acquisition value basis (approx. $${Math.round(propertyPrice / areaSqft).toLocaleString()} PSF).`],
        ['Projected Monthly Rent Rate', `SGD $${monthlyRent.toLocaleString()}`, `Est lease level for ${areaSqft.toLocaleString()} sqft space (approx. $${(monthlyRent / areaSqft).toFixed(2)} PSF).`],
        ['Loan-to-Value (LTV %)', `${ltvPercent}% Mortgage`, 'Corporate industrial loan financing benchmark ratio (standard 70-80%).'],
        ['Bank Mortgage Interest Rate', `${interestRate}% p.a.`, 'Current average rate calculated from Singapore Overnight SORA parameters.'],
        ['Repayment Loan Tenure', `${loanTenure} Years`, 'Amortizing cycle matches standard holding or leasehold expectancy tiers.'],
        ['Gross Operational Floor Area', `${areaSqft.toLocaleString()} sqft`, 'Configured manufacturing processing or cold chain footprint size.'],
        ['Monthly Maintenance Contribution', `SGD $${maintenanceFeeMonthly.toLocaleString()}`, 'Estimated service charge, sink funds, and structural upkeep levies.'],
        ['Estimated Annual Property Tax', `SGD $${yearlyTax.toLocaleString()}`, 'Direct commercial assessment tax based on Singapore IRAS guidelines.']
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [15, 23, 42], // deep slate
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 2.5,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 55 },
        1: { cellWidth: 40, fontStyle: 'bold', textColor: [0, 166, 153] },
        2: { cellWidth: 'auto' }
      }
    });
    
    let firstTableFinalY = (doc as any).lastAutoTable.finalY || 135;
    
    // 2. FINANCIAL METRICS & RESULTS Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(15, 23, 42);
    doc.text("2. PROJECTED FINANCIAL BREAKDOWNS & RETURN METRICS", 14, firstTableFinalY + 10);
    
    // Metrics Outputs Table
    autoTable(doc, {
      startY: firstTableFinalY + 14,
      head: [['Calculated Output Field', 'Assigned Amount / Rate', 'Underlying Calculations & Regulation Parameters']],
      body: [
        ['Corporate Debt Loan Principal', `SGD $${financialResult.loanAmount.toLocaleString()}`, `Financed portion equivalent to ${ltvPercent}% of the acquisition property valuation.`],
        ['Mortgage Monthly Installment', `SGD $${financialResult.monthlyRepayment.toLocaleString()} / mo`, `Compounded debt amortization payment calculated over ${loanTenure} years.`],
        ['Equity Cash Downpayment Portion', `SGD $${(propertyPrice * (1 - ltvPercent / 100)).toLocaleString()}`, `${100 - ltvPercent}% equity cash buffer to be settled during acquisition stage.`],
        ["Estimated Buyer's Stamp Duty (BSD)", `SGD $${financialResult.buyersStampDuty.toLocaleString()}`, 'Tiered commercial stamp duty taxation rules (standard 1% - 5% marginal scale).'],
        ['Aggregated Upfront Capital Cash', `SGD $${financialResult.totalUpfront.toLocaleString()}`, 'Aggregates standard downpayment and mandatory Buyer\'s Stamp Duty payments.'],
        ['Gross Rental Income (Annually)', `SGD $${financialResult.annualRentRevenue.toLocaleString()}`, 'Aggregated lease returns representing 100% occupancy: monthly lease rate x 12.'],
        ['Aggregated Operating Costs (Yearly)', `SGD $${financialResult.leaseExpensesAnnually.toLocaleString()}`, 'Aggregates annual property taxes and monthly maintenance expenses x 12.'],
        ['Calculated Net Rental Yield', `${financialResult.netYieldPercent}% p.a.`, 'Net Rental Yield = (Annual Gross Rent - Operating Costs) / Asset Price Valuation.']
      ],
      theme: 'grid',
      headStyles: {
        fillColor: [0, 166, 153], // teal
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 2.5,
        overflow: 'linebreak'
      },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 55 },
        1: { cellWidth: 40, fontStyle: 'bold', textColor: [15, 23, 42] },
        2: { cellWidth: 'auto' }
      }
    });
    
    let secondTableFinalY = (doc as any).lastAutoTable.finalY || 205;
    
    // Standard Singapore Compliance Reference Box
    doc.setFillColor(248, 250, 252); // slate-50
    doc.rect(14, secondTableFinalY + 8, rightLimit - 14, 26, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(14, secondTableFinalY + 8, rightLimit - 14, 26, 'S');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text("SINGAPORE COMPLIANCE REFERENCE NOTES & STAMP DUTIES", 18, secondTableFinalY + 14);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(100, 116, 139);
    doc.text("• Commercial Buyer's Stamp duty follows the latest marginal tax tiers (1.0% up to $180,000, 2.0% up to $360,000, 3.0% up to $1,000,000, 4.0% up to $1,500,000, and 5.0% for any portion exceeding $1,500,000).", 18, secondTableFinalY + 19);
    doc.text("• Calculated amortizations are approximate models. Actual terms may differ with changing SORA rates, bank-specific charges, or corporate credit approvals.", 18, secondTableFinalY + 23);
    doc.text("• Real estate acquisition involves statutory SFA approved regulations, waste-handling policies, grease trap capacity guidelines, and B2 zoned specifications.", 18, secondTableFinalY + 27);
    
    // Page Footnotes / Watermarks
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text("CONFIDENTIAL - REAL ESTATE ADVISORY PLANNING", 14, 285);
    doc.text("SINGAPORE INDUSTRIAL REAL ESTATE ASSESSMENTS", 115, 285);
    
    // Bottom Green Border Accent
    doc.setDrawColor(0, 166, 153);
    doc.setLineWidth(1.5);
    doc.line(14, 288, rightLimit, 288);
    
    // Save generated PDF report with direct browser prompt
    doc.save(`SGD_Food_Factory_Yield_Report_${new Date().toISOString().slice(0,10)}.pdf`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Intro section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
        <div className="flex-1">
          <span className="text-[10px] uppercase font-bold text-haccp-teal tracking-widest block mb-1">
            Singapore Property Stamp Duty & Yield Analytics
          </span>
          <h2 className="font-display text-xl font-bold text-primary">
            Food Industrial Acquisition & ROI Planner
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Evaluate acquisition cashflows, mortgage expenses, and net rental yields. This calculator integrates Singapore commercial Buyer’s Stamp Duty (BSD) rates up to the latest 5% marginal bracket.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={exportToPDF}
              className="inline-flex items-center gap-2 bg-haccp-teal text-white hover:bg-haccp-teal/90 transition-all text-xs font-bold px-4 py-2.5 rounded shadow-sm hover:shadow-md cursor-pointer pointer-events-auto"
            >
              <FileText className="h-4 w-4" />
              Download Advisory Report (PDF)
            </button>
          </div>
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
            
            <div className="mt-5 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={exportToPDF}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/25 text-white transition-all text-xs font-semibold px-3 py-2 rounded shadow-sm hover:text-haccp-teal bg-slate-900 cursor-pointer pointer-events-auto"
                title="Export custom calculations PDF summary"
              >
                <FileText className="h-3.5 w-3.5 text-haccp-teal" />
                Export Calculations (PDF)
              </button>
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
