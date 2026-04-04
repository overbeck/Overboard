import type { System } from '../types';

export const systems: System[] = [
  {
    id: 'pink-elephant',
    name: 'Pink Elephant',
    status: 'active',
    accent: 'pink',
    description:
      'A 73-key weighted keybed instrument with dual 19" rack columns housing custom DSP processing, synthesis engines, and performance systems. Designed for piano-like expressivity with modular signal routing.',
    techStack: ['C++', 'Plexus DSP', 'PSoC 4 BLE', 'Eurorack', 'MIDI 2.0', 'USB-C PD'],
    specs: [
      { label: 'Keys', value: '73 weighted, velocity + aftertouch' },
      { label: 'Rack', value: '2x 19" 6U columns' },
      { label: 'DSP', value: 'Custom C++ via Plexus engine' },
      { label: 'Connectivity', value: 'MIDI 2.0, USB-C, TRS, XLR, CV/Gate' },
      { label: 'Power', value: 'Eurorack +/-12V + 5V, USB-C PD 65W' },
      { label: 'BLE', value: 'PSoC 4 BLE -- wireless param control' },
      { label: 'Polyphony', value: '32-voice, configurable' },
      { label: 'Weight', value: '~18 kg complete system' },
    ],
    bom: [
      { ref: 'U1', component: 'PSoC 4 BLE Module', value: 'CY8C4247LQI-BL483', manufacturer: 'Infineon', qty: 2 },
      { ref: 'U2', component: 'Audio Codec', value: 'WM8978', manufacturer: 'Cirrus Logic', qty: 1 },
      { ref: 'U3', component: 'DAC', value: 'PCM5102A', manufacturer: 'Texas Instruments', qty: 4 },
      { ref: 'U4', component: 'Op-Amp (dual)', value: 'OPA2134', manufacturer: 'Texas Instruments', qty: 8 },
      { ref: 'U5', component: 'Power Reg', value: 'LM317', manufacturer: 'ST Micro', qty: 3 },
      { ref: 'SW1', component: 'Keybed Assembly', value: '73-key Fatar TP/40L', manufacturer: 'Fatar', qty: 1 },
      { ref: 'J1-J8', component: 'Eurorack Header', value: '16-pin IDC', manufacturer: 'Wurth', qty: 8 },
      { ref: 'J9-J12', component: 'TRS Jack 6.35mm', value: 'Balanced I/O', manufacturer: 'Neutrik', qty: 4 },
    ],
    schematics: ['PE-POWER-01', 'PE-SIGNAL-01', 'PE-BLE-01', 'PE-KEYBED-01'],
  },
  {
    id: 'purple-jellyfish',
    name: 'Purple Jellyfish',
    status: 'active',
    accent: 'purple',
    description:
      'A proximity sensor-based gestural CV instrument. Uses VL53L1X ToF sensor arrays and capacitive sensing to translate hand movements into musical control voltages, triggers, and MIDI. Eurorack compatible.',
    techStack: ['PSoC 4 BLE', 'C', 'CV/Gate', 'Eurorack', 'ToF Sensors', 'Capacitive Sensing'],
    specs: [
      { label: 'Sensing', value: '4x VL53L1X ToF + 8ch capacitive' },
      { label: 'Outputs', value: '4x CV (0-10V), 4x Gate, 2x Trigger' },
      { label: 'CV Range', value: '0-10V (configurable +/-5V mode)' },
      { label: 'Resolution', value: '12-bit DAC, 1mm spatial resolution' },
      { label: 'Format', value: 'Eurorack 26HP, 3U' },
      { label: 'Power', value: 'Eurorack +/-12V + 5V' },
      { label: 'BLE', value: 'Config + firmware via PSoC BLE' },
      { label: 'Latency', value: '<1ms CV response' },
    ],
    bom: [
      { ref: 'U1', component: 'PSoC 4 BLE', value: 'CY8C4247LQI-BL483', manufacturer: 'Infineon', qty: 1 },
      { ref: 'U2-U5', component: 'ToF Sensor', value: 'VL53L1X', manufacturer: 'STMicroelectronics', qty: 4 },
      { ref: 'U6', component: 'Quad DAC', value: 'DAC8564', manufacturer: 'Texas Instruments', qty: 1 },
      { ref: 'U7', component: 'Op-Amp (quad)', value: 'TL074', manufacturer: 'Texas Instruments', qty: 2 },
      { ref: 'U8', component: 'Cap Sense Controller', value: 'CY8C20236A', manufacturer: 'Infineon', qty: 1 },
      { ref: 'J1-J10', component: '3.5mm Mono Jack', value: 'CV/Gate Output', manufacturer: 'Thonkiconn', qty: 10 },
      { ref: 'LED1-LED4', component: 'RGB LED', value: 'WS2812B', manufacturer: 'Worldsemi', qty: 4 },
      { ref: 'FB1', component: 'Eurorack Power', value: '10-pin IDC header', manufacturer: 'Wurth', qty: 1 },
    ],
    schematics: ['PJ-POWER-01', 'PJ-SENSOR-01', 'PJ-CV-01'],
  },
  {
    id: 'silver-dolphin',
    name: 'Silver Dolphin',
    status: 'in-development',
    accent: 'silver',
    description:
      'An upcoming modular live performance ecosystem integrating sequencing, synthesis, effects, and real-time AI-assisted composition tools. Targets professional live jazz and electronic performance contexts.',
    techStack: ['C++', 'Swift', 'Dart', 'RP2040', 'ESP32', 'USB-C', 'MIDI 2.0', 'OSC'],
    specs: [
      { label: 'Status', value: 'Design phase -- prototyping Q2 2026' },
      { label: 'Architecture', value: 'Distributed module system via high-speed I2S/SPI' },
      { label: 'Sequencer', value: '64-step, polymetric, live-recordable' },
      { label: 'Effects', value: 'Reverb, delay, chorus, granular -- DSP on RP2040' },
      { label: 'Connectivity', value: 'MIDI 2.0, USB-C, OSC (Wi-Fi), CV, DIN sync' },
      { label: 'Control', value: 'Companion iOS app (Swift), web interface (Dart)' },
      { label: 'AI Features', value: 'Harmonic suggestion engine, style-aware voicing' },
      { label: 'Target', value: 'Gigging pianist / electronic musician' },
    ],
    bom: [
      { ref: 'MCU1', component: 'Microcontroller', value: 'RP2040', manufacturer: 'Raspberry Pi', qty: 4 },
      { ref: 'MCU2', component: 'WiFi/BLE SoC', value: 'ESP32-S3', manufacturer: 'Espressif', qty: 2 },
      { ref: 'U1', component: 'Audio Codec', value: 'CS4270', manufacturer: 'Cirrus Logic', qty: 2 },
      { ref: 'U2', component: 'DAC (stereo)', value: 'PCM5102A', manufacturer: 'Texas Instruments', qty: 4 },
      { ref: 'U3', component: 'FPGA (TBD)', value: 'iCE40UP5K', manufacturer: 'Lattice', qty: 1 },
      { ref: 'U4', component: 'USB-C Controller', value: 'FUSB302', manufacturer: 'onsemi', qty: 2 },
      { ref: 'U5', component: 'Op-Amp', value: 'OPA2134', manufacturer: 'Texas Instruments', qty: 12 },
      { ref: 'RG1', component: 'Voltage Reg', value: 'TPS62135', manufacturer: 'Texas Instruments', qty: 4 },
    ],
    schematics: ['SD-ARCH-01'],
  },
];

export const getSystemById = (id: string): System | undefined =>
  systems.find((s) => s.id === id);
