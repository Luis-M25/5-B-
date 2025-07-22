import { promises } from "dns";

//Inicializar una variable
let nombreEstudiante: string = "Juan";  //Usar let en caso de ser reasignada mas adelante
const nombre: string = "Juan"; //Usar const en caso de no ser reasignada mas adelante

//console.log(nombre)

const auto:IAuto= {
    marca:"Chevrolet",
    modelo:"Spark",
    color:"Azul",
};

interface IAuto{
    marca: String,
    modelo: String,
    color: String
} 

const autos: IAuto[]=[
    {
        marca: "Chevrolet",
        modelo: "Camaro",
        color: "Amarillo"
    },
    {
        marca: "Chevrolet",
        modelo: "Spark",
        color: "Gris"
    },
    {
        marca: "Chevrolet",
        modelo: "Aveo",
        color: "Negro"
    },
]

autos.push(auto);

function agregarAuto1(auto:IAuto){
    autos.push(auto);
}

agregarAuto1(auto)
agregarAuto1({
    marca: "Chevrolet",
    modelo: "Aveo",
    color: "Negro"
})

function agregarAuto2(auto:IAuto, callback:(auto:IAuto)=>void):void{
    autos.push(auto);
    callback(auto)
}

agregarAuto2({
    marca: "Chevrolet",
    modelo: "Aveo",
    color: "Gris"
},
    (auto:IAuto)=>{
        //console.log("Auto agregado", auto)
    }
)

function agregarAuto3(auto:IAuto):Promise<IAuto>{
    return new Promise((resolve) => {
        autos.push(auto);
        resolve(auto)
    })
}

agregarAuto3(auto).then((auto)=>{
    //console.log("Auto agregado", auto)
}).catch((error)=>{
    console.log("Error", error)
}).finally(()=>{
    //console.log("Proceso terminado")
})

async function main(){
    try{   
        const autox = await agregarAuto3(auto)
        console.log("Auto agregado", autox)
    }
    catch(error){
        console.log("Error", error)
    }
    finally{
        console.log("Proceso terminado")
    } 
}
main()