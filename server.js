const dotenv = require( 'dotenv' );
dotenv.config( { path: './config/.env' } );
const express = require( 'express' );
const cors = require( 'cors' );
const path = require( 'path' );

require( './models/user' );
require( './models/IncomeBudgets' );
require( './models/expensesBudgets' );

const app = express();
const connectDB = require( './config/db' );

connectDB();
app.use( express.json() );
app.use( cors() );

app.use( '/api/budgets/incomes', require( './routes/incomeRoutes' ) );
app.use( '/api/budgets/expenses', require( './routes/expensesRoutes' ) );
app.use( '/api/user', require( './routes/authRoute' ) );


if ( process.env.NODE_ENV === 'production' ) {
  app.use( express.static( 'client/build' ) );

  app.get( '*', ( req, res ) => {
    res.sendFile( path.resolve( __dirname, 'client', 'build', 'index.html' ) );
  } );
};

const PORT = process.env.PORT || 8080;

app.listen( PORT, () => console.log( `Server is set and running on port: ${ PORT }` ) );
