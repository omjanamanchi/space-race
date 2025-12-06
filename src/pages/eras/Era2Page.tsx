import TimelinePage from './TimelinePage';
import { EraDetailPageProps } from './EraDetailTemplate';

interface Era2PageProps extends EraDetailPageProps {
    onNextEra?: () => void;
}

const Era2Page = ({ onReturn, onNextEra }: Era2PageProps) => {
    return (
        <TimelinePage
            eraId={2}
            onNextEra={onNextEra || (() => {})}
            onReturn={onReturn}
        />
    );
};

export default Era2Page;


