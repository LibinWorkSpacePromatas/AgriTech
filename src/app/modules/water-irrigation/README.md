# 💧 Advanced Water & Irrigation System

This module represents the core intelligence of the AgriTech platform, providing real-time, scientifically-backed irrigation guidance for precision viticulture. It integrates satellite weather data, Bureau of Meteorology (BoM) station data, and detailed soil classification to automate complex irrigation decisions.

---

## 🏗 System Architecture & Data Flow

The system follows a reactive architecture using **Angular Standalone Components** and **RxJS** for real-time state synchronization.

### 1. The Global Selection Chain
- **Trigger**: User selects a block from the `SidebarComponent` dropdown.
- **State Management**: The selection is pushed to the [BlockService](file:///d:/Project-2/AgriTech/src/app/shared/services/block.service.ts) using a `BehaviorSubject`.
- **Sync**: Both the [DashboardComponent](file:///d:/Project-2/AgriTech/src/app/modules/dashboard/dashboard.component.ts) and [WaterIrrigationComponent](file:///d:/Project-2/AgriTech/src/app/modules/water-irrigation/water-irrigation.component.ts) are subscribers. They react instantly to the new block's coordinates and soil profile.

### 2. The Calculation Pipeline
When a block is selected or the map marker is moved:
1. **Coordinate Fetch**: Retrieves `lat`/`lon` from the selected block.
2. **Weather Fetch**: [WaterIrrigationService](file:///d:/Project-2/AgriTech/src/app/services/water-irrigation/water-irrigation.service.ts) calls Open-Meteo for ET₀ and the local BoM proxy for rainfall.
3. **Soil Processing**: [SoilService](file:///d:/Project-2/AgriTech/src/app/services/soil/soil.service.ts) calculates a `soilFactor` based on the block's LANSLU classification.
4. **Engine Execution**: The scientific model computes the final irrigation requirement.

---

## 🧪 The Scientific Engine (Deep Dive)

The engine implements the **FAO-56 Penman-Monteith** principles simplified for a robust MVP model.

### 1. Evapotranspiration (Water Loss)
- **Base ET₀**: Reference evapotranspiration from weather sensors.
- **Crop Factor (Kc)**: Set to `0.85` (standard for healthy vineyards during growing season).
- **Formula**: `ETc = ET₀ × 0.85`

### 2. Irrigation Requirement (ML/ha)
We calculate the "Net Deficit" which represents the actual water gap in the soil.
- **Effective Rain**: `Rain × 0.8` (Logic: 20% of rain is lost to immediate runoff/evaporation).
- **Net Deficit**: `Math.max(0, ETc - Effective Rain)` (Clamped to prevent negative values).
- **Soil Adjustment**: `Adjusted_mm = Net Deficit / Soil Factor`.
    - *Sandy Soil*: Factor ~0.8 (Increases water need).
    - *Clay Soil*: Factor ~1.2 (Decreases water need).
- **Volume Conversion**: `Irrigation = Adjusted_mm × 0.01` (Converts mm depth to Megaliters per Hectare).

### 3. Soil Hydration Simulation (Moisture Model)
The system simulates the moisture level (0-100%) within the root zone:
- **Starting Point**: Real-time soil moisture sensor baseline.
- **Recharge (Gain)**: `Hydration += (Effective Rain × 2)`. Proportional to rain intensity.
- **Depletion (Loss)**: `Hydration -= (ETc / Soil Factor) × 1.5`. Adjusted for soil drainage speed.
- **Clamping**: Strictly bounded to `[0, 100]`.

---

## 🗺 Mapping & Spatial Logic

Powered by **Leaflet.js**, the map provides more than just a visual; it is an input tool.

- **Marker Persistence**: The system places a custom marker at the block's center.
- **Manual Override**: If the user drags the marker, the `onMapClick` event captures the new `lat`/`lon`, triggering a full recalculation for that specific geographical point.
- **Auto-Zoom Logic**: 
  - On load: Zooms to level 10 (Regional view).
  - On selection: Zooms to level 16 (Block/Vine view) using `map.setView([lat, lon], 16)`.

---

## ⚙️ Service-Layer Methods

### `WaterIrrigationService`
- `getIrrigationStatus(lat, lon, soil?)`: The entry point. Orchestrates the BoM and Open-Meteo calls.
- `calculateIrrigationStatus(...)`: The core math engine. Implements the scientific model.
- `generateSoilReadings(moisture)`: Simulates moisture at 30cm, 60cm, and 90cm depths based on the surface hydration.

### `SoilService`
- `calculateSoilFactor(soil)`: Analyzes texture, drainage, and AWHC (Available Water Holding Capacity) to return a multiplier for the irrigation engine.

---

## 📊 Status Thresholds & Alerts

- **🔴 URGENT (Hydration < 20%)**: Immediate irrigation required. High risk of vine stress.
- **🟡 MONITOR (Hydration 20%-80%)**: Safe operating range. Track depletion rate.
- **🔵 SATURATED (Hydration > 80%)**: Soil at field capacity. Risk of root rot if more water is added.

---

## 📂 File Reference
- [water-irrigation.component.ts](file:///d:/Project-2/AgriTech/src/app/modules/water-irrigation/water-irrigation.component.ts): UI State & Map Events.
- [water-irrigation.service.ts](file:///d:/Project-2/AgriTech/src/app/services/water-irrigation/water-irrigation.service.ts): Data fetching & Math Engine.
- [soil.service.ts](file:///d:/Project-2/AgriTech/src/app/services/soil/soil.service.ts): Soil science & LANSLU parsing.
- [constants.ts](file:///d:/Project-2/AgriTech/src/app/shared/constants.ts): Mock block data and LANSLU codes.
