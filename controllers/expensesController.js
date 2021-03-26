const mongoose = require( 'mongoose' );
const Expenses = mongoose.model( 'Expenses' );

const getAllExpenses = async ( req, res ) => {
  try {
    const expenses = await Expenses.find()
      .populate( 'postedBy', '-password' );
    res.status( 201 ).json( { message: 'Success', expenses } );
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
};

const getAuthExpenses = async ( req, res ) => {
  try {
    const authExpenses = await Expenses.find( { postedBy: req.user._id } )
      .populate( 'postedBy', '-password' )
    res.status( 201 ).json( authExpenses );
  } catch (error) {
     res.status( 500 ).json( { error: error.message } );
  }
}

const createExpenses = async ( req, res ) => {
  const expenses = req.body;
  const { content, values } = expenses;
  try {
    if ( !content || !values ) return res.status( 404 ).json( { error: 'Please fill in all fields' } );
    req.user.password = undefined;
    const newExpenses = await new Expenses( {
      content,
      values,
      postedBy: req.user
    });
    await newExpenses.save();
    res.status( 201 ).json( { message: 'Expenses was created successfully', newExpenses } );
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
}

const editExpenses = async ( req, res ) => {
  const { id: _id } = req.params;
  const expenses = req.body;
  try {
    if ( !mongoose.Types.ObjectId.isValid( _id ) ) return res.status( 404 ).json( { error: 'There is no expenses with that id' } );
    const updatedExpenses = await Expenses.findByIdAndUpdate( _id, expenses, { new: true } );
    res.status( 201 ).json( { message: 'Expenses updated successfully!!!', updatedExpenses } );
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
}

const deleteExpenses = async ( req, res ) => {
  const { id } = req.params;
  try {
    if ( !mongoose.Types.ObjectId.isValid( id ) ) return res.status( 404 ).json( { error: 'There is no expenses with that id' } );
    await Expenses.findByIdAndRemove( id )
    res.status( 201 ).json( { message: 'Expenses delete successfully!!!' } );
  } catch (error) {
    res.status( 500 ).json( { error: error.message } );
  }
}

module.exports.getAllExpenses = getAllExpenses;
module.exports.getAuthExpenses = getAuthExpenses;
module.exports.createExpenses = createExpenses;
module.exports.editExpenses = editExpenses;
module.exports.deleteExpenses = deleteExpenses;
