import time
import random
import json

def simulate_telemetry():
    """
    Simulates live telemetry data from the AeroAI CanSat.
    This acts as our 'TinyML / On-board processing' simulation for the video demo.
    """
    print("Starting AeroAI Edge-Sat Telemetry Simulation...")
    altitude = 5000.0 # Starting altitude in meters
    
    while altitude > 0:
        # Simulate sensor readings
        temp = round(random.uniform(-10.0, 40.0), 2)
        pressure = round(random.uniform(800.0, 1050.0), 2)
        gas_co2 = round(random.uniform(400.0, 850.0), 2)
        altitude -= random.uniform(5.0, 15.0) # Descending
        
        # Simple Edge AI anomaly detection logic
        anomaly = False
        alert_msg = "All Systems Nominal"
        
        if gas_co2 > 800:
            anomaly = True
            alert_msg = "CRITICAL: High CO2 detected in atmosphere!"
        elif temp > 35:
            anomaly = True
            alert_msg = "WARNING: High thermal reading!"
        elif pressure < 820:
            anomaly = True
            alert_msg = "WARNING: Unexpected pressure drop!"
            
        data = {
            "timestamp": time.strftime("%H:%M:%S"),
            "altitude_m": round(altitude, 2),
            "temperature_c": temp,
            "pressure_hpa": pressure,
            "co2_ppm": gas_co2,
            "anomaly_detected": anomaly,
            "alert": alert_msg
        }
        
        # In a real scenario, this would be sent via LoRa. 
        # For our demo, we just print it as JSON so our Web Dashboard can read it.
        print(json.dumps(data))
        time.sleep(1) # Send data every 1 second

    print("Touchdown. Simulation ended.")

if __name__ == "__main__":
    try:
        simulate_telemetry()
    except KeyboardInterrupt:
        print("\nSimulation stopped manually.")
