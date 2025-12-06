import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Stars, useGLTF } from '@react-three/drei';
import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { ERA_TIMELINE_DATA } from '../data/eraTimelineData';
import ImageGallery, { ImageMetadata } from '../components/ImageGallery';
import './MarsPage.css';

const ERA_C_IMAGES: ImageMetadata[] = [
    {
        src: '/C.3.1.png',
        description: 'SpaceX\'s Falcon 9 rocket landing',
        citation: 'Wall, Mike. "SpaceX Rocket Landing Is a Giant Leap toward a City on Mars, Elon Musk Says." Space.com. Space, December 22, 2015. https://www.space.com/31445-spacex-rocket-landing-mars-colony-elon-musk.html.'
    },
    {
        videoUrl: 'https://www.youtube.com/watch?v=dLQ2tZEH6G0',
        description: 'SpaceX Falcon 1 video',
        citation: 'YouTube video: SpaceX Falcon 1'
    }
];

interface MarsPageProps {
    onMissionSuccess: () => void;
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

const FallbackStarship = ({ position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, showFlames = false }: StarshipProps) => {
    const shipRef = useRef<THREE.Group>(null);
    
    useFrame(() => {
        if (shipRef.current) {
            shipRef.current.position.set(position.x, position.y, position.z);
            shipRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
        }
    });
    
    return (
        <group ref={shipRef} rotation={[0, 0, 0]} scale={0.5}>
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
            
            {/* Only show flames when landing */}
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

// Mars colony structures - Transparent dome with green terraformed city inside
const MarsColony = ({ show }: { show: boolean }) => {
    if (!show) return null;
    
    // Calculate position on Mars surface
    // Mars is at [0, -2, -8] with scale 3 (radius 3)
    // Place colony at x=2.5, z=-7 (visible side, to the right of the rocket)
    const colonyX = 2.5;
    const colonyZ = -7;
    const marsCenterY = -2;
    const marsCenterZ = -8;
    const marsRadius = 3;
    // Calculate y position on sphere surface for the base of the colony
    // Base is at y=-0.05 relative to group, so we need to account for that
    const dx = colonyX - 0;
    const dz = colonyZ - marsCenterZ;
    const dySquared = marsRadius * marsRadius - dx * dx - dz * dz;
    const surfaceYAtBase = marsCenterY + Math.sqrt(dySquared); // Y position on surface
    // Group y position: surfaceY - (-0.05) = surfaceY + 0.05, so base sits on surface
    const groupY = surfaceYAtBase + 0.05;
    
    return (
        <group position={[colonyX, groupY, colonyZ]}>
            {/* Terraformed green ground inside dome */}
            <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.2, 32]} />
                <meshStandardMaterial 
                    color="#4a7c59" 
                    roughness={0.8}
                    metalness={0.1}
                />
            </mesh>
            
            {/* Large transparent dome with subtle glow */}
            <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshStandardMaterial 
                    color="#E8F4F8" 
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                    emissive="#E8F4F8"
                    emissiveIntensity={0.3}
                />
            </mesh>
            
            {/* Dome frame structure (geodesic pattern) */}
            <mesh position={[0, 0.5, 0]}>
                <icosahedronGeometry args={[1.2, 1]} />
                <meshStandardMaterial 
                    color="#B0D4E3" 
                    wireframe={true}
                    transparent
                    opacity={0.4}
                />
            </mesh>
            
            {/* Central tall skyscraper with black and teal accents */}
            <group position={[0, 0, 0]}>
                {/* Main tower body */}
                <mesh position={[0, 0.8, 0]}>
                    <boxGeometry args={[0.08, 1.2, 0.08]} />
                    <meshStandardMaterial color="#F5F5F5" metalness={0.3} roughness={0.4} />
                </mesh>
                {/* Black accent sections */}
                {[0.2, 0.5, 0.8, 1.1].map((y, i) => (
                    <mesh key={`accent-${i}`} position={[0, y, 0]}>
                        <boxGeometry args={[0.1, 0.05, 0.1]} />
                        <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.3} />
                    </mesh>
                ))}
                {/* Teal accent bands */}
                {[0.35, 0.65, 0.95].map((y, i) => (
                    <mesh key={`teal-${i}`} position={[0, y, 0]}>
                        <boxGeometry args={[0.09, 0.03, 0.09]} />
                        <meshStandardMaterial color="#2dd4bf" metalness={0.6} roughness={0.2} />
                    </mesh>
                ))}
            </group>
            
            {/* White modular residential buildings with green roofs */}
            {[
                { x: -0.4, z: -0.3, w: 0.12, h: 0.25 },
                { x: 0.4, z: -0.3, w: 0.12, h: 0.25 },
                { x: -0.3, z: 0.4, w: 0.15, h: 0.3 },
                { x: 0.3, z: 0.4, w: 0.15, h: 0.3 },
            ].map((building, i) => (
                <group key={`residential-${i}`} position={[building.x, building.h / 2, building.z]}>
                    {/* Building body */}
                    <mesh>
                        <boxGeometry args={[building.w, building.h, building.w]} />
                        <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.6} />
                    </mesh>
                    {/* Green roof */}
                    <mesh position={[0, building.h / 2 + 0.02, 0]}>
                        <boxGeometry args={[building.w + 0.02, 0.03, building.w + 0.02]} />
                        <meshStandardMaterial color="#2d5016" roughness={0.8} />
                    </mesh>
                </group>
            ))}
            
            {/* Sports complex/stadium with track and blue pool */}
            <group position={[-0.5, 0, 0.5]}>
                {/* Stadium base */}
                <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[0.15, 0.25, 32]} />
                    <meshStandardMaterial color="#F5F5F5" roughness={0.7} />
                </mesh>
                {/* Track */}
                <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.2, 0.02, 8, 32]} />
                    <meshStandardMaterial color="#8B4513" roughness={0.9} />
                </mesh>
                {/* Blue swimming pool */}
                <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.12, 32]} />
                    <meshStandardMaterial 
                        color="#1e90ff" 
                        transparent
                        opacity={0.8}
                        roughness={0.1}
                        metalness={0.1}
                    />
                </mesh>
            </group>
            
            {/* Cylindrical storage structures */}
            {[
                { x: -0.7, z: -0.5 },
                { x: 0.7, z: -0.5 },
                { x: -0.6, z: 0.6 },
            ].map((pos, i) => (
                <mesh key={`storage-${i}`} position={[pos.x, 0.15, pos.z]} rotation={[0, 0, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.3, 16]} />
                    <meshStandardMaterial color="#E0E0E0" metalness={0.2} roughness={0.6} />
                </mesh>
            ))}
            
            {/* Additional curved/angular buildings */}
            <mesh position={[0.5, 0.12, -0.4]} rotation={[0, Math.PI / 4, 0]}>
                <boxGeometry args={[0.1, 0.24, 0.15]} />
                <meshStandardMaterial color="#F0F0F0" metalness={0.15} roughness={0.5} />
            </mesh>
            
            <mesh position={[-0.5, 0.1, -0.4]} rotation={[0, -Math.PI / 6, 0]}>
                <boxGeometry args={[0.12, 0.2, 0.12]} />
                <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.6} />
            </mesh>
        </group>
    );
};

// Mars model - positioned so rocket can land on top surface
const Mars = () => {
    const marsRef = useRef<THREE.Mesh>(null);
    
    useFrame(() => {
        if (marsRef.current) {
            marsRef.current.rotation.y += 0.001;
        }
    });
    
    return (
        <mesh ref={marsRef} position={[0, -2, -8]} scale={[3, 3, 3]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial 
                color="#cd5c5c" 
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
}

interface UnityStarshipProps {
    position?: { x: number; y: number; z: number };
    rotation?: { x: number; y: number; z: number };
    showFlames?: boolean;
}

const UnityStarship = ({ position = { x: 0, y: 0, z: 0 }, rotation = { x: 0, y: 0, z: 0 }, showFlames = false }: UnityStarshipProps) => {
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
    rotation: { x: number; y: number; z: number };
    showFlames?: boolean;
}

const ModelLoader = ({ position, rotation, showFlames = false }: ModelLoaderProps) => {
    return (
        <ModelErrorBoundary fallback={<FallbackStarship position={position} rotation={rotation} showFlames={showFlames} />}>
            <Suspense fallback={<FallbackStarship position={position} rotation={rotation} showFlames={showFlames} />}>
                <UnityStarship position={position} rotation={rotation} showFlames={showFlames} />
            </Suspense>
        </ModelErrorBoundary>
    );
};

const MarsPage = ({ onMissionSuccess, onBack }: MarsPageProps) => {
    const [hasLanded, setHasLanded] = useState(false);
    const [isColonized, setIsColonized] = useState(false);
    const [shipPosition, setShipPosition] = useState({ x: 0, y: 5, z: 0 }); // Start above Mars
    const [shipRotation, setShipRotation] = useState({ x: 0, y: 0, z: 0 });
    
    // Landing animation - rocket fully lands on Mars surface with base touching Mars
    useEffect(() => {
        let rafId: number;
        const start = performance.now();
        const duration = 3000; // 3 seconds to land

        const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ship descends and lands on Mars surface - base touches Mars
            // Mars is at [0, -2, -8] with scale 3, so radius is 3
            // Top surface of Mars is at y = -2 + 3 = 1
            // Rocket structure (unscaled): lowest point is core stage bottom at y=-2.5, highest is nose at y=7.5
            // Total unscaled height = 10 units, with scale 0.5 = 5 units scaled height
            // The rocket's lowest point relative to group center is at y=-2.5 (unscaled)
            // With scale 0.5, the base offset from center is -2.5 * 0.5 = -1.25
            // To have base touch Mars surface (y=1), rocket center = 1 - (-1.25) = 2.25
            const targetY = 2.25;
            setShipPosition({
                x: 0,
                y: 5 - progress * (5 - targetY), // Descend from 5 to 2.75 (rocket base touches Mars surface at y=1)
                z: 0
            });

            // Keep rocket upright when landed (no tilt)
            setShipRotation({
                x: 0,
                y: 0,
                z: 0
            });

            if (progress < 1) {
                rafId = requestAnimationFrame(animate);
            } else {
                setHasLanded(true);
            }
        };

        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, []);

    return (
        <section className="mars-page">
            <div className="mars-page__viewer">
                <Canvas>
                    <color attach="background" args={['#1a0000']} />
                    <PerspectiveCamera makeDefault position={[0, 3.5, 12]} fov={50} />
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 5, 5]} intensity={1.2} />
                    <pointLight position={[-5, 3, -5]} intensity={0.4} color="#ff6b47" />
                    <ModelLoader position={shipPosition} rotation={shipRotation} showFlames={!hasLanded} />
                    <Mars />
                    <MarsColony show={isColonized} />
                    <OrbitControls 
                        enablePan={false} 
                        maxDistance={25} 
                        minDistance={8}
                        target={[0, 2.5, 0]}
                    />
                    <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} />
                </Canvas>
            </div>
            <div className="mars-page__sidebar">
                {onBack && (
                    <button className="ghost-btn mars-page__back-btn" onClick={onBack}>
                        ← Back
                    </button>
                )}
                <div>
                    <p className="mars-page__eyebrow">Space Cadet Academy</p>
                    <h2>ERA C — Corporate Conquest of the New Space Race</h2>
                    <p className="mars-page__years">2006–Present & Future</p>
                    <p className="mars-page__theme">United States space exploration evolves into a private industry of corporate conquest that push the boundaries of rocket science in the modern day</p>
                </div>
                <div className="mars-page__content">
                    <h3>ERA C Timeline</h3>
                    <div className="era-c-sidebar-timeline">
                        {(() => {
                            const era6Data = ERA_TIMELINE_DATA.find(data => data.eraId === 6);
                            if (!era6Data) return null;
                            return era6Data.timelineItems.map((item, index) => (
                                <div key={index} className="era-c-sidebar-timeline__item">
                                    <div className="era-c-sidebar-timeline__header">
                                        <span className="era-c-sidebar-timeline__number">{index + 1}</span>
                                        <span className="era-c-sidebar-timeline__year">{item.year}</span>
                                    </div>
                                    <div className="era-c-sidebar-timeline__card">
                                        <h4 className="era-c-sidebar-timeline__title">{item.title}</h4>
                                        {item.whatHappened && (
                                            <div className="era-c-sidebar-timeline__section">
                                                <p className="era-c-sidebar-timeline__text">{item.whatHappened}</p>
                                            </div>
                                        )}
                                        {item.americanSignificance && (
                                            <div className="era-c-sidebar-timeline__section">
                                                <p className="era-c-sidebar-timeline__label">American Significance:</p>
                                                <p className="era-c-sidebar-timeline__text">{item.americanSignificance}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ));
                        })()}
                    </div>
                </div>
                <div className="mars-page__gallery">
                    <ImageGallery images={ERA_C_IMAGES} />
                </div>
                <div className="mars-page__sequence">
                    {!hasLanded && (
                        <p className="mars-page__landing-text">
                            🚀 Landing on Mars... 🚀
                        </p>
                    )}
                    {hasLanded && !isColonized && (
                        <>
                            <p className="mars-page__success-text">
                                Rocket has landed on Mars! Ready to colonize Mars?
                            </p>
                            <button
                                className="primary-btn"
                                onClick={() => setIsColonized(true)}
                            >
                                COLONIZE
                            </button>
                        </>
                    )}
                    {hasLanded && isColonized && (
                        <>
                            <p className="mars-page__success-text">
                                Click Mission Success to earn your ERA C badge
                            </p>
                            <button
                                className="primary-btn"
                                onClick={onMissionSuccess}
                            >
                                MISSION SUCCESS
                            </button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default MarsPage;



