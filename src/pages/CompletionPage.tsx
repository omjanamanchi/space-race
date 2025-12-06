import { useState } from 'react';
import './CompletionPage.css';

interface CompletionPageProps {
    onBackToStart?: () => void;
}

const CompletionPage = ({}: CompletionPageProps) => {
    const [showWorksCited, setShowWorksCited] = useState(false);
    const [isFading, setIsFading] = useState(false);

    const handleWorksCitedClick = () => {
        setIsFading(true);
        setTimeout(() => {
            setShowWorksCited(true);
            setIsFading(false);
        }, 500); // Match fade duration
    };

    const worksCited = [
        {
            id: 1,
            citation: "AP Archive. \"Space Tourist Dennis Tito Speaks about His Trip.\" YouTube, July 21, 2015. https://www.youtube.com/watch?v=mKAIL8DDemg."
        },
        {
            id: 2,
            citation: "Asu.edu. \"Section 6: Recent History | Center for American Civics.\" 2025. https://civics.asu.edu/civic-literacy-curriculum/section6."
        },
        {
            id: 3,
            citation: "Dourado, Eli. \"A 2006 NASA Program Shows How Government Can Move at the Speed of Startups.\" The CGO, March 1, 2021. https://www.thecgo.org/benchmark/a-2006-nasa-program-shows-how-government-can-move-at-the-speed-of-startups/."
        },
        {
            id: 4,
            citation: "Greenspan, Jesse. \"Remembering the Apollo 8 Christmas Eve Broadcast | HISTORY.\" HISTORY, November 23, 2015. https://www.history.com/articles/remembering-the-apollo-8-christmas-eve-broadcast."
        },
        {
            id: 5,
            citation: "Harwood, William. \"SpaceX Pulls off Dramatic Falcon 9 Launch, Landing.\" Cbsnews.com. CBSNews, December 22, 2015. https://www.cbsnews.com/news/spacex-pulls-off-dramatic-falcon-9-launch-landing/."
        },
        {
            id: 6,
            citation: "Internet Archive. \"THE TWELVE GEMINI MISSIONS NASA GEMINI PROGRAM FILM 78084 : Free Download, Borrow, and Streaming : Internet Archive.\" 2017. https://archive.org/details/78084TheTwelveGemini."
        },
        {
            id: 7,
            citation: "Kelvey, Jon. \"65 Years Ago, the First American Satellite Radically Reshaped the Space Race.\" Inverse, February 1, 2023. https://www.inverse.com/science/explorer-1-launch-anniversary."
        },
        {
            id: 8,
            citation: "Luscombe, Richard. \"Musk Says Humans Can Be on Mars in Four Years. Many Laugh, but Some See Purpose.\" the Guardian. The Guardian, September 15, 2024. https://www.theguardian.com/technology/2024/sep/15/musk-humans-live-on-mars-spacex."
        },
        {
            id: 9,
            citation: "Loff, Sarah. \"Apollo 11 Mission Overview - NASA.\" NASA. NASA, April 17, 2015. https://www.nasa.gov/history/apollo-11-mission-overview/."
        },
        {
            id: 10,
            citation: "Loff, Sarah. \"Explorer 1 Overview - NASA.\" NASA, March 18, 2015. https://www.nasa.gov/history/explorer-1-overview/."
        },
        {
            id: 11,
            citation: "Malik, Tariq. \"SpaceX Successfully Launches Falcon 1 Rocket into Orbit.\" Space.com, December 13, 2019. https://www.space.com/5905-spacex-successfully-launches-falcon-1-rocket-orbit.html."
        },
        {
            id: 12,
            citation: "NASA. \"Apollo 8: Earthrise - NASA.\" NASA, December 23, 2020. https://www.nasa.gov/image-article/apollo-8-earthrise/."
        },
        {
            id: 13,
            citation: "NASA. \"International GeoPhysical Year--US Announcement.\" Nasa.gov, 2025. https://www.nasa.gov/history/sputnik/usannounce.html."
        },
        {
            id: 14,
            citation: "NASA. \"Unity Module - NASA.\" NASA. Accessed December 5, 2025. https://www.nasa.gov/international-space-station/unity-module/."
        },
        {
            id: 15,
            citation: "NASA. \"Wernher von Braun.\" NASA, February 6, 2024. https://www.nasa.gov/people/wernher-von-braun/."
        },
        {
            id: 16,
            citation: "NASA ON THE AIR. \"30 Years of International Collaboration on the ISS,\" November 4, 2023. https://nasaontheair.wordpress.com/2023/11/04/55-years-of-international-collaboration-on-the-iss/."
        },
        {
            id: 17,
            citation: "Neufeld, Michael. \"First American in Space: The Flight of Alan B. Shepard.\" airandspace.si.edu, May 5, 2021. https://airandspace.si.edu/stories/editorial/first-american-space-flight-alan-b-shepard."
        },
        {
            id: 18,
            citation: "Parissa DJangi. \"The True Story of the Secret Program That Brought Nazi Scientists to the U.S.\" History. National Geographic, May 12, 2025. https://www.nationalgeographic.com/history/article/operation-paperclip."
        },
        {
            id: 19,
            citation: "Peters, Gerhard, and John Woolley. \"Remarks at the Presentation of NASA's Distinguished Service Medal to Astronaut Alan B. Shepard. | the American Presidency Project.\" Ucsb.edu, 2025. https://www.presidency.ucsb.edu/documents/remarks-the-presentation-nasas-distinguished-service-medal-astronaut-alan-b-shepard."
        },
        {
            id: 20,
            citation: "Peters, Gerhard, and John Woolley. \"Statement by the President upon Signing the National Aeronautics and Space Act of 1958. | the American Presidency Project.\" www.presidency.ucsb.edu. Accessed December 5, 2025. https://www.presidency.ucsb.edu/documents/statement-the-president-upon-signing-the-national-aeronautics-and-space-act-1958."
        },
        {
            id: 21,
            citation: "Saad, Lydia. \"Gallup Vault: Building Faith in U.S. Space Exploration.\" Gallup.com. Gallup, June 3, 2016. https://news.gallup.com/vault/192293/gallup-vault-building-faith-space-exploration.aspx."
        },
        {
            id: 22,
            citation: "SpaceX. \"SpaceX - Falcon 1, Flight 4.\" YouTube, November 12, 2010. https://www.youtube.com/watch?v=dLQ2tZEH6G0."
        },
        {
            id: 23,
            citation: "SpaceX. \"SpaceX.\" SpaceX, 2025. https://www.spacex.com/vehicles/starship."
        },
        {
            id: 24,
            citation: "Uri, John. \"65 Years Ago: The National Aeronautics and Space Act of 1958 Creates NASA - NASA.\" NASA, July 26, 2023. https://www.nasa.gov/history/65-years-ago-the-national-aeronautics-and-space-act-of-1958-creates-nasa/."
        },
        {
            id: 25,
            citation: "Wall, Mike. \"First Space Tourist: How a U.S. Millionaire Bought a Ticket to Orbit.\" Space.com. Space, April 27, 2011. https://www.space.com/11492-space-tourism-pioneer-dennis-tito.html."
        },
        {
            id: 26,
            citation: "Wall, Mike. \"SpaceX Rocket Landing Is a Giant Leap toward a City on Mars, Elon Musk Says.\" Space.com. Space, December 22, 2015. https://www.space.com/31445-spacex-rocket-landing-mars-colony-elon-musk.html."
        }
    ];

    return (
        <section className="completion-page">
            <div className="completion-page__background">
                <div className="completion-page__stars"></div>
            </div>
            
            {!showWorksCited ? (
                <div className={`completion-page__content ${isFading ? 'fade-out' : ''}`}>
                    <div className="completion-page__header">
                        <div className="completion-page__nasa-logo">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <radialGradient id="nasaBg" cx="50%" cy="50%">
                                        <stop offset="0%" stopColor="#0b3d91" />
                                        <stop offset="100%" stopColor="#051e4a" />
                                    </radialGradient>
                                </defs>
                                <circle cx="100" cy="100" r="90" fill="url(#nasaBg)" />
                                
                                {/* Stars in background */}
                                <circle cx="60" cy="50" r="1" fill="#ffffff" opacity="0.9" />
                                <circle cx="80" cy="45" r="0.8" fill="#ffffff" opacity="0.8" />
                                <circle cx="120" cy="55" r="1.2" fill="#ffffff" opacity="0.9" />
                                <circle cx="140" cy="50" r="0.7" fill="#ffffff" opacity="0.7" />
                                <circle cx="50" cy="70" r="1" fill="#ffffff" opacity="0.8" />
                                <circle cx="150" cy="75" r="0.9" fill="#ffffff" opacity="0.8" />
                                <circle cx="65" cy="90" r="0.8" fill="#ffffff" opacity="0.7" />
                                <circle cx="135" cy="95" r="1.1" fill="#ffffff" opacity="0.9" />
                                <circle cx="45" cy="110" r="0.9" fill="#ffffff" opacity="0.8" />
                                <circle cx="155" cy="115" r="1" fill="#ffffff" opacity="0.8" />
                                <circle cx="70" cy="130" r="0.7" fill="#ffffff" opacity="0.7" />
                                <circle cx="130" cy="135" r="1.2" fill="#ffffff" opacity="0.9" />
                                <circle cx="55" cy="150" r="1" fill="#ffffff" opacity="0.8" />
                                <circle cx="145" cy="155" r="0.8" fill="#ffffff" opacity="0.8" />
                                <circle cx="75" cy="165" r="0.9" fill="#ffffff" opacity="0.7" />
                                <circle cx="125" cy="170" r="1" fill="#ffffff" opacity="0.9" />
                                
                                {/* White orbital lines */}
                                <ellipse cx="100" cy="100" rx="70" ry="25" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.6" transform="rotate(-25 100 100)" />
                                <ellipse cx="100" cy="100" rx="60" ry="20" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.5" transform="rotate(35 100 100)" />
                                
                                {/* Red swoosh/vector */}
                                <path d="M 30 140 Q 50 100, 70 80 Q 90 60, 110 50 Q 130 40, 150 45 Q 170 50, 175 60" 
                                      fill="none" 
                                      stroke="#fc3d21" 
                                      strokeWidth="8" 
                                      strokeLinecap="round" 
                                      strokeLinejoin="round" />
                                
                                {/* Shooting star/satellite on orbit */}
                                <g transform="translate(140, 70)">
                                    <circle cx="0" cy="0" r="2" fill="#ffffff" />
                                    <path d="M 0 0 L 8 8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                                </g>
                                
                                {/* NASA text */}
                                <text x="100" y="130" textAnchor="middle" fill="#ffffff" fontSize="32" fontFamily="Arial, sans-serif" fontWeight="bold" letterSpacing="2">
                                    NASA
                                </text>
                            </svg>
                        </div>
                        <div className="completion-page__message-box">
                            <h1 className="completion-page__congratulations">
                                CONGRATULATIONS! YOU PASSED SPACE CADET ACADEMY!
                            </h1>
                        </div>
                    </div>

                    <div className="completion-page__badges">
                        <div className="completion-badge completion-badge--era-a">
                            <div className="completion-badge__icon">A</div>
                            <div className="completion-badge__label">ERA A</div>
                        </div>
                        <div className="completion-badge completion-badge--era-b">
                            <div className="completion-badge__icon">B</div>
                            <div className="completion-badge__label">ERA B</div>
                        </div>
                        <div className="completion-badge completion-badge--era-c">
                            <div className="completion-badge__icon">C</div>
                            <div className="completion-badge__label">ERA C</div>
                        </div>
                    </div>

                    <div className="completion-page__actions">
                        <button 
                            className="completion-page__works-cited-btn"
                            onClick={handleWorksCitedClick}
                        >
                            WORKS CITED
                        </button>
                    </div>
                </div>
            ) : (
                <div className="completion-page__works-cited fade-in">
                    <div className="completion-page__works-cited-header">
                        <h2>Works Cited</h2>
                        <button 
                            className="completion-page__back-btn"
                            onClick={() => {
                                setShowWorksCited(false);
                            }}
                        >
                            ← Back
                        </button>
                    </div>
                    <div className="completion-page__works-cited-list">
                        {worksCited.map((item) => (
                            <div key={item.id} className="completion-page__citation">
                                <span className="completion-page__citation-number">{item.id}.</span>
                                <span className="completion-page__citation-text">{item.citation}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default CompletionPage;

