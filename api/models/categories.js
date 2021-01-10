const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const categorySchema = Schema({
	name: 		  { type: String, required: true, unique: true },
	description:  { type: String, required: true },
	type: 		  { type: String, enum: ['first-past-the-post'] },
	competition:  { type: Schema.Types.ObjectId, ref: 'Competition' },
	contestants: [{
					contestant: { type: Schema.Types.ObjectId, ref: 'Contestant' },
					contestantVotes: { type: Number, default: 0 },
					voters: [{ type: Schema.Types.ObjectId, ref: 'User' }]
				  }],
	totalVotes:   { type: Number, default: 0 },
	fakeId:		  { type: Number }
});

mongoose.model('Category', categorySchema);