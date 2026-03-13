/**
 * Lab & Equipment profile content and PDF generation.
 * Profile is defined in code; PDF is generated on demand when user clicks Download.
 */

import { jsPDF } from "jspdf";

const MARGIN = 20;
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const LINE_HEIGHT = 6;
const SECTION_GAP = 10;
const TITLE_SIZE = 18;
const HEADING_SIZE = 14;
const SUBHEADING_SIZE = 11;
const BODY_SIZE = 10;

/** Profile content — all text is defined here */
export const PROFILE_CONTENT = {
  title: "LAB & EQUIPMENT",
  subtitle: "Electronics, Tools & Rental",
  intro:
    "A single view of our electronics trainers, digital logic systems, equipment & tools, and specialized rental services. N-SETS provides industrial electronics, power electronics, and electric machines trainers for education and labs.",

  electronics: {
    label: "TRAINERS & SYSTEMS",
    heading: "Electronics",
    intro:
      "Industrial electronics, power electronics, and electric machines trainers for education and labs — from PLC systems to transformer design.",

    industrialElectronicsCategory: "Industrial Electronics Category",
    plc: {
      title: "PLC Trainer",
      trainerCharacteristics: [
        "Block Diagram",
        "Inputs",
        "Digital Inputs",
        "Digital Inputs Wiring",
        "Digital Outputs",
        "Digital Output Wiring",
        "Analog Inputs",
        "Analog Input Wiring",
        "Analog Outputs",
        "Analog Outputs Wiring",
        "Sample Connections",
      ],
      memoryMap: [
        "Input/Output Relay",
        "Internal Relay",
        "Timers",
        "Counters",
        "Data registers",
        "File registers",
        "Index Registers",
      ],
      systemConfig: [
        "CPU components",
        "PLC Indicators",
        "I/O Indicators",
        "Peripheral port",
        "RS 232",
        "Battery",
        "Expansion Connector",
      ],
    },

    powerElectronicsCategory: "Power Electronics Category",
    powerElectronics: {
      title: "Power Electronics Trainer",
      intro:
        "The PE-1000 offers experiment for fundamental-level topics of a Power Electronics course. It enables the student to acquire a clear experimental view of the basic concepts and, further, they will be familiar with the operative aspects of the work in the Power Electronics laboratory.",
      listOfModules: [
        "DC Power Supply Module",
        "SCR, DIAC, TRIAC IGBT Module",
        "Uncontrolled Rectifiers Module",
        "BUCK Module",
        "BOOST Module",
        "BUCK BOOST Module",
        "FLYBACK Module",
        "H BRIDGE Module",
        "Controlled Rectifiers Module",
        "POWER CONTROL Module",
        "MOSFET DRIVER Module",
        "SCR DRIVER Module",
        "APPLICATION MODULE",
        "LOAD Module",
      ],
    },

    electricMachinesCategory: "Electric Machines Category",
    transformer: {
      title: "Basic Transformer Trainer",
      intro:
        "Transformer is a major part of any linear power supply. To become familiar with this part here is a complete system in which complete transformer design is demonstrated with state of the art technology. We give complete basics as well as students at the end come up with a good working prototype.",
      mainAspects: [
        "Basic design parameters to set upon: Turn ratio calculation",
        "Core material selection",
        "Losses in different areas",
        "Full load / No load calculations",
        "Power input power output calculations",
        "Wattage of the device",
        "Design optimization",
        "Lamination and air gap covering",
      ],
      features: [
        "Single-Phase Multiple turn Transformer 3A",
        "2 Digital Volt Meter",
        "2 Digital Current Meter",
        "Resistive Load Bank with selector switch to vary Resistive Load",
        "Main Isolator",
        "Flexible to Used as 3-Phase Transformer Trainer",
      ],
    },
  },

  digitalLogic: {
    label: "DIGITAL LOGIC DESIGN",
    heading: "Digital Logic Design Trainer",
    intro:
      "Digital Logic Design Trainer is a major part of Digital Lab. To become familiar with this part here is a complete system in which Digital Logic Design Trainer is a comprehensive and self-contained system suitable for anyone engaged in digital logic experiments. All necessary equipments for digital logic experiments such as power supply, signal generator, switches and displays are installed on the main unit.",
    mainAspects: [
      "Suitable for combinational logic, sequential logic, and microprocessor circuit experimentation and Design.",
      "Ideal tool for learning the basics of digital logic circuits.",
      "Integrated training system, with complete curriculum.",
      "Comprehensive power supply, signal supply, and testing devices for convenient experimentation.",
      "Expandability and flexibility of experiments greatly increased by large breadboard.",
      "Use with TTL, CMOS, NMOS, PMOS and ECL circuits.",
      "All supplies equipped with overload protection.",
    ],
    features: [
      "Power Switch with Inner Light Indicator",
      "Input Power Supply Power Supply 110/220V AC ±10% 50/60Hz & Fuse Protected",
      "Fixed DC Power Supply Voltage range: +5V, -5V, +12V and -12V",
      "Maximum current output: 1A for +5V rail, 300mA for others",
      "Output overload Protection (Fuses)",
      "Logic Switches with +5V",
      "Logic Switches with Inverted Output",
    ],
  },

  fpga: {
    heading: "FPGA Board (Field Programmable Gate Array)",
    intro:
      "The Nexys-2 is a powerful digital system design platform built around a Xilinx Spartan 3E FPGA. With 16Mbytes of fast SDRAM and 16Mbytes of Flash ROM, the Nexys-2 is ideally suited to embedded processors like Xilinx's 32-bit RISC Microblaze™. The on-board high-speed USB2 port, together with a collection of I/O devices, data ports, and expansion connectors, allow a wide range of designs to be completed without the need for any additional components.",
    aspects: [
      "IC: Xilinx Spartan-3E FPGA, 500K or 1200K gates",
      "Connector(s): USB2 Port, Hirose FX2, Four 12-pin Pmod connectors, VGA, PS/2, and serial ports",
      "Programming: Diligent USB2 port providing board power, programming, and data transfers",
    ],
    features: [
      "Xilinx Spartan-3E FPGA, 500K or 200K gate",
      "USB2 port providing board power, device configuration, and high-speed data transfers",
      "Works with ISE/Webpack and EDK",
      "16MB fast Micron PSDRAM",
      "16MB Intel StrataFlash Flash R",
      "Xilinx Platform Flash ROM",
      "50MHz oscillator, plus a socket for a second oscillator",
      "75 FPGA I/O's routed to expansion connectors (one high-speed Hirose FX2 connector with 43 signals and four 2+6 Pmod connectors)",
      "All I/O signals are ESD and short-circuit protected, ensuring a long operating life in any environment.",
      "On-board I/O includes eight LEDs, four-digit seven-segment display, four pushbuttons, eight slide switches",
      "Ships in a DVD case with a high-speed USB2 cable",
    ],
  },

  equipmentTools: {
    label: "SUPPLY & SOLUTIONS",
    heading: "Equipment & Tools",
    intro:
      "Industrial and educational equipment and precision tools — backed by strong R&D and trusted by leading organizations across Pakistan.",
    industrial: {
      title: "Industrial Equipment & Tools",
      points: [
        "Machinery, fabrication tools, and production systems",
        "Technical support and after-sales service",
      ],
    },
    educational: {
      title: "Educational Equipment & Tools",
      points: [
        "Lab and training equipment for institutes and vocational centers",
        "Installation, training, and compliance support",
      ],
    },
  },

  rental: {
    label: "RENTAL SOLUTIONS",
    heading: "Equipment Rental Services",
    intro:
      "High-performance test and measurement equipment for research and industry — flexible terms, calibrated and ready to use.",
    availableEquipment: [
        "40 GHz VNA",
        "Spectrum Analyzer",
        "110 GHz VNA (Update in Process)",
        "Probe Station (Update in Process)",
      ],
    whyChoose: [
      "Top-Quality Equipment — Access state-of-the-art Keysight and R&S VNAs and Spectrum Analyzers.",
      "Flexible Rental Periods — Rent from 1 month up to 1 year.",
      "Affordable and Convenient — Save on capital expenses; quick delivery and setup assistance.",
      "Dedicated Support — Equipment calibrated and ready; seamless integration into your research.",
    ],
    contact:
      "Universities, research institutions, and industrial labs rely on our rental services for high-frequency research, advanced communication testing, and temporary access to calibrated equipment. Get in touch for availability, pricing, and rental terms.",
  },
} as const;

function addSectionTitle(doc: jsPDF, y: number, text: string): number {
  doc.setFontSize(HEADING_SIZE);
  doc.setFont("helvetica", "bold");
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
  lines.forEach((line: string) => {
    if (y > PAGE_HEIGHT - MARGIN - 15) {
      doc.addPage();
      y = MARGIN;
    }
    doc.text(line, MARGIN, y);
    y += LINE_HEIGHT;
  });
  return y + SECTION_GAP * 0.5;
}

function addSubheading(doc: jsPDF, y: number, text: string): number {
  doc.setFontSize(SUBHEADING_SIZE);
  doc.setFont("helvetica", "bold");
  if (y > PAGE_HEIGHT - MARGIN - 15) {
    doc.addPage();
    y = MARGIN;
  }
  doc.text(text, MARGIN, y);
  return y + LINE_HEIGHT + 2;
}

function addBody(doc: jsPDF, y: number, text: string): number {
  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "normal");
  const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
  for (const line of lines) {
    if (y > PAGE_HEIGHT - MARGIN - 10) {
      doc.addPage();
      y = MARGIN;
    }
    doc.text(line, MARGIN, y);
    y += LINE_HEIGHT;
  }
  return y + 4;
}

function addBullets(doc: jsPDF, y: number, items: readonly string[]): number {
  doc.setFontSize(BODY_SIZE);
  doc.setFont("helvetica", "normal");
  for (const item of items) {
    const lines = doc.splitTextToSize(`• ${item}`, CONTENT_WIDTH - 6);
    for (const line of lines) {
      if (y > PAGE_HEIGHT - MARGIN - 10) {
        doc.addPage();
        y = MARGIN;
      }
      doc.text(line, MARGIN + 4, y);
      y += LINE_HEIGHT;
    }
    y += 1;
  }
  return y + 4;
}

/** Generate the Lab & Equipment profile PDF and return as a Blob */
export function generateLabEquipmentProfilePdf(): Blob {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  doc.setFontSize(TITLE_SIZE);
  doc.setFont("helvetica", "bold");
  doc.text(PROFILE_CONTENT.title, MARGIN, y);
  y += LINE_HEIGHT + 4;
  doc.setFontSize(HEADING_SIZE);
  doc.text(PROFILE_CONTENT.subtitle, MARGIN, y);
  y += LINE_HEIGHT + SECTION_GAP;
  y = addBody(doc, y, PROFILE_CONTENT.intro);
  y += SECTION_GAP;

  // Electronics — aligned with reference: Industrial Electronics, Power Electronics, Electric Machines
  y = addSectionTitle(doc, y, `${PROFILE_CONTENT.electronics.label} — ${PROFILE_CONTENT.electronics.heading}`);
  y = addBody(doc, y, PROFILE_CONTENT.electronics.intro);
  y += SECTION_GAP;

  // Industrial Electronics Category → PLC Trainer
  y = addSectionTitle(doc, y, PROFILE_CONTENT.electronics.industrialElectronicsCategory);
  y = addSubheading(doc, y, PROFILE_CONTENT.electronics.plc.title);
  y = addSubheading(doc, y, "Trainer Characteristics");
  y = addBullets(doc, y, PROFILE_CONTENT.electronics.plc.trainerCharacteristics);
  y = addSubheading(doc, y, "Onboard PLC Memory Map");
  y = addBullets(doc, y, PROFILE_CONTENT.electronics.plc.memoryMap);
  y = addSubheading(doc, y, "Onboard PLC System Configuration");
  y = addBullets(doc, y, PROFILE_CONTENT.electronics.plc.systemConfig);
  y += SECTION_GAP;

  // Power Electronics Category → Power Electronics Trainer
  y = addSectionTitle(doc, y, PROFILE_CONTENT.electronics.powerElectronicsCategory);
  y = addSubheading(doc, y, PROFILE_CONTENT.electronics.powerElectronics.title);
  y = addBody(doc, y, PROFILE_CONTENT.electronics.powerElectronics.intro);
  y = addSubheading(doc, y, "List Of Modules");
  y = addBullets(doc, y, PROFILE_CONTENT.electronics.powerElectronics.listOfModules);
  y += SECTION_GAP;

  // Electric Machines Category → Basic Transformer Trainer
  y = addSectionTitle(doc, y, PROFILE_CONTENT.electronics.electricMachinesCategory);
  y = addSubheading(doc, y, PROFILE_CONTENT.electronics.transformer.title);
  y = addBody(doc, y, PROFILE_CONTENT.electronics.transformer.intro);
  y = addSubheading(doc, y, "Main Aspects");
  y = addBullets(doc, y, PROFILE_CONTENT.electronics.transformer.mainAspects);
  y = addSubheading(doc, y, "Features");
  y = addBullets(doc, y, PROFILE_CONTENT.electronics.transformer.features);
  y += SECTION_GAP;

  // Digital Logic Design
  y = addSectionTitle(doc, y, `${PROFILE_CONTENT.digitalLogic.label} — ${PROFILE_CONTENT.digitalLogic.heading}`);
  y = addBody(doc, y, PROFILE_CONTENT.digitalLogic.intro);
  y = addSubheading(doc, y, "Main Aspects");
  y = addBullets(doc, y, PROFILE_CONTENT.digitalLogic.mainAspects);
  y = addSubheading(doc, y, "Features");
  y = addBullets(doc, y, PROFILE_CONTENT.digitalLogic.features);
  y += SECTION_GAP;

  // FPGA
  y = addSectionTitle(doc, y, PROFILE_CONTENT.fpga.heading);
  y = addBody(doc, y, PROFILE_CONTENT.fpga.intro);
  y = addSubheading(doc, y, "Main Aspects");
  y = addBullets(doc, y, PROFILE_CONTENT.fpga.aspects);
  y = addSubheading(doc, y, "Features");
  y = addBullets(doc, y, PROFILE_CONTENT.fpga.features);
  y += SECTION_GAP;

  // Equipment & Tools
  y = addSectionTitle(doc, y, `${PROFILE_CONTENT.equipmentTools.label} — ${PROFILE_CONTENT.equipmentTools.heading}`);
  y = addBody(doc, y, PROFILE_CONTENT.equipmentTools.intro);
  y = addSubheading(doc, y, PROFILE_CONTENT.equipmentTools.industrial.title);
  y = addBullets(doc, y, PROFILE_CONTENT.equipmentTools.industrial.points);
  y = addSubheading(doc, y, PROFILE_CONTENT.equipmentTools.educational.title);
  y = addBullets(doc, y, PROFILE_CONTENT.equipmentTools.educational.points);
  y += SECTION_GAP;

  // Rental
  y = addSectionTitle(doc, y, `${PROFILE_CONTENT.rental.label} — ${PROFILE_CONTENT.rental.heading}`);
  y = addBody(doc, y, PROFILE_CONTENT.rental.intro);
  y = addSubheading(doc, y, "Available Equipment (Rental Inventory)");
  y = addBullets(doc, y, PROFILE_CONTENT.rental.availableEquipment);
  y = addSubheading(doc, y, "Why Choose Our Rental Services");
  y = addBullets(doc, y, PROFILE_CONTENT.rental.whyChoose);
  y = addBody(doc, y, PROFILE_CONTENT.rental.contact);

  return doc.output("blob");
}
