const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const contestantSchema = Schema({
	name:   { type: String, required: true, unique: true },
	quote:  { type: String },
	img:    { type: String },
	socials:[{
				social: { type: String },
				link: { type: String }
			}],
	fakeId: { type: Number }
});

mongoose.model('Contestant', contestantSchema);