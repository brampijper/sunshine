const Joi = require('@hapi/joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object ({
            email: Joi.string()
                .email(),
            password: Joi.string()
                .pattern(/^[a-zA-Z0-9]{8,32}$/),
            adress: Joi.object({
                city: Joi.string(), 
                lat: Joi.number(),
                lng: Joi.number(),
            })
            .required()
        })

        const {error, value} = schema.validate(req.body)

        if(error) {
            switch (error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email adress'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match the following rules:
                            <br>
                            1. It must contain ONLY the following characters: lower case, upper case, numerics.
                            <br>
                            2. It must be at least 8 characters in length and not greater than 32 characters in length.
                        `
                    })
                    break
                case 'adress':
                    res.status(400).send({
                        error: 'Something went wrong, try another location'
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'Invalid registration information'
                    })
            }
        } else {
            next()
        }
    }
}