const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description menambah data
 *  @method GET /add-employee
 */
route.get('/add-employee', services.add_employee)

/**
 *  @description untuk meng-update data karyawan
 *  @method GET /update-employee
 */
route.get('/update-employee', services.update_employee)


// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route