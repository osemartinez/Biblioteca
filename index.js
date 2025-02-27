
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

