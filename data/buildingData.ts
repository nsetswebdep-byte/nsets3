export interface HUDPhase {
    threshold: [number, number];
    title: string;
    subtitle: string;
    details?: string[];
}

export const BUILDING_PHASES: HUDPhase[] = [
    {
        threshold: [0, 0.3],
        title: "NSETS - Global Innovation",
        subtitle: "Where Innovation Meets Space",
        details: ["uPVC", "Smart Home Solutions", "Training Equipment"]
    },
    {
        threshold: [0.3, 0.7],
        title: "uPVC",
        subtitle: "Strength in Every Frame",
        details: ["222 Series", "632 Series", "750 Series"]
    },
    {
        threshold: [0.7, 1.0],
        title: "Smart Home Solutions",
        subtitle: "Smarter Living Starts Here",
        details: ["Obivo", "Jitech"]
    }
];

// Number of frames in the primary home-page sequence (newframes3).
export const TOTAL_FRAMES = 293;
export const SCROLL_LENGTH = "500vh";
