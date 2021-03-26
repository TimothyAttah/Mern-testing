const express = require( 'express' );
const router = express.Router();
const auth = require('../middlewares/auth')
const {
  getAllIncome, createIncome, editIncome, deleteIncome, getAuthIncome
} = require( '../controllers/incomeController' );

router.get( '/', getAllIncome );

router.get('/auth', auth, getAuthIncome)

router.post( '/create/income', auth, createIncome );

router.patch( '/update/income/:id', auth, editIncome );

router.delete( '/delete/income/:id', auth, deleteIncome );

module.exports = router;
