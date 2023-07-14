import jwt from 'jsonwebtoken';

const { NODE_ENV, JWT_SECRET } = process.env;

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Error de autorización' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

export default (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // añadir el payload al objeto Request

  next(); // pasar la solicitud más adelante
};
