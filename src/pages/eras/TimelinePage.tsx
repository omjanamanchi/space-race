import { useMemo } from 'react';
import { ERA_TIMELINE_DATA, EraTimelineData } from '../../data/eraTimelineData';
import { ERA_DATA } from '../../data/eras';
import ImageGallery, { ImageMetadata } from '../../components/ImageGallery';
import './TimelinePage.css';

interface TimelinePageProps {
    eraId: number;
    onNextEra: () => void;
    onReturn?: () => void;
}

const STAR_COUNT = 200;

// Image galleries for each era
const ERA_IMAGES: Record<number, ImageMetadata[]> = {
    1: [
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
    ],
    2: [
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
    ],
    3: [
        {
            src: '/C.3.1.png',
            description: 'SpaceX\'s Falcon 9 rocket landing',
            citation: 'Wall, Mike. "SpaceX Rocket Landing Is a Giant Leap toward a City on Mars, Elon Musk Says." Space.com. Space, December 22, 2015. https://www.space.com/31445-spacex-rocket-landing-mars-colony-elon-musk.html.'
        }
    ],
    6: [
        {
            videoUrl: 'https://www.youtube.com/watch?v=dLQ2tZEH6G0',
            description: 'SpaceX Falcon 1 video',
            citation: 'YouTube video: SpaceX Falcon 1'
        }
    ]
};

const TimelinePage = ({ eraId, onNextEra, onReturn }: TimelinePageProps) => {
    const timelineData = ERA_TIMELINE_DATA.find(data => data.eraId === eraId);
    const eraData = ERA_DATA.find(era => era.id === eraId);
    
    if (!timelineData || !eraData) {
        return <div>Era not found</div>;
    }

    const isLastEra = eraId === 8;
    const eraImages = ERA_IMAGES[eraId] || [];

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

    return (
        <section className="timeline-page" style={{ '--theme-color': timelineData.themeColor } as React.CSSProperties}>
            <div className="timeline-page__space">
                {stars.map(star => (
                    <span
                        key={star.id}
                        className={`timeline-star ${star.isPurple ? 'timeline-star--purple' : ''}`}
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
                <div className="timeline-planet timeline-planet--orange" />
                <div className="timeline-planet timeline-planet--blue" />
                <div className="timeline-planet timeline-planet--purple" />
            </div>

            <div className="timeline-page__header">
                {onReturn && (
                    <button className="ghost-btn" onClick={onReturn}>
                        ← Back
                    </button>
                )}
                <div>
                    <h1 className="timeline-page__title">{eraData.title}</h1>
                    <p className="timeline-page__years">{eraData.years}</p>
                </div>
            </div>

            {eraId === 1 ? (
                <div className="timeline-page__era-a-layout">
                    <div className="timeline-page__left-content">
                        <div className="quote-box">
                            <div className="quote-box__quote">
                                <span className="quote-box__mark">"</span>
                                {timelineData.quote}
                                <span className="quote-box__mark">"</span>
                            </div>
                            {timelineData.quoteAuthor && (
                                <p className="quote-box__author">— {timelineData.quoteAuthor}</p>
                            )}
                        </div>
                        
                        <div className="perception-box">
                            <h3 className="perception-box__title">Perception of the Time</h3>
                            <p className="perception-box__text">{timelineData.perception}</p>
                        </div>
                    </div>

                    <div className="timeline-page__right-timeline">
                        <div className="era-a-timeline">
                            <div className="era-a-timeline__line"></div>
                            {timelineData.timelineItems.map((item, index) => (
                                <div key={index} className="era-a-timeline__item">
                                    <div className="era-a-timeline__node">
                                        <div className="era-a-timeline__circle">
                                            <span className="era-a-timeline__number">{index + 1}</span>
                                        </div>
                                    </div>
                                    <div className="era-a-timeline__card">
                                        <div className="era-a-timeline__year">{item.year}</div>
                                        <h3 className="era-a-timeline__title">{item.title}</h3>
                                        {item.whatHappened && (
                                            <div className="era-a-timeline__section">
                                                <p className="era-a-timeline__label">What Happened:</p>
                                                <p className="era-a-timeline__text">{item.whatHappened}</p>
                                            </div>
                                        )}
                                        {item.americanSignificance && (
                                            <div className="era-a-timeline__section">
                                                <p className="era-a-timeline__label">American Significance:</p>
                                                <p className="era-a-timeline__text">{item.americanSignificance}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {eraImages.length > 0 && (
                            <div className="timeline-page__gallery timeline-page__gallery--era-a">
                                <ImageGallery images={eraImages} />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    
                    {timelineData.timelineItems.map((item, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div key={index} className={`timeline-item ${isLeft ? 'timeline-item--left' : 'timeline-item--right'}`}>
                                <div className="timeline-node">
                                    <div className="timeline-node__circle">
                                        <span className="timeline-node__number">{index + 1}</span>
                                    </div>
                                </div>
                                
                                <div className={`timeline-content ${isLeft ? 'timeline-content--left' : 'timeline-content--right'}`}>
                                    <div className="timeline-date">
                                        {item.year}
                                    </div>
                                    <div className="timeline-description">
                                        <h3 className="timeline-description__title">{item.title}</h3>
                                        <p className="timeline-description__text">{item.description}</p>
                                    </div>
                                </div>

                                <div className={`timeline-image ${isLeft ? 'timeline-image--right' : 'timeline-image--left'}`}>
                                    <div className="timeline-image__box">
                                        <div className="timeline-image__placeholder">
                                            <span className="timeline-image__icon">📷</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {eraId !== 1 && eraImages.length > 0 && (
                <div className="timeline-page__gallery">
                    <ImageGallery images={eraImages} />
                </div>
            )}

            {eraId !== 1 && (
                <div className="timeline-page__footer">
                    <div className="quote-box">
                        <div className="quote-box__quote">
                            <span className="quote-box__mark">"</span>
                            {timelineData.quote}
                            <span className="quote-box__mark">"</span>
                        </div>
                        {timelineData.quoteAuthor && (
                            <p className="quote-box__author">— {timelineData.quoteAuthor}</p>
                        )}
                    </div>
                    
                    <div className="perception-box">
                        <h3 className="perception-box__title">Perception of the Time</h3>
                        <p className="perception-box__text">{timelineData.perception}</p>
                    </div>

                    <div className="timeline-page__actions">
                        {!isLastEra ? (
                            <button className="primary-btn timeline-page__next-btn" onClick={onNextEra}>
                                Next Era →
                            </button>
                        ) : (
                            <button className="primary-btn timeline-page__next-btn" onClick={onReturn || onNextEra}>
                                Complete Journey
                            </button>
                        )}
                    </div>
                </div>
            )}

            {eraId === 1 && (
                <div className="timeline-page__actions timeline-page__actions--era-a">
                    {!isLastEra ? (
                        <button className="primary-btn timeline-page__next-btn" onClick={onNextEra}>
                            Next Era →
                        </button>
                    ) : (
                        <button className="primary-btn timeline-page__next-btn" onClick={onReturn || onNextEra}>
                            Complete Journey
                        </button>
                    )}
                </div>
            )}
        </section>
    );
};

export default TimelinePage;

