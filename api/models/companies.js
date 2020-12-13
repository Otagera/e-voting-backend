const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const companySchema = Schema({
	name: 			{ type: String, required: true, unique: true },
	description: 	{ type: String, required: true },
	img: 			{ type: String },
	fakeId: 		{ type: Number }
});

mongoose.model('Company', companySchema);