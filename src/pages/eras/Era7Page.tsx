import TimelinePage from './TimelinePage';
import { EraDetailPageProps } from './EraDetailTemplate';

interface Era7PageProps extends EraDetailPageProps {
    onNextEra?: () => void;
}

const Era7Page = ({ onReturn, onNextEra }: Era7PageProps) => {
    return (
        <TimelinePage
            eraId={7}
            onNextEra={onNextEra || (() => {})}
            onReturn={onReturn}
        />
    );
};

export default Era7Page;


