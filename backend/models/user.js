import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        const urlRegex = /^\S+@\S+\.\S+$/;
        return urlRegex.test(value);
      },
      message: (props) => `${props.value} no es un correo válido`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },
  avatar: {
    type: String,
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
    validate: {
      validator: (value) => {
        // Expresión regular para validar el enlace del avatar
        const urlRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-_~:/?%#[\]@!$&'()*+,;=.]+$/;
        return urlRegex.test(value);
      },
      message: 'El enlace del avatar no es válido',
    },
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Correo o contraseña incorrecta'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Correo o contraseña incorrecta'));
        }
        return user;
      });
    });
};

const User = mongoose.model('user', userSchema);
export default User;
