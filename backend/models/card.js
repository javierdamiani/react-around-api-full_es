import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Validar el enlace utilizando la expresión regular del esquema de usuario
        const userAvatarUrlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_~:/?%#[\]@!$&'()*+,;=.]+$/;
        return userAvatarUrlRegex.test(value);
      },
      message: 'El enlace de la imagen no es válido',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const card = mongoose.model('card', cardSchema);
export default card;
