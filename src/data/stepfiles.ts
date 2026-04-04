import type { StepFile } from '../types';

export const stepFiles: StepFile[] = [
  { id: 'sf1', name: 'PE-front-panel-v2.step', folder: 'pink-elephant/enclosure', system: 'pink-elephant', date: '2026-03-26', size: '4.2 MB', format: 'STEP' },
  { id: 'sf2', name: 'PE-rack-frame-left.step', folder: 'pink-elephant/enclosure', system: 'pink-elephant', date: '2026-03-20', size: '8.7 MB', format: 'STEP' },
  { id: 'sf3', name: 'PE-rack-frame-right.step', folder: 'pink-elephant/enclosure', system: 'pink-elephant', date: '2026-03-20', size: '8.5 MB', format: 'STEP' },
  { id: 'sf4', name: 'PE-keybed-mount-bracket.step', folder: 'pink-elephant/enclosure', system: 'pink-elephant', date: '2026-02-28', size: '1.1 MB', format: 'STEP' },
  { id: 'sf5', name: 'PE-main-pcb-outline.dxf', folder: 'pink-elephant/pcb', system: 'pink-elephant', date: '2026-03-05', size: '0.3 MB', format: 'DXF' },
  { id: 'sf6', name: 'PJ-front-panel.step', folder: 'purple-jellyfish/enclosure', system: 'purple-jellyfish', date: '2026-03-14', size: '2.1 MB', format: 'STEP' },
  { id: 'sf7', name: 'PJ-eurorack-module-v2.f3d', folder: 'purple-jellyfish/enclosure', system: 'purple-jellyfish', date: '2026-03-18', size: '6.3 MB', format: 'F3D' },
  { id: 'sf8', name: 'PJ-sensor-housing.stl', folder: 'purple-jellyfish/prints', system: 'purple-jellyfish', date: '2026-03-08', size: '0.9 MB', format: 'STL' },
  { id: 'sf9', name: 'PJ-pcb-cutout.dxf', folder: 'purple-jellyfish/pcb', system: 'purple-jellyfish', date: '2026-03-12', size: '0.2 MB', format: 'DXF' },
  { id: 'sf10', name: 'SD-concept-chassis.step', folder: 'silver-dolphin/concept', system: 'silver-dolphin', date: '2026-04-01', size: '3.4 MB', format: 'STEP' },
  { id: 'sf11', name: 'SD-module-a-concept.f3d', folder: 'silver-dolphin/concept', system: 'silver-dolphin', date: '2026-04-02', size: '5.1 MB', format: 'F3D' },
];

export const stepFormats = ['All', 'STEP', 'STL', 'DXF', 'SVG', 'F3D'];
