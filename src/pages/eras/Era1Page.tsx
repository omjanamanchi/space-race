import TimelinePage from './TimelinePage';
import { EraDetailPageProps } from './EraDetailTemplate';

interface Era1PageProps extends EraDetailPageProps {
    onNextEra?: () => void;
}

const Era1Page = ({ onReturn, onNextEra }: Era1PageProps) => {
    return (
        <TimelinePage
            eraId={1}
            onNextEra={onNextEra || (() => {})}
            onReturn={onReturn}
        />
    );
};

export default Era1Page;


