import TimelinePage from './TimelinePage';
import { EraDetailPageProps } from './EraDetailTemplate';

interface Era4PageProps extends EraDetailPageProps {
    onNextEra?: () => void;
}

const Era4Page = ({ onReturn, onNextEra }: Era4PageProps) => {
    return (
        <TimelinePage
            eraId={4}
            onNextEra={onNextEra || (() => {})}
            onReturn={onReturn}
        />
    );
};

export default Era4Page;


