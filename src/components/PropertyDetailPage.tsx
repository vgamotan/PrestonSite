import React, { useState, useEffect } from 'react';
import { ChevronLeft, Calendar, Download, FileSpreadsheet, Building2, ShieldCheck, Mail, Phone, User, Check, Sparkles, ChevronRight } from 'lucide-react';
import { Property, InquiryFormData } from '../types';
import { motion } from 'motion/react';
// @ts-ignore
import prestonSoonImg from '../assets/images/preston_soon_actual_1781162220560.png';

interface PropertyDetailPageProps {
  property: Property;
  onBack: () => void;
}

export default function PropertyDetailPage({ property, onBack }: PropertyDetailPageProps) {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    intendedUse: 'Central Kitchen',
    viewingDate: '',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [downloadingSpecs, setDownloadingSpecs] = useState(false);
  const [downloadingPlan, setDownloadingPlan] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Scroll to top of the page when a new property details page is opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [property.id]);

  const activeImages = property.images && property.images.length > 0 ? property.images : [property.image];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? activeImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === activeImages.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      setNotification({ message: 'Please fill out all required fields.', type: 'error' });
      return;
    }
    setFormSubmitted(true);
    setNotification({ message: 'Viewing request submitted successfully! Preston Soon will contact you shortly.', type: 'success' });
    setTimeout(() => setNotification(null), 6000);
  };

  const handleDownloadSpecs = () => {
    setDownloadingSpecs(true);
    setTimeout(() => {
      setDownloadingSpecs(false);
      setNotification({ 
        message: `Technical Datasheet for ${property.title} downloaded successfully. (Form SFA-ID: ${property.id})`, 
        type: 'success' 
      });
      setTimeout(() => setNotification(null), 6000);
    }, 1200);
  };

  const handleDownloadPlan = () => {
    setDownloadingPlan(true);
    setTimeout(() => {
      setDownloadingPlan(false);
      setNotification({ 
        message: `HACCP Flow Blueprint Layout (PDF) for ${property.title} downloaded successfully.`, 
        type: 'success' 
      });
      setTimeout(() => setNotification(null), 6000);
    }, 1200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Breadcrumb back navigation link */}
      <nav className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="group flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-primary uppercase tracking-widest transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm"
        >
          <ChevronLeft className="h-4 w-4 stroke-[2.5] group-hover:-translate-x-0.5 transition-transform" />
          Back to Listings
        </button>
        
        <div className="text-xs text-slate-400 font-medium">
          <span className="hover:text-slate-600 cursor-pointer" onClick={onBack}>Directory</span>
          <span className="mx-2">/</span>
          <span className="text-slate-600 font-bold">{property.title}</span>
        </div>
      </nav>

      {/* Inline Notification Banner */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg border text-xs font-medium flex items-center justify-between shadow-sm ${
            notification.type === 'success'
              ? 'bg-haccp-teal/10 border-haccp-teal/30 text-haccp-teal'
              : 'bg-red-50/70 border-red-200 text-red-600'
          }`}
        >
          <span className="flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${notification.type === 'success' ? 'bg-haccp-teal animate-pulse' : 'bg-red-500'}`} />
            {notification.message}
          </span>
          <button 
            onClick={() => setNotification(null)} 
            className="text-[10px] uppercase font-bold tracking-wider hover:underline cursor-pointer pl-4 shrink-0 text-slate-500 hover:text-slate-800"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* Main Page Title Header Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded bg-slate-50 flex items-center justify-center border border-slate-200 shrink-0">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-haccp-teal uppercase tracking-widest">
                {property.category} • {property.location}
              </span>
              {property.sfaApproved && (
                <span className="bg-[#0A2540] text-haccp-teal text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1 border border-haccp-teal/20">
                  <ShieldCheck className="h-3 w-3" />
                  SFA Certified Fit
                </span>
              )}
              {property.tenure === 'Freehold' && (
                <span className="bg-amber-600/10 text-amber-700 border border-amber-500/20 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
                  ★ Freehold
                </span>
              )}
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-primary leading-tight mt-1">
              {property.title}
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Registered Location: <span className="text-slate-700">{property.address}</span>
            </p>
          </div>
        </div>

        {/* Big Price Tag */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg flex flex-col items-start md:items-end md:text-right shrink-0">
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
            Current Market Terms
          </p>
          <p className="text-2xl font-extrabold text-primary mt-1">
            ${property.price.toLocaleString()}
            <span className="text-xs text-slate-500 font-medium ml-1">
              {property.type === 'Lease' ? '/ month' : ' SGD'}
            </span>
          </p>
          <p className="text-xs text-haccp-teal font-mono font-bold mt-0.5">
            ${property.pricePerSqft.toFixed(2)} / sqft
          </p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Content Column (7 cols on large desktop, 8 on ultra-wide) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          {/* Image Gallery */}
          <div className="space-y-3 bg-white p-5 border border-slate-200 rounded-lg shadow-sm">
            {/* Main active image viewport with left/right arrows */}
            <div className="relative aspect-[16/10] bg-slate-50 rounded-md overflow-hidden border border-slate-200 group/gallery">
              <img
                src={activeImages[activeImageIndex]}
                alt={`${property.title} - View ${activeImageIndex + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              
              {/* SFA Certified Fit indicator */}
              {property.sfaApproved && (
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#0A2540] text-haccp-teal bg-opacity-90 backdrop-blur-sm text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md border border-haccp-teal/20">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    SFA Certified Fit
                  </span>
                </div>
              )}

              {/* Photo status indicator text on top-right */}
              <div className="absolute top-4 right-4 bg-slate-900/70 backdrop-blur-sm text-white text-[10px] font-mono px-2 py-1 rounded">
                Photo {activeImageIndex + 1} of {activeImages.length}
              </div>

              {/* Navigation Arrows */}
              {activeImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm text-slate-800 p-1.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-100 group-hover/gallery:opacity-100 z-10"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white backdrop-blur-sm text-slate-800 p-1.5 rounded-full shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-100 group-hover/gallery:opacity-100 z-10"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Horizontal thumbnail selector list */}
            {activeImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-1 select-none scrollbar-thin">
                {activeImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-24 aspect-[16/10] rounded overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      idx === activeImageIndex 
                        ? 'border-haccp-teal ring-2 ring-haccp-teal/15 scale-[0.98]' 
                        : 'border-slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${property.title} preview ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Facility Overview Description */}
          <div id="facility-overview-section" className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-primary mb-3">
              Facility Overview & Description
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {property.description}
            </p>

            {/* Development Specific Details (Brochure Info like Smart Food @ Mandai) */}
            {(property.tenure || property.projectUrl || property.developer) && (
              <div className="mt-5 pt-5 border-t border-slate-100">
                <h4 className="font-display text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  Development Specifications & Core Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs text-slate-600 mb-4">
                  {property.tenure && (
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-medium text-slate-400">Tenure Classification:</span>
                      <strong className="text-primary font-semibold">{property.tenure}</strong>
                    </div>
                  )}
                  {property.expectedCompletion && (
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="font-medium text-slate-400">Target Handover / TOP:</span>
                      <strong className="text-primary font-semibold">{property.expectedCompletion}</strong>
                    </div>
                  )}
                  {property.developer && (
                    <div className="flex justify-between border-b border-slate-200 pb-2 sm:border-none sm:pb-0">
                      <span className="font-medium text-slate-400">Registered Developer:</span>
                      <strong className="text-primary font-semibold">{property.developer}</strong>
                    </div>
                  )}
                  {property.dualKeyProvision && (
                    <div className="flex justify-between border-b border-slate-200 pb-2 sm:border-none sm:pb-0">
                      <span className="font-medium text-slate-400">Flexible Configurations:</span>
                      <strong className="text-primary font-semibold">Dual-Key & Co-Sharing Support</strong>
                    </div>
                  )}
                  {property.rawCookedSegregatedLifts && (
                    <div className="flex justify-between sm:col-span-2 pt-2.5 border-t border-dashed border-slate-200">
                      <span className="font-medium text-slate-400">SFA Food Separation:</span>
                      <strong className="text-haccp-teal font-semibold">Separate Elevator Lifts for Raw and Cooked Food</strong>
                    </div>
                  )}
                </div>

                {property.projectUrl && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-haccp-teal/5 border border-haccp-teal/20 p-4 rounded-lg">
                    <div className="text-xs text-slate-700">
                      <p className="font-bold flex items-center gap-1.5 text-primary">
                        <Sparkles className="h-3.5 w-3.5 text-haccp-teal shrink-0" />
                        OrangeTee Official Developer Project Page
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Explore pricing matrices, direct sales availability, and site plans directly.</p>
                    </div>
                    <a
                      href={property.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0A2540] hover:bg-slate-800 text-white text-xs font-bold rounded shadow-xs select-none cursor-pointer transition-colors shrink-0"
                    >
                      View OrangeTee Listing
                      <ChevronRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Full Registered Address:
              </span>
              <span className="text-xs text-slate-700 font-semibold">
                {property.address}
              </span>
            </div>
          </div>

          {/* Building Tier Breakdown Card */}
          {property.unitBreakdown && property.unitBreakdown.length > 0 && (
            <div id="unit-tiers-breakdown-section" className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-5">
              <div>
                <h3 className="font-display text-base font-bold text-primary">
                  Building Tier Breakdown & Unit Specifications
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Extracted structural, floor loading, clear clearance, and electrical power parameters from the official B2 industrial planning guidelines.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {property.unitBreakdown.map((unit, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-4 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <div>
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${
                            unit.name === 'Premium Harvest' ? 'bg-amber-600/10 text-amber-700 border-amber-500/10' :
                            unit.name === 'Eden Deluxe' ? 'bg-[#0A2540] text-haccp-teal border-haccp-teal/15' :
                            unit.name === 'Eden Green' ? 'bg-haccp-teal/10 text-haccp-teal border-haccp-teal/20' :
                            'bg-indigo-50 text-indigo-700 border-indigo-100'
                          }`}>
                            {unit.name} Module
                          </span>
                          <h4 className="font-display font-bold text-xs text-primary mt-1.5 shrink-0">{unit.floors}</h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 py-3 my-2 border-y border-dashed border-slate-200 text-[10px] font-mono">
                        <div>
                          <span className="text-slate-400 uppercase tracking-wider block text-[8px] font-semibold">CEILING HGT</span>
                          <strong className="text-slate-700 block mt-0.5 leading-snug">{unit.heightM}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase tracking-wider block text-[8px] font-semibold">FLOOR LOAD</span>
                          <strong className="text-slate-700 block mt-0.5 leading-snug">{unit.loadingKn}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 uppercase tracking-wider block text-[8px] font-semibold">POWER SUPPLY</span>
                          <strong className="text-primary font-bold block mt-0.5 leading-snug">{unit.powerPhase}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-[8px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Functional Features & Access</span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {unit.features.map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5">
                            <Check className="h-3 w-3 text-haccp-teal shrink-0 mt-0.5" />
                            <span className="leading-normal">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Standard Technical Spec Card - 3x2 Grid */}
          <div id="technical-parameters-section" className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm">
            <h4 className="font-display font-bold text-base text-primary mb-4 pb-2 border-b border-slate-100 uppercase tracking-wide">
              Technical Parameters & Utilities
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6">
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  FLOOR LOADING CAPACITY
                </span>
                <p className="text-base font-extrabold text-primary mt-1">
                  {property.floorLoadingKnSqm} KN/sqm
                </p>
              </div>
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  CEILING CLEAR HEIGHT
                </span>
                <p className="text-base font-extrabold text-primary mt-1">
                  {property.ceilingHeightM} m
                </p>
              </div>
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  ELECTRICAL POWER SUPPLY
                </span>
                <p className="text-base font-extrabold text-primary mt-1 truncate" title={property.powerSupplyAmps}>
                  {property.powerSupplyAmps}
                </p>
              </div>
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  OPERATIONAL FLOOR AREA
                </span>
                <p className="text-base font-extrabold text-primary mt-1">
                  {property.floorAreaSqft.toLocaleString()} sqft
                </p>
              </div>
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  TOWN-GAS LINE SUPPLY
                </span>
                <p className="text-base font-extrabold text-primary mt-1">
                  {property.gasSupply ? 'High Pressure City-Gas' : 'No Gas Line Connected'}
                </p>
              </div>
              <div>
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  LOADING / UNLOADING BAYS
                </span>
                <p className="text-base font-extrabold text-primary mt-1">
                  {property.loadingBays} Dedicated Bays
                </p>
              </div>
            </div>
          </div>

          {/* SFA Regulatory Specifications High-Contrast Zebra Table */}
          <div id="compliance-checklist-table" className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="bg-primary text-white p-5">
              <h4 className="font-display text-sm font-bold flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-haccp-teal animate-pulse"></span>
                SFA License Readiness Checklist (HACCP Cleanroom Standards)
              </h4>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-primary uppercase tracking-wider">Functional Requirement</th>
                  <th className="p-4 text-xs font-bold text-primary uppercase tracking-wider">HACCP Objective</th>
                  <th className="p-4 text-xs font-bold text-primary uppercase tracking-wider text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-150">
                <tr className="bg-white hover:bg-[#F6F9FC] transition-colors">
                  <td className="p-4 text-xs font-bold text-primary">Antibacterial Epoxy Flooring</td>
                  <td className="p-4 text-xs text-slate-600">Prevents retention of organic liquids, seamless floor-wall perimeter.</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      property.detailedCompliance.antiBacterialEpoxy 
                        ? 'bg-haccp-teal/10 text-haccp-teal' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {property.detailedCompliance.antiBacterialEpoxy ? 'Passed' : 'Deficient'}
                    </span>
                  </td>
                </tr>
                <tr className="bg-[#F8FAFC] hover:bg-[#F6F9FC] transition-colors">
                  <td className="p-4 text-xs font-bold text-primary">Unidirectional Raw-to-Cooked Flow Segregation</td>
                  <td className="p-4 text-xs text-slate-600">Zero physical intersection of raw meats/input and final cooked items.</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      property.detailedCompliance.properFlowSegregation 
                        ? 'bg-haccp-teal/10 text-haccp-teal' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {property.detailedCompliance.properFlowSegregation ? 'Passed' : 'Deficient'}
                    </span>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-[#F6F9FC] transition-colors">
                  <td className="p-4 text-xs font-bold text-primary">Chemical Fume Scrubber & Ventilation</td>
                  <td className="p-4 text-xs text-slate-600">Mandatory exhaust hood configuration for humidity & grease containment.</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      property.detailedCompliance.mechanicalVentilation 
                        ? 'bg-haccp-teal/10 text-haccp-teal' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {property.detailedCompliance.mechanicalVentilation ? 'Passed' : 'Deficient'}
                    </span>
                  </td>
                </tr>
                <tr className="bg-[#F8FAFC] hover:bg-[#F6F9FC] transition-colors">
                  <td className="p-4 text-xs font-bold text-primary">Pest-proofing Curtains Ready</td>
                  <td className="p-4 text-xs text-slate-600">Automatic air blower barriers at all loading and cargo docks.</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      property.detailedCompliance.pestProofingReady 
                        ? 'bg-haccp-teal/10 text-haccp-teal' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {property.detailedCompliance.pestProofingReady ? 'Passed' : 'Deficient'}
                    </span>
                  </td>
                </tr>
                <tr className="bg-white hover:bg-[#F6F9FC] transition-colors">
                  <td className="p-4 text-xs font-bold text-primary">Personnel Sanitation Anteroom</td>
                  <td className="p-4 text-xs text-slate-600">Forced corridor hands-free handwash sink and changing facility.</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      property.detailedCompliance.personnelSanitationAnteroom 
                        ? 'bg-haccp-teal/10 text-haccp-teal' 
                        : 'bg-red-50 text-red-600'
                    }`}>
                      {property.detailedCompliance.personnelSanitationAnteroom ? 'Passed' : 'Deficient'}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Action Buttons row (Download Specs / blueprints) */}
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={handleDownloadSpecs}
              disabled={downloadingSpecs}
              className="flex items-center gap-2 px-5 py-3 text-xs font-bold rounded-lg border border-primary text-primary bg-white hover:bg-slate-50 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              <Download className="h-4 w-4 text-primary" />
              {downloadingSpecs ? 'Generating Report...' : 'Download Full Spec Sheet'}
            </button>
            <button
              onClick={handleDownloadPlan}
              disabled={downloadingPlan}
              className="flex items-center gap-2 px-5 py-3 text-xs font-bold rounded-lg border border-haccp-teal text-haccp-teal bg-white hover:bg-haccp-teal/5 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              <FileSpreadsheet className="h-4 w-4 text-haccp-teal" />
              {downloadingPlan ? 'Loading Floorplan PDF...' : 'HACCP Process Flow Blueprint (PDF)'}
            </button>
          </div>

        </div>

        {/* Right Side Sidebar Column (5 cols on large desktop, 4 on ultra-wide) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          
          {/* Financial Breakdown Box */}
          <div className="bg-primary text-white p-6 rounded-lg shadow-md border border-slate-800">
            <p className="text-[10px] uppercase tracking-widest text-haccp-teal font-extrabold">
              Property Budget & Stamp Data
            </p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">
                ${property.price.toLocaleString()}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {property.type === 'Lease' ? '/ month' : ' SGD Total'}
              </span>
            </div>
            
            <div className="mt-6 pt-5 border-t border-white/10 space-y-3.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 uppercase tracking-wider text-[9px] font-semibold">
                  Unit Area Size
                </span>
                <strong className="text-white font-mono">
                  {property.floorAreaSqft.toLocaleString()} sqft
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 uppercase tracking-wider text-[9px] font-semibold">
                  Unit Rate index
                </span>
                <strong className="text-white font-mono">
                  ${property.pricePerSqft.toFixed(2)} / sqft
                </strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 uppercase tracking-wider text-[9px] font-semibold">
                  Monthly Maintenance fee
                </span>
                <strong className="text-white font-mono">
                  ${property.maintenanceFeeMonthly}/mo
                </strong>
              </div>
              {property.type === 'Sale' && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 uppercase tracking-wider text-[9px] font-semibold">
                    Estimated Yearly Tax (IRAS)
                  </span>
                  <strong className="text-white font-mono">
                    ${property.yearlyTax?.toLocaleString() || '18,500'}/yr
                  </strong>
                </div>
              )}
            </div>
          </div>

          {/* Preston Soon's Specialist Agent Profile Profile Card */}
          <div id="agent-representative-card" className="bg-gradient-to-br from-[#0A2540] to-slate-900 text-white rounded-lg p-6 border border-slate-800 shadow-md">
            <div className="flex gap-4 items-center">
              <img
                src={prestonSoonImg}
                alt="Preston Soon"
                className="h-16 w-16 rounded-full object-cover border-2 border-haccp-teal bg-slate-800 shadow-sm shrink-0"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="font-display font-bold text-base text-white leading-none">Preston Soon</h4>
                  <span className="bg-haccp-teal/20 text-haccp-teal text-[10px] font-bold px-2 py-0.5 rounded border border-haccp-teal/30">
                    SFA Expert
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium mt-1 leading-normal">
                  Associate Senior Director
                </p>
                <p className="text-[10px] font-mono text-slate-400 mt-0.5">
                  Salesperson (CEA Registration No R067294A)
                </p>
              </div>
            </div>
            
            <div className="mt-5 pt-4 border-t border-slate-800 space-y-3.5 text-xs text-slate-300">
              <div className="text-[11px] font-semibold text-slate-200">
                OrangeTee & Tie Licenced Real Estate Agency (L3009250K)
              </div>
              <p className="text-[11px] leading-relaxed text-slate-300">
                Property Advisors for Buy, Sell and Rent and Redevelopment Cosultancy.
              </p>
              <div className="text-[10px] font-mono text-haccp-teal uppercase tracking-wider font-semibold">
                Residential | Commercial | Industrial | Overseas
              </div>
              
              <div className="flex flex-col gap-2.5 pt-1 font-mono text-xs">
                <a 
                  href="tel:+6591885738"
                  className="flex items-center gap-2.5 text-slate-200 hover:text-haccp-teal transition-all group w-fit"
                >
                  <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-haccp-teal transition-colors">
                    <Phone className="h-3.5 w-3.5 text-haccp-teal group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="font-bold">+65 9188 5738</span>
                </a>
                <a 
                  href="mailto:preston.soon@foodpropertyadvisory.sg"
                  className="flex items-center gap-2.5 text-slate-200 hover:text-haccp-teal transition-all group w-fit"
                >
                  <div className="h-7 w-7 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 group-hover:border-haccp-teal transition-colors">
                    <Mail className="h-3.5 w-3.5 text-haccp-teal group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="truncate max-w-[200px] font-bold">preston.soon@foodpropertyadvisory.sg</span>
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Schedule Booking Card - Relocated to direct sidebar */}
          <div id="booking-form-sidebar" className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-primary mb-1.5 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-haccp-teal" />
              Schedule Site Viewing
            </h3>
            <p className="text-xs text-slate-600 mb-5 leading-normal">
              Secure a private 1-on-1 walkthrough and SFA cleanroom compliance layout review with Preston Soon.
            </p>

            {formSubmitted ? (
              <div className="bg-white border border-slate-200 rounded-lg p-5 text-center text-slate-700">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-haccp-teal/10 text-haccp-teal mb-3">
                  <Check className="h-5 w-5 stroke-[3]" />
                </div>
                <h4 className="font-display font-bold text-sm text-primary">
                  Viewing Request Registered!
                </h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Preston Soon will reach out at <strong>{formData.email}</strong> shortly to lock in your inspection agenda slot.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 w-full py-2 text-xs font-semibold bg-primary text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Book Another Slot
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <div>
                  <label htmlFor="fullName" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="Elizabeth Lim"
                      className="w-full text-xs rounded border border-slate-200 bg-white py-2 pl-9 pr-3 text-slate-800 focus:outline-none focus:border-haccp-teal transition-all"
                    />
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Corporate email */}
                <div>
                  <label htmlFor="email" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Corporate Email *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="elizabeth@foodcorp.sg"
                      className="w-full text-xs rounded border border-slate-200 bg-white py-2 pl-9 pr-3 text-slate-800 focus:outline-none focus:border-haccp-teal transition-all"
                    />
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Phone number */}
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Contact Phone *
                  </label>
                  <div className="relative">
                    <input
                      id="phone"
                      type="text"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+65 8739 1234"
                      className="w-full text-xs rounded border border-slate-200 bg-white py-2 pl-9 pr-3 text-slate-800 focus:outline-none focus:border-haccp-teal transition-all"
                    />
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  </div>
                </div>

                {/* Target Date */}
                <div>
                  <label htmlFor="viewingDate" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Preferred Inspection Date
                  </label>
                  <input
                    id="viewingDate"
                    type="date"
                    value={formData.viewingDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, viewingDate: e.target.value }))}
                    className="w-full text-xs rounded border border-slate-200 bg-white py-2 px-3 text-slate-800 focus:outline-none focus:border-haccp-teal transition-all cursor-pointer"
                  />
                </div>

                {/* Intended SFA Use */}
                <div>
                  <label htmlFor="intendedUse" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Intended Application
                  </label>
                  <select
                    id="intendedUse"
                    value={formData.intendedUse}
                    onChange={(e) => setFormData(prev => ({ ...prev, intendedUse: e.target.value }))}
                    className="w-full text-xs rounded border border-slate-200 bg-white py-2 px-3 text-slate-800 focus:outline-none focus:border-haccp-teal cursor-pointer"
                  >
                    <option value="Central Kitchen">Central Kitchen (RTE, Catering)</option>
                    <option value="Bakery Manufacturing">Bakery & Confectionery</option>
                    <option value="Meat & Seafood Hub">Meat Processing / Portioning</option>
                    <option value="Cold Storage Logistics">Sub-zero Cold-Chain Depot</option>
                  </select>
                </div>

                {/* Message comments */}
                <div>
                  <label htmlFor="message" className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                    Special Facility Needs
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Refrigeration, gas line volume, power phases needed..."
                    className="w-full text-xs rounded border border-slate-200 bg-white p-3 text-slate-800 focus:outline-none focus:border-haccp-teal transition-all"
                  ></textarea>
                </div>

                {/* Trigger Button */}
                <button
                  type="submit"
                  className="w-full py-3 text-xs font-bold bg-primary hover:bg-[#0c243a] text-white rounded-lg transition-all uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-98"
                >
                  Book Free Inspection with Preston
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </motion.div>
  );
}
