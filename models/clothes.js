const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        description: 'must be a string',
      },
      description: {
        type: String,
        required: true,
        description: 'must be a string',
      },
      price: {
        type: Number,
        required: true,
        description: 'must be a number',
      },
      quantity: {
        type: Number,
        required: true,
        description: 'must be a number',
      },
      category: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Teens'],
        description: 'must be a string',
      },
    })

    module.exports = mongoose.model('Product',productSchema)