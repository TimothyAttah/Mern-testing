const mongoose = require( 'mongoose' );
const { ObjectId } = mongoose.Schema.Types;

const IncomeSchema = new mongoose.Schema( {
  content: {
    type: String,
    required: true
  },
  values: {
    type: Number,
    required: true
  },
  postedBy: {
    type: ObjectId,
    ref: 'User'
  }
}, { timestamps: true, } );

mongoose.model( 'Incomes', IncomeSchema );
