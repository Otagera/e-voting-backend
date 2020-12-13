const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const competitionSchema = Schema({
	name: 		  { type: String, required: true, unique: true },
	description:  { type: String, required: true },
	deadline: 	  { type: Date, required: true},
	organizer:    { type: Schema.Types.ObjectId, ref: 'Company' },
	fakeId:		  { type: Number }
});

mongoose.model('Competition', competitionSchema);