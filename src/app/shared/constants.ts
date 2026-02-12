// Application-wide constants

export const APP_CONSTANTS = {
    APP_NAME: 'AgriTech',
    APP_SUBTITLE: 'Riverland AgriTech',
    APP_VERSION: '1.0.0',

    // Time Zone
    TIMEZONE: 'Australia/Adelaide',

    // API Configuration (placeholder - update with actual endpoints)
    API_BASE_URL: 'https://api.agritech.example.com/v1',

    // Model Versions
    ML_MODEL_VERSION: 'v2.3.1',
    PREDICTION_MODEL: 'VineyardYield-ML-v2.3.1',

    // Data Sources
    DATA_SOURCES: {
        WEATHER: 'BOM Weather Station - Adelaide Hills',
        SOIL: 'IoT Soil Sensors - Network A',
        SATELLITE: 'Sentinel-2 Imagery',
        MANUAL: 'Manual Field Observations'
    },

    // Risk Levels
    RISK_LEVELS: {
        LOW: 'low',
        MEDIUM: 'medium',
        HIGH: 'high'
    },

    // Refresh Intervals (in milliseconds)
    REFRESH_INTERVALS: {
        DASHBOARD: 300000, // 5 minutes
        REAL_TIME_METRICS: 60000, // 1 minute
        PREDICTIONS: 900000 // 15 minutes
    }
};

export const NAVIGATION_ITEMS = [
    {
        label: 'Dashboard',
        route: '/dashboard',
        icon: 'layout-dashboard'
    },
    {
        label: 'Water & Irrigation',
        route: '/water-irrigation',
        icon: 'droplet'
    },
    {
        label: 'Profit & Risk',
        route: '/profit-risk',
        icon: 'trending-up'
    },
    {
        label: 'Growing Opportunities',
        route: '/growing-opportunities',
        icon: 'sprout'
    },
    {
        label: 'Grower GPT',
        route: '/grower-gpt',
        icon: 'message-circle'
    }
];

// Mock user profile data
export const MOCK_USER = {
    name: 'John Grower',
    company: 'Vineyard Estates',
    initials: 'JG'
};

// Mock block data
export const MOCK_BLOCKS = [
    {
        id: 'block-a-shiraz',
        name: 'Block A - Shiraz',
        location: 'Renmark, SA',
        coordinates: '34.5300°S, 138.9600°E',
        size: 8,
        sizeUnit: 'hectares',
        grapeVariety: 'Shiraz',
        soilType: 'Mallee Sand',
        lat: -34.53,
        lon: 138.96,
        lan: "BCPKFB"
    },
    {
        id: 'block-b-cabernet',
        name: 'Block B - Cabernet',
        location: 'Renmark, SA',
        coordinates: '34.5400°S, 138.9700°E',
        size: 12,
        sizeUnit: 'hectares',
        grapeVariety: 'Cabernet Sauvignon',
        soilType: 'Red Brown Earth',
        lat: -34.54,
        lon: 138.97,
        lan: "WOGJLp"
    },
    {
        id: 'block-c-chardonnay',
        name: 'Block C - Chardonnay',
        location: 'Renmark, SA',
        coordinates: '34.5350°S, 138.9650°E',
        size: 6,
        sizeUnit: 'hectares',
        grapeVariety: 'Chardonnay',
        soilType: 'Loamy Sand',
        lat: -34.535,
        lon: 138.965,
        lan: "EUVJLU"
    },
    {
        id: 'block-d-merlot',
        name: 'Block D - Merlot',
        location: 'Renmark, SA',
        coordinates: '34.5380°S, 138.9680°E',
        size: 10,
        sizeUnit: 'hectares',
        grapeVariety: 'Merlot',
        soilType: 'Calcareous Loam',
        lat: -34.538,
        lon: 138.968,
        lan: "BCPKKE"
    }
];

