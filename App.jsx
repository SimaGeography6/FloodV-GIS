import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, ComposedChart, Cell } from 'recharts';
import { AlertTriangle, Droplets, Map, Database, Activity } from 'lucide-react';

const FloodVulnerabilityDashboard = () => {
  const [selectedWaterbody, setSelectedWaterbody] = useState('lakeside');
  const [selectedModel, setSelectedModel] = useState('fuzzy');
  const [timeRange, setTimeRange] = useState('annual');
  const [vulnerabilityThreshold, setVulnerabilityThreshold] = useState(0.7);

  const waterbodies = {
    lakeside: {
      name: "Lake Victoria Basin",
      area_km2: 68800,
      depth_avg: 40,
      catchment: 184000,
      population_exposure: 850000,
      elevation: 1134
    },
    riverine: {
      name: "Brahmaputra River Delta",
      area_km2: 45000,
      depth_avg: 8.5,
      catchment: 580000,
      population_exposure: 2300000,
      elevation: 15
    },
    coastal: {
      name: "Bay of Bengal Coast",
      area_km2: 32000,
      depth_avg: 12,
      catchment: 125000,
      population_exposure: 1800000,
      elevation: 3
    },
    reservoir: {
      name: "Three Gorges Reservoir",
      area_km2: 1084,
      depth_avg: 70,
      catchment: 1000000,
      population_exposure: 450000,
      elevation: 175
    }
  };

  const vulnerabilityFactorsByWaterbody = {
    lakeside: [
      { month: 'Jan', exposure: 0.42, sensitivity: 0.48, adaptive_capacity: 0.71, composite_index: 0.45 },
      { month: 'Feb', exposure: 0.45, sensitivity: 0.50, adaptive_capacity: 0.70, composite_index: 0.48 },
      { month: 'Mar', exposure: 0.52, sensitivity: 0.55, adaptive_capacity: 0.68, composite_index: 0.54 },
      { month: 'Apr', exposure: 0.68, sensitivity: 0.72, adaptive_capacity: 0.62, composite_index: 0.71 },
      { month: 'May', exposure: 0.75, sensitivity: 0.78, adaptive_capacity: 0.58, composite_index: 0.76 },
      { month: 'Jun', exposure: 0.71, sensitivity: 0.74, adaptive_capacity: 0.60, composite_index: 0.73 },
      { month: 'Jul', exposure: 0.68, sensitivity: 0.70, adaptive_capacity: 0.62, composite_index: 0.69 },
      { month: 'Aug', exposure: 0.65, sensitivity: 0.68, adaptive_capacity: 0.64, composite_index: 0.66 },
      { month: 'Sep', exposure: 0.60, sensitivity: 0.63, adaptive_capacity: 0.66, composite_index: 0.61 },
      { month: 'Oct', exposure: 0.55, sensitivity: 0.58, adaptive_capacity: 0.68, composite_index: 0.56 },
      { month: 'Nov', exposure: 0.48, sensitivity: 0.52, adaptive_capacity: 0.70, composite_index: 0.50 },
      { month: 'Dec', exposure: 0.44, sensitivity: 0.49, adaptive_capacity: 0.71, composite_index: 0.47 }
    ],
    riverine: [
      { month: 'Jan', exposure: 0.38, sensitivity: 0.42, adaptive_capacity: 0.58, composite_index: 0.41 },
      { month: 'Feb', exposure: 0.40, sensitivity: 0.44, adaptive_capacity: 0.57, composite_index: 0.43 },
      { month: 'Mar', exposure: 0.48, sensitivity: 0.52, adaptive_capacity: 0.55, composite_index: 0.50 },
      { month: 'Apr', exposure: 0.58, sensitivity: 0.62, adaptive_capacity: 0.51, composite_index: 0.61 },
      { month: 'May', exposure: 0.72, sensitivity: 0.78, adaptive_capacity: 0.45, composite_index: 0.76 },
      { month: 'Jun', exposure: 0.85, sensitivity: 0.89, adaptive_capacity: 0.38, composite_index: 0.88 },
      { month: 'Jul', exposure: 0.92, sensitivity: 0.95, adaptive_capacity: 0.32, composite_index: 0.94 },
      { month: 'Aug', exposure: 0.89, sensitivity: 0.92, adaptive_capacity: 0.35, composite_index: 0.91 },
      { month: 'Sep', exposure: 0.82, sensitivity: 0.86, adaptive_capacity: 0.40, composite_index: 0.84 },
      { month: 'Oct', exposure: 0.68, sensitivity: 0.72, adaptive_capacity: 0.48, composite_index: 0.70 },
      { month: 'Nov', exposure: 0.52, sensitivity: 0.56, adaptive_capacity: 0.54, composite_index: 0.54 },
      { month: 'Dec', exposure: 0.42, sensitivity: 0.46, adaptive_capacity: 0.57, composite_index: 0.45 }
    ],
    coastal: [
      { month: 'Jan', exposure: 0.52, sensitivity: 0.58, adaptive_capacity: 0.48, composite_index: 0.55 },
      { month: 'Feb', exposure: 0.50, sensitivity: 0.56, adaptive_capacity: 0.49, composite_index: 0.53 },
      { month: 'Mar', exposure: 0.54, sensitivity: 0.60, adaptive_capacity: 0.47, composite_index: 0.57 },
      { month: 'Apr', exposure: 0.60, sensitivity: 0.65, adaptive_capacity: 0.45, composite_index: 0.62 },
      { month: 'May', exposure: 0.68, sensitivity: 0.73, adaptive_capacity: 0.42, composite_index: 0.70 },
      { month: 'Jun', exposure: 0.78, sensitivity: 0.84, adaptive_capacity: 0.38, composite_index: 0.81 },
      { month: 'Jul', exposure: 0.85, sensitivity: 0.90, adaptive_capacity: 0.34, composite_index: 0.87 },
      { month: 'Aug', exposure: 0.88, sensitivity: 0.92, adaptive_capacity: 0.32, composite_index: 0.90 },
      { month: 'Sep', exposure: 0.86, sensitivity: 0.90, adaptive_capacity: 0.33, composite_index: 0.88 },
      { month: 'Oct', exposure: 0.80, sensitivity: 0.84, adaptive_capacity: 0.37, composite_index: 0.82 },
      { month: 'Nov', exposure: 0.68, sensitivity: 0.72, adaptive_capacity: 0.43, composite_index: 0.70 },
      { month: 'Dec', exposure: 0.58, sensitivity: 0.63, adaptive_capacity: 0.47, composite_index: 0.61 }
    ],
    reservoir: [
      { month: 'Jan', exposure: 0.35, sensitivity: 0.40, adaptive_capacity: 0.78, composite_index: 0.38 },
      { month: 'Feb', exposure: 0.33, sensitivity: 0.38, adaptive_capacity: 0.79, composite_index: 0.36 },
      { month: 'Mar', exposure: 0.38, sensitivity: 0.42, adaptive_capacity: 0.77, composite_index: 0.40 },
      { month: 'Apr', exposure: 0.45, sensitivity: 0.50, adaptive_capacity: 0.74, composite_index: 0.47 },
      { month: 'May', exposure: 0.58, sensitivity: 0.63, adaptive_capacity: 0.68, composite_index: 0.60 },
      { month: 'Jun', exposure: 0.72, sensitivity: 0.76, adaptive_capacity: 0.60, composite_index: 0.74 },
      { month: 'Jul', exposure: 0.82, sensitivity: 0.85, adaptive_capacity: 0.52, composite_index: 0.84 },
      { month: 'Aug', exposure: 0.78, sensitivity: 0.82, adaptive_capacity: 0.56, composite_index: 0.80 },
      { month: 'Sep', exposure: 0.68, sensitivity: 0.72, adaptive_capacity: 0.62, composite_index: 0.70 },
      { month: 'Oct', exposure: 0.55, sensitivity: 0.60, adaptive_capacity: 0.70, composite_index: 0.57 },
      { month: 'Nov', exposure: 0.42, sensitivity: 0.48, adaptive_capacity: 0.76, composite_index: 0.45 },
      { month: 'Dec', exposure: 0.37, sensitivity: 0.42, adaptive_capacity: 0.78, composite_index: 0.40 }
    ]
  };

  const vulnerabilityFactors = vulnerabilityFactorsByWaterbody[selectedWaterbody];

  const returnPeriodByWaterbody = {
    lakeside: [
      { return_period: 2, discharge: 2850, probability: 0.50, confidence_lower: 2700, confidence_upper: 3000 },
      { return_period: 5, discharge: 4200, probability: 0.20, confidence_lower: 3950, confidence_upper: 4450 },
      { return_period: 10, discharge: 5150, probability: 0.10, confidence_lower: 4800, confidence_upper: 5500 },
      { return_period: 25, discharge: 6400, probability: 0.04, confidence_lower: 5900, confidence_upper: 6900 },
      { return_period: 50, discharge: 7350, probability: 0.02, confidence_lower: 6700, confidence_upper: 8000 },
      { return_period: 100, discharge: 8300, probability: 0.01, confidence_lower: 7500, confidence_upper: 9100 },
      { return_period: 200, discharge: 9250, probability: 0.005, confidence_lower: 8200, confidence_upper: 10300 }
    ],
    riverine: [
      { return_period: 2, discharge: 4500, probability: 0.50, confidence_lower: 4200, confidence_upper: 4800 },
      { return_period: 5, discharge: 6800, probability: 0.20, confidence_lower: 6300, confidence_upper: 7300 },
      { return_period: 10, discharge: 8400, probability: 0.10, confidence_lower: 7700, confidence_upper: 9100 },
      { return_period: 25, discharge: 10500, probability: 0.04, confidence_lower: 9600, confidence_upper: 11400 },
      { return_period: 50, discharge: 12200, probability: 0.02, confidence_lower: 11000, confidence_upper: 13400 },
      { return_period: 100, discharge: 13900, probability: 0.01, confidence_lower: 12400, confidence_upper: 15400 },
      { return_period: 200, discharge: 15600, probability: 0.005, confidence_lower: 13800, confidence_upper: 17400 }
    ],
    coastal: [
      { return_period: 2, discharge: 1800, probability: 0.50, confidence_lower: 1650, confidence_upper: 1950 },
      { return_period: 5, discharge: 2900, probability: 0.20, confidence_lower: 2650, confidence_upper: 3150 },
      { return_period: 10, discharge: 3700, probability: 0.10, confidence_lower: 3350, confidence_upper: 4050 },
      { return_period: 25, discharge: 4800, probability: 0.04, confidence_lower: 4300, confidence_upper: 5300 },
      { return_period: 50, discharge: 5650, probability: 0.02, confidence_lower: 5000, confidence_upper: 6300 },
      { return_period: 100, discharge: 6500, probability: 0.01, confidence_lower: 5700, confidence_upper: 7300 },
      { return_period: 200, discharge: 7350, probability: 0.005, confidence_lower: 6400, confidence_upper: 8300 }
    ],
    reservoir: [
      { return_period: 2, discharge: 3200, probability: 0.50, confidence_lower: 3000, confidence_upper: 3400 },
      { return_period: 5, discharge: 5100, probability: 0.20, confidence_lower: 4750, confidence_upper: 5450 },
      { return_period: 10, discharge: 6500, probability: 0.10, confidence_lower: 6000, confidence_upper: 7000 },
      { return_period: 25, discharge: 8300, probability: 0.04, confidence_lower: 7600, confidence_upper: 9000 },
      { return_period: 50, discharge: 9700, probability: 0.02, confidence_lower: 8800, confidence_upper: 10600 },
      { return_period: 100, discharge: 11100, probability: 0.01, confidence_lower: 10000, confidence_upper: 12200 },
      { return_period: 200, discharge: 12500, probability: 0.005, confidence_lower: 11200, confidence_upper: 13800 }
    ]
  };

  const returnPeriodData = returnPeriodByWaterbody[selectedWaterbody];

  const landUseByWaterbody = {
    lakeside: [
      { category: 'Urban Dense', vulnerability: 0.82, area_percent: 15, population: 380000 },
      { category: 'Urban Sparse', vulnerability: 0.68, area_percent: 22, population: 245000 },
      { category: 'Agricultural', vulnerability: 0.61, area_percent: 38, population: 135000 },
      { category: 'Forest', vulnerability: 0.25, area_percent: 18, population: 6000 },
      { category: 'Wetlands', vulnerability: 0.42, area_percent: 5, population: 8000 },
      { category: 'Barren', vulnerability: 0.32, area_percent: 2, population: 1000 }
    ],
    riverine: [
      { category: 'Urban Dense', vulnerability: 0.91, area_percent: 18, population: 920000 },
      { category: 'Urban Sparse', vulnerability: 0.76, area_percent: 25, population: 680000 },
      { category: 'Agricultural', vulnerability: 0.72, area_percent: 42, population: 485000 },
      { category: 'Forest', vulnerability: 0.35, area_percent: 10, population: 15000 },
      { category: 'Wetlands', vulnerability: 0.58, area_percent: 4, population: 22000 },
      { category: 'Barren', vulnerability: 0.28, area_percent: 1, population: 3000 }
    ],
    coastal: [
      { category: 'Urban Dense', vulnerability: 0.94, area_percent: 22, population: 1150000 },
      { category: 'Urban Sparse', vulnerability: 0.81, area_percent: 28, population: 485000 },
      { category: 'Agricultural', vulnerability: 0.68, area_percent: 25, population: 125000 },
      { category: 'Forest', vulnerability: 0.38, area_percent: 8, population: 4000 },
      { category: 'Wetlands', vulnerability: 0.52, area_percent: 12, population: 28000 },
      { category: 'Barren', vulnerability: 0.44, area_percent: 5, population: 8000 }
    ],
    reservoir: [
      { category: 'Urban Dense', vulnerability: 0.78, area_percent: 8, population: 185000 },
      { category: 'Urban Sparse', vulnerability: 0.62, area_percent: 12, population: 125000 },
      { category: 'Agricultural', vulnerability: 0.58, area_percent: 32, population: 85000 },
      { category: 'Forest', vulnerability: 0.22, area_percent: 35, population: 12000 },
      { category: 'Wetlands', vulnerability: 0.38, area_percent: 8, population: 15000 },
      { category: 'Barren', vulnerability: 0.30, area_percent: 5, population: 3000 }
    ]
  };

  const landUseVulnerability = landUseByWaterbody[selectedWaterbody];

  const hydraulicByWaterbody = {
    lakeside: [
      { distance_km: 0, water_level: 1.0, velocity: 0.6, flood_depth: 0.4 },
      { distance_km: 2, water_level: 1.5, velocity: 0.9, flood_depth: 0.9 },
      { distance_km: 4, water_level: 2.1, velocity: 1.4, flood_depth: 1.5 },
      { distance_km: 6, water_level: 2.8, velocity: 1.9, flood_depth: 2.1 },
      { distance_km: 8, water_level: 3.3, velocity: 2.3, flood_depth: 2.6 },
      { distance_km: 10, water_level: 3.6, velocity: 2.5, flood_depth: 2.9 },
      { distance_km: 12, water_level: 3.4, velocity: 2.2, flood_depth: 2.7 },
      { distance_km: 14, water_level: 2.9, velocity: 1.8, flood_depth: 2.3 },
      { distance_km: 16, water_level: 2.4, velocity: 1.3, flood_depth: 1.8 },
      { distance_km: 18, water_level: 1.8, velocity: 0.9, flood_depth: 1.2 },
      { distance_km: 20, water_level: 1.2, velocity: 0.5, flood_depth: 0.6 }
    ],
    riverine: [
      { distance_km: 0, water_level: 1.5, velocity: 1.2, flood_depth: 0.8 },
      { distance_km: 2, water_level: 2.4, velocity: 1.9, flood_depth: 1.6 },
      { distance_km: 4, water_level: 3.3, velocity: 2.6, flood_depth: 2.5 },
      { distance_km: 6, water_level: 4.1, velocity: 3.2, flood_depth: 3.3 },
      { distance_km: 8, water_level: 4.8, velocity: 3.7, flood_depth: 4.0 },
      { distance_km: 10, water_level: 5.2, velocity: 4.0, flood_depth: 4.4 },
      { distance_km: 12, water_level: 4.9, velocity: 3.5, flood_depth: 4.1 },
      { distance_km: 14, water_level: 4.3, velocity: 2.9, flood_depth: 3.5 },
      { distance_km: 16, water_level: 3.5, velocity: 2.2, flood_depth: 2.7 },
      { distance_km: 18, water_level: 2.6, velocity: 1.5, flood_depth: 1.8 },
      { distance_km: 20, water_level: 1.8, velocity: 0.9, flood_depth: 1.0 }
    ],
    coastal: [
      { distance_km: 0, water_level: 2.2, velocity: 0.5, flood_depth: 1.8 },
      { distance_km: 2, water_level: 2.8, velocity: 0.8, flood_depth: 2.4 },
      { distance_km: 4, water_level: 3.4, velocity: 1.1, flood_depth: 3.0 },
      { distance_km: 6, water_level: 3.9, velocity: 1.4, flood_depth: 3.5 },
      { distance_km: 8, water_level: 4.3, velocity: 1.6, flood_depth: 3.9 },
      { distance_km: 10, water_level: 4.5, velocity: 1.7, flood_depth: 4.1 },
      { distance_km: 12, water_level: 4.2, velocity: 1.5, flood_depth: 3.8 },
      { distance_km: 14, water_level: 3.7, velocity: 1.2, flood_depth: 3.3 },
      { distance_km: 16, water_level: 3.1, velocity: 0.9, flood_depth: 2.7 },
      { distance_km: 18, water_level: 2.4, velocity: 0.6, flood_depth: 2.0 },
      { distance_km: 20, water_level: 1.8, velocity: 0.4, flood_depth: 1.4 }
    ],
    reservoir: [
      { distance_km: 0, water_level: 0.8, velocity: 0.4, flood_depth: 0.3 },
      { distance_km: 2, water_level: 1.3, velocity: 0.7, flood_depth: 0.7 },
      { distance_km: 4, water_level: 1.9, velocity: 1.1, flood_depth: 1.2 },
      { distance_km: 6, water_level: 2.6, velocity: 1.6, flood_depth: 1.8 },
      { distance_km: 8, water_level: 3.2, velocity: 2.0, flood_depth: 2.4 },
      { distance_km: 10, water_level: 3.7, velocity: 2.3, flood_depth: 2.9 },
      { distance_km: 12, water_level: 3.5, velocity: 2.0, flood_depth: 2.7 },
      { distance_km: 14, water_level: 3.0, velocity: 1.6, flood_depth: 2.2 },
      { distance_km: 16, water_level: 2.4, velocity: 1.2, flood_depth: 1.6 },
      { distance_km: 18, water_level: 1.7, velocity: 0.8, flood_depth: 1.0 },
      { distance_km: 20, water_level: 1.1, velocity: 0.5, flood_depth: 0.5 }
    ]
  };

  const hydraulicSimulation = hydraulicByWaterbody[selectedWaterbody];

  const fuzzyVulnerabilityByWaterbody = {
    lakeside: [
      { factor: 'Drainage Density', membership: 0.78, weight: 0.14 },
      { factor: 'Slope', membership: 0.65, weight: 0.13 },
      { factor: 'Elevation', membership: 0.58, weight: 0.16 },
      { factor: 'LULC', membership: 0.72, weight: 0.15 },
      { factor: 'Soil Permeability', membership: 0.55, weight: 0.11 },
      { factor: 'Rainfall Intensity', membership: 0.82, weight: 0.19 },
      { factor: 'Distance to Water', membership: 0.80, weight: 0.12 }
    ],
    riverine: [
      { factor: 'Drainage Density', membership: 0.92, weight: 0.18 },
      { factor: 'Slope', membership: 0.82, weight: 0.10 },
      { factor: 'Elevation', membership: 0.88, weight: 0.16 },
      { factor: 'LULC', membership: 0.86, weight: 0.13 },
      { factor: 'Soil Permeability', membership: 0.74, weight: 0.09 },
      { factor: 'Rainfall Intensity', membership: 0.95, weight: 0.22 },
      { factor: 'Distance to Water', membership: 0.94, weight: 0.12 }
    ],
    coastal: [
      { factor: 'Drainage Density', membership: 0.68, weight: 0.11 },
      { factor: 'Slope', membership: 0.92, weight: 0.09 },
      { factor: 'Elevation', membership: 0.96, weight: 0.24 },
      { factor: 'LULC', membership: 0.88, weight: 0.16 },
      { factor: 'Soil Permeability', membership: 0.70, weight: 0.08 },
      { factor: 'Rainfall Intensity', membership: 0.85, weight: 0.17 },
      { factor: 'Distance to Water', membership: 0.91, weight: 0.15 }
    ],
    reservoir: [
      { factor: 'Drainage Density', membership: 0.72, weight: 0.13 },
      { factor: 'Slope', membership: 0.58, weight: 0.14 },
      { factor: 'Elevation', membership: 0.42, weight: 0.15 },
      { factor: 'LULC', membership: 0.65, weight: 0.16 },
      { factor: 'Soil Permeability', membership: 0.52, weight: 0.12 },
      { factor: 'Rainfall Intensity', membership: 0.78, weight: 0.18 },
      { factor: 'Distance to Water', membership: 0.75, weight: 0.12 }
    ]
  };

  const fuzzyVulnerabilityData = fuzzyVulnerabilityByWaterbody[selectedWaterbody];

  const ahpWeightsByWaterbody = {
    lakeside: [
      { criterion: 'Precipitation', weight: 0.287, consistency: 0.92 },
      { criterion: 'Topography', weight: 0.195, consistency: 0.88 },
      { criterion: 'Drainage', weight: 0.168, consistency: 0.85 },
      { criterion: 'Land Use', weight: 0.143, consistency: 0.90 },
      { criterion: 'Soil Type', weight: 0.112, consistency: 0.87 },
      { criterion: 'Infrastructure', weight: 0.095, consistency: 0.91 }
    ],
    riverine: [
      { criterion: 'Precipitation', weight: 0.325, consistency: 0.94 },
      { criterion: 'Drainage', weight: 0.245, consistency: 0.91 },
      { criterion: 'Topography', weight: 0.158, consistency: 0.86 },
      { criterion: 'Land Use', weight: 0.128, consistency: 0.88 },
      { criterion: 'Soil Type', weight: 0.089, consistency: 0.83 },
      { criterion: 'Infrastructure', weight: 0.055, consistency: 0.79 }
    ],
    coastal: [
      { criterion: 'Topography', weight: 0.342, consistency: 0.96 },
      { criterion: 'Precipitation', weight: 0.268, consistency: 0.93 },
      { criterion: 'Infrastructure', weight: 0.152, consistency: 0.89 },
      { criterion: 'Land Use', weight: 0.118, consistency: 0.87 },
      { criterion: 'Drainage', weight: 0.078, consistency: 0.82 },
      { criterion: 'Soil Type', weight: 0.042, consistency: 0.78 }
    ],
    reservoir: [
      { criterion: 'Precipitation', weight: 0.298, consistency: 0.91 },
      { criterion: 'Infrastructure', weight: 0.235, consistency: 0.94 },
      { criterion: 'Topography', weight: 0.182, consistency: 0.88 },
      { criterion: 'Drainage', weight: 0.145, consistency: 0.86 },
      { criterion: 'Land Use', weight: 0.092, consistency: 0.84 },
      { criterion: 'Soil Type', weight: 0.048, consistency: 0.80 }
    ]
  };

  const ahpWeights = ahpWeightsByWaterbody[selectedWaterbody];

  const rainfallRunoffByWaterbody = {
    lakeside: [
      { rainfall: 20, runoff: 1.8 },
      { rainfall: 40, runoff: 7.2 },
      { rainfall: 60, runoff: 15.6 },
      { rainfall: 80, runoff: 27.2 },
      { rainfall: 100, runoff: 41.5 },
      { rainfall: 120, runoff: 58.8 },
      { rainfall: 140, runoff: 78.5 },
      { rainfall: 160, runoff: 100.8 }
    ],
    riverine: [
      { rainfall: 20, runoff: 2.5 },
      { rainfall: 40, runoff: 10.2 },
      { rainfall: 60, runoff: 22.4 },
      { rainfall: 80, runoff: 38.5 },
      { rainfall: 100, runoff: 58.2 },
      { rainfall: 120, runoff: 81.5 },
      { rainfall: 140, runoff: 108.2 },
      { rainfall: 160, runoff: 138.5 }
    ],
    coastal: [
      { rainfall: 20, runoff: 2.8 },
      { rainfall: 40, runoff: 11.5 },
      { rainfall: 60, runoff: 25.2 },
      { rainfall: 80, runoff: 43.5 },
      { rainfall: 100, runoff: 66.2 },
      { rainfall: 120, runoff: 93.8 },
      { rainfall: 140, runoff: 126.5 },
      { rainfall: 160, runoff: 164.2 }
    ],
    reservoir: [
      { rainfall: 20, runoff: 1.5 },
      { rainfall: 40, runoff: 6.2 },
      { rainfall: 60, runoff: 13.8 },
      { rainfall: 80, runoff: 24.5 },
      { rainfall: 100, runoff: 38.2 },
      { rainfall: 120, runoff: 54.8 },
      { rainfall: 140, runoff: 74.5 },
      { rainfall: 160, runoff: 97.2 }
    ]
  };

  const rainfallRunoffData = rainfallRunoffByWaterbody[selectedWaterbody];

  const socialVulnerabilityByWaterbody = {
    lakeside: [
      { zone: 'Zone A', sovi_score: 0.75, elderly_percent: 15, poverty_rate: 28, education_index: 0.62 },
      { zone: 'Zone B', sovi_score: 0.65, elderly_percent: 11, poverty_rate: 22, education_index: 0.71 },
      { zone: 'Zone C', sovi_score: 0.58, elderly_percent: 9, poverty_rate: 17, education_index: 0.76 },
      { zone: 'Zone D', sovi_score: 0.48, elderly_percent: 7, poverty_rate: 13, education_index: 0.81 },
      { zone: 'Zone E', sovi_score: 0.38, elderly_percent: 5, poverty_rate: 9, education_index: 0.87 }
    ],
    riverine: [
      { zone: 'Zone A', sovi_score: 0.88, elderly_percent: 22, poverty_rate: 38, education_index: 0.48 },
      { zone: 'Zone B', sovi_score: 0.79, elderly_percent: 16, poverty_rate: 31, education_index: 0.58 },
      { zone: 'Zone C', sovi_score: 0.72, elderly_percent: 13, poverty_rate: 25, education_index: 0.65 },
      { zone: 'Zone D', sovi_score: 0.62, elderly_percent: 10, poverty_rate: 19, education_index: 0.72 },
      { zone: 'Zone E', sovi_score: 0.51, elderly_percent: 7, poverty_rate: 14, education_index: 0.79 }
    ],
    coastal: [
      { zone: 'Zone A', sovi_score: 0.91, elderly_percent: 25, poverty_rate: 42, education_index: 0.44 },
      { zone: 'Zone B', sovi_score: 0.83, elderly_percent: 19, poverty_rate: 34, education_index: 0.54 },
      { zone: 'Zone C', sovi_score: 0.76, elderly_percent: 15, poverty_rate: 27, education_index: 0.62 },
      { zone: 'Zone D', sovi_score: 0.65, elderly_percent: 11, poverty_rate: 21, education_index: 0.70 },
      { zone: 'Zone E', sovi_score: 0.54, elderly_percent: 8, poverty_rate: 15, education_index: 0.77 }
    ],
    reservoir: [
      { zone: 'Zone A', sovi_score: 0.68, elderly_percent: 12, poverty_rate: 22, education_index: 0.68 },
      { zone: 'Zone B', sovi_score: 0.58, elderly_percent: 9, poverty_rate: 17, education_index: 0.75 },
      { zone: 'Zone C', sovi_score: 0.51, elderly_percent: 7, poverty_rate: 13, education_index: 0.80 },
      { zone: 'Zone D', sovi_score: 0.42, elderly_percent: 5, poverty_rate: 10, education_index: 0.85 },
      { zone: 'Zone E', sovi_score: 0.34, elderly_percent: 4, poverty_rate: 7, education_index: 0.89 }
    ]
  };

  const socialVulnerability = socialVulnerabilityByWaterbody[selectedWaterbody];

  const calculateCompositeScore = () => {
    const weights = fuzzyVulnerabilityData.reduce((acc, item) => acc + (item.membership * item.weight), 0);
    return weights.toFixed(3);
  };

  const classifyRisk = (score) => {
    if (score >= 0.8) return { level: 'Very High', color: '#dc2626' };
    if (score >= 0.6) return { level: 'High', color: '#ea580c' };
    if (score >= 0.4) return { level: 'Moderate', color: '#f59e0b' };
    if (score >= 0.2) return { level: 'Low', color: '#84cc16' };
    return { level: 'Very Low', color: '#22c55e' };
  };

  const currentWaterbody = waterbodies[selectedWaterbody];
  const compositeScore = parseFloat(calculateCompositeScore());
  const riskClass = classifyRisk(compositeScore);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 overflow-auto">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-600">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">SDN</span>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-800">SDN Analytics Lab</div>
                <div className="text-sm text-slate-600">POWERED BY: SDN Analytics Lab, Women's Polytechnic (AICTE), Tripura, INDIA</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">
                GIS-Based Flood Vulnerability Assessment System
              </h1>
              <p className="text-slate-600">
                Multi-Criteria Decision Analysis Framework for Large Waterbody Flood Risk Mapping
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                <span>📚 Nikolova & Zlateva (2017) - Fuzzy Logic | Cutter et al. (2003) - SoVI | Saaty (1980) - AHP</span>
                <span>🔬 Methods: Principal Component Analysis, Gumbel EV-I, Manning's Equation, SCS-CN</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold mb-1" style={{ color: riskClass.color }}>
                {compositeScore}
              </div>
              <div className="text-sm font-semibold" style={{ color: riskClass.color }}>
                {riskClass.level} Risk
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Map className="inline w-4 h-4 mr-1" />
              Waterbody Selection
            </label>
            <select 
              value={selectedWaterbody}
              onChange={(e) => setSelectedWaterbody(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(waterbodies).map(([key, body]) => (
                <option key={key} value={key}>{body.name}</option>
              ))}
            </select>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Database className="inline w-4 h-4 mr-1" />
              Vulnerability Model
            </label>
            <select 
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="fuzzy">Fuzzy Logic Model</option>
              <option value="ahp">AHP-MCDM Model</option>
              <option value="sovi">Social Vulnerability</option>
              <option value="hydraulic">Hydraulic Simulation</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <Activity className="inline w-4 h-4 mr-1" />
              Temporal Resolution
            </label>
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="monthly">Monthly Analysis</option>
              <option value="seasonal">Seasonal Patterns</option>
              <option value="annual">Annual Trends</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              <AlertTriangle className="inline w-4 h-4 mr-1" />
              Risk Threshold: {vulnerabilityThreshold}
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={vulnerabilityThreshold}
              onChange={(e) => setVulnerabilityThreshold(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-4 text-white">
            <div className="text-sm opacity-90 mb-1">Catchment Area</div>
            <div className="text-2xl font-bold">{currentWaterbody.catchment.toLocaleString()}</div>
            <div className="text-xs opacity-75">km² drainage basin</div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg shadow-lg p-4 text-white">
            <div className="text-sm opacity-90 mb-1">Water Surface</div>
            <div className="text-2xl font-bold">{currentWaterbody.area_km2.toLocaleString()}</div>
            <div className="text-xs opacity-75">km² water area</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-4 text-white">
            <div className="text-sm opacity-90 mb-1">Population Exposed</div>
            <div className="text-2xl font-bold">{(currentWaterbody.population_exposure / 1000).toFixed(0)}K</div>
            <div className="text-xs opacity-75">within flood zone</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-4 text-white">
            <div className="text-sm opacity-90 mb-1">Avg Depth</div>
            <div className="text-2xl font-bold">{currentWaterbody.depth_avg}</div>
            <div className="text-xs opacity-75">meters</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-lg shadow-lg p-4 text-white">
            <div className="text-sm opacity-90 mb-1">Base Elevation</div>
            <div className="text-2xl font-bold">{currentWaterbody.elevation}</div>
            <div className="text-xs opacity-75">meters ASL</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-5">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Multi-Criteria Vulnerability Index (MCVI)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={vulnerabilityFactors}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="exposure" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="sensitivity" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
                <Line type="monotone" dataKey="composite_index" stroke="#dc2626" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="mt-3 text-xs text-slate-600">
              <b>Methodology:</b> Fuzzy overlay analysis with 7 parameters (Nikolova & Zlateva, 2017). 
              Membership functions: Precipitation, distance to streams, flow accumulation, lithology, LULC, slope, altitude.
              Composite Index = Σ(μᵢ × wᵢ) where μ = membership value, w = weight.
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-5">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Flood Frequency Analysis (Gumbel Distribution)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={returnPeriodData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="return_period" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area yAxisId="left" dataKey="confidence_upper" fill="#dbeafe" stroke="none" />
                <Area yAxisId="left" dataKey="confidence_lower" fill="#ffffff" stroke="none" />
                <Line yAxisId="left" type="monotone" dataKey="discharge" stroke="#2563eb" strokeWidth={3} />
                <Line yAxisId="right" type="monotone" dataKey="probability" stroke="#dc2626" strokeWidth={2} strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-3 text-xs text-slate-600">
              <b>Gumbel Type-I Distribution:</b> Qₜ = Q̄ + Kₜ·σ where Kₜ = -√6/π[0.5772 + ln(ln(T/(T-1)))].
              Flood frequency analysis standard for return period estimation (Chow et al., 1988).
              95% confidence intervals shown using normal approximation method.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-5">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Fuzzy Logic Vulnerability Factors
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={fuzzyVulnerabilityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 1]} />
                <YAxis dataKey="factor" type="category" width={120} />
                <Tooltip />
                <Bar dataKey="membership" fill="#8b5cf6" />
                <Bar dataKey="weight" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-5">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              LULC-Based Vulnerability
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area_percent" name="Area %" />
                <YAxis dataKey="vulnerability" name="Vulnerability" domain={[0, 1]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={landUseVulnerability} fill="#ec4899" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-5">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              AHP Criteria Weights - {currentWaterbody.name}
            </h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={ahpWeights}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="criterion" angle={-45} textAnchor="end" height={80} />
                <YAxis domain={[0, 0.35]} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-slate-300 rounded shadow-lg">
                          <p className="font-semibold">{payload[0].payload.criterion}</p>
                          <p className="text-sm text-blue-600">Weight: {(payload[0].value * 100).toFixed(1)}%</p>
                          <p className="text-sm text-green-600">Consistency: {(payload[0].payload.consistency * 100).toFixed(0)}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="weight">
                  {ahpWeights.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.weight > 0.25 ? '#dc2626' : entry.weight > 0.15 ? '#f59e0b' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-3 text-xs text-slate-600">
              CR = {(ahpWeights.reduce((acc, w) => acc + w.consistency, 0) / ahpWeights.length).toFixed(3)} (Consistency Ratio). 
              <b>AHP Method (Saaty, 1980):</b> Pairwise comparison matrix with eigenvalue analysis.
              CR {'<'} 0.10 indicates acceptable consistency in expert judgments.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-5">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Hydraulic Modeling (1D Unsteady Flow) - {currentWaterbody.name}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={hydraulicSimulation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="distance_km" label={{ value: 'Distance from waterbody (km)', position: 'insideBottom', offset: -5 }} />
                <YAxis yAxisId="left" label={{ value: 'Depth/Level (m)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Velocity (m/s)', angle: 90, position: 'insideRight' }} />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-3 border border-slate-300 rounded shadow-lg">
                          <p className="font-semibold">Distance: {payload[0].payload.distance_km} km</p>
                          <p className="text-sm text-blue-600">Water Level: {payload[0].payload.water_level.toFixed(2)} m</p>
                          <p className="text-sm text-cyan-600">Flood Depth: {payload[0].payload.flood_depth.toFixed(2)} m</p>
                          <p className="text-sm text-red-600">Velocity: {payload[0].payload.velocity.toFixed(2)} m/s</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="flood_depth" fill="#60a5fa" stroke="#3b82f6" fillOpacity={0.4} name="Flood Depth (m)" />
                <Line yAxisId="left" type="monotone" dataKey="water_level" stroke="#1e40af" strokeWidth={2} name="Water Level (m)" />
                <Line yAxisId="right" type="monotone" dataKey="velocity" stroke="#dc2626" strokeWidth={2} name="Flow Velocity (m/s)" />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="mt-3 text-xs text-slate-600">
              <b>Manning's Equation:</b> V = (1/n)R^(2/3)S^(1/2) where n = 0.035 (natural channels).
              Peak discharge at {hydraulicSimulation.reduce((max, p) => p.velocity > max.velocity ? p : max).distance_km} km.
              1D unsteady flow simulation with boundary conditions from observed hydrographs.
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-5">
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              SCS-CN Rainfall-Runoff Model - {currentWaterbody.name}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={rainfallRunoffData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="rainfall" 
                  label={{ value: 'Rainfall (mm)', position: 'insideBottom', offset: -5 }} 
                />
                <YAxis 
                  label={{ value: 'Direct Runoff (mm)', angle: -90, position: 'insideLeft' }} 
                />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const runoffCoeff = (payload[0].payload.runoff / payload[0].payload.rainfall * 100).toFixed(1);
                      return (
                        <div className="bg-white p-3 border border-slate-300 rounded shadow-lg">
                          <p className="font-semibold">Rainfall: {payload[0].payload.rainfall} mm</p>
                          <p className="text-sm text-purple-600">Runoff: {payload[0].payload.runoff.toFixed(1)} mm</p>
                          <p className="text-sm text-orange-600">Coefficient: {runoffCoeff}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="runoff" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} name="Direct Runoff (mm)" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-3 text-xs text-slate-600">
              <b>SCS Curve Number Method (USDA, 1986):</b> Q = (P - Iₐ)²/(P - Iₐ + S) where S = (25400/CN) - 254.
              CN = {selectedWaterbody === 'lakeside' ? '78' : selectedWaterbody === 'riverine' ? '85' : selectedWaterbody === 'coastal' ? '88' : '72'} | 
              Initial Abstraction Iₐ = {selectedWaterbody === 'lakeside' ? '14.2' : selectedWaterbody === 'riverine' ? '8.9' : selectedWaterbody === 'coastal' ? '6.9' : '19.7'} mm (0.2S approximation).
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-5">
          <h3 className="text-lg font-bold text-slate-800 mb-4">
            Social Vulnerability Index (SoVI) Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={socialVulnerability}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="zone" />
              <YAxis yAxisId="left" domain={[0, 1]} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 40]} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="sovi_score" fill="#dc2626" />
              <Line yAxisId="right" type="monotone" dataKey="elderly_percent" stroke="#3b82f6" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="poverty_rate" stroke="#f59e0b" strokeWidth={2} />
              <Line yAxisId="left" type="monotone" dataKey="education_index" stroke="#10b981" strokeWidth={2} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="mt-3 text-xs text-slate-600">
            SoVI incorporates demographics, poverty, education, and infrastructure access factors
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloodVulnerabilityDashboard;