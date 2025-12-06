import { ERA_DATA, Era, EraCategory } from '../../data/eras';
import './EraDetailPage.css';

const CATEGORY_LABELS: Record<EraCategory, string> = {
    us: 'United States',
    ussr: 'Soviet Union',
    joint: 'Joint Missions',
    other: 'Global Momentum'
};

export interface EraDetailPageProps {
    onReturn: () => void;
}

type EraDetailTemplateProps = EraDetailPageProps & { era: Era };

export const EraDetailTemplate = ({ era, onReturn }: EraDetailTemplateProps) => {
    const renderList = (category: EraCategory) => {
        const items = era.accomplishments[category];
        if (!items || items.length === 0) {
            return null;
        }
        return (
            <div className="era-detail__cluster" key={category}>
                <p className="era-detail__cluster-label">{CATEGORY_LABELS[category]}</p>
                <ul>
                    {items.map((item, index) => (
                        <li key={`${category}-${index}`}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <section className="era-detail">
            <div className="era-detail__chrome">
                <button className="ghost-btn" onClick={onReturn}>
                    ← Mission Map
                </button>
                <div>
                    <h1>{era.title}</h1>
                    <p className="era-detail__years">{era.years}</p>
                </div>
            </div>
            <div className="era-detail__grid">
                {(Object.keys(CATEGORY_LABELS) as EraCategory[])
                    .map(renderList)
                    .filter(Boolean)}
            </div>
            <div className="era-detail__cta">
                <p>Ready to continue the journey?</p>
                <button className="primary-btn" onClick={onReturn}>
                    Return to Mission Map
                </button>
            </div>
        </section>
    );
};

export const getEraComponentById = (id: number) => {
    const era = ERA_DATA.find(entry => entry.id === id);
    if (!era) {
        throw new Error(`Era with id ${id} not found`);
    }
    const Component = (props: EraDetailPageProps) => <EraDetailTemplate era={era} {...props} />;
    Component.displayName = `EraDetail${id}`;
    return Component;
};

