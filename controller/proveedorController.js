const Proveedor = require('../models/Proveedor');

//POST
exports.agregarProveedor = async (req, res) => {
    try {
        let proveedores;
        proveedores = new Proveedor(req.body);
        await proveedores.save();
        res.send(proveedores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear el proveedor');
    }
};

//GET all
exports.mostrarProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.json(proveedores)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al mostrar los proveedores');
    }
};

//GET by id
exports.mostrarProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);
        res.json(proveedor);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al mostrar el proveedor');
    }
}

//PUT
exports.actualizarProveedores = async (req, res) => {
    try {
        const proveedor = await Proveedor.findOneAndUpdate({ _id: req.params.id }, req.body);
        if (!proveedor) {
            res.status(404).send('Proveedor no encontrado');
        } else {
            res.json(proveedor);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar proveedor');
    }
};

//DELETE
exports.eliminarProveedor = async (req, res) => {
    try {
        let proveedor = await Proveedor.findById(req.params.id);
        if (!proveedor) {
            return res.status(404).send('Proveedor no encontrado');
        } else {
            await Proveedor.findOneAndDelete({ _id: req.params.id });
            res.json({ msg: 'El proveedor ha sido eliminado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el proveedor')
    }
}