import TimelinePage from './TimelinePage';
import { EraDetailPageProps } from './EraDetailTemplate';

interface Era6PageProps extends EraDetailPageProps {
    onNextEra?: () => void;
}

const Era6Page = ({ onReturn, onNextEra }: Era6PageProps) => {
    return (
        <TimelinePage
            eraId={6}
            onNextEra={onNextEra || (() => {})}
            onReturn={onReturn}
        />
    );
};

export default Era6Page;


