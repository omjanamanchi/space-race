import { useMemo, useState } from 'react';
import './LandingPage.css';

interface LandingPageProps {
    onEnterHangar: () => void;
    hideContent?: boolean;
}

type WallPhase = 'idle' | 'closing' | 'latched' | 'departing';

const STAR_COUNT = 300;
const COMET_COUNT = 2;

const LandingPage = ({ onEnterHangar, hideContent = false }: LandingPageProps) => {
    const [phase, setPhase] = useState<WallPhase>('idle');
    const [showWall, setShowWall] = useState(false);

    const stars = useMemo(
        () =>
            Array.from({ length: STAR_COUNT }, (_, index) => ({
                id: index,
                top: Math.random() * 100,
                left: Math.random() * 100,
                size: 1 + Math.random() * 2,
                duration: 2 + Math.random() * 3,
                delay: Math.random() * 4,
                isPurple: Math.random() > 0.7
            })),
        []
    );

    const comets = useMemo(
        () => [
            {
                id: 0,
                startX: 75,
                startY: 15,
                angle: 135,
                duration: 15,
                delay: 0,
                size: 8
            },
            {
                id: 1,
                startX: 15,
                startY: 75,
                angle: 45,
                duration: 15,
                delay: 5,
                size: 8
            }
        ],
        []
    );


    const handleBoard = () => {
        if (phase !== 'idle') {
            return;
        }

        setShowWall(true);
        setPhase('closing');

        window.setTimeout(() => setPhase('latched'), 1000);
        window.setTimeout(() => setPhase('departing'), 1800);
        // Call onEnterHangar when wall starts departing so hangar renders behind
        window.setTimeout(() => {
            onEnterHangar();
        }, 1800);
        // Hide wall after departing animation completes (0.6s transition)
        window.setTimeout(() => {
            setShowWall(false);
            setPhase('idle');
        }, 2400); // 1800ms + 600ms for transition
    };

    return (
        <section className="landing">
            {!hideContent && (
                <div className="landing__space">
                {stars.map(star => (
                    <span
                        key={star.id}
                        className={`star ${star.isPurple ? 'star--purple' : ''}`}
                        style={{
                            top: `${star.top}%`,
                            left: `${star.left}%`,
                            width: `${star.size}px`,
                            height: `${star.size}px`,
                            animationDuration: `${star.duration}s`,
                            animationDelay: `${star.delay}s`
                        }}
                    />
                ))}
                <div className="planet planet--orange" />
                <div className="planet planet--earth" />
                <div className="planet planet--pink" />
                <div className="planet planet--purple" />
                <div className="planet planet--blue" />
                {comets.map(comet => (
                    <div
                        key={comet.id}
                        className="comet"
                        style={{
                            left: `${comet.startX}%`,
                            top: `${comet.startY}%`,
                            animationDuration: `${comet.duration}s`,
                            animationDelay: `${comet.delay}s`,
                            '--comet-angle': `${comet.angle}deg`,
                            '--comet-size': `${comet.size}px`
                        } as React.CSSProperties}
                    >
                        <div className="comet__head" />
                        <div className="comet__tail" />
                    </div>
                ))}
                <div className="satellite">
                    <div className="satellite__body" />
                    <div className="satellite__panel satellite__panel--left" />
                    <div className="satellite__panel satellite__panel--right" />
                </div>
                <div className="astronaut">
                    <div className="astronaut__helmet">
                        <div className="astronaut__visor" />
                    </div>
                    <div className="astronaut__body" />
                    <div className="astronaut__arm astronaut__arm--left" />
                    <div className="astronaut__arm astronaut__arm--right" />
                    <div className="astronaut__leg astronaut__leg--left" />
                    <div className="astronaut__leg astronaut__leg--right" />
                    <div className="astronaut__backpack" />
                    <div className="astronaut__tether" />
                </div>
                <div className="alien">
                    <div className="alien__head" />
                    <div className="alien__eye alien__eye--left" />
                    <div className="alien__eye alien__eye--right" />
                    <div className="alien__mouth" />
                    <div className="alien__body" />
                    <div className="alien__arm alien__arm--left" />
                    <div className="alien__arm alien__arm--right" />
                    <div className="alien__leg alien__leg--left" />
                    <div className="alien__leg alien__leg--right" />
                </div>
            </div>
            )}
            {!hideContent && (
                <div className="landing__content">
                    <h1>
                        The Space Race
                        <span>Cold War rivalry to corporate conquest</span>
                    </h1>
                    <p>Enjoy the journey from German Master Minds to Corporate Starships</p>
                    <button className="cta-btn" onClick={handleBoard}>
                        BOARD STARSHIP
                    </button>
                </div>
            )}
            {!hideContent && (
                <div className="landing__rocket" aria-hidden="true">
                <div className="landing__rocket-nose" />
                <div className="landing__rocket-body">
                    <div className="landing__window" />
                </div>
                <div className="landing__fin landing__fin--left" />
                <div className="landing__fin landing__fin--right" />
                <div className="landing__flame" />
            </div>
            )}
            {showWall && (
                <div className={`connecting-wall connecting-wall--${phase}`}>
                    <div className="connecting-wall__panel connecting-wall__panel--left" />
                    <div className="connecting-wall__panel connecting-wall__panel--right" />
                    <div className="connecting-wall__badge">
                        <span className="badge-ring" />
                        <svg viewBox="0 0 64 64" role="img" aria-label="Rocket emblem">
                            <path
                                d="M32 4c8 8 14 21 14 32a14 14 0 0 1-28 0C18 25 24 12 32 4z"
                                fill="#fff"
                            />
                            <path d="M24 38h16l-8 16z" fill="#ff4f8c" />
                            <circle cx="32" cy="20" r="4" fill="#030615" />
                        </svg>
                    </div>
                </div>
            )}
        </section>
    );
};

export default LandingPage;

