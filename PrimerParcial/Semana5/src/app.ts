import express,{Request, Response} from "express";

const app = express();
const puerto = 2500;
app.use(express.json());
interface IMascota {
    nombre: string;
    edad: number;
    raza: string;
}
const mascotas: IMascota[] = [
    {
        nombre: "Firulais",
        edad: 5,
        raza: "Labrador"
    },
    {
        nombre: "Miau",
        edad: 3,
        raza: "Siames"
    },
    {
        nombre: "Perrito",
        edad: 2,
        raza: "Bulldog"
    }
];

app.get("/mascota", (req:Request, res:Response) => {
    res.json(mascotas);
})

app.get("/mascota/:nombre", (req:Request, res:Response) => {
    const {nombre}=req.params
    const mascotaEncontrada=mascotas.find((elemento)=>{
        return elemento.nombre === nombre;
    })
    res.json(mascotaEncontrada);
})
app.post("/mascota", (req:Request, res:Response) => {
    const mascota=req.body
    mascotas.push(mascota)
    res.json(req.body);

})
app.put("/mascota/:nombre", (req:Request, res:Response) => {
    const {nombre}=req.params
    const mascota=req.body
    const mascotaEncontrada=mascotas.find((elemento)=>{
        return elemento.nombre === nombre;
    })
    if (!mascotaEncontrada) {
        res.status(404).json({error:"Mascota no encontrada"});
        return;
    }
    mascotaEncontrada.edad=mascota.edad
    mascotaEncontrada.raza=mascota.raza
    res.json(mascotaEncontrada);
})
app.delete("/mascota/:nombre", (req:Request, res:Response) => {
    const {nombre}=req.params
    const mascotaEncontrada=mascotas.find((elemento)=>{
        return elemento.nombre === nombre;
    })
    if(!mascotaEncontrada){
        res.status(404).json({error:"Mascota no encontrada"});
        return;
    }
    mascotas.splice(mascotas.indexOf(mascotaEncontrada),1);
    res.json(mascotaEncontrada);


})

app.listen(puerto, () => {
    console.log(`Servidor corriendo`);
}); 



























