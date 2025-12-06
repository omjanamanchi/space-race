import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import LaunchStationPage from './pages/LaunchStationPage';
import MoonPage from './pages/MoonPage';
import MarsPage from './pages/MarsPage';
import CompletionPage from './pages/CompletionPage';

type View = 'landing' | 'launch-station' | 'moon' | 'mars' | 'completion';

const App = () => {
    const [view, setView] = useState<View>('landing');
    const [isTransitioning, setIsTransitioning] = useState(false);

    if (view === 'landing') {
        return (
            <>
                {isTransitioning && (
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                        <LaunchStationPage 
                            onBlastOff={() => setView('moon')}
                        />
                    </div>
                )}
                <LandingPage 
                    hideContent={isTransitioning}
                    onEnterHangar={() => {
                        setIsTransitioning(true);
                        // Wait for wall animation to complete before switching view
                        setTimeout(() => {
                            setView('launch-station');
                            setIsTransitioning(false);
                        }, 600); // 600ms for wall departing animation
                    }} 
                />
            </>
        );
    }

    if (view === 'launch-station') {
        return (
            <LaunchStationPage 
                onBlastOff={() => setView('moon')}
                onBack={() => setView('landing')}
            />
        );
    }

    if (view === 'moon') {
        return (
            <MoonPage
                onContinue={() => setView('mars')}
                onBack={() => setView('launch-station')}
            />
        );
    }

    if (view === 'mars') {
        return (
            <MarsPage
                onMissionSuccess={() => {
                    setView('completion');
                }}
                onBack={() => setView('moon')}
            />
        );
    }

    if (view === 'completion') {
        return (
            <CompletionPage
                onBackToStart={() => setView('landing')}
            />
        );
    }

    return null;
};

export default App;


