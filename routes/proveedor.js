const express = require('express');
const router = express.Router();
const proveedorController = require('../controller/proveedorController');


router.post('/', proveedorController.agregarProveedor);
router.get('/', proveedorController.mostrarProveedores);
router.get('/:id', proveedorController.mostrarProveedor);
router.put('/:id', proveedorController.actualizarProveedores);
router.delete('/:id', proveedorController.eliminarProveedor);


module.exports = router;
