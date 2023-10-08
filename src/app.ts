import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import db from "./config/mongo";
import path from 'path';
// import bodyParser from 'body-parser';
import multer from "multer";

// https://www.youtube.com/watch?v=xRXHQlqA3Ak&ab_channel=LeiferMendez

// Actual: https://www.youtube.com/watch?v=T1QFGwOnQxQ&ab_channel=LeiferMendez
// 1:32

const PORT = process.env.PORT || 3001;
const app = express();
const uploadsFolder = path.join(__dirname, 'uploads');
console.log(__dirname);
app.use('/uploads', express.static(uploadsFolder));
// Configurar body-parser para analizar los datos del formulario
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:4200', 'https://jhonarias.github.io/medical-frontend'], // Configura el origen permitido ['https://']
    // methods: ["GET", "POST", "PUT", "DELETE"], // Configura los métodos HTTP permitidos
    // allowedHeaders: ["Content-Type", "Access-Control-Allow-Origin"], // Configura los encabezados permitidos
    credentials: true, // Habilita el intercambio de cookies y credenciales de autenticación
  })
);
app.use(express.json({ limit: '50mb' }));
app.use(router);
db().then(() => console.log("connection is ready"));

app.listen(PORT, () => console.log("server is running for the PORT " + PORT));
