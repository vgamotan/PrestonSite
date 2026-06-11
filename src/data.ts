import { Property } from './types';
// @ts-ignore
import foodaxisExterior from './assets/images/foodaxis_exterior_1781162845460.png';
// @ts-ignore
import foodaxisInterior from './assets/images/foodaxis_interior_1781162860441.png';
// @ts-ignore
import foodaxisLoadingBay from './assets/images/foodaxis_loading_bay_1781162875681.png';
// @ts-ignore
import foodaxisColdRoom from './assets/images/foodaxis_cold_room_1781162887942.png';
// @ts-ignore
import foodascentExterior from './assets/images/foodascent_exterior_1781163422375.png';
// @ts-ignore
import foodascentInterior from './assets/images/foodascent_interior_1781163446537.png';
// @ts-ignore
import foodascentRampUp from './assets/images/foodascent_ramp_up_1781163461576.png';
// @ts-ignore
import foodascentCanteen from './assets/images/foodascent_canteen_1781163479272.png';
// @ts-ignore
import sckJurongExterior from './assets/images/sck_jurong_exterior_1781181579417.png';
// @ts-ignore
import sckJurongLounge from './assets/images/sck_jurong_lounge_1781181597540.png';
// @ts-ignore
import sckJurongKitchen from './assets/images/sck_jurong_kitchen_1781181612574.png';
// @ts-ignore
import sckJurongCorridor from './assets/images/sck_jurong_corridor_1781181627232.png';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-senoko-foodaxis',
    title: 'FoodAxis @ Senoko',
    location: 'Senoko Loop, Sembawang',
    region: 'North',
    price: 24800,
    type: 'Lease',
    pricePerSqft: 2.00,
    floorAreaSqft: 12400,
    ceilingHeightM: 7.0,
    floorLoadingKnSqm: 15,
    powerSupplyAmps: '150 Amp to 300 Amp 3-Phase',
    sfaApproved: true,
    haccpCertified: true,
    hasColdRoom: true,
    gasSupply: true,
    greaseTrapCapacitySq: 'Centralised Interceptor Stack',
    address: '10 & 12 Senoko Loop, Sembawang, Singapore 758141',
    description: 'FoodAxis @ Senoko is a purpose-built, highly-specialised five-storey Business 2 food industrial facility developed by CapitaLand (Ascendas). Designed specifically for large-scale central kitchens, food preparation, and cold-room logistics, this development features a ramp-up structure allowing up to 20-foot container trucks direct doorstep loading access. To fully support SFA and HACCP guidelines, FoodAxis enforces strict hygiene standards with separate service and passenger lift systems, segregated raw and cooked handling zones, high-capacity centralized grease interceptors, and high-velocity mechanical ventilation exhaust shafts. On-site worker amenities include an ancillary food canteen and a premium air curtain lobby.',
    image: foodaxisExterior,
    images: [
      foodaxisExterior,
      foodaxisInterior,
      foodaxisLoadingBay,
      foodaxisColdRoom
    ],
    category: 'Food Processing',
    zone: 'Food Zone',
    tenancyStatus: 'Vacant',
    loadingBays: 8,
    complianceScore: 100,
    detailedCompliance: {
      antiBacterialEpoxy: true,
      properFlowSegregation: true,
      mechanicalVentilation: true,
      pestProofingReady: true,
      personnelSanitationAnteroom: true
    },
    yearlyTax: 10400,
    maintenanceFeeMonthly: 920,
    tenure: '30-year Leasehold',
    expectedCompletion: 'Completed (August 2013)',
    developer: 'CapitaLand',
    projectUrl: 'https://www.capitaland.com/sg/en/lease/businesspark-industrial-logistics-listing/foodaxis-senoko.html',
    rawCookedSegregatedLifts: true,
    dualKeyProvision: false,
    unitBreakdown: [
      {
        name: 'Premier Processing Zone',
        floors: '1st Storey (Premium Ground-Floor Loading Units)',
        heightM: '7.0m Floor-to-Floor Height',
        loadingKn: '15.0 kN/m²',
        powerPhase: '200A to 300A 3-Phase',
        features: [
          'Direct doorstep dock-levellers for sub-zero cold chain logistics',
          'Heavy infrastructure floor loading ideal for multi-tonne equipment',
          'Immediate city-gas mains infrastructure connection and custom high exhaust lines',
          'Designed specifically for raw preparation of meat, poultry, and fish processing'
        ]
      },
      {
        name: 'Upper Kitchen Suite',
        floors: '2nd to 5th Storey (Ramp-up Processing Suites)',
        heightM: '6.0m Floor-to-Floor Height',
        loadingKn: '12.5 kN/m²',
        powerPhase: '150A 3-Phase',
        features: [
          'Direct drive-up access for 10-tonne trucks right to unit entrance roll-up doors',
          'Heavy-volume mechanical extractors ready for frying, roasting, and high-heat central kitchens',
          'SFA/HACCP layout pre-approval potential for high-volume caterers and bakeries',
          'Dedicated dry waste chutes and raw-finished food lift segregation'
        ]
      }
    ]
  },
  {
    id: 'prop-tuas-mega',
    title: 'Food Ascent @ Tuas',
    location: 'Tuas Bay Lane, Tuas',
    region: 'West',
    price: 3480000,
    type: 'Sale',
    pricePerSqft: 1140.98,
    floorAreaSqft: 3050,
    ceilingHeightM: 7.0,
    floorLoadingKnSqm: 15.0,
    powerSupplyAmps: '150 Amp 3-Phase',
    sfaApproved: true,
    haccpCertified: true,
    hasColdRoom: true,
    gasSupply: true,
    greaseTrapCapacitySq: 'Centralised Stack Ready',
    address: '10 Tuas Bay Lane, Singapore 637302',
    description: 'Food Ascent @ Tuas is a state-of-the-art, purpose-built, Business 2 ramp-up food-factory industrial development developed by Soilbuild Group. Situated in the prestigious Tuas Bay Lane food zone, this 9-storey facility is meticulously engineered to meet stringent SFA and HACCP standards for modern central kitchens, food preparation, cold logistics, food labs, and automated packaging. The development features a total of 101 production units and an on-site ancillary food canteen, and is built to support modern eco-responsibilities, including natural passive ventilation layouts, vertical greenery pockets, and high-capacity rooftop solar panel compatibility. With a spacious curved concrete ramp designed to allow up to 20-foot container trucks drive-up doorstep access, doorstep raw ingredient unloading and cooked food vehicle logistics are highly convenient. It features separate elevators and corridors for raw and cooked items to strictly prevent cross-contamination, separate dry and wet waste chutes, centralised stack grease trap lines, pre-built high-velocity mechanical ventilation ducts, and a 150 Amp 3-phase power supply for stable, high-volume culinary operations.',
    image: foodascentExterior,
    images: [
      foodascentExterior,
      foodascentInterior,
      foodascentRampUp,
      foodascentCanteen
    ],
    category: 'Food Processing',
    zone: 'Food Zone',
    tenancyStatus: 'Vacant',
    loadingBays: 4,
    complianceScore: 98,
    detailedCompliance: {
      antiBacterialEpoxy: true,
      properFlowSegregation: true,
      mechanicalVentilation: true,
      pestProofingReady: true,
      personnelSanitationAnteroom: true
    },
    yearlyTax: 16200,
    maintenanceFeeMonthly: 620,
    tenure: '30-year Leasehold',
    expectedCompletion: 'TOP Obtained (2025)',
    developer: 'Soilbuild Group Holdings Ltd.',
    projectUrl: 'https://www.foodascent.sg/',
    rawCookedSegregatedLifts: true,
    dualKeyProvision: true,
    unitBreakdown: [
      {
        name: 'Prime Harvest Floor',
        floors: '1st Storey (Premium Ground level Ground-Floor Units)',
        heightM: '7.0m Full Height (supports premium mezzanine workspace)',
        loadingKn: '15.0 kN/m²',
        powerPhase: '150 Amp 3-Phase (supports massive walk-in cold rooms)',
        features: [
          'Dual dock-leveling provisions with direct street-level access',
          'Immediate town gas connectivity with central grease interceptor readiness',
          'SFA certified for fast-paced chilled storage and high-load production',
          'Spacious overhead area configured for heavy vertical cargo storage'
        ]
      },
      {
        name: 'Elite Production Zone',
        floors: '2nd to 9th Storeys (Ramp-up Units)',
        heightM: '5.95m Clear Operating Height',
        loadingKn: '12.5 kN/m²',
        powerPhase: '100A to 125A 3-Phase',
        features: [
          'Direct ramp-up forklift and rigid truck access right to your doorstep',
          'Exquisite dual-key provisions ready for kitchen co-sharing brands',
          'Dedicated separated exhaust shafts for clean mechanical ventilation',
          'Centralised waste management chute separate from raw cargo entry'
        ]
      }
    ]
  },
  {
    id: 'prop-jurong-kitchen',
    title: 'Smart City Kitchens @ Jurong West',
    location: 'Chin Bee Avenue, Jurong West',
    region: 'West',
    price: 18500,
    type: 'Lease',
    pricePerSqft: 2.72,
    floorAreaSqft: 6800,
    ceilingHeightM: 6.0,
    floorLoadingKnSqm: 15,
    powerSupplyAmps: '150 Amp to 250 Amp 3-Phase',
    sfaApproved: true,
    haccpCertified: true,
    hasColdRoom: true,
    gasSupply: true,
    greaseTrapCapacitySq: '1,500 Liters with Centralised Interceptor',
    address: '17 Chin Bee Avenue, Jurong West, Singapore 619940',
    description: 'Smart City Kitchens @ Jurong West is a state-of-the-art, SFA-compliant shared cloud kitchen facility designed specifically to support food delivery service brands, quick-service concepts, virtual restaurants, and central preparations. Located in the popular Jurong West (Chin Bee) food ecosystem, this dynamic, high-spec complex holds professional co-sharing commercial kitchen spaces designed for high productivity, low overhead, and rapid scaling. The facility provides an immersive delivery rider pick-up lounge, self-service tracking kiosks, seamless hands-free sanitation bays, integrated floor trench drainage, and automated pest-proofing air curtains. Built with strict unidirectional flow mechanics to prevent cross-contamination, separate grease interceptors, and high-performance kitchen exhaust scrubbers, it provides individual chefs and dining chains the perfect launchpad for Western Singapore.',
    image: sckJurongExterior,
    images: [
      sckJurongExterior,
      sckJurongLounge,
      sckJurongKitchen,
      sckJurongCorridor
    ],
    category: 'Central Kitchen',
    zone: 'Food Zone',
    tenancyStatus: 'Tenanted',
    loadingBays: 4,
    complianceScore: 100,
    detailedCompliance: {
      antiBacterialEpoxy: true,
      properFlowSegregation: true,
      mechanicalVentilation: true,
      pestProofingReady: true,
      personnelSanitationAnteroom: true
    },
    yearlyTax: 8400,
    maintenanceFeeMonthly: 550,
    tenure: '30-year Leasehold',
    expectedCompletion: 'Completed (2022)',
    developer: 'Smart City Kitchens Pte. Ltd.',
    projectUrl: 'https://www.smartcitykitchens.com/locations/jurongwest/gallery/',
    rawCookedSegregatedLifts: false,
    dualKeyProvision: false,
    unitBreakdown: [
      {
        name: 'Standard Culinary Suite',
        floors: 'Ground & Upper Levels (Fully-equipped individual suites)',
        heightM: '3.2m working ceiling height',
        loadingKn: '12.5 kN/m²',
        powerPhase: '63 Amp to 100 Amp 3-Phase',
        features: [
          'Pre-installed high-capacity exhaust duct canopy ready for heavy work',
          'Dedicated cold and municipal hot/cold water ports with smart metering',
          'Epoxy resin floor finish with custom wall panels and embedded floor drains',
          'Perfect for delivery-focused brands, virtual concepts, and bakeries'
        ]
      },
      {
        name: 'Mega Processing Studio',
        floors: 'Ground Floor Premium Units',
        heightM: '4.5m spacious ceiling height',
        loadingKn: '15.0 kN/m²',
        powerPhase: '100 Amp to 150 Amp 3-Phase',
        features: [
          'Direct proximity to incoming cargo bay for swift supply replenishment',
          'Double sink configuration, automated mechanical clean air scrubber system',
          'Extra floor footprint for specialized commercial high-throughput ovens',
          'Excellent for central retail batch preparation, catering, and pastry production'
        ]
      }
    ]
  },
  {
    id: 'prop-mandai-clean',
    title: 'Mandai Clean Food Crest',
    location: 'Mandai Link, Woodlands',
    region: 'North',
    price: 5200000,
    type: 'Sale',
    pricePerSqft: 452.17,
    floorAreaSqft: 11500,
    ceilingHeightM: 7.0,
    floorLoadingKnSqm: 20,
    powerSupplyAmps: '250 Amp 3-Phase',
    sfaApproved: true,
    haccpCertified: true,
    hasColdRoom: false,
    gasSupply: true,
    greaseTrapCapacitySq: '1,800 Liters',
    address: '18 Mandai Link, Singapore 728655',
    description: 'Highly functional food manufacturing layout featuring deep space width, independent sanitary drainage plumbing points, and isolated waste processing chutes. Certified for strict SFA poultry processing, portioning, and central packaging requirements.',
    image: 'https://images.unsplash.com/photo-1553413719-875313859065?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1553413719-875313859065?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513828729020-00b407374a83?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533158326339-7f3cf2404354?auto=format&fit=crop&q=80&w=1200'
    ],
    category: 'Food Processing',
    zone: 'Food Zone',
    tenancyStatus: 'Vacant',
    loadingBays: 3,
    complianceScore: 100,
    detailedCompliance: {
      antiBacterialEpoxy: true,
      properFlowSegregation: true,
      mechanicalVentilation: true,
      pestProofingReady: true,
      personnelSanitationAnteroom: true
    },
    yearlyTax: 16500,
    maintenanceFeeMonthly: 720
  },
  {
    id: 'prop-smart-food-mandai',
    title: 'Smart Food @ Mandai',
    location: 'Mandai Estate, Woodlands',
    region: 'North',
    price: 3680000,
    type: 'Sale',
    pricePerSqft: 1877.55,
    floorAreaSqft: 1960,
    ceilingHeightM: 5.95,
    floorLoadingKnSqm: 12.5,
    powerSupplyAmps: '100 Amp 3-Phase',
    sfaApproved: true,
    haccpCertified: true,
    hasColdRoom: true,
    gasSupply: true,
    greaseTrapCapacitySq: 'Centralised Stack Ready',
    address: '10 Mandai Estate, Singapore 729907',
    description: 'Smart Food @ Mandai is a landmark, state-of-the-art FREEHOLD 10-storey fully ramped-up B2 food factory development in the high-demand Sungei Kadut Eco-District corridor. Built in 2024 by Smartisan Realty, this facility is engineered for future food ecosystems—featuring separate lifts for raw and cooked food to strictly prevent cross-contamination, and direct ramp-up vehicular loading right at your doorstep up to the 10th storey. The building contains only 84 prestigious production units and 1 ancillary canteen. Select units support multi-brand cloud kitchens, co-sharing arrangements with dual-key layouts, and premium ground-floor spaces (Premium Harvest) boasting 7.0m floor-to-floor heights. Features central stack grease traps, ready municipal gas lines, and high-velocity air curtain spaces optimized for SFA/HACCP certification.',
    image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1200'
    ],
    category: 'Food Processing',
    zone: 'Food Zone',
    tenancyStatus: 'Vacant',
    loadingBays: 2,
    complianceScore: 100,
    detailedCompliance: {
      antiBacterialEpoxy: true,
      properFlowSegregation: true,
      mechanicalVentilation: true,
      pestProofingReady: true,
      personnelSanitationAnteroom: true
    },
    yearlyTax: 14800,
    maintenanceFeeMonthly: 550,
    tenure: 'Freehold',
    expectedCompletion: '31 May 2028 (Vacant Possession)',
    developer: 'Smartisan Realty Pte. Ltd.',
    projectUrl: 'https://www.orangetee.com/Home/Projects/Properties?ProjectID=1299',
    rawCookedSegregatedLifts: true,
    dualKeyProvision: true,
    unitBreakdown: [
      {
        name: 'Premium Harvest',
        floors: '1st Storey (Premium Ground-Floor Units)',
        heightM: '7.0m plus Mezzanine Level (3.5m loft)',
        loadingKn: '20.0 kN/m²',
        powerPhase: '150A to 200A 3-Phase',
        features: [
          'High-ceiling configuration with Mezzanine extension',
          'Doorstep direct unloading and loading access',
          'Capable of accommodating rigid-framed vehicles of length ≤7.5m',
          'SFA certified for fast-paced cold storage or processing'
        ]
      },
      {
        name: 'Eden Deluxe',
        floors: '2nd and 5th Storey (High-Spec Units)',
        heightM: '5.95m Clear Height',
        loadingKn: '12.5 kN/m²',
        powerPhase: '125A 3-Phase (L2) / 100A 3-Phase (L5)',
        features: [
          'Dual-key provisions for co-sharing kitchen spaces',
          'Direct ramp-up forklift/truck access to entrance doorstep',
          'SFA/HACCP certified layout potential for high-volume central kitchens',
          'Adjacent to beautiful communal greenery gardens at level 2 & 5'
        ]
      },
      {
        name: 'Smart Module',
        floors: '3rd, 4th, 6th, 7th, 8th and 9th Storeys',
        heightM: '5.95m Clear Height',
        loadingKn: '12.5 kN/m²',
        powerPhase: '100A 3-Phase',
        features: [
          'Highly customizable open layout with zero pillars',
          'Independent centralized wash ventilation chutes',
          'Direct ramp-up and doorstep loading/unloading area',
          'Excellent structural support for multi-brand cloud kitchens'
        ]
      },
      {
        name: 'Eden Green',
        floors: '10th Storey (Exclusive Top-Floor Units)',
        heightM: '6.10m to 7.00m Variable Clear Height',
        loadingKn: '12.5 kN/m²',
        powerPhase: '100A 3-Phase',
        features: [
          'Premium top-tier units with maximum floor-to-floor heights',
          'Equipped with beautiful communal greenery gardens and rooftop views',
          'Ideal for premium food innovation labs, research kitchens, or high-end organic processing',
          'Quiet and decoupled ventilation lines'
        ]
      }
    ]
  },
  {
    id: 'prop-changi-aviation',
    title: 'Changi Aviation Cold Depot',
    location: 'Changi North Way, Changi',
    region: 'East',
    price: 42000,
    type: 'Lease',
    pricePerSqft: 2.27,
    floorAreaSqft: 18500,
    ceilingHeightM: 10.5,
    floorLoadingKnSqm: 30,
    powerSupplyAmps: '600 Amp 3-Phase',
    sfaApproved: true,
    haccpCertified: true,
    hasColdRoom: true,
    gasSupply: false,
    greaseTrapCapacitySq: '1,000 Liters',
    address: '22 Changi North Way, Singapore 498711',
    description: 'Aviation-adjacent deep-freeze cold chain depot with pre-installed polyurethane insulated panels, dual redundant compressor backups, and temperature-monitored loading docks. Essential for cold pharmaceutical processing or fresh perishable seafood imports.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200'
    ],
    category: 'Cold Chain Logistics',
    zone: 'Business 2 (Industrial)',
    tenancyStatus: 'Vacant',
    loadingBays: 5,
    complianceScore: 92,
    detailedCompliance: {
      antiBacterialEpoxy: true,
      properFlowSegregation: true,
      mechanicalVentilation: true,
      pestProofingReady: false,
      personnelSanitationAnteroom: true
    },
    yearlyTax: 21500,
    maintenanceFeeMonthly: 1250
  },
  {
    id: 'prop-defu-meat',
    title: 'Defu Premium Meat Hub',
    location: 'Defu Lane 10, Hougang',
    region: 'Central',
    price: 8900000,
    type: 'Sale',
    pricePerSqft: 468.42,
    floorAreaSqft: 19000,
    ceilingHeightM: 8.0,
    floorLoadingKnSqm: 25,
    powerSupplyAmps: '400 Amp 3-Phase',
    sfaApproved: true,
    haccpCertified: true,
    hasColdRoom: true,
    gasSupply: true,
    greaseTrapCapacitySq: '2,500 Liters',
    address: '2 Defu Lane 10, Singapore 539184',
    description: 'Premium, centralized, multi-tier food processing hub engineered explicitly for high-throughput meat portioning, seafood processing, and blast freezing. Engineered with non-porous floor structures, automated cleaning trench drains, and centralized grease trap interceptors.',
    image: 'https://images.unsplash.com/photo-1516216628859-9bccecad13aa?auto=format&fit=crop&q=80&w=1200',
    images: [
      'https://images.unsplash.com/photo-1516216628859-9bccecad13aa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1513828729020-00b407374a83?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1553413719-875313859065?auto=format&fit=crop&q=80&w=1200'
    ],
    category: 'Meat & Seafood Hub',
    zone: 'Food Zone',
    tenancyStatus: 'Tenanted',
    loadingBays: 4,
    complianceScore: 94,
    detailedCompliance: {
      antiBacterialEpoxy: true,
      properFlowSegregation: true,
      mechanicalVentilation: true,
      pestProofingReady: true,
      personnelSanitationAnteroom: false
    },
    yearlyTax: 22400,
    maintenanceFeeMonthly: 1100
  }
];

export const SFA_REQUIREMENTS_CHECKLIST = [
  {
    id: 'ref-flooring',
    title: 'Antibacterial Epoxy Flooring / Floor Grading',
    desc: 'The concrete floors must be graded towards wastewater drainage channels, constructed of easy-to-clean, seamless non-porous antibacterial materials.',
    sfaRef: 'SFA Environmental Health Section 4.1'
  },
  {
    id: 'ref-flow',
    title: 'Unidirectional Raw-to-Cooked Flow Segregation',
    desc: 'Physical segregation of storage, preparation, and thermal/packaging operations to prevent physical and microbiological cross-contamination.',
    sfaRef: 'HACCP Annex B / SFA Food Factory Rules'
  },
  {
    id: 'ref-ventilation',
    title: 'Mechanical Exhaust Ventilation & Scrubber Systems',
    desc: 'Mandatory active exhaust canopy with air scrubbing technology over cookers, ensuring appropriate room air changes (min 15 per hour).',
    sfaRef: 'SFA Code of Practice on Ventilation 7.3'
  },
  {
    id: 'ref-trash',
    title: 'Sealed Interceptor and Sewer Grease Trap Sizing',
    desc: 'Commercial grease trap minimum volume of 1,000 Liters with direct connection to PUB-approved public sewers.',
    sfaRef: 'PUB Sewerage and Drainage Regulations'
  },
  {
    id: 'ref-anteroom',
    title: 'Personnel Sanitation Anteroom & Air Showers',
    desc: 'Anteroom complete with hands-free washbasins (knee-operated or sensor), blower air dryer, and double-door entry prior to food zone.',
    sfaRef: 'SFA Hygiene Code Clause 9'
  },
  {
    id: 'ref-pest',
    title: 'Pest-proofing and High-Velocity Air Curtains',
    desc: 'Automatic high-velocity air curtains installed at all loading/unloading zones and personnel doorways pointing outwards.',
    sfaRef: 'SFA Environmental Control Chapter 11'
  }
];
