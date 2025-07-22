# 1. Definir una variable de tipo string
nombre: str = "Juan"

# Un objeto literal (en Python, es un diccionario)
auto = {
    "marca": "Toyota",
    "modelo": "Corolla",
    "año": 2020,
    "color": "Rojo"
}

# Simulación de una interfaz usando una clase (opcional)
from dataclasses import dataclass

@dataclass
class Auto:
    marca: str
    modelo: str
    año: int
    color: str

# Un array (lista) de objetos
autos: list[Auto] = [
    Auto(marca="Toyota", modelo="Corolla", año=2020, color="Rojo"),
    Auto(marca="Honda", modelo="Civic", año=2019, color="Azul"),
    Auto(marca="Ford", modelo="Focus", año=2021, color="rojo ")
]

# Clonar un objeto y cambiar el color
auto2 = auto.copy()
auto2["color"] = "Azul"

print(auto2)
