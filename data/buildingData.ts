export interface HUDPhase {
    threshold: [number, number];
    title: string;
    subtitle: string;
    details?: string[];
}

export const BUILDING_PHASES: HUDPhase[] = [
    {
        threshold: [0, 0.3],
        title: "Engineering Vision",
        subtitle: "N-SETS Architecture",
        details: ["BLUEPRINT ANALYSIS", "SITE SURVEY ACTIVE", "VISION MAPPING"]
    },
    {
        threshold: [0.3, 0.7],
        title: "Structure Rising",
        subtitle: "Core Engaged",
        details: ["FOUNDATION SECURED", "STEEL INTEGRATION", "CORE SYSTEM ONLINE"]
    },
    {
        threshold: [0.7, 1.0],
        title: "Smart Facility",
        subtitle: "Powered by N-SETS",
        details: ["SOLUTIONS DEPLOYED", "SMART ECOSYSTEM", "OPERATIONAL READY"]
    }
];

export const TOTAL_FRAMES = 242;
export const SCROLL_LENGTH = "500vh";
