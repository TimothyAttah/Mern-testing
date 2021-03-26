const express = require( 'express' );
const router = express.Router();
const auth = require('../middlewares/auth')

const {
  getAllExpenses, getAuthExpenses, createExpenses, editExpenses, deleteExpenses
} = require( '../controllers/expensesController' );

router.get( '/', getAllExpenses );

router.get( '/auth', auth, getAuthExpenses );

router.post( '/create', auth, createExpenses );

router.patch( '/update/:id', auth, editExpenses );

router.delete( '/delete/:id', auth, deleteExpenses );

module.exports = router;
