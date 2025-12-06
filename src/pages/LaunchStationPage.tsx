import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { ERA_TIMELINE_DATA } from '../data/eraTimelineData';
import ImageGallery, { ImageMetadata } from '../components/ImageGallery';
import './LaunchStationPage.css';

const ERA_A_IMAGES: ImageMetadata[] = [
    {
        src: '/A.1.1.png',
        description: 'U.S. testing of German V2 Rockets',
        citation: 'Parissa DJangi. "The True Story of the Secret Program That Brought Nazi Scientists to the U.S." History. National Geographic, May 12, 2025. https://www.nationalgeographic.com/history/article/operation-paperclip.'
    },
    {
        src: '/A.1.2.png',
        description: 'German V2 Rocket Scientists',
        citation: 'Parissa DJangi. "The True Story of the Secret Program That Brought Nazi Scientists to the U.S." History. National Geographic, May 12, 2025. https://www.nationalgeographic.com/history/article/operation-paperclip.'
    },
    {
        src: '/A.3.1.png',
        description: 'Dr. William H. Pickering, Dr. James A. van Allen, Dr. Wenher von Braun holding model of Explorer 1 satellite',
        citation: 'Loff, Sarah. "Explorer 1 Overview - NASA." NASA, March 18, 2015. https://www.nasa.gov/history/explorer-1-overview/.'
    },
    {
        src: '/a.5.1.png',
        description: 'Astronaut Alan Shepard and the "Freedom 7"',
        citation: 'Neufeld, Michael. "First American in Space: The Flight of Alan B. Shepard." airandspace.si.edu, May 5, 2021. https://airandspace.si.edu/stories/editorial/first-american-space-flight-alan-b-shepard.'
    },
    {
        src: '/A.5.2.png',
        description: 'President Kennedy awarding Shepard with NASA\'s Distinguished Service Medal',
        citation: 'Neufeld, Michael. "First American in Space: The Flight of Alan B. Shepard." airandspace.si.edu, May 5, 2021. https://airandspace.si.edu/stories/editorial/first-american-space-flight-alan-b-shepard.'
    }
];

interface LaunchStationPageProps {
    onBlastOff: () => void;
    onBack?: () => void;
}

// Animated propulsion flame component
const PropulsionFlame = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
    const flameRef = useRef<THREE.Mesh>(null);
    const timeRef = useRef(0);
    
    useFrame(() => {
        if (!flameRef.current) return;
        timeRef.current += 0.1;
        
        const pulse = Math.sin(timeRef.current * 3) * 0.1 + 1;
        flameRef.current.scale.set(scale * pulse, scale * pulse * (0.8 + Math.sin(timeRef.current * 5) * 0.2), scale * pulse);
        
        const flicker = 0.9 + Math.random() * 0.1;
        if (flameRef.current.material instanceof THREE.MeshStandardMaterial) {
            flameRef.current.material.emissiveIntensity = 0.8 * flicker;
        }
    });
    
    return (
        <mesh ref={flameRef} position={position}>
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

// Launch pad platform
const LaunchPad = () => {
    return (
        <group>
            {/* Main launch platform */}
            <mesh position={[0, -3.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[2.5, 2.5, 0.4, 32]} />
                <meshStandardMaterial color="#666666" metalness={0.4} roughness={0.6} />
            </mesh>
            {/* Flame trench */}
            <mesh position={[0, -3.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1.8, 1.8, 0.6, 32]} />
                <meshStandardMaterial color="#222222" metalness={0.2} roughness={0.9} />
            </mesh>
            {/* Concrete base around launch pad */}
            <mesh position={[0, -3.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[2.5, 5, 32]} />
                <meshStandardMaterial color="#888888" metalness={0.2} roughness={0.8} />
            </mesh>
        </group>
    );
};

// Support towers
const SupportTower = ({ position }: { position: [number, number, number] }) => {
    return (
        <group position={position}>
            <mesh>
                <cylinderGeometry args={[0.08, 0.08, 10, 8]} />
                <meshStandardMaterial color="#999999" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Cross braces */}
            {[2, 4, 6, 8].map((y) => (
                <mesh key={y} position={[0, y - 5, 0]}>
                    <boxGeometry args={[0.3, 0.05, 0.05]} />
                    <meshStandardMaterial color="#777777" metalness={0.6} roughness={0.4} />
                </mesh>
            ))}
        </group>
    );
};

// SpaceX-style hangar/building
const SpaceXBuilding = () => {
    const textTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 280;
        canvas.height = 80;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 60px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SPACEX', 140, 40);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
    }, []);

    return (
        <group position={[0, -2, -12]}>
            {/* Main building structure - large hangar */}
            <mesh position={[0, 3, 0]}>
                <boxGeometry args={[8, 6, 4]} />
                <meshStandardMaterial color="#E8E8E8" metalness={0.1} roughness={0.7} />
            </mesh>
            {/* Roof */}
            <mesh position={[0, 6.5, 0]} rotation={[0, 0, 0]}>
                <boxGeometry args={[8.5, 0.3, 4.5]} />
                <meshStandardMaterial color="#D0D0D0" metalness={0.2} roughness={0.6} />
            </mesh>
            {/* Large hangar door opening */}
            <mesh position={[0, 2, 2.01]}>
                <boxGeometry args={[6, 5, 0.1]} />
                <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
            </mesh>
            {/* Side walls with windows */}
            {[-4.01, 4.01].map((x, i) => (
                <group key={`wall-${i}`}>
                    <mesh position={[x, 3, 0]}>
                        <boxGeometry args={[0.2, 6, 4]} />
                        <meshStandardMaterial color="#E0E0E0" metalness={0.1} roughness={0.7} />
                    </mesh>
                    {/* Windows */}
                    {[1, 3, 5].map((y) => (
                        <mesh key={`window-${y}`} position={[x, y, 0]}>
                            <boxGeometry args={[0.21, 0.8, 1.2]} />
                            <meshStandardMaterial color="#4A90E2" metalness={0.8} roughness={0.1} transparent opacity={0.7} />
                        </mesh>
                    ))}
                </group>
            ))}
            {/* SpaceX logo area with text */}
            <mesh position={[0, 5.5, 2.02]}>
                <boxGeometry args={[4, 1.2, 0.05]} />
                <meshStandardMaterial color="#000000" metalness={0.1} roughness={0.9} />
            </mesh>
            {/* SpaceX text sign using canvas texture */}
            <mesh position={[0, 5.5, 2.03]}>
                <planeGeometry args={[3.5, 1]} />
                <meshStandardMaterial map={textTexture} />
            </mesh>
            {/* Support columns at front */}
            {[-2.5, 2.5].map((x, i) => (
                <mesh key={`column-${i}`} position={[x, 0, 2]}>
                    <cylinderGeometry args={[0.15, 0.15, 6, 8]} />
                    <meshStandardMaterial color="#CCCCCC" metalness={0.3} roughness={0.6} />
                </mesh>
            ))}
        </group>
    );
};

// Earth-like terrain with grass and concrete areas
const EarthTerrain = () => {
    return (
        <group>
            {/* Main ground plane - grass/dirt */}
            <mesh position={[0, -3.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#6B8E23" roughness={0.9} />
            </mesh>
            {/* Concrete road/path leading to launch pad */}
            <mesh position={[0, -3.79, -5]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[8, 20]} />
                <meshStandardMaterial color="#808080" metalness={0.1} roughness={0.8} />
            </mesh>
            {/* Additional concrete areas around launch complex */}
            <mesh position={[-6, -3.79, -8]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[12, 8]} />
                <meshStandardMaterial color="#888888" metalness={0.1} roughness={0.8} />
            </mesh>
            <mesh position={[6, -3.79, -8]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[12, 8]} />
                <meshStandardMaterial color="#888888" metalness={0.1} roughness={0.8} />
            </mesh>
        </group>
    );
};

// USA Flag component
const USAFlag = ({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) => {
    return (
        <group position={position} scale={scale}>
            {/* Flag base/attachment */}
            <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.02, 0.02, 0.1]} />
                <meshStandardMaterial color="#8b7355" />
            </mesh>
            {/* Flag canvas - blue field */}
            <mesh position={[0.1, 0.05, 0]} rotation={[0, 0, 0]}>
                <planeGeometry args={[0.2, 0.14]} />
                <meshStandardMaterial color="#002868" />
            </mesh>
            {/* White stars area (simplified as white dots) */}
            {[0.02, 0.06, 0.10].map((x, i) => (
                [0.02, 0.06, 0.10].map((y, j) => (
                    <mesh key={`star-${i}-${j}`} position={[0.1 + x, 0.05 + y, 0.001]}>
                        <circleGeometry args={[0.008, 5]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                ))
            ))}
            {/* Red and white stripes */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <mesh key={`stripe-${i}`} position={[0.3, 0.05 - 0.02 * i, 0.001]}>
                    <planeGeometry args={[0.2, 0.02]} />
                    <meshStandardMaterial color={i % 2 === 0 ? '#b22234' : '#ffffff'} />
                </mesh>
            ))}
        </group>
    );
};

// Fallback procedural starship model - BIGGER, more realistic rocket
interface StarshipProps {
    position?: { x: number; y: number; z: number };
    showFlames?: boolean;
}

const FallbackStarship = ({ position = { x: 0, y: 0, z: 0 }, showFlames = false }: StarshipProps) => {
    const shipRef = useRef<THREE.Group>(null);
    
    useFrame(() => {
        if (shipRef.current) {
            shipRef.current.position.set(position.x, position.y, position.z);
        }
    });
    
    return (
        <group ref={shipRef} rotation={[0, 0, 0]} scale={1.0}>
            {/* Main body - white upper stage (BIGGER) */}
            <mesh position={[0, 3, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 6, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.3} />
            </mesh>
            
            {/* Orange core stage (like SLS/Artemis) - BIGGER */}
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[0.45, 0.45, 4, 32]} />
                <meshStandardMaterial color="#ff8c42" metalness={0.1} roughness={0.5} />
            </mesh>
            
            {/* Nose cone - BIGGER */}
            <mesh position={[0, 6, 0]}>
                <coneGeometry args={[0.4, 1.5, 16]} />
                <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.3} />
            </mesh>
            
            {/* Side boosters (white) - BIGGER */}
            {[-0.6, 0.6].map((x, i) => (
                <group key={`booster-${i}`}>
                    <mesh position={[x, 0.5, 0]}>
                        <cylinderGeometry args={[0.18, 0.18, 4.5, 16]} />
                        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.3} />
                    </mesh>
                </group>
            ))}
            
            {/* USA Flag on the rocket body - positioned on white section */}
            <USAFlag position={[0.42, 2.5, 0]} scale={0.6} />
            
            {/* Only show flames when blasting off */}
            {showFlames && (
                <>
                    <PropulsionFlame position={[-0.6, -2.5, 0]} scale={1.2} />
                    <PropulsionFlame position={[0.6, -2.5, 0]} scale={1.2} />
                    <PropulsionFlame position={[0, -2.5, 0]} scale={1.8} />
                </>
            )}
        </group>
    );
};

const UNITY_MODEL_PATH = '/starship.glb';

interface UnityStarshipProps {
    position?: { x: number; y: number; z: number };
    showFlames?: boolean;
}

const UnityStarship = ({ position = { x: 0, y: 0, z: 0 }, showFlames = false }: UnityStarshipProps & { showFlames?: boolean }) => {
    const { scene } = useGLTF(UNITY_MODEL_PATH);
    const shipRef = useRef<THREE.Group>(null);
    
    const clonedScene = useMemo(() => scene.clone(), [scene]);
    
    useFrame(() => {
        if (shipRef.current) {
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
            {showFlames && <PropulsionFlame position={[0, 0, -2]} scale={1.0} />}
        </group>
    );
};

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

interface ModelLoaderProps {
    position: { x: number; y: number; z: number };
    showFlames?: boolean;
}

const ModelLoader = ({ position, showFlames = false }: ModelLoaderProps) => {
    return (
        <ModelErrorBoundary fallback={<FallbackStarship position={position} showFlames={showFlames} />}>
            <Suspense fallback={<FallbackStarship position={position} showFlames={showFlames} />}>
                <UnityStarship position={position} showFlames={showFlames} />
            </Suspense>
        </ModelErrorBoundary>
    );
};

const LaunchStationPage = ({ onBlastOff, onBack }: LaunchStationPageProps) => {
    const [countdown, setCountdown] = useState(3);
    const [isCountdownActive, setIsCountdownActive] = useState(false);
    const [isBlastingOff, setIsBlastingOff] = useState(false);
    const [shipPosition, setShipPosition] = useState({ x: 0, y: -1.2, z: 0 }); // Start on launch pad

    // Countdown timer - 3 seconds
    useEffect(() => {
        if (!isCountdownActive) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsBlastingOff(true);
                    // Navigate to Moon page after blast off animation
                    setTimeout(() => {
                        onBlastOff();
                    }, 2000); // 2 seconds for blast off animation
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isCountdownActive, onBlastOff]);

    const handleBlastOff = () => {
        if (!isCountdownActive) {
            setIsCountdownActive(true);
            setCountdown(3);
        }
    };

    // Blast off animation - rocket flies to top of screen
    useEffect(() => {
        if (!isBlastingOff) return;

        let rafId: number;
        const start = performance.now();
        const duration = 2000; // 2 seconds

        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ship flies upward off the top of the screen
            setShipPosition({
                x: 0,
                y: -1.2 + progress * 50, // Move from launch pad to top of screen
                z: 0
            });

            if (progress < 1) {
                rafId = requestAnimationFrame(animate);
            }
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [isBlastingOff]);

    return (
        <section className="launch-station">
            <div className="launch-station__viewer">
                <Canvas>
                    <color attach="background" args={['#87CEEB']} />
                    <fog attach="fog" args={['#B0E0E6', 25, 60]} />
                    <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
                    <ambientLight intensity={0.85} />
                    <directionalLight position={[10, 12, 5]} intensity={1.8} color="#FFFAE6" castShadow />
                    <directionalLight position={[-5, 8, -5]} intensity={0.4} color="#ffffff" />
                    <directionalLight position={[0, 5, 10]} intensity={0.3} color="#E0F6FF" />
                    
                    {/* Earth-like terrain */}
                    <EarthTerrain />
                    
                    {/* SpaceX building in background */}
                    <SpaceXBuilding />
                    
                    {/* Ground/Launch pad */}
                    <LaunchPad />
                    
                    {/* Support towers */}
                    <SupportTower position={[-3, 0, -1]} />
                    <SupportTower position={[3, 0, -1]} />
                    
                    {/* Additional infrastructure - fuel tanks in background */}
                    <mesh position={[-8, 1, -10]}>
                        <cylinderGeometry args={[1, 1, 4, 16]} />
                        <meshStandardMaterial color="#C0C0C0" metalness={0.6} roughness={0.3} />
                    </mesh>
                    <mesh position={[8, 1, -10]}>
                        <cylinderGeometry args={[1, 1, 4, 16]} />
                        <meshStandardMaterial color="#C0C0C0" metalness={0.6} roughness={0.3} />
                    </mesh>
                    
                    {/* Rocket - stationary on launch pad (BIGGER) */}
                    <ModelLoader position={shipPosition} showFlames={isBlastingOff} />
                    
                    <OrbitControls 
                        enablePan={false} 
                        maxDistance={25} 
                        minDistance={10}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 2.1}
                    />
                </Canvas>
            </div>
            <div className="launch-station__sidebar">
                {onBack && (
                    <button className="ghost-btn launch-station__back-btn" onClick={onBack}>
                        ← Back
                    </button>
                )}
                <div>
                    <p className="launch-station__eyebrow">Space Cadet Academy</p>
                    <h2>ERA A — Dawn of Spaceflight</h2>
                    <p className="launch-station__years">1945–1961</p>
                    <p className="launch-station__theme">The United States jump starts a Rocket Program and enters The Space Race</p>
                </div>
                <div className="launch-station__content">
                    <h3>ERA A Timeline</h3>
                    <div className="era-a-sidebar-timeline">
                        {(() => {
                            const era1Data = ERA_TIMELINE_DATA.find(data => data.eraId === 1);
                            if (!era1Data) return null;
                            return era1Data.timelineItems.map((item, index) => (
                                <div key={index} className="era-a-sidebar-timeline__item">
                                    <div className="era-a-sidebar-timeline__header">
                                        <span className="era-a-sidebar-timeline__number">{index + 1}</span>
                                        <span className="era-a-sidebar-timeline__year">{item.year}</span>
                                    </div>
                                    <div className="era-a-sidebar-timeline__card">
                                        <h4 className="era-a-sidebar-timeline__title">{item.title}</h4>
                                        {item.whatHappened && (
                                            <div className="era-a-sidebar-timeline__section">
                                                <p className="era-a-sidebar-timeline__text">{item.whatHappened}</p>
                                            </div>
                                        )}
                                        {item.americanSignificance && (
                                            <div className="era-a-sidebar-timeline__section">
                                                <p className="era-a-sidebar-timeline__label">American Significance:</p>
                                                <p className="era-a-sidebar-timeline__text">{item.americanSignificance}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
                <div className="launch-station__gallery">
                    <ImageGallery images={ERA_A_IMAGES} />
                </div>
                <div className="launch-station__sequence">
                    <p className="launch-station__badge-text">
                        {isBlastingOff ? '🚀 LAUNCHING! 🚀' : isCountdownActive ? `Launch in ${countdown}s` : 'Blast Off to earn your ERA A badge!'}
                    </p>
                    {!isCountdownActive && !isBlastingOff && (
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
                </div>
            </div>
        </section>
    );
};

export default LaunchStationPage;

