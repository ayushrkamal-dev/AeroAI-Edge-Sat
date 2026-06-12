'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

export type TelemetryState = {
  temperature: number
  pressure: number
  humidity: number
  airQuality: number
  battery: number
  gpsLock: number
  isCritical: boolean
  missionTime: number
  threatLevel: 'NOMINAL' | 'ELEVATED' | 'CRITICAL'
  alerts: Array<{
    level: 'critical' | 'warning' | 'info'
    title: string
    detail: string
    meta: string
    time: string
  }>
}

const defaultState: TelemetryState = {
  temperature: 22.4,
  pressure: 1012,
  humidity: 45,
  airQuality: 110,
  battery: 100,
  gpsLock: 12,
  isCritical: false,
  missionTime: 0,
  threatLevel: 'NOMINAL',
  alerts: [
    {
      level: 'info',
      title: 'Orbit Adjustment Complete',
      detail: 'AeroAI-01 station-keeping burn nominal',
      meta: 'Δv 0.4 m/s',
      time: 'T-00:00',
    }
  ]
}

const TelemetryContext = createContext<TelemetryState>(defaultState)

export function TelemetryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<TelemetryState>(defaultState)

  useEffect(() => {
    let tick = 0
    const interval = setInterval(() => {
      tick += 1

      setState((prev) => {
        // Red Alert Trigger at 15 seconds!
        const isAnomaly = tick >= 15
        
        let newTemp = prev.temperature + (Math.random() * 0.4 - 0.2)
        let newPressure = prev.pressure + (Math.random() * 2 - 1)
        let newHumidity = prev.humidity + (Math.random() * 1 - 0.5)
        let newAirQuality = prev.airQuality + (Math.random() * 2 - 1)
        let newBattery = Math.max(0, prev.battery - 0.05)
        
        let newThreatLevel = prev.threatLevel
        let newAlerts = [...prev.alerts]

        if (isAnomaly) {
          // Drastic changes during anomaly
          newAirQuality += 150 // Massive spike
          newTemp += 1.5
          newThreatLevel = 'CRITICAL'
          
          // Add the critical alert only once when anomaly starts
          if (!prev.isCritical) {
            newAlerts = [
              {
                level: 'critical',
                title: 'CRITICAL ANOMALY DETECTED',
                detail: 'Toxic Gas Plume detected via TinyML Edge Inference',
                meta: 'CO₂ / CH₄ SPIKE',
                time: `T+00:${tick.toString().padStart(2, '0')}`,
              },
              ...newAlerts
            ]
          }
        }

        return {
          ...prev,
          missionTime: tick,
          isCritical: isAnomaly,
          threatLevel: newThreatLevel,
          temperature: Number(newTemp.toFixed(1)),
          pressure: Math.round(newPressure),
          humidity: Math.round(newHumidity),
          airQuality: Math.round(newAirQuality),
          battery: Number(newBattery.toFixed(1)),
          alerts: newAlerts.slice(0, 3) // Keep top 3
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <TelemetryContext.Provider value={state}>
      {children}
    </TelemetryContext.Provider>
  )
}

export function useTelemetry() {
  return useContext(TelemetryContext)
}
