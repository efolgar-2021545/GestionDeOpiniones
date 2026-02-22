import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
    contenido: {
        type: String,
        required: [true, 'El comentario es obligatorio ']
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    autorId: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default model('Comment', commentSchema);