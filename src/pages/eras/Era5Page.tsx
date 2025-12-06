import TimelinePage from './TimelinePage';
import { EraDetailPageProps } from './EraDetailTemplate';

interface Era5PageProps extends EraDetailPageProps {
    onNextEra?: () => void;
}

const Era5Page = ({ onReturn, onNextEra }: Era5PageProps) => {
    return (
        <TimelinePage
            eraId={5}
            onNextEra={onNextEra || (() => {})}
            onReturn={onReturn}
        />
    );
};

export default Era5Page;


