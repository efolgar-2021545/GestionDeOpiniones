import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    titulo: {
        type: String,
        required: [true, 'ES NECESARIO UN TITULO =8']
    },
    categoria: {
        type: String,
        required: [true, 'INGRESA UN CATEGORIA ']
    },
    contenido: {
        type: String,
        required: [true, 'Tu post no puede ir vacio ']
    },
    autorId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default model('Post', postSchema);