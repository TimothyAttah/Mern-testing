const mongoose = require( 'mongoose' );
const Income = mongoose.model( 'Incomes' );

const getAllIncome = async ( req, res ) => {
  try {
    const incomes = await Income.find()
    .populate('postedBy', '-password')
    res.status( 201 ).json( incomes );
  } catch ( error ) {
    res.status( 500 ).json( { error: error.message } );
  };
};

const getAuthIncome = async ( req, res ) => {
  try {
    const authIncome = await Income.find( { postedBy: req.user._id } )
      .populate( 'postedBy', '-password' );
    res.status(201).json(authIncome)
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
}

const createIncome = async ( req, res ) => {
  const incomes = req.body;
  const { content, values } = incomes;
  try {
    if ( !content || !values ) return res.status( 404 ).json( { error: 'Please fill in all fields' } );
    req.user.password = undefined
    const newIncome = await new Income( {
      content,
      values,
      postedBy: req.user
    } );
    await newIncome.save();
    res.status( 201 ).json( { message: 'Income created successfully', newIncome } );
  } catch ( error ) {
    res.status( 500 ).json( { error: error.message } );
  };
};

const editIncome = async ( req, res ) => {
  const { id: _id } = req.params;
  const incomes = req.body;
  try {
    if ( !mongoose.Types.ObjectId.isValid( _id ) ) return res.status( 404 ).json( { error: 'No income with that id' } );
   const updatedIncome = await Income.findByIdAndUpdate( _id, incomes, { new: true } );
    res.status( 201 ).json( { message: 'Income updated successfully!!!',  updatedIncome } );
  } catch ( error ) {
    res.status( 500 ).json( { error: error.message } );
  };
};

const deleteIncome = async ( req, res ) => {
  const { id } = req.params;
  try {
    if ( !mongoose.Types.ObjectId.isValid( id ) ) return res.status( 404 ).json( { error: 'No income with that id' } );
  await Income.findByIdAndRemove( id );
  res.status( 201 ).json( { message: 'Income deleted successfully!!!' } );
  } catch (error) {
     res.status( 500 ).json( { error: error.message } );
  }
};

module.exports.getAllIncome = getAllIncome;
module.exports.getAuthIncome = getAuthIncome;
module.exports.createIncome = createIncome;
module.exports.editIncome = editIncome;
module.exports.deleteIncome = deleteIncome;
