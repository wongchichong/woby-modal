import { CSSProperties, ObservableMaybe } from 'voby';
interface VodalProps {
    visible?: ObservableMaybe<boolean>;
    showMask?: ObservableMaybe<boolean>;
    closeOnEsc?: ObservableMaybe<boolean>;
    closeMaskOnClick?: ObservableMaybe<boolean>;
    showCloseButton?: ObservableMaybe<boolean>;
    animation?: ObservableMaybe<string>;
    enterAnimation?: ObservableMaybe<string>;
    leaveAnimation?: ObservableMaybe<string>;
    duration?: ObservableMaybe<number>;
    className?: JSX.Class;
    customStyles?: ObservableMaybe<CSSProperties>;
    customMaskStyles?: ObservableMaybe<CSSProperties>;
    onClose?: (event?: any) => void;
    onAnimationEnd?: () => void;
    id?: string;
    children?: JSX.Children;
}
export declare const Vodal: (props: VodalProps) => JSX.Child;
export {};
