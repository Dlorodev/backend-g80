const Cliente = require('../models/Cliente');

//funcion agregar clientes
exports.agregarClientes = async (req, res) => {
    try {
        let clientes;
        clientes = new Cliente(req.body);
        await clientes.save();
        res.send(clientes)

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al agregar el cliente')
    }
};

//funcion para mostrar clientes
exports.mostrarClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al mostrar los clientes');
    }
};

//funcion para buscar un cliente
exports.buscarCliente = async (req, res) => {
    try {

        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            res.status(404).json({ msg: 'No se encuentra el cliente' })
        } else {
            res.send(cliente);
        };

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al consultar los clientes');
    }
};

//funcion para actualizar cliente con el metodo PUT
exports.actualizarClientes = async (req, res) => {
    try {
        const cliente = await Cliente.findOneAndUpdate({ _id: req.params.id }, req.body);
        if (!cliente) {
            res.status(404).send('Cliente no encontrado');
        } else {
            res.json(cliente);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar cliente');
    }
};

//function para modificar cliente con el metodo PATCH
exports.modificarClientes = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cliente) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al actualizar cliente')
    }
};

//funcion para eliminar un cliente
exports.eliminarCliernte = async (req, res) => {
    try {
        let cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).send('Cliente no encontrado');
        } else {
            await Cliente.findOneAndDelete({ _id: req.params.id });
            res.json({ msg: 'El cliente ha sido eliminado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar el cliente')
    }
}







