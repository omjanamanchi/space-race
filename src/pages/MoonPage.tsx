import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, useGLTF } from '@react-three/drei';
import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { ERA_TIMELINE_DATA } from '../data/eraTimelineData';
import ImageGallery, { ImageMetadata } from '../components/ImageGallery';
import './MoonPage.css';

const ERA_B_IMAGES: ImageMetadata[] = [
    {
        src: '/B.2.1.png',
        description: '"Earthrise" photograph',
        citation: 'NASA. "Apollo 8: Earthrise - NASA." NASA, December 23, 2020. https://www.nasa.gov/image-article/apollo-8-earthrise/.'
    },
    {
        src: '/B.4.1.png',
        description: 'International Space Station',
        citation: 'NASA ON THE AIR. "30 Years of International Collaboration on the ISS," November 4, 2023. https://nasaontheair.wordpress.com/2023/11/04/55-years-of-international-collaboration-on-the-iss/.'
    },
    {
        src: '/B.5.1.png',
        description: 'Mr. Dennis Tito suited up for his space mission',
        citation: 'Wall, Mike. "First Space Tourist: How a U.S. Millionaire Bought a Ticket to Orbit." Space.com. Space, April 27, 2011. https://www.space.com/11492-space-tourism-pioneer-dennis-tito.html.'
    },
    {
        videoUrl: 'https://www.youtube.com/watch?v=mKAIL8DDemg',
        description: 'Space tourist Dennis Tito speaks about his experience',
        citation: 'YouTube video: Space tourist Dennis Tito speaks'
    }
];

interface MoonPageProps {
    onContinue: () => void;
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

// USA Flag component (same as ERA A)
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

// Fallback procedural starship model - Same as ERA A rocket
interface StarshipProps {
    position?: { x: number; y: number; z: number };
    rotation?: { x: number; y: number; z: number };
    showFlames?: boolean;
}

const FallbackStarship = ({ position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, showFlames = true }: StarshipProps) => {
    const shipRef = useRef<THREE.Group>(null);
    
    useFrame(() => {
        if (shipRef.current) {
            shipRef.current.position.set(position.x, position.y, position.z);
            shipRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
        }
    });
    
    return (
        <group ref={shipRef} rotation={[0, 0, 0]} scale={0.7}>
            {/* Main body - white upper stage */}
            <mesh position={[0, 3, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 6, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.3} />
            </mesh>
            
            {/* Orange core stage (like SLS/Artemis) */}
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[0.45, 0.45, 4, 32]} />
                <meshStandardMaterial color="#ff8c42" metalness={0.1} roughness={0.5} />
            </mesh>
            
            {/* Nose cone */}
            <mesh position={[0, 6, 0]}>
                <coneGeometry args={[0.4, 1.5, 16]} />
                <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.3} />
            </mesh>
            
            {/* Side boosters (white) */}
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
            
            {/* Show flames when flying past Moon */}
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

// USA Flag on Moon surface (positioned on top like the alien in the image) - BIGGER and more visible
const MoonFlag = ({ show }: { show: boolean }) => {
    if (!show) return null;
    
    // Moon is at [2, 0, -5] with scale 1.8, radius 1.8
    // Position flag on top surface of moon - made bigger for visibility
    return (
        <group position={[2, 1.85, -5]}>
            {/* Flag pole - taller and thicker */}
            <mesh position={[0, 0.6, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 1.2, 8]} />
                <meshStandardMaterial color="#8b7355" metalness={0.3} roughness={0.7} />
            </mesh>
            {/* Flag - blue field - MUCH bigger */}
            <mesh position={[0.15, 1.0, 0]} rotation={[0, -0.5, 0]}>
                <planeGeometry args={[0.5, 0.35]} />
                <meshStandardMaterial color="#002868" emissive="#001850" emissiveIntensity={0.3} />
            </mesh>
            {/* Stars on flag (simplified) - bigger */}
            {[0, 0.08, 0.16].map((x, i) => (
                [0.08, 0.18, 0.28].map((y, j) => (
                    <mesh key={`star-${i}-${j}`} position={[0.15 + x, 1.0 + y, 0.001]} rotation={[0, -0.5, 0]}>
                        <circleGeometry args={[0.012, 5]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} />
                    </mesh>
                ))
            ))}
            {/* Red and white stripes - bigger */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <mesh key={`stripe-${i}`} position={[0.65, 1.0 - 0.05 * i, 0.001]} rotation={[0, -0.5, 0]}>
                    <planeGeometry args={[0.3, 0.05]} />
                    <meshStandardMaterial 
                        color={i % 2 === 0 ? '#b22234' : '#ffffff'} 
                        emissive={i % 2 === 0 ? '#8b0000' : '#ffffff'}
                        emissiveIntensity={i % 2 === 0 ? 0.2 : 0.1}
                    />
                </mesh>
            ))}
        </group>
    );
};

// Moon model - reduced size for better proportions
const Moon = () => {
    const moonRef = useRef<THREE.Mesh>(null);
    
    useFrame(() => {
        if (moonRef.current) {
            moonRef.current.rotation.y += 0.001;
        }
    });
    
    return (
        <mesh ref={moonRef} position={[2, 0, -5]} scale={[1.8, 1.8, 1.8]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
                color="#c0c0c0" 
                roughness={0.9}
                metalness={0.1}
            />
        </mesh>
    );
};

const UNITY_MODEL_PATH = '/starship.glb';

interface UnityStarshipProps {
    position?: { x: number; y: number; z: number };
    rotation?: { x: number; y: number; z: number };
    showFlames?: boolean;
}

const UnityStarship = ({ position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, showFlames = true }: UnityStarshipProps) => {
    const { scene } = useGLTF(UNITY_MODEL_PATH);
    const shipRef = useRef<THREE.Group>(null);
    
    const clonedScene = useMemo(() => scene.clone(), [scene]);
    
    useFrame(() => {
        if (shipRef.current) {
            shipRef.current.position.set(position.x, position.y, position.z);
            shipRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
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
    rotation?: { x: number; y: number; z: number };
    showFlames?: boolean;
}

const ModelLoader = ({ position, rotation = { x: 0, y: 0, z: 0 }, showFlames = true }: ModelLoaderProps) => {
    return (
        <ModelErrorBoundary fallback={<FallbackStarship position={position} rotation={rotation} showFlames={showFlames} />}>
            <Suspense fallback={<FallbackStarship position={position} rotation={rotation} showFlames={showFlames} />}>
                <UnityStarship position={position} rotation={rotation} showFlames={showFlames} />
            </Suspense>
        </ModelErrorBoundary>
    );
};

const MoonPage = ({ onContinue, onBack }: MoonPageProps) => {
    const [flagPlanted, setFlagPlanted] = useState(false);
    const [isBoostingAway, setIsBoostingAway] = useState(false);
    // Rocket positioned to fly past the Moon - lower on screen to show full rocket
    const [shipPosition, setShipPosition] = useState({ x: -1.5, y: -0.5, z: 0 }); // Lower position to show full rocket
    const [shipRotation, setShipRotation] = useState({ x: 0, y: -0.2, z: 0.1 }); // Slight angle for flight

    const handlePlantFlag = () => {
        if (!flagPlanted) {
            setFlagPlanted(true);
            // After flag is planted, wait a moment then boost away
            setTimeout(() => {
                setIsBoostingAway(true);
                // Navigate to Mars page after boost away animation
                setTimeout(() => {
                    onContinue();
                }, 2000);
            }, 1500);
        }
    };

    // Boost away animation - rocket blasts off to top left off screen
    useEffect(() => {
        if (!isBoostingAway) return;

        let rafId: number;
        const start = performance.now();
        const duration = 2000; // 2 seconds

        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ship moves to top left off screen
            setShipPosition({
                x: -1.5 - progress * 12, // Move left
                y: -0.5 + progress * 15, // Move up
                z: 0 - progress * 8 // Move forward/away
            });

            // Rotate rocket to point toward top left
            setShipRotation({
                x: 0,
                y: -0.2 - progress * 0.3,
                z: 0.1 + progress * 0.2
            });

            if (progress < 1) {
                rafId = requestAnimationFrame(animate);
            }
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [isBoostingAway]);

    return (
        <section className="moon-page">
            <div className="moon-page__viewer">
                <Canvas>
                    <color attach="background" args={['#000011']} />
                    <PerspectiveCamera makeDefault position={[0, 0.5, 10]} fov={60} />
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 5, 5]} intensity={1.5} />
                    <pointLight position={[-5, 3, -5]} intensity={0.5} color="#ffffff" />
                    <ModelLoader position={shipPosition} rotation={shipRotation} showFlames={true} />
                    <Moon />
                    <MoonFlag show={flagPlanted} />
                    <OrbitControls enablePan={false} maxDistance={18} minDistance={8} />
                    <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} />
                </Canvas>
            </div>
            <div className="moon-page__sidebar">
                {onBack && (
                    <button className="ghost-btn moon-page__back-btn" onClick={onBack}>
                        ← Back
                    </button>
                )}
                <div>
                    <p className="moon-page__eyebrow">Space Cadet Academy</p>
                    <h2>ERA B — Race to the Moon</h2>
                    <p className="moon-page__years">1961–2006</p>
                    <p className="moon-page__theme">America lands astronauts on the Moon and begins global cooperation on building the International Space Station</p>
                </div>
                <div className="moon-page__content">
                    <h3>ERA B Timeline</h3>
                    <div className="era-b-sidebar-timeline">
                        {(() => {
                            const era2Data = ERA_TIMELINE_DATA.find(data => data.eraId === 2);
                            if (!era2Data) return null;
                            return era2Data.timelineItems.map((item, index) => (
                                <div key={index} className="era-b-sidebar-timeline__item">
                                    <div className="era-b-sidebar-timeline__header">
                                        <span className="era-b-sidebar-timeline__number">{index + 1}</span>
                                        <span className="era-b-sidebar-timeline__year">{item.year}</span>
                                    </div>
                                    <div className="era-b-sidebar-timeline__card">
                                        <h4 className="era-b-sidebar-timeline__title">{item.title}</h4>
                                        {item.whatHappened && (
                                            <div className="era-b-sidebar-timeline__section">
                                                <p className="era-b-sidebar-timeline__text">{item.whatHappened}</p>
                                            </div>
                                        )}
                                        {item.americanSignificance && (
                                            <div className="era-b-sidebar-timeline__section">
                                                <p className="era-b-sidebar-timeline__label">American Significance:</p>
                                                <p className="era-b-sidebar-timeline__text">{item.americanSignificance}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
                <div className="moon-page__gallery">
                    <ImageGallery images={ERA_B_IMAGES} />
                </div>
                <div className="moon-page__sequence">
                    {!flagPlanted && (
                        <>
                            <p className="moon-page__flag-text">
                                Plant the American Flag on the Moon to earn your ERA B badge!
                            </p>
                            <button
                                className="primary-btn"
                                onClick={handlePlantFlag}
                            >
                                PLANT FLAG
                            </button>
                        </>
                    )}
                    {flagPlanted && !isBoostingAway && (
                        <div className="flag-planted">
                            <p>American Flag Planted!</p>
                            <p className="flag-planted__subtext">Preparing to boost away...</p>
                        </div>
                    )}
                    {isBoostingAway && (
                        <div className="boosting-away">
                            <p>🚀 Boosting Away! 🚀</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MoonPage;

