import { ReactNode } from "react";

export type ModalPropTypes = {
    children?: ReactNode;
    className?: string;
    open: boolean;
    title?: string;
    closeModal: () => void;
    size?: "sm" | "lg" | "xl" | "fullscreen" | "default" | "fixed";
    scrollable?: boolean;
    animated?: string,
};

export type OffCanvasTypes = {
    location?: string;
    className?: string;
    isOffCanvasOpen?: Boolean;
    title?: string;
    closeOffCanvas: () => void;
    size?: "sm" | "full" | "half-page" | "quater-full" | "default";
    scrollable?: boolean;
    overlayOpacity?: number;
    animation?: string;
    slideTransitionDuration?: string;
    children?: ReactNode;
}
