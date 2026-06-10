import React, { useState, useMemo } from 'react';
import { Search, MapPin, Layers, Sparkles, Filter, ChevronRight, Ban, X } from 'lucide-react';
import { PROPERTIES } from '../data';
import { Property, SearchFilters } from '../types';

interface PropertyGridProps {
  onSelectProperty: (property: Property) => void;
}

export default function PropertyGrid({ onSelectProperty }: PropertyGridProps) {
  // Initialize state filters
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    region: 'All',
    category: 'All',
    type: 'All',
    sfaApproved: false,
    hasColdRoom: false,
    minArea: 0,
    maxArea: 50000,
    minPrice: 0,
    maxPrice: 20000000,
  });

  // Keep track of search panel disclosure on mobile
  const [showFilters, setShowFilters] = useState(false);

  // Compute stats on filtered or all properties
  const stats = useMemo(() => {
    const totalCount = PROPERTIES.length;
    const sfaCount = PROPERTIES.filter(p => p.sfaApproved).length;
    const vacantCount = PROPERTIES.filter(p => p.tenancyStatus === 'Vacant').length;
    return { totalCount, sfaCount, vacantCount };
  }, []);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter((property) => {
      // Query check (title, address, description, location)
      if (
        filters.query &&
        !property.title.toLowerCase().includes(filters.query.toLowerCase()) &&
        !property.address.toLowerCase().includes(filters.query.toLowerCase()) &&
        !property.description.toLowerCase().includes(filters.query.toLowerCase())
      ) {
        return false;
      }

      // Region check
      if (filters.region !== 'All' && property.region !== filters.region) {
        return false;
      }

      // Category check
      if (filters.category !== 'All' && property.category !== filters.category) {
        return false;
      }

      // Type check
      if (filters.type !== 'All' && property.type !== filters.type) {
        return false;
      }

      // SFA Approved option
      if (filters.sfaApproved && !property.sfaApproved) {
        return false;
      }

      // Cold room check
      if (filters.hasColdRoom && !property.hasColdRoom) {
        return false;
      }

      // Area range check
      if (property.floorAreaSqft < filters.minArea || property.floorAreaSqft > filters.maxArea) {
        return false;
      }

      // Price range check
      if (property.price < filters.minPrice || property.price > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      query: '',
      region: 'All',
      category: 'All',
      type: 'All',
      sfaApproved: false,
      hasColdRoom: false,
      minArea: 0,
      maxArea: 50000,
      minPrice: 0,
      maxPrice: 20000000,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Overview stats layout */}
      <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 transition-shadow">
          <div>
            <p className="font-sans text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Total Food Industrial Sites
            </p>
            <h3 className="font-display text-4xl font-extrabold text-primary mt-2">
              {stats.totalCount}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-2">Curated grade-A institutional assets</p>
        </div>
        <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5">
          <div>
            <p className="font-sans text-xs font-semibold tracking-wider text-slate-500 uppercase">
              SFA-Approved Space Ratio
            </p>
            <h3 className="font-display text-4xl font-extrabold text-haccp-teal mt-2">
              {Math.round((stats.sfaCount / stats.totalCount) * 100)}%
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-2">Certified for direct food prep & packing</p>
        </div>
        <div className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5">
          <div>
            <p className="font-sans text-xs font-semibold tracking-wider text-slate-500 uppercase">
              Immediate Tenant Vacancy
            </p>
            <h3 className="font-display text-4xl font-extrabold text-amber-600 mt-2">
              {stats.vacantCount} Units
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-2">Turnkey facilities ready for inspection</p>
        </div>
      </section>

      {/* Mobile backdrop for search filters drawer */}
      {showFilters && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 lg:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}

      {/* Grid container with sidebar filter and listings */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filter Panel */}
        <div 
          className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[calc(100vw-3rem)] bg-white p-6 overflow-y-auto shadow-2xl transition-all duration-300 border-r border-slate-200 lg:static lg:translate-x-0 lg:w-auto lg:h-fit lg:col-span-1 lg:shadow-none lg:border lg:border-slate-200 lg:rounded-lg lg:opacity-100 lg:pointer-events-auto ${
            showFilters 
              ? 'translate-x-0 opacity-100 pointer-events-auto' 
              : '-translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h3 className="font-display text-base font-bold text-primary flex items-center gap-2">
              <Filter className="h-4 w-4 text-haccp-teal" />
              Advanced Filters
            </h3>
            <div className="flex items-center gap-2.5">
              <button
                onClick={resetFilters}
                className="text-xs font-medium text-slate-500 hover:text-haccp-teal transition-colors"
              >
                Reset All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Search Query */}
            <div>
              <label htmlFor="search" className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2">
                Search Property
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="e.g., Senoko, Cold room..."
                  value={filters.query}
                  onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
                  className="w-full text-sm rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-haccp-teal focus:bg-white transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Price Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2">
                Transaction Type
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['All', 'Sale', 'Lease'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilters(prev => ({ ...prev, type }))}
                    className={`py-1.5 text-xs font-semibold rounded-md border text-center transition-all ${
                      filters.type === type
                        ? 'border-primary bg-primary text-white'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Select */}
            <div>
              <label htmlFor="region" className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2">
                Singapore Region
              </label>
              <select
                id="region"
                value={filters.region}
                onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                className="w-full text-xs rounded-md border border-slate-200 bg-white py-2 px-3 text-slate-800 focus:outline-none focus:border-haccp-teal"
              >
                <option value="All">All Regions</option>
                <option value="North">North (Woodlands, Senoko)</option>
                <option value="West">West (Jurong, Tuas)</option>
                <option value="East">East (Changi, Tampines)</option>
                <option value="Central">Central (Defu, Hougang)</option>
              </select>
            </div>

            {/* Category Select */}
            <div>
              <label htmlFor="category" className="block text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2">
                Industry Class
              </label>
              <select
                id="category"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full text-xs rounded-md border border-slate-200 bg-white py-2 px-3 text-slate-800 focus:outline-none focus:border-haccp-teal"
              >
                <option value="All">All Classifications</option>
                <option value="Central Kitchen">Central Kitchen</option>
                <option value="Food Processing">Food Processing Hub</option>
                <option value="Cold Chain Logistics">Cold Chain Logistics</option>
                <option value="Meat & Seafood Hub">Meat & Seafood Hub</option>
              </select>
            </div>

            {/* Toggle Switches */}
            <div className="space-y-3 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.sfaApproved}
                  onChange={(e) => setFilters(prev => ({ ...prev, sfaApproved: e.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-haccp-teal focus:ring-haccp-teal cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                  SFA Approved Area Only
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.hasColdRoom}
                  onChange={(e) => setFilters(prev => ({ ...prev, hasColdRoom: e.target.checked }))}
                  className="h-4 w-4 rounded border-slate-300 text-haccp-teal focus:ring-haccp-teal cursor-pointer"
                />
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                  Existing Cold Room Facility
                </span>
              </label>
            </div>

            {/* Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-widest">
                  Floor Area (sqft)
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Up to {filters.maxArea.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                step="2000"
                value={filters.maxArea}
                onChange={(e) => setFilters(prev => ({ ...prev, maxArea: parseInt(e.target.value) }))}
                className="w-full accent-haccp-teal cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Listings Display Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-primary">
                Available Properties ({filteredProperties.length})
              </h2>
              <span className="hidden sm:inline text-xs text-slate-500">
                Singapore food industrial listings updated daily
              </span>
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden flex items-center gap-2 px-3.5 py-2 border border-slate-200 rounded-md bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer select-none active:scale-95 transition-all"
            >
              <Filter className="h-3.5 w-3.5 text-haccp-teal" />
              Filters
              {Object.values(filters).some(val => val !== 'All' && val !== '' && val !== false && val !== 0 && val !== 50000 && val !== 20000000) && (
                <span className="h-1.5 w-1.5 rounded-full bg-haccp-teal animate-pulse" />
              )}
            </button>
          </div>

          {filteredProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 border border-dashed border-slate-200 rounded-lg bg-white text-center">
              <Ban className="h-10 w-10 text-slate-300 mb-4" />
              <p className="font-display text-base font-bold text-primary">
                No matching industrial spaces found
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Try widening your search area or toggling off some filter criteria.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 text-xs font-medium bg-primary text-white rounded-md hover:bg-slate-800 transition-colors"
              >
                Clear All Search Filters
              </button>
            </div>
          ) : (
            /* Responsive Grid of Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProperties.map((property) => (
                <article
                  key={property.id}
                  onClick={() => onSelectProperty(property)}
                  className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col pointer-events-auto cursor-pointer hover:shadow-lg hover:border-slate-300 transition-all duration-300 group"
                >
                  {/* Card Banner Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={property.image}
                      alt={property.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {/* Sale/Lease Pill */}
                      <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm text-white ${
                        property.type === 'Sale' ? 'bg-primary' : 'bg-haccp-teal'
                      }`}>
                        For {property.type}
                      </span>
                      {/* Region Tag */}
                      <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-900/80 text-white rounded-sm">
                        {property.region} Region
                      </span>
                    </div>

                    {/* Rent Price Accent on banner */}
                    <div className="absolute bottom-3 right-3 bg-white px-3 py-1.5 rounded shadow-md border border-slate-100">
                      <span className="text-sm font-bold text-primary">
                        {property.type === 'Lease' 
                          ? `$${property.price.toLocaleString()}/mo`
                          : `$${(property.price / 1000000).toFixed(1)}M`
                        }
                      </span>
                    </div>
                  </div>

                  {/* Card Content details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category Label */}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-haccp-teal">
                        {property.category}
                      </span>

                      {/* Header with Title */}
                      <h4 className="font-display font-semibold text-base text-primary tracking-tight mt-1 group-hover:text-haccp-teal transition-colors">
                        {property.title}
                      </h4>

                      {/* Location address */}
                      <div className="flex items-center gap-1.5 text-slate-500 mt-1.5">
                        <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                        <span className="text-xs truncate">{property.location}</span>
                      </div>

                      {/* Pill badging with 10% opacity as requested */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {property.sfaApproved && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-haccp-teal/10 text-haccp-teal border border-haccp-teal/20">
                            SFA Approved
                          </span>
                        )}
                        {property.haccpCertified && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 border border-indigo-100">
                            HACCP Certified
                          </span>
                        )}
                        {property.hasColdRoom && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-600 border border-sky-100">
                            Cold Room Ready
                          </span>
                        )}
                        {property.tenure === 'Freehold' && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-700 border border-amber-500/20">
                            ★ Freehold
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Technical 3x2 Grid specifications required by the design instructions */}
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <div className="grid grid-cols-3 gap-y-3 gap-x-2">
                        {/* Area */}
                        <div>
                          <p id={`lbl-area-${property.id}`} className="font-sans text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none">
                            FLOOR AREA
                          </p>
                          <p aria-labelledby={`lbl-area-${property.id}`} className="text-xs font-bold text-primary mt-1">
                            {property.floorAreaSqft.toLocaleString()} sqft
                          </p>
                        </div>
                        {/* Floor Loading */}
                        <div>
                          <p id={`lbl-loading-${property.id}`} className="font-sans text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none">
                            FLOOR LOADING
                          </p>
                          <p aria-labelledby={`lbl-loading-${property.id}`} className="text-xs font-bold text-primary mt-1">
                            {property.floorLoadingKnSqm} KN/sqm
                          </p>
                        </div>
                        {/* Ceiling Height */}
                        <div>
                          <p id={`lbl-height-${property.id}`} className="font-sans text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none">
                            CEILING HEIGHT
                          </p>
                          <p aria-labelledby={`lbl-height-${property.id}`} className="text-xs font-bold text-primary mt-1">
                            {property.ceilingHeightM} m
                          </p>
                        </div>
                        {/* Electrical Power */}
                        <div>
                          <p id={`lbl-power-${property.id}`} className="font-sans text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none">
                            POWER SUPPLY
                          </p>
                          <p aria-labelledby={`lbl-power-${property.id}`} className="text-xs font-bold text-primary mt-1 truncate">
                            {property.powerSupplyAmps.split(' ')[0]} Amp
                          </p>
                        </div>
                        {/* Zone classification */}
                        <div>
                          <p id={`lbl-zone-${property.id}`} className="font-sans text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none">
                            LAND ZONE
                          </p>
                          <p aria-labelledby={`lbl-zone-${property.id}`} className="text-xs font-bold text-primary mt-1 truncate">
                            {property.zone === 'Food Zone' ? 'Food Zone' : 'B2 Ind.'}
                          </p>
                        </div>
                        {/* Loading Bays */}
                        <div>
                          <p id={`lbl-bays-${property.id}`} className="font-sans text-[9px] font-semibold text-slate-500 uppercase tracking-wider leading-none">
                            LOADING BAYS
                          </p>
                          <p aria-labelledby={`lbl-bays-${property.id}`} className="text-xs font-bold text-primary mt-1">
                            {property.loadingBays} Bays
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action trigger footer */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500 hover:text-primary transition-colors">
                      <span className="flex items-center gap-1">
                        SFA Compliance Rating: 
                        <strong className="text-haccp-teal">{property.complianceScore}%</strong>
                      </span>
                      <span className="flex items-center gap-0.5 text-haccp-teal font-semibold group-hover:translate-x-1 transition-transform">
                        Explore specs <ChevronRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
