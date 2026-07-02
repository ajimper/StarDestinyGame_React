// ============================================================
// STAR DESTINY GAME - DATOS ASTROFISICOS DE LAS SENDAS
// ============================================================

import type { EvolutionPath, CollisionResult } from '@/types/game';

// ============================================================
// FASES COMUNES (Todas las sendas comparten estas primeras fases)
// ============================================================
const commonPhases = [
  {
    id: 'nebula',
    name: 'Nebulosa Molecular',
    phase: 'Nursery',
    description: 'Nube de gas y polvo donde nacen las estrellas. Contiene H, He y trazas de elementos pesados.',
    timeSpan: 1e6,
    metallicityValue: 0,
    isCollisionNode: false,
    isTerminal: false,
    isNursery: true,
    color: '#1a1a2e',
  },
  {
    id: 'class0',
    name: 'Protostar Clase 0',
    phase: 'Protostar',
    description: 'Colapso gravitacional de un núcleo molecular. La estrella está envuelta en un disco de acreción denso.',
    timeSpan: 1e4,
    metallicityValue: 0,
    isCollisionNode: false,
    isTerminal: false,
    isNursery: false,
    color: '#2d1b69',
  },
  {
    id: 'classI',
    name: 'Protostar Clase I',
    phase: 'Protostar',
    description: 'La estrella continúa acretando masa. Se observan jets bipolares y outflows.',
    timeSpan: 1e5,
    metallicityValue: 0,
    isCollisionNode: false,
    isTerminal: false,
    isNursery: false,
    color: '#3d2b79',
  },
  {
    id: 'ttauri',
    name: 'T Tauri / Herbig',
    phase: 'Pre-MS',
    description: 'Estrella visible con exceso infrarrojo. El disco protoplanetario aún está presente.',
    timeSpan: 1e7,
    metallicityValue: 0,
    isCollisionNode: false,
    isTerminal: false,
    isNursery: false,
    color: '#4a3b89',
  },
  {
    id: 'zams',
    name: 'ZAMS',
    phase: 'Main-Sequence',
    description: 'Zero-Age Main Sequence. Inicio del quemado de hidrógeno en el núcleo. El 90% de la vida estelar.',
    timeSpan: 0,
    metallicityValue: 0,
    isCollisionNode: true,
    isTerminal: false,
    isNursery: false,
    color: '#f9c74f',
  },
];

// ============================================================
// SENDA 2: 0.1 M☉ - Enana Roja Ultra-ligera [22 casillas]
// Vida MS: ~3.2 × 10^12 años
// ============================================================
const path2: EvolutionPath = {
  id: 2,
  mass: 0.1,
  spectralType: 'M7 V',
  starName: 'Enana Roja Ultra-ligera',
  description: 'Estrella de muy baja masa, completamente convectiva. Vida de billones de años.',
  color: '#8b0000',
  squares: [
    ...commonPhases,
    {
      id: 's2_ms1', name: 'MS - Enana Roja (inicio)', phase: 'Main-Sequence',
      description: 'Quemado estable de H → He por cadena pp. Toda la estrella es convectiva.',
      timeSpan: 1e12, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#8b0000',
    },
    {
      id: 's2_ms2', name: 'MS - Enana Roja (media)', phase: 'Main-Sequence',
      description: 'Continúa el quemado de hidrógeno. Luminosidad ~0.001 L☉.',
      timeSpan: 1e12, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#8b0000',
    },
    {
      id: 's2_ms3', name: 'MS - Enana Roja (tardía)', phase: 'Main-Sequence',
      description: 'El hidrógeno comienza a escasear en el núcleo.',
      timeSpan: 1e12, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#8b0000',
    },
    {
      id: 's2_evo', name: 'Enana Roja Evolucionada', phase: 'Post-MS',
      description: 'El núcleo se contrae pero no alcanza temperatura para ignición de He.',
      timeSpan: 1e10, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#6b0000',
    },
    {
      id: 's2_hedeg', name: 'Helio Degenerado', phase: 'Degenerate',
      description: 'El núcleo de helio se vuelve degenerado sin ignición. La estrella se enfría lentamente.',
      timeSpan: 1e10, metallicityValue: 2, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#4b0000',
    },
    {
      id: 's2_wdhe', name: 'Enana Blanca de Helio', phase: 'White-Dwarf',
      description: 'Remanente degenerado compuesto principalmente de helio. Se enfría durante billones de años.',
      timeSpan: 1e13, metallicityValue: 0, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#e0e0ff',
    },
    {
      id: 's2_bd', name: 'Enana Negra (Helio)', phase: 'Terminal',
      description: 'La estrella ha enfriado hasta no emitir luz detectable. Fin de la evolución.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: false, isTerminal: true, isNursery: false, color: '#1a1a1a',
    },
  ],
};

// ============================================================
// SENDA 3: 0.3 M☉ - Enana Roja Ligera [19 casillas]
// Vida MS: ~2.0 × 10^11 años
// ============================================================
const path3: EvolutionPath = {
  id: 3,
  mass: 0.3,
  spectralType: 'M4 V',
  starName: 'Enana Roja Ligera',
  description: 'Estrella roja con vida extremadamente larga. No alcanza ignición de helio.',
  color: '#a52a2a',
  squares: [
    ...commonPhases,
    {
      id: 's3_ms1', name: 'MS - M4V (inicio)', phase: 'Main-Sequence',
      description: 'Quemado de H → He. Estrella completamente convectiva.',
      timeSpan: 7e10, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#a52a2a',
    },
    {
      id: 's3_ms2', name: 'MS - M4V (media)', phase: 'Main-Sequence',
      description: 'Media vida principal. Luminosidad ~0.01 L☉.',
      timeSpan: 7e10, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#a52a2a',
    },
    {
      id: 's3_ms3', name: 'MS - M4V (tardía)', phase: 'Main-Sequence',
      description: 'Hidrógeno nuclear agotándose.',
      timeSpan: 6e10, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#a52a2a',
    },
    {
      id: 's3_sg', name: 'Subgigante', phase: 'Subgiant',
      description: 'El núcleo se contrae mientras el H se quema en una capa alrededor.',
      timeSpan: 1e10, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#cd5c5c',
    },
    {
      id: 's3_rgb', name: 'Rama de Gigantes Rojas', phase: 'RGB',
      description: 'Expansión de las capas externas. El núcleo de He es degenerado.',
      timeSpan: 1e9, metallicityValue: 3, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#dc143c',
    },
    {
      id: 's3_heflash', name: 'Flash de Helio (degenerado)', phase: 'Helium-Flash',
      description: 'El helio ignita de forma explosiva en el núcleo degenerado. Evento rápido.',
      timeSpan: 1e5, metallicityValue: 5, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's3_wd', name: 'Enana Blanca CO', phase: 'White-Dwarf',
      description: 'Remanente de carbono y oxígeno soportado por presión de degeneración de electrones.',
      timeSpan: 1e10, metallicityValue: 0, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#e0e0ff',
    },
    {
      id: 's3_bd', name: 'Enana Negra', phase: 'Terminal',
      description: 'Enana blanca enfriada. Fin de la evolución estelar.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: false, isTerminal: true, isNursery: false, color: '#1a1a1a',
    },
  ],
};

// ============================================================
// SENDA 4: 0.5 M☉ - Enana Roja [18 casillas]
// Vida MS: ~5.7 × 10^10 años
// ============================================================
const path4: EvolutionPath = {
  id: 4,
  mass: 0.5,
  spectralType: 'M2 V',
  starName: 'Enana Roja',
  description: 'Estrella roja típica. Vida muy larga con evolución completa post-MS.',
  color: '#cd5c5c',
  squares: [
    ...commonPhases,
    {
      id: 's4_ms1', name: 'MS - M2V (inicio)', phase: 'Main-Sequence',
      description: 'Quemado de H → He. Luminosidad ~0.03 L☉.',
      timeSpan: 2e10, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#cd5c5c',
    },
    {
      id: 's4_ms2', name: 'MS - M2V (media)', phase: 'Main-Sequence',
      description: 'Estabilidad en la secuencia principal.',
      timeSpan: 2e10, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#cd5c5c',
    },
    {
      id: 's4_ms3', name: 'MS - M2V (tardía)', phase: 'Main-Sequence',
      description: 'Hidrógeno nuclear disminuyendo.',
      timeSpan: 1.7e10, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#cd5c5c',
    },
    {
      id: 's4_sg', name: 'Subgigante', phase: 'Subgiant',
      description: 'Contrae núcleo, expansión de envoltura.',
      timeSpan: 5e9, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#b22222',
    },
    {
      id: 's4_rgb', name: 'Rama Gigantes Rojas', phase: 'RGB',
      description: 'Primera dredge-up: elementos procesados aparecen en la superficie.',
      timeSpan: 1e9, metallicityValue: 3, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#dc143c',
    },
    {
      id: 's4_heflash', name: 'Flash de Helio', phase: 'Helium-Flash',
      description: 'Ignición explosiva de He en núcleo degenerado.',
      timeSpan: 1e5, metallicityValue: 5, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's4_hb', name: 'Rama Horizontal', phase: 'Horizontal-Branch',
      description: 'Quemado estable de He → C en el núcleo.',
      timeSpan: 1e8, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ffa500',
    },
    {
      id: 's4_agb1', name: 'AGB Temprana', phase: 'AGB',
      description: 'Quemado de H y He en capas. Segunda dredge-up.',
      timeSpan: 1e7, metallicityValue: 5, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff6347',
    },
    {
      id: 's4_agb2', name: 'AGB Termopulso', phase: 'TP-AGB',
      description: 'Pulsos térmicos del He. Tercera dredge-up enriquece carbono.',
      timeSpan: 1e6, metallicityValue: 8, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's4_pn', name: 'Nebulosa Planetaria', phase: 'Planetary-Nebula',
      description: 'Eyección de la envoltura. Enriquecimiento del medio interestelar con C y N.',
      timeSpan: 1e5, metallicityValue: 15, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#00ced1',
    },
    {
      id: 's4_wd', name: 'Enana Blanca CO', phase: 'White-Dwarf',
      description: 'Remanente degenerado de C-O. Se enfría radiativamente.',
      timeSpan: 1e10, metallicityValue: 0, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#e0e0ff',
    },
    {
      id: 's4_bd', name: 'Enana Negra', phase: 'Terminal',
      description: 'Enana blanca enfriada por completo.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: false, isTerminal: true, isNursery: false, color: '#1a1a1a',
    },
  ],
};

// ============================================================
// SENDA 5: 0.8 M☉ - Enana Naranja [17 casillas]
// Vida MS: ~1.7 × 10^10 años
// ============================================================
const path5: EvolutionPath = {
  id: 5,
  mass: 0.8,
  spectralType: 'K5 V',
  starName: 'Enana Naranja',
  description: 'Estrella tipo K. Vida larga con evolución completa similar al Sol pero más lenta.',
  color: '#d2691e',
  squares: [
    ...commonPhases,
    {
      id: 's5_ms1', name: 'MS - K5V (inicio)', phase: 'Main-Sequence',
      description: 'Quemado de H → He. Luminosidad ~0.2 L☉.',
      timeSpan: 6e9, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#d2691e',
    },
    {
      id: 's5_ms2', name: 'MS - K5V (media)', phase: 'Main-Sequence',
      description: 'Estabilidad en secuencia principal.',
      timeSpan: 6e9, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#d2691e',
    },
    {
      id: 's5_ms3', name: 'MS - K5V (tardía)', phase: 'Main-Sequence',
      description: 'Hidrógeno nuclear escaseando.',
      timeSpan: 5e9, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#d2691e',
    },
    {
      id: 's5_sg', name: 'Subgigante', phase: 'Subgiant',
      description: 'Transición hacia gigante roja.',
      timeSpan: 2e9, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#cd853f',
    },
    {
      id: 's5_rgb', name: 'Rama Gigantes Rojas', phase: 'RGB',
      description: 'Expansión. Primer dredge-up.',
      timeSpan: 5e8, metallicityValue: 3, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#dc143c',
    },
    {
      id: 's5_heflash', name: 'Flash de Helio', phase: 'Helium-Flash',
      description: 'Ignición explosiva de He.',
      timeSpan: 1e5, metallicityValue: 5, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's5_hb', name: 'Rama Horizontal', phase: 'Horizontal-Branch',
      description: 'Quemado estable de He → C.',
      timeSpan: 1e8, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ffa500',
    },
    {
      id: 's5_agb', name: 'AGB', phase: 'AGB',
      description: 'Segundo y tercer dredge-up. Producción intensiva de carbono.',
      timeSpan: 5e6, metallicityValue: 8, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff6347',
    },
    {
      id: 's5_pn', name: 'Nebulosa Planetaria', phase: 'Planetary-Nebula',
      description: 'Eyección de envoltura. Enriquecimiento del ISM.',
      timeSpan: 1e5, metallicityValue: 15, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#00ced1',
    },
    {
      id: 's5_wd', name: 'Enana Blanca CO', phase: 'White-Dwarf',
      description: 'Remanente degenerado de C-O.',
      timeSpan: 1e10, metallicityValue: 0, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#e0e0ff',
    },
    {
      id: 's5_bd', name: 'Enana Negra', phase: 'Terminal',
      description: 'Enfriamiento final.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: false, isTerminal: true, isNursery: false, color: '#1a1a1a',
    },
  ],
};

// ============================================================
// SENDA 6: 1.0 M☉ - Solar [16 casillas]
// Vida MS: ~1.0 × 10^10 años (10 Gyr)
// ============================================================
const path6: EvolutionPath = {
  id: 6,
  mass: 1.0,
  spectralType: 'G2 V',
  starName: 'Solar (Sol)',
  description: 'Como nuestro Sol. Evolución completa con nebulosa planetaria y enana blanca.',
  color: '#f9c74f',
  squares: [
    ...commonPhases,
    {
      id: 's6_ms1', name: 'MS - Sol G2V (inicio)', phase: 'Main-Sequence',
      description: 'Quemado de H → He por cadena pp y ciclo CNO. Luminosidad 1 L☉.',
      timeSpan: 4e9, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#f9c74f',
    },
    {
      id: 's6_ms2', name: 'MS - Sol (media)', phase: 'Main-Sequence',
      description: 'Sol actual: ~4.57 Gyr. Estabilidad climática gracias a feedback geológico.',
      timeSpan: 3e9, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#f9c74f',
    },
    {
      id: 's6_ms3', name: 'MS - Sol (tardía)', phase: 'Main-Sequence',
      description: 'Hidrógeno nuclear disminuyendo. Luminosidad aumenta ~10%.',
      timeSpan: 3e9, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#f9c74f',
    },
    {
      id: 's6_sg', name: 'Subgigante', phase: 'Subgiant',
      description: 'El núcleo de He se contrae. Las capas externas se expanden.',
      timeSpan: 2e9, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#eeb422',
    },
    {
      id: 's6_rgb', name: 'Rama Gigantes Rojas', phase: 'RGB',
      description: 'Radio ~100x solar. Primer dredge-up. Mercurio y Venus son engullidos.',
      timeSpan: 5e8, metallicityValue: 3, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#dc143c',
    },
    {
      id: 's6_heflash', name: 'Flash de Helio', phase: 'Helium-Flash',
      description: 'El He ignita explosivamente en el núcleo degenerado.',
      timeSpan: 1e5, metallicityValue: 5, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's6_hb', name: 'Rama Horizontal', phase: 'Horizontal-Branch',
      description: 'Quemado estable de He → C,O en núcleo.',
      timeSpan: 1e8, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ffa500',
    },
    {
      id: 's6_agb1', name: 'AGB Temprana', phase: 'AGB',
      description: 'Doble capa de quemado: H y He. Superwind comienza.',
      timeSpan: 2e6, metallicityValue: 5, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff6347',
    },
    {
      id: 's6_agb2', name: 'AGB Termopulso', phase: 'TP-AGB',
      description: 'Pulsos térmicos intensos. Tercer dredge-up.',
      timeSpan: 3e6, metallicityValue: 10, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's6_pn', name: 'Nebulosa Planetaria', phase: 'Planetary-Nebula',
      description: 'Eyección de ~50% de masa. Enriquece el ISM con C, N, O.',
      timeSpan: 1e5, metallicityValue: 15, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#00ced1',
    },
    {
      id: 's6_wd', name: 'Enana Blanca CO', phase: 'White-Dwarf',
      description: 'Remanente de ~0.6 M☉ de C-O. Se enfría durante >10 Gyr.',
      timeSpan: 1e10, metallicityValue: 0, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#e0e0ff',
    },
    {
      id: 's6_bd', name: 'Enana Negra', phase: 'Terminal',
      description: 'Enana blanca enfriada. Temperatura cercana al fondo cósmico.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: false, isTerminal: true, isNursery: false, color: '#1a1a1a',
    },
  ],
};

// ============================================================
// SENDA 7: 1.5 M☉ - Tipo F [15 casillas]
// Vida MS: ~3.6 × 10^9 años
// ============================================================
const path7: EvolutionPath = {
  id: 7,
  mass: 1.5,
  spectralType: 'F5 V',
  starName: 'Estrella Tipo F',
  description: 'Masa intermedia-baja. Evolución con AGB y enana blanca CO/ONe.',
  color: '#ffd700',
  squares: [
    ...commonPhases,
    {
      id: 's7_ms1', name: 'MS - F5V (inicio)', phase: 'Main-Sequence',
      description: 'Quemado H → He. Ciclo CNO dominante. Luminosidad ~5 L☉.',
      timeSpan: 1.5e9, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ffd700',
    },
    {
      id: 's7_ms2', name: 'MS - F5V (media)', phase: 'Main-Sequence',
      description: 'Estabilidad.',
      timeSpan: 1.2e9, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ffd700',
    },
    {
      id: 's7_ms3', name: 'MS - F5V (tardía)', phase: 'Main-Sequence',
      description: 'Hidrógeno nuclear agotándose.',
      timeSpan: 9e8, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ffd700',
    },
    {
      id: 's7_sg', name: 'Subgigante', phase: 'Subgiant',
      description: 'Transición post-MS.',
      timeSpan: 5e8, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#eeb422',
    },
    {
      id: 's7_rgb', name: 'Gigante Roja', phase: 'RGB',
      description: 'Expansión importante. Primer dredge-up.',
      timeSpan: 2e8, metallicityValue: 3, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#dc143c',
    },
    {
      id: 's7_he', name: 'Helio Core Burning', phase: 'He-Burning',
      description: 'Quemado de He → C,O en núcleo no degenerado.',
      timeSpan: 2e7, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ffa500',
    },
    {
      id: 's7_gb', name: 'Gigante Brillante', phase: 'Bright-Giant',
      description: 'Luminosidad creciente.',
      timeSpan: 1e7, metallicityValue: 3, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff8c00',
    },
    {
      id: 's7_sg2', name: 'Supergigante Roja', phase: 'Red-Supergiant',
      description: 'Máxima expansión.',
      timeSpan: 5e6, metallicityValue: 4, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's7_cburn', name: 'C-burning', phase: 'C-Burning',
      description: 'Ignición de carbono en núcleo degenerado. Flash de carbono.',
      timeSpan: 1e5, metallicityValue: 8, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff6347',
    },
    {
      id: 's7_pn', name: 'Nebulosa Planetaria', phase: 'Planetary-Nebula',
      description: 'Eyección final.',
      timeSpan: 1e5, metallicityValue: 15, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#00ced1',
    },
    {
      id: 's7_wd', name: 'Enana Blanca CO/ONe', phase: 'White-Dwarf',
      description: 'Remanente de C-O o O-Ne.',
      timeSpan: 1e9, metallicityValue: 0, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#e0e0ff',
    },
    {
      id: 's7_bd', name: 'Enana Negra', phase: 'Terminal',
      description: 'Enfriamiento final.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: false, isTerminal: true, isNursery: false, color: '#1a1a1a',
    },
  ],
};

// ============================================================
// SENDA 8: 2.0 M☉ - Tipo A [14 casillas]
// Vida MS: ~1.8 × 10^9 años
// ============================================================
const path8: EvolutionPath = {
  id: 8,
  mass: 2.0,
  spectralType: 'A5 V',
  starName: 'Estrella Tipo A',
  description: 'Masa intermedia. Evolución rápida con enana blanca O-Ne.',
  color: '#f0f8ff',
  squares: [
    ...commonPhases,
    {
      id: 's8_ms1', name: 'MS - A5V (inicio)', phase: 'Main-Sequence',
      description: 'Ciclo CNO dominante. Luminosidad ~20 L☉.',
      timeSpan: 7e8, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#f0f8ff',
    },
    {
      id: 's8_ms2', name: 'MS - A5V (media)', phase: 'Main-Sequence',
      description: 'Estabilidad.',
      timeSpan: 6e8, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#f0f8ff',
    },
    {
      id: 's8_ms3', name: 'MS - A5V (tardía)', phase: 'Main-Sequence',
      description: 'H escaseando.',
      timeSpan: 5e8, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#f0f8ff',
    },
    {
      id: 's8_sg', name: 'Subgigante', phase: 'Subgiant',
      description: 'Transición.',
      timeSpan: 2e8, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#c0c0c0',
    },
    {
      id: 's8_rgb', name: 'Gigante Roja', phase: 'RGB',
      description: 'Expansión. Dredge-up.',
      timeSpan: 1e8, metallicityValue: 3, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#dc143c',
    },
    {
      id: 's8_he', name: 'Helio Core Burning', phase: 'He-Burning',
      description: 'He → C,O.',
      timeSpan: 2e7, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ffa500',
    },
    {
      id: 's8_gb', name: 'Gigante Brillante', phase: 'Bright-Giant',
      description: 'Luminosidad alta.',
      timeSpan: 5e6, metallicityValue: 3, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff8c00',
    },
    {
      id: 's8_sg2', name: 'Supergigante Roja', phase: 'Red-Supergiant',
      description: 'Máxima expansión.',
      timeSpan: 2e6, metallicityValue: 4, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's8_cburn', name: 'C-burning', phase: 'C-Burning',
      description: 'Carbono ignita.',
      timeSpan: 1e5, metallicityValue: 8, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff6347',
    },
    {
      id: 's8_agb', name: 'AGB Super', phase: 'Super-AGB',
      description: 'Fase AGB intensa con superwind.',
      timeSpan: 5e5, metallicityValue: 10, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's8_pn', name: 'Nebulosa Planetaria', phase: 'Planetary-Nebula',
      description: 'Eyección masiva.',
      timeSpan: 1e5, metallicityValue: 15, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#00ced1',
    },
    {
      id: 's8_wd', name: 'Enana Blanca O-Ne', phase: 'White-Dwarf',
      description: 'Remanente de O-Ne. Más masiva que WD CO.',
      timeSpan: 5e8, metallicityValue: 0, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#e0e0ff',
    },
    {
      id: 's8_bd', name: 'Enana Negra', phase: 'Terminal',
      description: 'Enfriamiento.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: false, isTerminal: true, isNursery: false, color: '#1a1a1a',
    },
  ],
};

// ============================================================
// SENDA 9: 3.0 M☉ - Tipo A Caliente [13 casillas]
// Vida MS: ~6.4 × 10^8 años
// ============================================================
const path9: EvolutionPath = {
  id: 9,
  mass: 3.0,
  spectralType: 'A0 V',
  starName: 'Estrella A Caliente',
  description: 'Masa intermedia-alta. Termina en supernova y remanente compacto.',
  color: '#b0e0e6',
  squares: [
    ...commonPhases,
    {
      id: 's9_ms1', name: 'MS - A0V (inicio)', phase: 'Main-Sequence',
      description: 'Luminosidad ~80 L☉.',
      timeSpan: 2.5e8, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#b0e0e6',
    },
    {
      id: 's9_ms2', name: 'MS - A0V (media)', phase: 'Main-Sequence',
      description: 'Estabilidad.',
      timeSpan: 2e8, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#b0e0e6',
    },
    {
      id: 's9_ms3', name: 'MS - A0V (tardía)', phase: 'Main-Sequence',
      description: 'H agotándose.',
      timeSpan: 1.9e8, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#b0e0e6',
    },
    {
      id: 's9_sg', name: 'Subgigante', phase: 'Subgiant',
      description: 'Transición.',
      timeSpan: 1e8, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#87ceeb',
    },
    {
      id: 's9_rgb', name: 'Gigante Roja', phase: 'RGB',
      description: 'Expansión.',
      timeSpan: 5e7, metallicityValue: 3, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#dc143c',
    },
    {
      id: 's9_he', name: 'Helio Core Burning', phase: 'He-Burning',
      description: 'He → C,O. Núcleo no degenerado.',
      timeSpan: 1e7, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ffa500',
    },
    {
      id: 's9_bl', name: 'Blue Loop', phase: 'Blue-Loop',
      description: 'La estrella vuelve temporalmente a temperaturas altas.',
      timeSpan: 1e6, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#4169e1',
    },
    {
      id: 's9_cburn', name: 'C-burning', phase: 'C-Burning',
      description: 'C → Ne, Mg.',
      timeSpan: 1e4, metallicityValue: 8, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff6347',
    },
    {
      id: 's9_nburn', name: 'Ne-burning', phase: 'Ne-Burning',
      description: 'Ne → O, Mg.',
      timeSpan: 1e3, metallicityValue: 10, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's9_sn', name: 'Supernova Core-Collapse', phase: 'Supernova',
      description: 'Colapso del núcleo de Fe. Explosión que enriquece el ISM con elementos α.',
      timeSpan: 1, metallicityValue: 30, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff0000',
    },
    {
      id: 's9_remnant', name: 'NS / BH (1.4-3 M☉)', phase: 'Compact-Remnant',
      description: 'Estrella de neutrones o agujero negro estelar.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: true, isTerminal: true, isNursery: false, color: '#333333',
    },
  ],
};

// ============================================================
// SENDA 10: 5.0 M☉ - Tipo B [12 casillas]
// Vida MS: ~1.8 × 10^8 años
// ============================================================
const path10: EvolutionPath = {
  id: 10,
  mass: 5.0,
  spectralType: 'B5 V',
  starName: 'Estrella Tipo B',
  description: 'Estrella masiva. Vida corta con supernova espectacular.',
  color: '#87ceeb',
  squares: [
    ...commonPhases,
    {
      id: 's10_ms1', name: 'MS - B5V (inicio)', phase: 'Main-Sequence',
      description: 'Luminosidad ~700 L☉. Vientos estelares significativos.',
      timeSpan: 7e7, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#87ceeb',
    },
    {
      id: 's10_ms2', name: 'MS - B5V (media)', phase: 'Main-Sequence',
      description: 'Estabilidad.',
      timeSpan: 6e7, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#87ceeb',
    },
    {
      id: 's10_ms3', name: 'MS - B5V (tardía)', phase: 'Main-Sequence',
      description: 'H agotándose.',
      timeSpan: 5e7, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#87ceeb',
    },
    {
      id: 's10_rsg', name: 'Supergigante Roja', phase: 'Red-Supergiant',
      description: 'Máxima expansión. Pérdida de masa intensa.',
      timeSpan: 1e6, metallicityValue: 4, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's10_bl', name: 'Blue Loop', phase: 'Blue-Loop',
      description: 'Retorno a altas temperaturas.',
      timeSpan: 5e5, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#4169e1',
    },
    {
      id: 's10_cburn', name: 'C-burning', phase: 'C-Burning',
      description: 'C → Ne, Mg.',
      timeSpan: 1e4, metallicityValue: 8, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff6347',
    },
    {
      id: 's10_nburn', name: 'Ne-burning', phase: 'Ne-Burning',
      description: 'Ne → O, Mg.',
      timeSpan: 1e3, metallicityValue: 10, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's10_oburn', name: 'O-burning', phase: 'O-Burning',
      description: 'O → Si, S.',
      timeSpan: 1e2, metallicityValue: 12, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff8c00',
    },
    {
      id: 's10_siburn', name: 'Si-burning', phase: 'Si-Burning',
      description: 'Si → Fe, Ni. Construcción del núcleo de hierro.',
      timeSpan: 1, metallicityValue: 15, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#daa520',
    },
    {
      id: 's10_sn', name: 'Supernova Core-Collapse', phase: 'Supernova',
      description: 'Colapso del núcleo de Fe. Elementos α y hierro al ISM.',
      timeSpan: 1, metallicityValue: 30, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff0000',
    },
    {
      id: 's10_remnant', name: 'NS / BH (2-5 M☉)', phase: 'Compact-Remnant',
      description: 'Estrella de neutrones o agujero negro.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: true, isTerminal: true, isNursery: false, color: '#333333',
    },
  ],
};

// ============================================================
// SENDA 11: 8.0 M☉ - Tipo B Caliente [10 casillas]
// Vida MS: ~5.5 × 10^7 años
// ============================================================
const path11: EvolutionPath = {
  id: 11,
  mass: 8.0,
  spectralType: 'B2 V',
  starName: 'Estrella B Caliente',
  description: 'Estrella muy masiva. Vida extremadamente corta.',
  color: '#6495ed',
  squares: [
    ...commonPhases,
    {
      id: 's11_ms1', name: 'MS - B2V (inicio)', phase: 'Main-Sequence',
      description: 'Luminosidad ~10^4 L☉. Vientos intensos.',
      timeSpan: 2e7, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#6495ed',
    },
    {
      id: 's11_ms2', name: 'MS - B2V (media)', phase: 'Main-Sequence',
      description: 'Quemado rápido de H.',
      timeSpan: 2e7, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#6495ed',
    },
    {
      id: 's11_ms3', name: 'MS - B2V (tardía)', phase: 'Main-Sequence',
      description: 'H agotándose rápidamente.',
      timeSpan: 1.5e7, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#6495ed',
    },
    {
      id: 's11_rsg', name: 'Supergigante Roja', phase: 'Red-Supergiant',
      description: 'Expansión masiva.',
      timeSpan: 5e5, metallicityValue: 4, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's11_bl', name: 'Blue Loop', phase: 'Blue-Loop',
      description: 'Retorno azul.',
      timeSpan: 2e5, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#4169e1',
    },
    {
      id: 's11_cburn', name: 'C-burning', phase: 'C-Burning',
      description: 'C → Ne, Mg.',
      timeSpan: 1e4, metallicityValue: 8, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff6347',
    },
    {
      id: 's11_oburn', name: 'O-burning', phase: 'O-Burning',
      description: 'O → Si.',
      timeSpan: 1e2, metallicityValue: 12, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff8c00',
    },
    {
      id: 's11_siburn', name: 'Si-burning', phase: 'Si-Burning',
      description: 'Si → Fe.',
      timeSpan: 1, metallicityValue: 15, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#daa520',
    },
    {
      id: 's11_sn', name: 'Supernova Core-Collapse', phase: 'Supernova',
      description: 'Explosión masiva. Elementos pesados al ISM.',
      timeSpan: 1, metallicityValue: 30, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff0000',
    },
    {
      id: 's11_ns', name: 'Estrella de Neutrones', phase: 'Neutron-Star',
      description: 'Remanente de neutrones degenerados. Densidad ~10^17 kg/m³.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: true, isTerminal: true, isNursery: false, color: '#666666',
    },
  ],
};

// ============================================================
// SENDA 12: 15 M☉ - Tipo O [9 casillas]
// Vida MS: ~1.1 × 10^7 años
// ============================================================
const path12: EvolutionPath = {
  id: 12,
  mass: 15.0,
  spectralType: 'O8 V',
  starName: 'Estrella Tipo O',
  description: 'Estrella extremadamente masiva. Vida de solo ~10 millones de años.',
  color: '#9bb5ff',
  squares: [
    ...commonPhases,
    {
      id: 's12_ms1', name: 'MS - O8V', phase: 'Main-Sequence',
      description: 'Luminosidad ~10^6 L☉. Vientos estelares masivos (>10^-6 M☉/yr).',
      timeSpan: 4e6, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#9bb5ff',
    },
    {
      id: 's12_ms2', name: 'MS - O8V (tardía)', phase: 'Main-Sequence',
      description: 'H agotándose. Pérdida de masa intensa.',
      timeSpan: 3.5e6, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#9bb5ff',
    },
    {
      id: 's12_rsg', name: 'Supergigante Roja', phase: 'Red-Supergiant',
      description: 'Máxima expansión. Pérdida de masa extrema.',
      timeSpan: 2e5, metallicityValue: 4, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's12_bl', name: 'Blue Loop', phase: 'Blue-Loop',
      description: 'Retorno azul.',
      timeSpan: 1e5, metallicityValue: 2, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#4169e1',
    },
    {
      id: 's12_cburn', name: 'C-burning', phase: 'C-Burning',
      description: 'Quemado rápido de C.',
      timeSpan: 1e3, metallicityValue: 8, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff6347',
    },
    {
      id: 's12_oburn', name: 'O-burning', phase: 'O-Burning',
      description: 'O → Si.',
      timeSpan: 1e1, metallicityValue: 12, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff8c00',
    },
    {
      id: 's12_sn', name: 'Supernova / Hypernova', phase: 'Supernova',
      description: 'Colapso del núcleo de Fe. Puede ser hypernova si hay rotación rápida.',
      timeSpan: 1, metallicityValue: 30, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff0000',
    },
    {
      id: 's12_remnant', name: 'NS / BH (3-8 M☉)', phase: 'Compact-Remnant',
      description: 'Estrella de neutrones o agujero negro estelar.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: true, isTerminal: true, isNursery: false, color: '#222222',
    },
  ],
};

// ============================================================
// SENDA 13: 25 M☉ - Tipo O Masiva [8 casillas]
// Vida MS: ~3.2 × 10^6 años
// ============================================================
const path13: EvolutionPath = {
  id: 13,
  mass: 25.0,
  spectralType: 'O5 V',
  starName: 'Estrella O Masiva',
  description: 'Hipergigante. Vida de solo ~3 millones de años. Wolf-Rayet.',
  color: '#a0b8ff',
  squares: [
    ...commonPhases,
    {
      id: 's13_ms', name: 'MS - O5V', phase: 'Main-Sequence',
      description: 'Luminosidad ~10^7 L☉. Vientos masivos. Pérdida de ~40% de masa en MS.',
      timeSpan: 1.5e6, metallicityValue: 1, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#a0b8ff',
    },
    {
      id: 's13_wr1', name: 'Wolf-Rayet WN', phase: 'WR-WN',
      description: 'Envoltura de H perdida. Nitrógeno dominante en superficie.',
      timeSpan: 5e5, metallicityValue: 3, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff6347',
    },
    {
      id: 's13_wr2', name: 'Wolf-Rayet WC', phase: 'WR-WC',
      description: 'Helio perdido. Carbono dominante.',
      timeSpan: 3e5, metallicityValue: 5, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff4500',
    },
    {
      id: 's13_wr3', name: 'Wolf-Rayet WO', phase: 'WR-WO',
      description: 'Carbono perdido. Oxígeno dominante. Pre-supernova.',
      timeSpan: 1e5, metallicityValue: 8, isCollisionNode: true, isTerminal: false, isNursery: false, color: '#ff0000',
    },
    {
      id: 's13_sn', name: 'Supernova / Hypernova', phase: 'Supernova',
      description: 'Colapso masivo. Producción de r-process si hay materia expulsada.',
      timeSpan: 1, metallicityValue: 30, isCollisionNode: false, isTerminal: false, isNursery: false, color: '#ff0000',
    },
    {
      id: 's13_bh', name: 'Agujero Negro Estelar', phase: 'Black-Hole',
      description: 'Remanente colapsado. Horizonte de eventos. Masa ~5-10 M☉.',
      timeSpan: Infinity, metallicityValue: 0, isCollisionNode: true, isTerminal: true, isNursery: false, color: '#000000',
    },
  ],
};

// ============================================================
// EXPORTAR TODAS LAS SENDAS
// ============================================================
export const EVOLUTION_PATHS: EvolutionPath[] = [
  path2, path3, path4, path5, path6, path7,
  path8, path9, path10, path11, path12, path13,
];

// ============================================================
// TABLA DE COLISIONES ESTELARES
// ============================================================
export const COLLISION_RESULTS: CollisionResult[] = [
  // MS + MS = MS más masiva
  { objectA: 'MS-Baja', objectB: 'MS-Baja', result: 'MS-Solar', resultType: 'STAR', description: 'Fusión estelar: dos enanas rojas forman estrella tipo solar', metallicityReward: 2, targetPathId: 6, targetSquareIndex: 4, isTerminal: false },
  { objectA: 'MS-Solar', objectB: 'MS-Baja', result: 'MS-Solar', resultType: 'STAR', description: 'Acreción de masa: la estrella más masiva absorbe material', metallicityReward: 1, targetPathId: 6, targetSquareIndex: 4, isTerminal: false },
  { objectA: 'MS-Solar', objectB: 'MS-Solar', result: 'MS-Intermedia', resultType: 'STAR', description: 'Fusión estelar: formación de estrella de masa intermedia', metallicityReward: 3, targetPathId: 9, targetSquareIndex: 4, isTerminal: false },
  { objectA: 'MS-Intermedia', objectB: 'MS-Intermedia', result: 'MS-Alta', resultType: 'STAR', description: 'Fusión estelar: formación de estrella masiva', metallicityReward: 5, targetPathId: 10, targetSquareIndex: 4, isTerminal: false },
  { objectA: 'MS-Alta', objectB: 'MS-Alta', result: 'MS-MuyAlta', resultType: 'STAR', description: 'Fusión estelar: formación de hipergigante', metallicityReward: 8, targetPathId: 12, targetSquareIndex: 4, isTerminal: false },
  { objectA: 'MS-MuyAlta', objectB: 'MS-MuyAlta', result: 'Agujero Negro', resultType: 'BLACK_HOLE', description: 'Colapso directo: dos estrellas muy masivas colapsan a agujero negro', metallicityReward: 15, targetPathId: 13, targetSquareIndex: 7, isTerminal: true, specialEvent: 'BLACK_HOLE_FORMED' },

  // Gigantes Rojas
  { objectA: 'GiganteRoja', objectB: 'MS-Baja', result: 'GiganteRoja', resultType: 'STAR', description: 'Acreción de envoltura: la gigante absorbe la enana roja', metallicityReward: 3, isTerminal: false },
  { objectA: 'GiganteRoja', objectB: 'MS-Solar', result: 'AGB', resultType: 'STAR', description: 'Acreción intensa: formación de AGB por perturbación', metallicityReward: 4, isTerminal: false },
  { objectA: 'GiganteRoja', objectB: 'GiganteRoja', result: 'AGB', resultType: 'STAR', description: 'Fusión de gigantes: formación de AGB común', metallicityReward: 6, isTerminal: false },
  { objectA: 'GiganteRoja', objectB: 'NS', result: 'Thorne-Żytkow', resultType: 'EXOTIC', description: 'OBJETO EXÓTICO: estrella de neutrones dentro de gigante roja', metallicityReward: 50, isTerminal: false, specialEvent: 'THORNE_ZYTKOW' },

  // AGB
  { objectA: 'AGB', objectB: 'MS-Solar', result: 'Enana Blanca CO', resultType: 'COMPACT', description: 'Terminación rápida: la colisión acelera la eyección de envoltura', metallicityReward: 8, isTerminal: false },
  { objectA: 'AGB', objectB: 'AGB', result: 'Enana Blanca CO', resultType: 'COMPACT', description: 'Doble AGB: eyección común forma enana blanca masiva', metallicityReward: 12, isTerminal: false },

  // Enanas Blancas
  { objectA: 'WD-He', objectB: 'MS-Baja', result: 'Enana Blanca CO', resultType: 'COMPACT', description: 'Acreción: la enana blanca acreta material y evoluciona a CO', metallicityReward: 5, isTerminal: false },
  { objectA: 'WD-CO', objectB: 'MS-Solar', result: 'SUPERNOVA Ia', resultType: 'EXPLOSION', description: 'SUPERNOVA TIPO Ia: límite de Chandrasekhar superado', metallicityReward: 40, isTerminal: false, specialEvent: 'SUPERNOVA_IA' },
  { objectA: 'WD-CO', objectB: 'MS-Intermedia', result: 'SUPERNOVA Ia', resultType: 'EXPLOSION', description: 'SUPERNOVA TIPO Ia brillante: colisión con estrella intermedia', metallicityReward: 50, isTerminal: false, specialEvent: 'SUPERNOVA_IA' },
  { objectA: 'WD-CO', objectB: 'WD-CO', result: 'SUPERNOVA Ia', resultType: 'EXPLOSION', description: 'SUPERNOVA TIPO Ia: fusión de dos enanas blancas CO', metallicityReward: 80, isTerminal: false, specialEvent: 'SUPERNOVA_IA' },
  { objectA: 'WD-CO', objectB: 'NS', result: 'Supernova Iax', resultType: 'EXPLOSION', description: 'Supernova Tipo Iax: explosión termonuclear parcial', metallicityReward: 45, isTerminal: false, specialEvent: 'SUPERNOVA_IAX' },
  { objectA: 'WD-ONe', objectB: 'MS-Solar', result: 'Estrella de Neutrones', resultType: 'COMPACT', description: 'Colapso electrónico: la ONe colapsa a neutrones', metallicityReward: 18, isTerminal: false },
  { objectA: 'WD-ONe', objectB: 'WD-CO', result: 'Estrella de Neutrones', resultType: 'COMPACT', description: 'Fusión degenerada: formación de estrella de neutrones', metallicityReward: 25, isTerminal: false },

  // Estrellas de Neutrones
  { objectA: 'NS', objectB: 'MS-Solar', result: 'Thorne-Żytkow', resultType: 'EXOTIC', description: 'OBJETO EXÓTICO: NS capturada por gigante solar', metallicityReward: 50, isTerminal: false, specialEvent: 'THORNE_ZYTKOW' },
  { objectA: 'NS', objectB: 'MS-Intermedia', result: 'Thorne-Żytkow', resultType: 'EXOTIC', description: 'OBJETO EXÓTICO: NS dentro de estrella intermedia', metallicityReward: 60, isTerminal: false, specialEvent: 'THORNE_ZYTKOW' },
  { objectA: 'NS', objectB: 'NS', result: 'Kilonova → BH', resultType: 'BLACK_HOLE', description: 'KILONOVA: fusión de NS con producción de r-process y ondas gravitacionales', metallicityReward: 100, isTerminal: true, specialEvent: 'KILONOVA' },
  { objectA: 'NS', objectB: 'MS-Alta', result: 'Agujero Negro', resultType: 'BLACK_HOLE', description: 'Colapso: la NS absorbe la estrella masiva y supera límite TOV', metallicityReward: 80, isTerminal: true, specialEvent: 'BLACK_HOLE_FORMED' },
  { objectA: 'NS', objectB: 'WD-CO', result: 'Supernova Iax', resultType: 'EXPLOSION', description: 'Explosión termonuclear inducida por NS', metallicityReward: 45, isTerminal: false, specialEvent: 'SUPERNOVA_IAX' },

  // Agujeros Negros
  { objectA: 'BH', objectB: 'MS-Baja', result: 'Agujero Negro', resultType: 'BLACK_HOLE', description: 'Disrupción de marea: la enana roja es absorbida', metallicityReward: 10, isTerminal: false },
  { objectA: 'BH', objectB: 'MS-Solar', result: 'Agujero Negro', resultType: 'BLACK_HOLE', description: 'Disrupción de marea: acreción de estrella solar', metallicityReward: 15, isTerminal: false },
  { objectA: 'BH', objectB: 'WD-CO', result: 'Agujero Negro', resultType: 'BLACK_HOLE', description: 'Disrupción de enana blanca con flash de carbono', metallicityReward: 25, isTerminal: false },
  { objectA: 'BH', objectB: 'NS', result: 'Agujero Negro', resultType: 'BLACK_HOLE', description: 'Fusión NS-BH: agujero negro más masivo + ondas gravitacionales', metallicityReward: 120, isTerminal: false, specialEvent: 'GRAVITATIONAL_WAVES' },
  { objectA: 'BH', objectB: 'BH', result: 'Agujero Negro Supermasivo', resultType: 'BLACK_HOLE', description: 'COLAPSO GALÁCTICO: dos BH se fusionan. ¡El juego termina pronto!', metallicityReward: 200, isTerminal: true, specialEvent: 'GALACTIC_COLLAPSE' },

  // Wolf-Rayet
  { objectA: 'WR', objectB: 'MS-Solar', result: 'Supernova Ib', resultType: 'EXPLOSION', description: 'Supernova Tipo Ib: WR colapsa tras acretar envoltura', metallicityReward: 60, isTerminal: false, specialEvent: 'SUPERNOVA_IB' },
  { objectA: 'WR', objectB: 'NS', result: 'Agujero Negro', resultType: 'BLACK_HOLE', description: 'Colapso WR+NS: formación de agujero negro', metallicityReward: 90, isTerminal: true, specialEvent: 'BLACK_HOLE_FORMED' },
];

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

/**
 * Obtiene el tipo de objeto estelar basado en la senda y posición
 */
export function getStarObjectType(pathId: number, squareIndex: number): string {
  const path = EVOLUTION_PATHS.find(p => p.id === pathId);
  if (!path || squareIndex < 0 || squareIndex >= path.squares.length) {
    return 'Desconocido';
  }
  const square = path.squares[squareIndex];
  if (square.isNursery) return 'Nursery';
  if (square.phase === 'White-Dwarf') return square.name.includes('He') ? 'WD-He' : square.name.includes('ONe') ? 'WD-ONe' : 'WD-CO';
  if (square.phase === 'Neutron-Star') return 'NS';
  if (square.phase === 'Black-Hole') return 'BH';
  if (square.phase.includes('WR')) return 'WR';
  if (square.phase === 'Red-Supergiant' || square.phase === 'Bright-Giant') return 'GiganteRoja';
  if (square.phase === 'AGB' || square.phase === 'Super-AGB' || square.phase === 'TP-AGB') return 'AGB';
  if (square.phase === 'Main-Sequence' || square.phase === 'ZAMS') {
    if (path.mass <= 0.5) return 'MS-Baja';
    if (path.mass <= 2) return 'MS-Solar';
    if (path.mass <= 8) return 'MS-Intermedia';
    if (path.mass <= 25) return 'MS-Alta';
    return 'MS-MuyAlta';
  }
  return 'MS-Solar';
}

/**
 * Busca el resultado de colisión entre dos tipos de objetos
 */
export function findCollisionResult(typeA: string, typeB: string): CollisionResult | undefined {
  // Buscar en ambas direcciones
  let result = COLLISION_RESULTS.find(c =>
    (c.objectA === typeA && c.objectB === typeB) || (c.objectA === typeB && c.objectB === typeA)
  );
  return result;
}

/**
 * Obtiene la senda evolutiva por ID
 */
export function getPathById(id: number): EvolutionPath | undefined {
  return EVOLUTION_PATHS.find(p => p.id === id);
}

/**
 * Genera un nombre único para una estrella
 */
export function generateStarName(index: number): string {
  const greekLetters = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Zeta', 'Eta', 'Theta', 'Iota', 'Kappa'];
  const suffixes = ['Centauri', 'Orionis', 'Cygni', 'Lyrae', 'Aquilae', 'Scorpii', 'Tauri', 'Leonis', 'Virginis', 'Andromedae'];
  return `${greekLetters[index % greekLetters.length]} ${suffixes[index % suffixes.length]}`;
}
