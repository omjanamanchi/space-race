import { useMemo, useState } from 'react';
import { ERA_DATA, Era } from '../data/eras';
import './MissionMapPage.css';

interface MissionMapPageProps {
    onEraSelect: (eraId: number) => void;
    onBackToHangar: () => void;
}

const flattenAccomplishments = (era: Era) => {
    const combined = Object.values(era.accomplishments).flat().filter(Boolean) as string[];
    return combined.slice(0, 4);
};

const MissionMapPage = ({ onEraSelect, onBackToHangar }: MissionMapPageProps) => {
    const [selectedEra, setSelectedEra] = useState<Era>(ERA_DATA[0]);

    const detailBullets = useMemo(() => flattenAccomplishments(selectedEra), [selectedEra]);

    return (
        <section className="mission-map">
            <header className="mission-map__header">
                <button className="ghost-btn" onClick={onBackToHangar}>
                    ← Hangar
                </button>
                <div>
                    <p className="mission-map__eyebrow">Mission Map</p>
                    <h2>Timeline of the Eight Eras</h2>
                    <p>
                        Trace the pivotal leaps that reshaped space exploration, from clandestine
                        rocket labs to visionary private fleets.
                    </p>
                </div>
            </header>

            <div className="timeline">
                {ERA_DATA.map((era, index) => {
                    const isActive = era.id === selectedEra.id;
                    return (
                        <button
                            key={era.id}
                            className={`timeline__node ${isActive ? 'is-active' : ''}`}
                            onClick={() => setSelectedEra(era)}
                        >
                            {era.id === 1 && <span className="timeline__ship" aria-hidden="true" />}
                            <span className="timeline__number">{era.id}</span>
                            <span className="timeline__label">
                                Era {era.id}
                                <small>{era.years}</small>
                            </span>
                            {index < ERA_DATA.length - 1 && <span className="timeline__track" />}
                        </button>
                    );
                })}
            </div>

            <div className="mission-map__detail">
                <div>
                    <p className="mission-map__eyebrow">Era {selectedEra.id}</p>
                    <h3>{selectedEra.title}</h3>
                    <p className="mission-map__years">{selectedEra.years}</p>
                </div>
                <ul>
                    {detailBullets.map((item, index) => (
                        <li key={`${selectedEra.id}-summary-${index}`}>{item}</li>
                    ))}
                </ul>
                <div className="mission-map__cta">
                    <button className="ghost-btn" onClick={() => setSelectedEra(ERA_DATA[0])}>
                        Reset to Era 1
                    </button>
                    <button className="primary-btn" onClick={() => onEraSelect(selectedEra.id)}>
                        Enter Era {selectedEra.id}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default MissionMapPage;
















