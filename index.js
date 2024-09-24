import express from 'express';
import fileUpload from 'express-fileupload';
import path from 'path';
import fs from 'fs';

const app = express();

app.use(express.json());
app.use(fileUpload());

app.listen(3000, () => {
    console.log('Servidor activo en el puerto 3000');
});

app.get('/', (req, res) => {
    return res.status(200).send();
});

app.post('/', (req, res) => {
    const { body } = req;
    console.log(body);
    if (body.usuario === 'sarah' && body.pass === '1013337148') {
        return res.status(200).send();
    }
    return res.status(403).send();
});

// Ruta para subir y validar el archivo
app.post('/file', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("Por favor, sube un archivo");
    }

    const { files } = req;
    const file = files.holii; // El nombre del archivo en el formulario debe ser "holii"
    console.log(file.name);

    // Validar el nombre del archivo
    const expectedFileName = "holii2.0";
    if (file.name !== expectedFileName) {
        return res.status(400).send(`El nombre del archivo debe ser "${expectedFileName}"`);
    }

    // Ruta donde guardar el archivo
    const uploadPath = path.join(__dirname, 'uploads', file.name);

    // Asegurarse de que la carpeta 'uploads' exista
    if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
    }

    // Guardar el archivo en la carpeta 'uploads'
    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send("Error al guardar el archivo");
        }
        return res.status(200).send("Archivo subido y guardado correctamente");
    });
});

export default app;
