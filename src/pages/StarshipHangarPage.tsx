import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, useGLTF } from '@react-three/drei';
import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { ERA_DATA } from '../data/eras';
import './StarshipHangarPage.css';

interface StarshipHangarPageProps {
    onMissionMap: () => void;
    onEraStart?: (eraId: number) => void;
}

// Animated propulsion flame component - teardrop-shaped orange flames
const PropulsionFlame = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
    const flameRef = useRef<THREE.Mesh>(null);
    const timeRef = useRef(0);
    
    useFrame(() => {
        if (!flameRef.current) return;
        timeRef.current += 0.1;
        
        // Animate flame size and intensity
        const pulse = Math.sin(timeRef.current * 3) * 0.1 + 1;
        flameRef.current.scale.set(scale * pulse, scale * pulse * (0.8 + Math.sin(timeRef.current * 5) * 0.2), scale * pulse);
        
        // Flicker effect
        const flicker = 0.9 + Math.random() * 0.1;
        if (flameRef.current.material instanceof THREE.MeshStandardMaterial) {
            flameRef.current.material.emissiveIntensity = 0.8 * flicker;
        }
    });
    
    return (
        <mesh ref={flameRef} position={position}>
            {/* Teardrop shape - wider at top, narrows to point at bottom */}
            <coneGeometry args={[0.2 * scale, 1.0 * scale, 16]} />
            <meshStandardMaterial
                color="#ff6600"
                transparent
                opacity={0.95}
                emissive="#ff4400"
                emissiveIntensity={0.9}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// Fallback procedural starship model - LEGO Ninjago-style spaceship with controls
interface StarshipProps {
    roll: number;
    position?: { x: number; y: number; z: number };
}

const FallbackStarship = ({ roll = 0, position = { x: 0, y: 0, z: 0 } }: StarshipProps) => {
    const shipRef = useRef<THREE.Group>(null);
    
    useFrame(() => {
        if (shipRef.current) {
            // Smooth rotation interpolation for left/right tilt
            shipRef.current.rotation.z = THREE.MathUtils.lerp(shipRef.current.rotation.z, roll, 0.1);
            // Update position for blast off animation
            shipRef.current.position.set(position.x, position.y, position.z);
        }
    });
    
    return (
        <group ref={shipRef} rotation={[0, 0, 0]}>
            {/* Main golden-yellow body - tall vertical */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.4, 3.5, 0.8]} />
                <meshStandardMaterial color="#ffd700" metalness={0.3} roughness={0.6} />
            </mesh>
            
            {/* Top nose cone - pyramidal/faceted */}
            <mesh position={[0, 1.8, 0]}>
                <coneGeometry args={[0.4, 0.8, 8]} />
                <meshStandardMaterial color="#ffd700" metalness={0.3} roughness={0.6} />
            </mesh>
            
            {/* Two small light green antennae on sides of cone */}
            {[-0.25, 0.25].map((x, i) => (
                <mesh key={`antenna-${i}`} position={[x, 2.0, 0.2]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color="#90ee90" emissive="#90ee90" emissiveIntensity={0.5} />
                </mesh>
            ))}
            
            {/* Large dark olive-green circular cockpit window */}
            <mesh position={[0, 1.2, 0.15]}>
                <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
                <meshStandardMaterial 
                    color="#556b2f" 
                    metalness={0.8} 
                    roughness={0.2}
                />
            </mesh>
            
            {/* Light blue dot in center of cockpit */}
            <mesh position={[0, 1.2, 0.18]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color="#87ceeb" emissive="#87ceeb" emissiveIntensity={0.8} />
            </mesh>
            
            {/* Horizontal dark purple stripe below cockpit */}
            <mesh position={[0, 0.8, 0.1]}>
                <boxGeometry args={[0.45, 0.1, 0.85]} />
                <meshStandardMaterial color="#4b0082" metalness={0.4} roughness={0.5} />
            </mesh>
            
            {/* Large black rectangular panel */}
            <mesh position={[0, 0.3, 0.1]}>
                <boxGeometry args={[0.42, 0.8, 0.82]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
            </mesh>
            
            {/* Two dark purple triangular/trapezoidal fins extending from sides */}
            {[-0.5, 0.5].map((x, i) => (
                <mesh 
                    key={`fin-${i}`}
                    position={[x, -0.3, 0]} 
                    rotation={[0, 0, Math.PI / 8 * (i === 0 ? 1 : -1)]}
                >
                    <boxGeometry args={[0.15, 1.2, 0.1]} />
                    <meshStandardMaterial color="#4b0082" metalness={0.4} roughness={0.5} />
                </mesh>
            ))}
            
            {/* Three orange teardrop-shaped flames at bottom - central one larger */}
            <PropulsionFlame position={[-0.2, -2.2, 0]} scale={0.6} />
            <PropulsionFlame position={[0.2, -2.2, 0]} scale={0.6} />
            <PropulsionFlame position={[0, -2.2, 0]} scale={0.9} />
        </group>
    );
};

// Path to your Unity Asset Store starship model
// Place your exported .glb or .gltf file in the /public folder
// Update this path to match your actual file name
const UNITY_MODEL_PATH = '/starship.glb';

// Component to load and display the Unity Asset Store starship
interface UnityStarshipProps {
    roll: number;
    position?: { x: number; y: number; z: number };
}

const UnityStarship = ({ roll = 0, position = { x: 0, y: 0, z: 0 } }: UnityStarshipProps) => {
    // Load the GLB/GLTF model from the public folder
    // This will be the primary/default model
    const { scene } = useGLTF(UNITY_MODEL_PATH);
    const shipRef = useRef<THREE.Group>(null);
    
    // Clone the scene to avoid issues with multiple instances
    const clonedScene = useMemo(() => scene.clone(), [scene]);
    
    useFrame(() => {
        if (shipRef.current) {
            // Smooth rotation interpolation for left/right tilt
            shipRef.current.rotation.z = THREE.MathUtils.lerp(shipRef.current.rotation.z, roll, 0.1);
            // Update position for blast off animation
            shipRef.current.position.set(position.x, position.y, position.z);
        }
    });
    
    return (
        <group ref={shipRef} rotation={[0, 0, 0]}>
            <primitive 
                object={clonedScene} 
                scale={1} 
                position={[0, 0, 0]}
                rotation={[0, 0, 0]}
            />
            {/* Add propulsion flames to Unity model too */}
            <PropulsionFlame position={[0, 0, -2]} scale={1.0} />
        </group>
    );
};

// Preload the Unity model for better performance (optional)
// Uncomment the line below once you've added your model file to preload it
// useGLTF.preload(UNITY_MODEL_PATH);

// Error Boundary for catching model loading errors
class ModelErrorBoundary extends Component<
    { children: React.ReactNode; fallback: React.ReactNode },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.warn('Unity starship model failed to load, using procedural fallback:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

// Model loader - tries Unity model first, falls back to procedural model if it fails
interface ModelLoaderProps {
    roll: number;
    position: { x: number; y: number; z: number };
}

const ModelLoader = ({ roll, position }: ModelLoaderProps) => {
    // Try to load Unity model first (primary/default)
    // If it fails or doesn't exist, automatically falls back to procedural model
    return (
        <ModelErrorBoundary fallback={<FallbackStarship roll={roll} position={position} />}>
            <Suspense fallback={<FallbackStarship roll={roll} position={position} />}>
                <UnityStarship roll={roll} position={position} />
            </Suspense>
        </ModelErrorBoundary>
    );
};

const FUEL_DURATION = 8500;

const StarshipHangarPage = ({ onMissionMap, onEraStart }: StarshipHangarPageProps) => {
    const [progress, setProgress] = useState(0);
    const [astronautReady, setAstronautReady] = useState(false);
    const [roll, setRoll] = useState(0); // Left/Right tilt (A/D or Left/Right arrows)
    const [countdown, setCountdown] = useState(10);
    const [isBlastingOff, setIsBlastingOff] = useState(false);
    const [isCountdownActive, setIsCountdownActive] = useState(false);
    const [shipPosition, setShipPosition] = useState({ x: 0, y: 0, z: 0 });

    // Keyboard controls for ship tilting left and right
    useEffect(() => {
        const keys: { [key: string]: boolean } = {};
        
        const handleKeyDown = (e: KeyboardEvent) => {
            keys[e.key.toLowerCase()] = true;
            updateRotation();
        };
        
        const handleKeyUp = (e: KeyboardEvent) => {
            keys[e.key.toLowerCase()] = false;
            updateRotation();
        };
        
        const updateRotation = () => {
            let newRoll = 0;
            
            // Roll controls (left/right tilt)
            if (keys['a'] || keys['arrowleft']) {
                newRoll = 0.3; // Tilt left
            } else if (keys['d'] || keys['arrowright']) {
                newRoll = -0.3; // Tilt right
            }
            
            setRoll(newRoll);
        };
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    useEffect(() => {
        let rafId: number;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const pct = Math.min(100, (elapsed / FUEL_DURATION) * 100);
            setProgress(pct);
            if (elapsed < FUEL_DURATION) {
                rafId = requestAnimationFrame(tick);
            } else {
                setAstronautReady(true);
            }
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, []);

    // Countdown timer - starts when blast off button is clicked
    useEffect(() => {
        if (!isCountdownActive) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsBlastingOff(true);
                    // Navigate to Era 1 timeline after blast off animation
                    setTimeout(() => {
                        if (onEraStart) {
                            onEraStart(1);
                        } else {
                            onMissionMap();
                        }
                    }, 1500); // 1.5 seconds for faster blast off animation
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isCountdownActive, onMissionMap]);

    const handleBlastOff = () => {
        if (astronautReady && !isCountdownActive) {
            setIsCountdownActive(true);
            setCountdown(10);
        }
    };

    // Blast off animation - faster
    useEffect(() => {
        if (!isBlastingOff) return;

        let rafId: number;
        const start = performance.now();
        const duration = 1500; // 1.5 seconds for faster animation

        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ship flies upward off the top of the screen
            setShipPosition({
                x: 0,
                y: progress * 50, // Move up significantly to go off top of screen
                z: 0  // No forward/backward movement, just upward
            });

            if (progress < 1) {
                rafId = requestAnimationFrame(animate);
            }
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [isBlastingOff]);

    const fuelingStatus = useMemo(() => {
        if (progress < 33) return 'Staging cryogenic fuel lines';
        if (progress < 66) return 'Main tanks pressurizing & avionics checks';
        if (progress < 100) return 'Astronaut securing umbilicals';
        if (astronautReady && !isCountdownActive) return 'Fueling complete — Astronauts aboard — Systems are a go';
        if (isCountdownActive && countdown > 7) return 'Fueling complete';
        if (isCountdownActive && countdown > 4) return 'Astronauts boarded';
        if (isCountdownActive && countdown > 0) return 'Systems are a go';
        return 'Launching...';
    }, [progress, astronautReady, countdown, isCountdownActive]);

    return (
        <section className="hangar">
            <div className="hangar__viewer">
                <Canvas>
                    <color attach="background" args={['#01030b']} />
                    <PerspectiveCamera makeDefault position={[0, 2, 5]} />
                    <ambientLight intensity={0.45} />
                    <directionalLight position={[6, 6, 6]} intensity={1.2} />
                    <pointLight position={[-6, -4, -6]} intensity={0.8} color="#4f9dff" />
                    <ModelLoader roll={roll} position={shipPosition} />
                    <OrbitControls enablePan={false} maxDistance={12} minDistance={4} />
                    <Stars radius={80} depth={50} count={800} factor={4} saturation={0} />
                </Canvas>
            </div>
            <div className="hangar__sidebar">
                <div>
                    <p className="hangar__eyebrow">Hangar log</p>
                    <h2>Star Sparrow 1</h2>
                    <p>
                        Explore the Star Sparrow 1 in 3D! <strong>Drag</strong> to rotate the view around the ship, 
                        <strong> scroll</strong> to zoom in and out, and use <strong>A/D</strong> or 
                        <strong> Left/Right Arrow keys</strong> to tilt the ship left and right. Test all the controls 
                        to see the ship from every angle and watch the animated propulsion flames!
                    </p>
                </div>
                <div className="hangar__sequence">
                    <div className="hangar__progress">
                        <div className="hangar__progress-fill" style={{ width: `${progress}%` }} />
                    </div>
                    <p className="hangar__status">{fuelingStatus}</p>
                    <p className="astronaut__caption">
                        {astronautReady ? (isBlastingOff ? 'Launching...' : isCountdownActive ? `Launch in ${countdown}s` : 'All systems ready!') : 'Astronaut preparing to board.'}
                    </p>
                    {astronautReady && !isCountdownActive && !isBlastingOff && (
                        <button
                            className="primary-btn"
                            onClick={handleBlastOff}
                        >
                            BLAST OFF
                        </button>
                    )}
                    {isCountdownActive && !isBlastingOff && (
                        <div className="countdown-display">
                            {countdown}
                        </div>
                    )}
                    {isBlastingOff && (
                        <div className="launching-display">
                            🚀 LAUNCHING! 🚀
                        </div>
                    )}
                </div>
                <div className="hangar__timeline">
                    <p className="hangar__eyebrow">Mission Map</p>
                    <div className="hangar__timeline-list">
                        {ERA_DATA.map((era) => (
                            <div key={era.id} className="hangar__timeline-item">
                                <span className="hangar__timeline-number">{era.id}</span>
                                <div className="hangar__timeline-content">
                                    <span className="hangar__timeline-title">{era.title}</span>
                                    <span className="hangar__timeline-years">{era.years}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StarshipHangarPage;


