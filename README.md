# Space Race: Flight Through History

A web-based space flight game that takes you through all 3 eras of the Space Race, from the foundations in 1945 to the future of space exploration.

## Features

- **3 Historical Eras**: Journey through the complete Space Race timeline
- **Beautiful Spaceship**: Custom-designed ship matching the yellow/gold and dark blue color scheme
- **Smooth Controls**: Use Arrow Keys or WASD to navigate
- **Dynamic Gameplay**: Avoid obstacles as you travel through each era
- **Educational Content**: Learn about major Space Race accomplishments in each era
- **Modern Tech Stack**: Built with TypeScript and Vite

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## Game Controls

- **Arrow Keys** or **WASD**: Control the spaceship
  - ↑/W: Move up
  - ↓/S: Move down
  - ←/A: Move left
  - →/D: Move right

## Game Eras

1. **ERA 1 — Foundations (1945-1957)**: ICBM development, V-2 scientists
2. **ERA 2 — Dawn of Spaceflight (1957-1961)**: Sputnik, Gagarin, Explorer 1
3. **ERA 3 — Moon Race & Human Spaceflight (1961-1969)**: Apollo 11, first spacewalk
4. **ERA 4 — Space Stations & Shuttle Era (1970-1991)**: Skylab, Mir, Space Shuttle
5. **ERA 5 — International Cooperation (1991-2006)**: ISS agreement and assembly
6. **ERA 6 — Rise of Commercial Space (2006-2015)**: SpaceX Falcon 1, COTS program
7. **ERA 7 — Corporate Conquest Era (2015-Present)**: Falcon 9, Crew Dragon, Starship
8. **ERA 8 — The New Space Race (2020s-Future)**: Artemis, Mars colonization

## Color Scheme

The game uses a vibrant yellow/gold and dark blue color scheme matching the spaceship design:
- Gold (#FFD700): Primary accent color
- Dark Gold (#FFA500): Secondary accent
- Dark Blue (#1a237e): Primary background and ship body
- Yellow (#FFC107): Highlight color

## Technology Stack

- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and dev server
- **HTML5 Canvas**: Game rendering
- **CSS3**: Modern styling with gradients and animations

## Project Structure

```
space-race/
├── src/
│   ├── game/
│   │   ├── Game.ts          # Main game engine
│   │   ├── Spaceship.ts     # Spaceship class
│   │   ├── InputHandler.ts  # Keyboard input handling
│   │   ├── Obstacle.ts      # Obstacle objects
│   │   └── EraData.ts       # Historical era data
│   └── main.ts              # Entry point
├── styles/
│   └── main.css             # Styling
├── index.html               # HTML structure
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── README.md                # This file
```

Enjoy your journey through the Space Race! 🚀















