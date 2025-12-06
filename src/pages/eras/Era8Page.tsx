import TimelinePage from './TimelinePage';
import { EraDetailPageProps } from './EraDetailTemplate';

interface Era8PageProps extends EraDetailPageProps {
    onNextEra?: () => void;
}

const Era8Page = ({ onReturn, onNextEra }: Era8PageProps) => {
    return (
        <TimelinePage
            eraId={8}
            onNextEra={onNextEra || (() => {})}
            onReturn={onReturn}
        />
    );
};

export default Era8Page;


