devices = [
    {"name": "PLC", "ip": "192.168.1.10"},
    {"name": "HMI", "ip": "192.168.1.20"}
]

# Pedir datos al usuario
new_name = input("Ingresa el nombre del dispositivo: ")
new_ip = input("Ingresa la IP del dispositivo: ")

# Agregarlo a la lista como diccionario
devices.append({"name": new_name, "ip": new_ip})

# Imprimir la lista actualizada
print("\n--- Inventario ---")
for device in devices:
    print(f"{device['name']} -> {device['ip']}")
