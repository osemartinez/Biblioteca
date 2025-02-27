
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

// Actualizar la información de un libro existente
app.put('/libros/:id', (req, res) =>{
    let id=parseInt(req.params.id);
    let libro=req.body
    let libros = leerLibros();
    let existeLibro = false;

    let libroActualizado;
    libros.forEach(modificarLibro => {
        if(modificarLibro.id === id){
            existeLibro=true;

            if(libro.titulo!=undefined){
                modificarLibro.titulo=libro.titulo;
            }
            if(libro.autor!=undefined){
                modificarLibro.autor=libro.autor;
            }
            if(libro.anio!=undefined){
                modificarLibro.anio=libro.anio;
            }
            if(libro.disponible!=undefined){
                modificarLibro.disponible=libro.disponible;
            }

            libroActualizado=modificarLibro;
        }
    });


    if(existeLibro){
        guardarLibros(libros);
        res.status(200).json({ status: 200, message: 'Libro actualizado', libroActualizado});
    }else{
        res.status(400).json({ status: 400, message: 'Error, el libro con el id ' + id + ' no se encuentra en el archivo'});
    }

});


// Ver todos los libros del archivo
app.get('/libros', (req, res) =>{
    let libros= leerLibros();
    if(libros.length>0){
        res.status(200).json({status:200, message: 'Success', libros});
    }else{
        res.status(400).json({status:400, message: 'No existen libros en la biblioteca...'});
    }
    
});



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

=======

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

