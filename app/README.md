# Star Destiny Game 🌟

**Star Destiny** es un juego educativo de astrofísica que simula la evolución estelar a través de un tablero interactivo tipo parchís. El juego está fundamentado científicamente en modelos reales de evolución estelar, nucleosíntesis y colisiones de objetos compactos.

![Star Destiny](https://img.shields.io/badge/Astrophysics-Game-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38B2AC)

## 🎮 Características

- **12 sendas evolutivas** representando estrellas desde 0.1 M☉ (enanas rojas) hasta 25 M☉ (estrellas O masivas)
- **Sistema de colisiones estelares** basado en física real: Supernovas Ia, Kilonovas, Objetos Thorne-Żytkow, Agujeros Negros
- **Mecánica de metalicidad**: gana quien más elementos pesados produzca y libere al medio interestelar
- **Escala logarítmica de tiempo** para representar las vastas diferencias en tiempos de vida estelar
- **Tutorial interactivo** para aprender astrofísica mientras juegas
- **Tabla de colisiones** respaldada por artículos científicos (Chandrasekhar limit, TOV limit, r-process)

## 🚀 Cómo jugar

1. Añade 1-4 jugadores
2. Cada jugador comienza con 2 estrellas aleatorias
3. Lanza el dado para mover tus estrellas por las sendas evolutivas
4. Recolecta metalicidad al pasar por cada fase
5. ¡Cuidado con las colisiones! Pueden cambiar el destino de tus estrellas
6. Gana quien tenga más metalicidad al finalizar la era estelar

## 🔬 Fundamento Científico

### Sendas Evolutivas

| Senda | Masa (M☉) | Tipo Espectral | Casillas | Vida MS |
|-------|-----------|---------------|----------|---------|
| 2 | 0.1 | M7 V | 22 | ~3.2×10¹² años |
| 4 | 0.5 | M2 V | 18 | ~5.7×10¹⁰ años |
| 6 | 1.0 | G2 V (Sol) | 16 | ~1.0×10¹⁰ años |
| 8 | 2.0 | A5 V | 14 | ~1.8×10⁹ años |
| 10 | 5.0 | B5 V | 12 | ~1.8×10⁸ años |
| 12 | 15.0 | O8 V | 9 | ~1.1×10⁷ años |
| 13 | 25.0 | O5 V | 8 | ~3.2×10⁶ años |

### Colisiones Estelares

- **WD-CO + MS-Solar** → Supernova Tipo Ia (límite de Chandrasekhar: 1.4 M☉)
- **NS + NS** → Kilonova + BH (límite TOV: ~2.5 M☉) + proceso-r
- **NS + Gigante** → Objeto Thorne-Żytkow
- **BH + BH** → Colapso Galáctico

### Referencias Científicas

- Kroupa, P. (2001). "On the variation of the initial mass function." *MNRAS*, 322, 231.
- Kobayashi, C., et al. (2020). *ApJ*, 900, 179.
- Karakas, A. I. (2010). "Updated stellar yields from AGB models." *MNRAS*, 403, 1413.
- Woosley, S. E., & Heger, A. (2007). *Phys. Rep.*, 442, 269.
- Metzger, B. D. (2019). "Kilonovae." *Living Rev. Rel.*, 23, 1.

## 🛠️ Tecnologías

- **React 18** + **TypeScript**
- **Tailwind CSS** para estilos
- **shadcn/ui** componentes
- **Vite** para build

## 📦 Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/TU_USUARIO/star-destiny-game.git
cd star-destiny-game

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 📄 Licencia

MIT License - Proyecto educativo de astrofísica.

---

*"Somos polvo de estrellas, contemplando el universo."* — Carl Sagan 🌌
