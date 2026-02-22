import Post from './publi.model.js';

export const createPost = async (req, res) => {
    try {
        const { titulo, categoria, contenido } = req.body;

        const post = await Post.create({
            titulo,
            categoria,
            contenido,
            autorId: req.user.uid
        });

        return res.status(201).json({
            success: true,
            post
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Puede editar la publicacion solo el dueno del post
export const updatePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'No se encontro este post! '
            });
        }

        if (post.autorId !== req.user.uid) {
            return res.status(403).json({
                success: false,
                message: 'Unicamente puedes editar los posts hechos por ti '
            });
        }

        const updated = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.json({
            success: true,
            updated
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//EN CASO NECESARIO, EL DUENO PUEDE ELIMINAR EL POST
//En todos los casos, el usuario puede eliminar sus propios posts
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'No se encontro este post! '
            });
        }

        if (post.autorId !== req.user.uid
        ) {
            return res.status(403).json({
                success: false,
                message: 'NO ESTAS AUTORIZADO '
            });
        }

        await post.deleteOne();

        return res.json({
            success: true,
            message: 'Tu publicación se ha eliminado correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};