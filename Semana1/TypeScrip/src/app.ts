// recordotorio de variables en ts
// 1. Definir una variable de tipo string

const nombre: string = "Juan"

//un objeto literal
 const auto = {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2020,
    color: "Rojo"
}

// el objeto literal a una interfaz
interface IAuto {
    marca: string,
    modelo: string,
    año: number,
    color: string
}
// un array de objetos
const autos: IAuto[] = [
    {marca: "Toyota", modelo: "Corolla", año: 2020, color: "Rojo"},
    {marca: "Honda", modelo: "Civic", año: 2019, color: "Azul"},
    {marca: "Ford", modelo: "Focus", año: 2021, color:"rojo "}
]

// clonear un objeto
const auto2: IAuto = {...auto, color: "Azul"}
console.log(auto2)