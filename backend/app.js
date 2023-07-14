import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { celebrate, Joi, errors } from 'celebrate';
import usersRoutes from './routes/users.js';
import cardRoutes from './routes/cards.js';
import auth from './middlewares/auth.js';
import { login, createUser } from './controllers/users.js';
import { requestLogger, errorLogger } from './middlewares/logger.js';

const app = express();

// Conexión a MongoDB
mongoose
  .connect('mongodb://localhost:27017/aroundb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Conexión exitosa a MongoDB');
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });

// Middleware para analizar el cuerpo de la solicitud en formato JSON
app.use(express.json());
app.use(cors());
app.options('*', cors());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  createUser,
);

app.use(auth);

app.use('/users', usersRoutes);

app.use('/cards', cardRoutes);

app.use(errorLogger);

app.use(errors());

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

// Middleware para manejar la ruta raíz
app.use('/', (req, res) => {
  res.status(500).send({ message: 'Recurso solicitado no encontrado' });
});

// Middlerware para manejar errores
const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({
      message:
        'Se pasaron datos inválidos a los métodos para crear un usuario/tarjeta o actualizar el avatar/perfil de un usuario.',
    });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(404).send({
      message:
        'No existe un usuario con el id solicitado o la solicitud se envió a una dirección inexistente;',
    });
  }
  if (err.code === 11000) {
    return res.status(409).send({
      message:
        'Al registrarse, se especificó un correo electrónico que ya existe en el servidor',
    });
  }
  console.log(err);
  res.status(500).send({ message: 'Se ha producido un error en el servidor' });
};

app.use(errorHandler);

// Inicio del servidor
app.listen(3001, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
