export interface HUDPhase {
    threshold: [number, number];
    title: string;
    subtitle: string;
    details?: string[];
}

/** Scroll progress at which HUD phases begin (after welcome fades). */
export const HOME_WELCOME_END_PROGRESS = 0.08;

export const BUILDING_PHASES: HUDPhase[] = [
    {
        threshold: [HOME_WELCOME_END_PROGRESS, 0.36],
        title: "uPVC",
        subtitle: "Strength in Every Frame",
        details: ["222 Series", "632 Series", "750 Series"]
    },
    {
        threshold: [0.36, 0.68],
        title: "Smart Home Solutions",
        subtitle: "Smarter Living Starts Here",
        details: ["Obivo", "Jitech"]
    },
    {
        threshold: [0.68, 1.0],
        title: "N-SETS - Global Innovation",
        subtitle: "Where Innovation Meets Space",
        details: ["uPVC", "Smart Home Solutions", "Training Equipment"]
    }
];

// Number of frames in the primary home-page sequence (newframes3).
export const TOTAL_FRAMES = 293;
export const SCROLL_LENGTH = "500vh";
/** Intro auto-play: seconds per frame at 30 fps. */
export const HOME_FRAME_INTERVAL_S = 1 / 30;
/** Pause on blank frame with welcome text before auto-scroll starts (ms). */
export const HOME_WELCOME_HOLD_MS = 2800;
