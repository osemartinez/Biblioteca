const express= require('express');
const app=express();
const PORT = 3000;

// Leer un archivo
const fs=require('fs');

// Leer el archivo Json
function leerLibros(){
    const data = fs.readFileSync("libros.json", "utf-8");
    return JSON.parse(data);
}

// Guardar en el archivo Json
function guardarLibros(clibros){
    fs.writeFileSync('libros.json', JSON.stringify(clibros,null,2));
}

// Agregar un nuevo libro
app.use(express.json());

function AgregarLibro(libros, libro){
    libros.push(libro);
    guardarLibros(libros);
}

app.post('/libros', (req, res) => {
    let libro = req.body;
    libro.id=Date.now();
    /* Ordenar */
    let libroFinal={id:libro.id, titulo:libro.titulo, autor:libro.autor, anio:libro.anio, disponible:libro.disponible };
    let libros = leerLibros();
    
    AgregarLibro(libros, libroFinal);
    res.status(201).json({ status: 201, message: 'Libro agregado', libroFinal});
});

app.listen(PORT,() =>{
    console.log(`Servidor corriendo en  http://localhost:${PORT}`);
});