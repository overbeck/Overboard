import type { Part } from '../types';

export const parts: Part[] = [
  { id: '1', name: 'OPA2134PA', manufacturer: 'Texas Instruments', value: 'Dual Audio Op-Amp, SoundPlus', category: 'Op-Amp', supplier: 'Mouser', partNumber: 'OPA2134PA', stock: 'in-stock', notes: 'High-performance audio. Pink Elephant output stage.', link: 'https://www.mouser.com/ProductDetail/OPA2134PA' },
  { id: '2', name: 'TL072CP', manufacturer: 'Texas Instruments', value: 'Dual JFET-input Op-Amp', category: 'Op-Amp', supplier: 'Farnell', partNumber: 'TL072CP', stock: 'in-stock', notes: 'Low noise. CV buffering.' },
  { id: '3', name: 'NE5532P', manufacturer: 'Texas Instruments', value: 'Dual Low-Noise Op-Amp', category: 'Op-Amp', supplier: 'DigiKey', partNumber: 'NE5532P', stock: 'in-stock', notes: 'Classic audio. Mixer summing stages.' },
  { id: '4', name: 'CY8C4247LQI-BL483', manufacturer: 'Infineon', value: 'PSoC 4 BLE, 48MHz ARM Cortex-M0+', category: 'Microcontroller', supplier: 'Mouser', partNumber: 'CY8C4247LQI-BL483', stock: 'in-stock', notes: 'BLE + CapSense. Core MCU.' },
  { id: '5', name: 'ATSAMD21G18A-MU', manufacturer: 'Microchip', value: 'SAMD21, 48MHz ARM Cortex-M0+, USB', category: 'Microcontroller', supplier: 'Mouser', partNumber: 'ATSAMD21G18A-MU', stock: 'low', notes: 'Arduino Zero core. USB MIDI.' },
  { id: '6', name: 'RP2040', manufacturer: 'Raspberry Pi', value: 'Dual-core ARM Cortex-M0+, 133MHz', category: 'Microcontroller', supplier: 'RS Components', partNumber: 'SC0914(7)', stock: 'in-stock', notes: 'Silver Dolphin DSP modules.' },
  { id: '7', name: 'ESP32-S3-WROOM-1', manufacturer: 'Espressif', value: 'Wi-Fi + BT5 SoC, Xtensa LX7 240MHz', category: 'Microcontroller', supplier: 'Mouser', partNumber: 'ESP32-S3-WROOM-1-N8', stock: 'in-stock', notes: 'Silver Dolphin network/OSC module.' },
  { id: '8', name: 'PCM5102APWR', manufacturer: 'Texas Instruments', value: '32-bit, 384kHz Stereo DAC', category: 'Audio IC', supplier: 'Mouser', partNumber: 'PCM5102APWR', stock: 'in-stock', notes: 'I2S stereo DAC. Pink Elephant audio output.' },
  { id: '9', name: 'WM8978CGEFL', manufacturer: 'Cirrus Logic', value: 'Low power stereo codec with DAC+ADC', category: 'Audio IC', supplier: 'Farnell', partNumber: 'WM8978CGEFL', stock: 'low', notes: 'Full codec with EQ, AGC.' },
  { id: '10', name: 'CS4270-CZZ', manufacturer: 'Cirrus Logic', value: '24-bit, 192kHz Stereo Codec', category: 'Audio IC', supplier: 'DigiKey', partNumber: 'CS4270-CZZ', stock: 'on-order', notes: 'Silver Dolphin main audio I/O.' },
  { id: '11', name: 'VL53L1X', manufacturer: 'STMicroelectronics', value: 'ToF Ranging Sensor, up to 4m', category: 'Sensor', supplier: 'Mouser', partNumber: 'VL53L1XSAITL', stock: 'in-stock', notes: 'Purple Jellyfish proximity sensing.' },
  { id: '12', name: 'DAC8564IPWR', manufacturer: 'Texas Instruments', value: 'Quad 16-bit DAC, SPI', category: 'DAC', supplier: 'Mouser', partNumber: 'DAC8564IPWR', stock: 'in-stock', notes: 'Purple Jellyfish CV outputs.' },
  { id: '13', name: 'LM317T', manufacturer: 'STMicroelectronics', value: '1.5A Adjustable Linear Regulator, TO-220', category: 'Power', supplier: 'Rapid Electronics', partNumber: 'LM317T', stock: 'in-stock', notes: 'General adjustable rail regulation.' },
  { id: '14', name: 'TPS62135RGTR', manufacturer: 'Texas Instruments', value: '4A, 17V, Step-Down Converter', category: 'Power', supplier: 'Mouser', partNumber: 'TPS62135RGTR', stock: 'in-stock', notes: 'Efficient DC-DC. Silver Dolphin power tree.' },
  { id: '15', name: 'FUSB302BMPX', manufacturer: 'onsemi', value: 'USB Type-C PD Controller', category: 'Power', supplier: 'Farnell', partNumber: 'FUSB302BMPX', stock: 'low', notes: 'USB-C PD negotiation. Pink Elephant.' },
  { id: '16', name: 'PJ-3410', manufacturer: 'CUI Devices', value: '3.5mm Mono Jack, Thonkiconn-style', category: 'Connector', supplier: 'Thonk', partNumber: 'PJ-3410', stock: 'in-stock', notes: 'Eurorack CV/Gate patch point.', link: 'https://www.thonk.co.uk/shop/thonkiconn/' },
  { id: '17', name: 'NC3MAH', manufacturer: 'Neutrik', value: 'XLR Male Chassis Connector', category: 'Connector', supplier: 'Burklin', partNumber: 'NC3MAH', stock: 'in-stock', notes: 'Balanced audio out. Pink Elephant XLR.' },
  { id: '18', name: 'WS2812B', manufacturer: 'Worldsemi', value: 'Addressable RGB LED, 5V', category: 'LED', supplier: 'Mouser', partNumber: 'WS2812B', stock: 'in-stock', notes: 'Status LEDs on Purple Jellyfish and Silver Dolphin.' },
  { id: '19', name: 'Alpha 9mm B10K', manufacturer: 'Alpha', value: '10k Ohm Lin Taper Pot, 9mm, PCB', category: 'Passive', supplier: 'Thonk', partNumber: 'RD901F-40-15R1-B10K', stock: 'in-stock', notes: 'Eurorack-standard attenuator pots.' },
  { id: '20', name: 'Wurth 694106301002', manufacturer: 'Wurth Elektronik', value: '16-pin IDC Eurorack Power Header', category: 'Connector', supplier: 'Mouser', partNumber: '694106301002', stock: 'in-stock', notes: 'Standard Eurorack power connector.' },
];

export const partCategories = ['All', 'Op-Amp', 'Microcontroller', 'Audio IC', 'DAC', 'Sensor', 'Power', 'Connector', 'LED', 'Passive'];
export const suppliers = ['Mouser', 'Farnell', 'DigiKey', 'RS Components', 'Rapid Electronics', 'Burklin', 'Thonk'];
