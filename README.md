# AeroAI Edge-Sat 🛰️
**AI-Powered Edge Intelligence for Next Generation Environmental Monitoring.**

> **FAR AWAY Hackathon 2026** — *Space & Aerospace Theme Submission*

![AeroAI Dashboard Demo](./dashboard-preview.png)

## 📖 Overview
In deep space missions, bandwidth is extremely expensive. Traditional satellites send thousands of raw data points to Earth just to confirm "systems are nominal." 

**AeroAI Edge-Sat** solves this by moving intelligence to the edge. Our miniature satellite payload (CanSat) uses TinyML to process atmospheric and environmental data directly on-board. It only transmits data when a critical anomaly (like a toxic gas plume or extreme thermal spike) is detected, saving 99% of transmission bandwidth while providing instant threat alerts.

## ✨ Key Features
- **Hardware-AI Integration:** Custom PCB designs optimized for low-power inference.
- **TinyML On-Board:** Embedded neural networks capable of detecting anomalies without a ground-station round trip.
- **3D Ground Control Station:** A premium, real-time web dashboard visualizing live orbital telemetry, satellite position, and AI confidence levels.
- **Automated Threat Detection:** Millisecond response times to environmental hazards.

## ⚙️ Hardware Engineering & CAD
Our CanSat features a custom PCB designed to house the ESP32 DevKit V1, BME280 (Temperature/Pressure/Altitude), and MQ135 (Gas) sensors alongside a custom power regulation circuit (LM2596 + AMS1117).
*   **PCB Specifications:** 80mm x 60mm, 2-Layer, 1.6mm thickness.
*   **3D CAD Enclosure:** The physical CanSat pod was meticulously designed in Fusion360 to house the electronics securely.
*   🔗 **[View our full 3D CAD Design in Fusion360](https://a360.co/4oprqiB)**

## 🏗️ Repository Structure
- `/dashboard` — The Next.js 3D Web Dashboard (Ground Control Station).
- `/hardware` — PCB Schematics, CAD models, and component selections.
- `/edge_ai` — Python scripts simulating the TinyML data generation and anomaly modeling.

## 🚀 Running the Dashboard Locally
1. Navigate to the dashboard directory:
   ```bash
   cd dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the mission control server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) and click **"Open Ground Control"** to see the live telemetry simulation.

## 👥 The Team
- **Ayush** — Software & On-board Processing
- **Ankit** — IoT Embedded & Hardware PCB Design
- **Nishchita** — 3D CAD & Mechanical Design
- **Ashi** — UI/UX & Web Dashboard Design

---
*Built boldly for FAR AWAY 2026.*
