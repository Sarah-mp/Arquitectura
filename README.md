# Arquitectura

Se instalo el node.js
el pastman



import express from  'express';
import fileUpload from 'express-fileupload';

const app = express()

app.use(express.json());

app.use(fileUpload());

app.listen(3000, () => {
    console.log('Activo');
})

app.get('/', (req, res) => {
    return res.status(200).send();
})

app.post('/', (req, res) => {
    const {body} = req;
    console.log(body);
    if (body.usuario === 'sarah' && body.pass === '1013337148'){

        return res.status(200).send();
    }

    return res.status(403).send();
})

app.post('/file', (req,res)=>{
        if(!req.files || req.files.length === 0){
            return console.log("mandar un archivo")
        }
        
        const { files} = req;
        const file = files.holii;
        console.log(file.name)

        if(file.name !="holii2.0")
            return console.log("aaaa")

        return res.status(200).send();

//buscar la fomra del que el servidor guarde el archivo y validar el nombre de archivo que selecionamos 
//hasme una validadción que espere un nombre de archivo especifico
})


export default app;


FROM node:20

WORKDIR /app

COPY index.js /app/ 
COPY package.json /app/
COPY package-lock.json /app/

ENV PORT=3000

RUN cd /app
RUN npm install

EXPOSE $PORT

ENTRYPOINT ["node", "index.js"]


