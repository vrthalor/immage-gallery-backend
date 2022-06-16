//External imports
const Joi = require('@hapi/joi');
const _ = require('lodash');

//Custom Imports
const constants = require('../utils/constants');

//Initialize validator
module.exports = (schema) => (req, res, next) => validate(schema, req, res, next);

/**
 * To validate schema
 * @param schema
 * @param req
 * @param res
 * @param next
 */
let validate = async (schema, req, res, next) =>{
    console.log(req.body)
    //Extract request data
    const data = extractor(req, schema);
    console.log("after extractor.....................")
    try {
        // Validate request
        const validatedData = await Joi.validate(data, schema, { stripUnknown: { objects: true } });

        // Replace req with the valid data after validation
        assigner(validatedData, req);

        next();
    }catch (error) {
        return res.status(constants.BAD_REQUEST.code).json({
            error: true,
            code: constants.BAD_REQUEST.code,
            message: getValidationErrorMessage(error).message || constants.BAD_REQUEST.message,
            data: null
        })
    }
};

/**
 * error
 * @param error
 * @returns {{message: (string|*|void)}}
 */
let getValidationErrorMessage = (error) =>{
    return error.details.map(({ message }) => ({
        message: message.replace(/['"]/g, '')
    }))[0];
};

/**
 * extract data
 * @param req
 * @param schema
 */
let extractor = (req, schema) =>{
    const data = {};

    for(let property of ['params', 'body', 'query']){
        if(!_.isEmpty(req[property])){
            data[property] = req[property]
        } else if(schema[property]){
            data[property] = {}
        }
    }

    return data;
};

/**
 * To assign data
 * @param body
 * @param query
 * @param params
 * @param req
 */
let assigner = ({ body, query, params }, req) => {
    if (body) {
        req.body = body;
    }
    if (query) {
        req.query = query;
    }
    if (params) {
        req.params = params;
    }
};