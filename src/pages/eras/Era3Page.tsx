import TimelinePage from './TimelinePage';
import { EraDetailPageProps } from './EraDetailTemplate';

interface Era3PageProps extends EraDetailPageProps {
    onNextEra?: () => void;
}

const Era3Page = ({ onReturn, onNextEra }: Era3PageProps) => {
    return (
        <TimelinePage
            eraId={3}
            onNextEra={onNextEra || (() => {})}
            onReturn={onReturn}
        />
    );
};

export default Era3Page;


