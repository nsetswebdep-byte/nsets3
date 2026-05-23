export type TradingBlock = {
  title: string;
  items: string[];
};

export type TradingSection = {
  id: string;
  title: string;
  subtitle?: string;
  intro?: string;
  blocks?: TradingBlock[];
  bullets?: string[];
  partners?: string[];
  services?: string[];
  application?: string;
  valueProps?: string[];
};

export const TRADING_INTRO = {
  established: "2015",
  tagline: "Chip to Ship",
  description:
    "N-SETS (Pvt.) Ltd. was established in 2015 as a sourcing and trading company. Over the years, it has grown into a dependable trading partner with a strong supplier network and a well-established customer base. We are committed to delivering quality products, fair pricing, and reliable services across multiple industrial sectors.",
  concept:
    "We offer complete industrial solutions covering everything from electronic components to heavy industrial supply, enabling clients to source all requirements from one trusted partner.",
  network:
    "We collaborate with trusted suppliers and manufacturers from the USA, Germany, Turkey, China, and Pakistan. This global network enables us to ensure consistent product quality and timely availability.",
};

export const SUPPLY_COUNTRIES = ["USA", "Germany", "Turkey", "China", "Pakistan"];

export const TRADING_SECTIONS: TradingSection[] = [
  {
    id: "cnc",
    title: "CNC Machines & Tools",
    intro:
      "CNC machines and precision tooling form a key part of our core business. We provide advanced solutions that meet the demands of modern manufacturing and industrial applications.",
    blocks: [
      {
        title: "Product Range",
        items: [
          "CNC Vertical Machining Centers",
          "CNC Horizontal Machining Centers",
          "CNC Lathes",
          "5-Axis CNC Machines",
          "Multi-Tasking Systems",
        ],
      },
      {
        title: "Cutting Tools",
        items: [
          "Carbide End Mills",
          "Drills and Inserts",
          "Reamers",
          "Custom Tooling Solutions",
        ],
      },
    ],
    partners: [
      "KORLOY (South Korea)",
      "Chain HeadWay (Taiwan)",
      "DORMER (United Kingdom, manufactured in Brazil)",
      "EW Equipment (United Kingdom)",
    ],
    services: [
      "Technical Consultation",
      "Machine Installation",
      "Operator Training",
      "Maintenance Support",
      "Application Guidance",
    ],
  },
  {
    id: "electronics",
    title: "Electronics & Automation Solutions",
    intro:
      "We provide a comprehensive range of electronic components and automation products to support modern industrial systems, control applications, and advanced technological requirements.",
    blocks: [
      {
        title: "Electronic Components",
        items: [
          "Industrial-grade electronic components",
          "Discrete semiconductor products",
          "Circuit protection devices",
          "Connectors & interconnect solutions",
        ],
      },
      {
        title: "Automation & Control Accessories",
        items: [
          "Industrial automation accessories",
          "Embedded computers & control modules",
          "Development boards, kits & programmers",
        ],
      },
      {
        title: "Cables, Wiring & Connectivity",
        items: [
          "Industrial cables & wires",
          "Signal and communication wiring",
          "High-performance connectivity solutions",
        ],
      },
      {
        title: "Power & Protection Solutions",
        items: [
          "Line protection systems",
          "Power distribution units",
          "Backup power solutions (UPS systems)",
          "Power supplies",
        ],
      },
      {
        title: "Electromechanical Systems",
        items: [
          "Motors, actuators & solenoids",
          "Drivers & motion control components",
          "Electromechanical devices",
        ],
      },
      {
        title: "Thermal & Hardware Solutions",
        items: [
          "Enclosures & industrial hardware",
          "Cooling fans & thermal management systems",
        ],
      },
      {
        title: "Magnetics & Energy Components",
        items: [
          "Transformers & inductors",
          "Magnetic components for industrial applications",
        ],
      },
      {
        title: "RF, Wireless & Communication",
        items: [
          "RF modules & wireless solutions",
          "Communication devices & systems",
        ],
      },
      {
        title: "Testing, Inspection & Tools",
        items: [
          "Test & measurement instruments",
          "Optical inspection equipment",
          "Soldering, desoldering & rework systems",
          "Industrial tools & equipment",
        ],
      },
      {
        title: "IT & Media Equipment",
        items: [
          "Industrial IT equipment",
          "Media & communication devices",
        ],
      },
    ],
  },
  {
    id: "cables",
    title: "Cable & Connector Solutions",
    intro:
      "We supply high-quality industrial cables and connectors for CNC machines, automation systems, and industrial equipment. Our products ensure reliable connectivity and signal transmission in demanding environments.",
    blocks: [
      {
        title: "Product Range",
        items: [
          "Industrial Power Cables",
          "Servo Motor Cables",
          "Ethernet & Data Cables",
          "Encoder & Hybrid Cables",
          "Shielded Cables",
          "M8 & M12 Connectors",
          "Waterproof Connectors",
        ],
      },
    ],
    application: "CNC Machines · Automation · Industrial Control Panels · Sensors & Actuators",
  },
  {
    id: "electrical",
    title: "Electrical Equipment",
    intro: "We deliver complete electrical and power solutions for industrial and commercial applications.",
    blocks: [
      {
        title: "Control & Automation",
        items: [
          "Pressure & vacuum gauges",
          "Temperature sensors & thermocouples",
          "Flow meters & level indicators",
          "Digital multimeters & analyzers",
        ],
      },
      {
        title: "General Electrical Supplies",
        items: [
          "Switches, sockets & plugs",
          "Conduits & fittings",
          "Earthing & grounding materials",
          "Batteries & UPS systems",
        ],
      },
      {
        title: "Cables & Wiring",
        items: [
          "LV, MV & HV power cables",
          "Control & instrumentation cables",
          "Flexible & armored cables",
        ],
      },
      {
        title: "Lighting Solutions",
        items: [
          "Industrial LED lighting",
          "Street & flood lights",
          "Explosion-proof lighting",
          "Emergency lighting systems",
        ],
      },
    ],
  },
  {
    id: "instruments",
    title: "Industrial Instruments",
    intro:
      "We supply advanced instrumentation for monitoring, control, and safety in industrial environments.",
    blocks: [
      {
        title: "Measurement & Testing Instruments",
        items: [
          "Pressure & vacuum gauges",
          "Temperature sensors & thermocouples",
          "Flow meters & level indicators",
          "Digital multimeters & analyzers",
        ],
      },
      {
        title: "Process Control Instruments",
        items: [
          "PLC (Programmable Logic Controllers)",
          "Control valves & actuators",
          "Process controllers & recorders",
          "Industrial automation modules",
        ],
      },
      {
        title: "Calibration & Monitoring Tools",
        items: [
          "Vibration meters",
          "Sound level meters",
          "Torque meters",
          "Data loggers",
        ],
      },
      {
        title: "Safety & Protection",
        items: [
          "Gas & leak detectors",
          "Fire & smoke alarms",
          "Industrial sirens & alarms",
          "Monitoring & protection systems",
        ],
      },
    ],
  },
  {
    id: "metals",
    title: "Metals & Material Solutions",
    intro:
      "We provide a wide range of industrial metals for manufacturing, construction, and engineering applications.",
    blocks: [
      {
        title: "Ferrous Metals",
        items: [
          "Mild Steel (MS) sheets, bars, rods",
          "Stainless Steel (SS) sheets, coils, pipes",
          "Tool Steel & High-Speed Steel",
        ],
      },
      {
        title: "Non-Ferrous Metals",
        items: [
          "Aluminum sheets, rods, profiles",
          "Copper wires, strips, tubes",
          "Brass & Bronze alloys",
        ],
      },
      {
        title: "Industrial Alloys",
        items: [
          "Nickel-based alloys",
          "Titanium & special-purpose alloys",
          "Heat & corrosion-resistant metals",
        ],
      },
    ],
    valueProps: [
      "Certified quality from trusted mills",
      "Custom sizes, thickness & finishes",
      "Competitive market pricing",
      "Timely delivery & inventory management",
    ],
  },
];
