import React, { useState, useMemo } from 'react';
import { ClipboardCheck, Sparkles, AlertCircle, CheckCircle2, RefreshCw, HelpCircle, HardHat, ShieldCheck, Printer } from 'lucide-react';
import { ComplianceAssessment } from '../types';
import { SFA_REQUIREMENTS_CHECKLIST } from '../data';

export default function ComplianceTool() {
  const [assessment, setAssessment] = useState<ComplianceAssessment>({
    industryType: 'Central Kitchen',
    floorArea: 4500,
    hasEpoxyFlooring: false,
    hasAnteroom: false,
    sewerGreaseTrap: false,
    separateRawAndCookedArea: false,
    exhaustSystemScrubber: false,
    handsFreeSinksInstalled: false,
    pestProofAirCurtain: false,
  });

  const [testTriggered, setTestTriggered] = useState(false);
  const [printNotification, setPrintNotification] = useState<string | null>(null);

  // Dynamic computation of SFA readiness details
  const results = useMemo(() => {
    let score = 0;
    const details: { label: string; passed: boolean; penalty: string; refCode: string }[] = [];

    // 1. Sewage grease trap
    if (assessment.sewerGreaseTrap) {
      score += 18;
      details.push({
        label: 'Approved Sewer Grease Trap Interceptor',
        passed: true,
        penalty: '',
        refCode: 'PUB Sewerage Regs'
      });
    } else {
      details.push({
        label: 'Sewer Grease Trap Interceptor',
        passed: false,
        penalty: 'Critical block: Food grease cannot enter the public sewage network directly. Violations lead to $5,000 PUB fines.',
        refCode: 'PUB Sewerage Regs'
      });
    }

    // 2. Separate lines (Raw to Cooked)
    if (assessment.separateRawAndCookedArea) {
      score += 20;
      details.push({
        label: 'Unidirectional Process Flow Segregation',
        passed: true,
        penalty: '',
        refCode: 'SFA Annex A - Layout Flow'
      });
    } else {
      details.push({
        label: 'Process Flow Segregation',
        passed: false,
        penalty: 'High risk: Overlapping raw and cooked production lanes will trigger immediate SFA license rejection.',
        refCode: 'SFA Annex A - Layout Flow'
      });
    }

    // 3. Exhaust scrubber
    if (assessment.exhaustSystemScrubber) {
      score += 15;
      details.push({
        label: 'Mechanical Extract Ventilation & Chemical Air Scrubber',
        passed: true,
        penalty: '',
        refCode: 'SFA Vent. Clause 7.3'
      });
    } else {
      details.push({
        label: 'Mechanical Extract Ventilation',
        passed: false,
        penalty: 'Severe odor nuisance penalty: Lack of carbon filtering scrubbers over thermal ovens breaks NEA municipal guidelines.',
        refCode: 'SFA Vent. Clause 7.3'
      });
    }

    // 4. Epoxy floor
    if (assessment.hasEpoxyFlooring) {
      score += 15;
      details.push({
        label: 'Seamless Seamless Microbial Epoxy / PU Flooring',
        passed: true,
        penalty: '',
        refCode: 'SFA Hygiene Code § 4'
      });
    } else {
      details.push({
        label: 'Seamless Microbial Epoxy / PU Flooring',
        passed: false,
        penalty: 'High risk: Bare concrete retains stagnant fluids, inviting rapid mold colonies and food rot.',
        refCode: 'SFA Hygiene Code § 4'
      });
    }

    // 5. Anteroom
    if (assessment.hasAnteroom) {
      score += 12;
      details.push({
        label: 'Anti-contamination Personnel Anteroom',
        passed: true,
        penalty: '',
        refCode: 'SFA Hygiene Code Clause 9'
      });
    } else {
      details.push({
        label: 'Anti-contamination Personnel Anteroom',
        passed: false,
        penalty: 'Infection risk: Directly nesting restrooms or outdoor boots into food processing zones is prohibited.',
        refCode: 'SFA Hygiene Code Clause 9'
      });
    }

    // 6. Hands-free sinks
    if (assessment.handsFreeSinksInstalled) {
      score += 10;
      details.push({
        label: 'Hands-Free Sensor/Knee Operated Wash Basins',
        passed: true,
        penalty: '',
        refCode: 'SFA Environmental Cap. 8'
      });
    } else {
      details.push({
        label: 'Hands-Free Sinks',
        passed: false,
        penalty: 'Sanitation deficit: SFA requires tap fixtures to be operated without hand-grip touch (knee-lever or photo-cell sensor).',
        refCode: 'SFA Environmental Cap. 8'
      });
    }

    // 7. Pest air curtain
    if (assessment.pestProofAirCurtain) {
      score += 10;
      details.push({
        label: 'High-Velocity Pest Protection Air Curtains at Exits',
        passed: true,
        penalty: '',
        refCode: 'SFA Pest Control Ch. 11'
      });
    } else {
      details.push({
        label: 'Pest Protection Air Curtains at Exits',
        passed: false,
        penalty: 'Fumigation penalty: Cargo shipping gates lacking powerful outward air flows cannot keep flies and pests out.',
        refCode: 'SFA Pest Control Ch. 11'
      });
    }

    let grade: 'Grade A (Outstanding)' | 'Grade B (Advisory Standard)' | 'Grade C (Major Non-Compliance)' = 'Grade C (Major Non-Compliance)';
    if (score >= 90) {
      grade = 'Grade A (Outstanding)';
    } else if (score >= 70) {
      grade = 'Grade B (Advisory Standard)';
    }

    return { score, details, grade };
  }, [assessment]);

  const handleReset = () => {
    setAssessment({
      industryType: 'Central Kitchen',
      floorArea: 4500,
      hasEpoxyFlooring: false,
      hasAnteroom: false,
      sewerGreaseTrap: false,
      separateRawAndCookedArea: false,
      exhaustSystemScrubber: false,
      handsFreeSinksInstalled: false,
      pestProofAirCurtain: false,
    });
    setTestTriggered(false);
  };

  const printReport = () => {
    setPrintNotification("Compliance Report SFA-READY-RE-2026 successfully compiled for print queue.");
    window.scrollTo({ top: 350, behavior: 'smooth' });
    setTimeout(() => {
      setPrintNotification(null);
    }, 5000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Intro info box */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase font-bold text-haccp-teal tracking-widest block mb-1">
            Singapore Food Safety Authority Ruleset
          </span>
          <h2 className="font-display text-xl font-bold text-primary">
            SFA Food Factory Approval Simulator & Auditing Sandbox
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
            Simulate layout design parameters for your food production facilities in Singapore. This framework runs compliance checks against SFA and industrial HACCP codes to test licensing readiness before leasing or purchasing real estate assets.
          </p>
        </div>
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-haccp-teal/10">
          <HardHat className="h-8 w-8 text-haccp-teal" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pointer-events-auto">
        {/* Left Column: Form Parameters (5 cols) */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 h-fit">
          <h3 className="font-display text-base font-bold text-primary border-b border-slate-100 pb-3 mb-6">
            Facility Specifications Input
          </h3>

          <div className="space-y-6">
            {/* Food Industry Type */}
            <div>
              <label htmlFor="industryType" className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2">
                Food Facility Sector
              </label>
              <select
                id="industryType"
                value={assessment.industryType}
                onChange={(e) => setAssessment(prev => ({ ...prev, industryType: e.target.value as any }))}
                className="w-full text-xs rounded-md border border-slate-200 bg-white py-2 px-3 text-slate-800"
              >
                <option value="Central Kitchen">Central Kitchen (Ready-to-eat meals, hospitality catering)</option>
                <option value="Bakery Manufacturing">Bakery & Pastry Manufacturing (High-heat ovens)</option>
                <option value="Meat & Seafood Processing">Butchery, Portioning & Raw Seafood Hub</option>
                <option value="Cold Chain Storage">Cold Logistics Warehouse & Deep Freezers</option>
                <option value="Ready-To-Eat Meal Prep">RTE Packaging & Semi-automated Assembly</option>
              </select>
            </div>

            {/* Simulated Floor Area */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="areaInput" className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                  Simulated Floor Area
                </label>
                <span className="text-xs text-primary font-mono font-bold">
                  {assessment.floorArea.toLocaleString()} sqft
                </span>
              </div>
              <input
                id="areaInput"
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={assessment.floorArea}
                onChange={(e) => setAssessment(prev => ({ ...prev, floorArea: parseInt(e.target.value) }))}
                className="w-full accent-haccp-teal cursor-pointer"
              />
            </div>

            {/* Checklist elements toggling */}
            <div className="border-t border-slate-100 pt-5 space-y-4">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
                Cleanroom Design Elements
              </span>

              {/* Sewage grease trap */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessment.sewerGreaseTrap}
                  onChange={(e) => setAssessment(prev => ({ ...prev, sewerGreaseTrap: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-haccp-teal focus:ring-haccp-teal cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-semibold text-slate-700">Sewage Grease Trap Interceptor Installed</span>
                  <p className="text-[10px] text-slate-500">PUB-complying grease filtering (required for wet preparation kitchens).</p>
                </div>
              </label>

              {/* Seamless epoxy */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessment.hasEpoxyFlooring}
                  onChange={(e) => setAssessment(prev => ({ ...prev, hasEpoxyFlooring: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-haccp-teal focus:ring-haccp-teal cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-semibold text-slate-700">Seamless Seamless Epoxy / PU Flooring</span>
                  <p className="text-[10px] text-slate-500">Antibacterial floor coating with curved floor-to-wall wall base coving.</p>
                </div>
              </label>

              {/* Layout segregation */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessment.separateRawAndCookedArea}
                  onChange={(e) => setAssessment(prev => ({ ...prev, separateRawAndCookedArea: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-haccp-teal focus:ring-haccp-teal cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-semibold text-slate-700">Unidirectional Raw to Cooked Process Flow</span>
                  <p className="text-[10px] text-slate-500">Guarantees separate physical channels for incoming ingredients & cooked shipments.</p>
                </div>
              </label>

              {/* Exhaust scrubber */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessment.exhaustSystemScrubber}
                  onChange={(e) => setAssessment(prev => ({ ...prev, exhaustSystemScrubber: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-haccp-teal focus:ring-haccp-teal cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-semibold text-slate-700">Mechanical Air Extraction & Scrubber</span>
                  <p className="text-[10px] text-slate-500">Continuous clean air exhaust flow with organic odor filtration scrubbers.</p>
                </div>
              </label>

              {/* Hands free sinks */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessment.handsFreeSinksInstalled}
                  onChange={(e) => setAssessment(prev => ({ ...prev, handsFreeSinksInstalled: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-haccp-teal focus:ring-haccp-teal cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-semibold text-slate-700">Hands-Free Sensor/Pedal Wash Sinks</span>
                  <p className="text-[10px] text-slate-500">Operation without physical hand-contact on tap fixtures for decontamination.</p>
                </div>
              </label>

              {/* Anteroom */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessment.hasAnteroom}
                  onChange={(e) => setAssessment(prev => ({ ...prev, hasAnteroom: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-haccp-teal focus:ring-haccp-teal cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-semibold text-slate-700">Sanitary Personnel Entry Anteroom</span>
                  <p className="text-[10px] text-slate-500">Mandatory locker & sanitizing buffer zone between bathrooms and work zones.</p>
                </div>
              </label>

              {/* Pest curtain */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={assessment.pestProofAirCurtain}
                  onChange={(e) => setAssessment(prev => ({ ...prev, pestProofAirCurtain: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-haccp-teal focus:ring-haccp-teal cursor-pointer"
                />
                <div>
                  <span className="block text-xs font-semibold text-slate-700">Air Curtains & Pest Screening In Place</span>
                  <p className="text-[10px] text-slate-500">Downward/outward active air systems above all external loading entryways.</p>
                </div>
              </label>
            </div>

            {/* Run Button */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setTestTriggered(true)}
                className="flex-1 py-3 text-xs font-bold uppercase tracking-wider bg-haccp-teal text-white rounded hover:bg-teal-700 transition-colors shadow-sm text-center cursor-pointer"
              >
                Evaluate Compliance Specs
              </button>
              <button
                onClick={handleReset}
                className="p-3 text-slate-500 border border-slate-200 rounded hover:bg-slate-50 transition-colors cursor-pointer"
                title="Reset simulation parameters"
                aria-label="Reset simulation parameters"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Assessment Result Meter (7 cols) */}
        <section className="lg:col-span-7 space-y-6">
          {!testTriggered ? (
            /* Idle placeholder state */
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-lg p-12 text-center h-full flex flex-col items-center justify-center">
              <ClipboardCheck className="h-12 w-12 text-slate-300 mb-4" />
              <h4 className="font-display text-base font-bold text-primary">
                Awaiting Facility Simulation Parameters
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mt-2">
                Configure your food factory design values in the side panel then trigger the SFA simulator for real-time grading reports.
              </p>
            </div>
          ) : (
            /* Result Dashboard */
            <>
              {/* Score card / Meter */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                {printNotification && (
                  <div className="mb-4 p-3 bg-haccp-teal/10 border border-haccp-teal/30 rounded text-xs text-haccp-teal font-medium flex items-center justify-between">
                    <span className="flex items-center gap-1.5 flex-wrap">
                      <span className="h-1.5 w-1.5 rounded-full bg-haccp-teal animate-pulse" />
                      {printNotification}
                    </span>
                    <button onClick={() => setPrintNotification(null)} className="text-[10px] uppercase font-bold hover:underline cursor-pointer pl-2">Dismiss</button>
                  </div>
                )}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                      TEST RESULTS EN-HACCP-2026
                    </span>
                    <h4 className="font-display text-base font-bold text-primary mt-0.5">
                      SFA Licensing Evaluation Scorecard
                    </h4>
                  </div>
                  <button
                    onClick={printReport}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs text-slate-600 border border-slate-200 hover:bg-slate-50 rounded"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print Summary
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Gauge indicator */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-100 pb-6 md:pb-0 md:pr-6">
                    <div className="relative flex items-center justify-center h-28 w-28 rounded-full border-4 border-slate-100 bg-slate-50">
                      {/* SVG Circle progress */}
                      <svg className="absolute -rotate-90" width="112" height="112">
                        <circle
                          cx="56"
                          cy="56"
                          r="50"
                          stroke={results.score >= 90 ? '#00A699' : results.score >= 70 ? '#e2e8f0' : '#D1A32D'} // soft teal vs dark teal vs amber-yellow
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray="314"
                          strokeDashoffset={314 - (314 * results.score) / 100}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="text-center z-10">
                        <span className="text-3xl font-extrabold text-primary block leading-none font-mono">
                          {results.score}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                          Ready Score
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating outcome description */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded ${
                        results.score >= 90 
                          ? 'bg-haccp-teal text-white' 
                          : results.score >= 70 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-red-100 text-red-600'
                      }`}>
                        {results.grade}
                      </span>
                    </div>
                    
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {results.score >= 90 
                        ? 'Outstanding preparation standard! Your proposed design layout addresses all prime hygiene principles and is fully optimized for Singapore Food Agency (SFA) licensing inspections. Excellent central processing facility framework.'
                        : results.score >= 70
                          ? 'Satisfactory baseline standard. Your layout passes the fundamental mechanical and structural hurdles, but lacks specialized barrier components. SFA has high chance of issuing operational restrictions or conditional approvals.'
                          : 'Major Compliance Gaps identified. Critically vital parameters (such as raw/cooked flow isolation or PUB wastewater interceptors) are absent. Executing work without corrections will trigger immediate SFA shutdown notices and municipal prosecution.'
                      }
                    </p>
                  </div>
                </div>
              </div>

              {/* Component breakdown details */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h4 className="font-display font-semibold text-sm text-primary mb-4">
                  Assessment Parametric Audit
                </h4>

                <div className="space-y-4">
                  {results.details.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded border transition-shadow ${
                        item.passed 
                          ? 'border-emerald-100 bg-emerald-50/40' 
                          : 'border-red-100 bg-red-50/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex gap-2">
                          {item.passed ? (
                            <CheckCircle2 className="h-5 w-5 text-haccp-teal grow-0 shrink-0 mt-0.5" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-warning-accent grow-0 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h5 className="text-xs font-bold text-primary flex items-center gap-2">
                              {item.label}
                              <span className="text-[9px] font-mono font-medium bg-slate-100 text-slate-500 rounded px-1.5 py-0.5 uppercase">
                                {item.refCode}
                              </span>
                            </h5>
                            {!item.passed && (
                              <p className="text-xs text-warning-accent mt-1 leading-relaxed">
                                {item.penalty}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono font-bold leading-none ${
                          item.passed ? 'text-haccp-teal' : 'text-warning-accent'
                        }`}>
                          {item.passed ? 'PASSED' : 'DEFICIENT'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
