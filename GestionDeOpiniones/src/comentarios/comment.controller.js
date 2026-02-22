import Comment from './comment.model.js';
import Post from '../publicaciones/publi.model.js';


//Funcion para crear el comentario
// Se utiliza el ID de la publi para referenciarse de ella
export const createComment = async (req, res) => {
    try {
        const { contenido } = req.body;
        const { postId } = req.params;

        const postExists = await Post.findById(postId);

        if (!postExists) {
            return res.status(404).json({
                success: false,
                message: 'El post no existe '
            });
        }

        const comment = await Comment.create({
            contenido,
            postId,
            autorId: req.user.uid
        });

        return res.status(201).json({
            success: true,
            comment
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Funcion para que solo el dueno pueda editar su comentario
export const updateComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado...'
            });
        }

        if (comment.autorId !== req.user.uid) {
            return res.status(403).json({
                success: false,
                message: 'Solo puedes editar tus propios comentarios'
            });
        }

        comment.contenido = req.body.contenido || comment.contenido;
        await comment.save();

        return res.json({
            success: true,
            comment
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//Funcion para que el dueno del comentario pueda eliminarlo
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: 'Comentario no encontrado '
            });
        }

        if (comment.autorId !== req.user.uid) {
            return res.status(403).json({
                success: false,
                message: 'No estás autorizado para eliminar este comentario '
            });
        }

        await comment.deleteOne();

        return res.json({
            success: true,
            message: 'Comentario eliminado satisfactoriamente!'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};