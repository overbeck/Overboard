import type { Schematic } from '../types';

export const schematics: Schematic[] = [
  { id: 'PE-POWER-01', name: 'Pink Elephant — Power Distribution', system: 'pink-elephant', type: 'power', fileType: 'KiCad', lastUpdated: '2026-03-28', version: 'v1.3' },
  { id: 'PE-SIGNAL-01', name: 'Pink Elephant — Audio Signal Path', system: 'pink-elephant', type: 'signal', fileType: 'KiCad', lastUpdated: '2026-03-22', version: 'v2.1' },
  { id: 'PE-BLE-01', name: 'Pink Elephant — BLE Module & CapSense', system: 'pink-elephant', type: 'ble', fileType: 'KiCad', lastUpdated: '2026-02-14', version: 'v1.0' },
  { id: 'PE-KEYBED-01', name: 'Pink Elephant — Keybed Interface', system: 'pink-elephant', type: 'digital', fileType: 'KiCad', lastUpdated: '2026-01-30', version: 'v1.2' },
  { id: 'PJ-POWER-01', name: 'Purple Jellyfish — Eurorack Power', system: 'purple-jellyfish', type: 'power', fileType: 'KiCad', lastUpdated: '2026-03-10', version: 'v1.1' },
  { id: 'PJ-SENSOR-01', name: 'Purple Jellyfish — ToF Sensor Array', system: 'purple-jellyfish', type: 'analog', fileType: 'KiCad', lastUpdated: '2026-03-15', version: 'v2.0' },
  { id: 'PJ-CV-01', name: 'Purple Jellyfish — CV Output Stage', system: 'purple-jellyfish', type: 'cv', fileType: 'KiCad', lastUpdated: '2026-03-18', version: 'v1.4' },
  { id: 'SD-ARCH-01', name: 'Silver Dolphin — System Architecture', system: 'silver-dolphin', type: 'full', fileType: 'SVG', lastUpdated: '2026-04-01', version: 'v0.3' },
];
