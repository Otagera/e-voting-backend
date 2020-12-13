const mongoose = require('mongoose');
const Competition = mongoose.model('Competition');
const Company = mongoose.model('Company');
const Contestant = mongoose.model('Contestant');
const DEFAULT_DATA = require('../models/DEFAULT_DATA');

const createCompetition = (req, res)=>{
	const { body } = req;
	const { name, description, deadline, companyFakeId } = body;
	if(!name || !description || !deadline || !companyFakeId){
		return res.statusJson(400, { 
			message: 'Please check and make sure the name, description, deadline or companyFakeId is not empty'
		});
	}
	Competition.find()
				.sort({ fakeId: 1 })
				.exec()
				.then(competitions=>{
					for(let i = 0; i < competitions.length; i++){
				        if(competitions[i].fakeId != i + 1){
				            var newID = i + 1;
				            break;
				        }
				    }
				    Company.findOne({ fakeId: companyFakeId })
				    		.exec((err, company)=>{
				    			if(err) { return res.statusJson(500, { error: err }); }
				    			if(!company) { return res.statusJson(500, { message: 'Sorry but no company by that id' }); }
							    const competition = new Competition({
							    	name: name,
							    	description: description,
							    	deadline: (deadline === 'now')? Date.now(): new Date(deadline),
							    	organizer: company,
		            				fakeId: newID || competitions.length + 1
							    });
							    competition.save().then(comp=>{
							    	res.statusJson(201, { message: 'Competition created', competition: competition });
							    }).catch(err=>{
							    	console.error(err);
									return res.statusJson(500, { error: err });
							    });
				    		});
				})
				.catch(err=>{
					console.log(err);
					return statusJson(500, { error: err });
				});
}
const getCompetition = (req, res)=>{
	const { params } = req;
	Competition.findOne({ fakeId: params.competitionId })
				.populate('organizer')
				.exec()
				.then(competition=>{
					if(!competition){ return res.statusJson(404, { message: 'Not found' }); }

					return res.statusJson(200, { competition: competition });
				})
				.catch(err=>{
					console.log(err);
					return res.status.Json(500, { error: err });
				});
}
const getCompetitions = (req, res)=>{
	Competition.find()
				.sort({ name: 'desc' })
				.populate('organizer')
				.exec()
				.then(competitions=>{
					if(competitions.length <= 0){ return res.statusJson(404, { message: 'Not found' }); }

					return res.statusJson(200, { competitions: competitions });
				})
				.catch(err=>{
					console.log(err);
					return res.status.Json(500, { error: err });
				});
}
const getCompetitionsByCompany = (req, res)=>{
	const { params } = req;
	Competition.find()
				.sort({ name: 'desc' })
				.populate('organizer')
				.exec()
				.then(competitions=>{
					if(competitions.length <= 0){ return res.statusJson(404, { message: 'Not found' }); }
					competitions = competitions.filter((compet)=>{
						return compet.organizer && (+compet.organizer.fakeId === +params.companyId);
					});

					return res.statusJson(200, { competitions: competitions });
				})
				.catch(err=>{
					console.log(err);
					return res.status.Json(500, { error: err });
				});
}
const updateCompetition = (req, res)=>{
	const { body, params } = req;
	const { name, description, deadline } = body;
	if(!name || !description || !deadline){
		return res.statusJson(400, { 
			message: 'Please check and make sure the name, description or deadline is not empty'
		});
	}
	Competition.findOne({ fakeId: params.competitionId })
				.exec()
				.then(competition=>{
					if(!competition){ return res.statusJson(404, { message: 'Not found' }); }

					competition.name = name;
					competition.description = description;
					competition.deadline =  (deadline === 'now')? Date.now(): new Date(deadline);

					competition.save()
								.then(updated=>{
									if(!updated) { return res.statusJson(404); }
									return res.statusJson(200, { competition: updated });
								})
								.catch(err=>{
									console.log(err);
									return res.statusJson(500, { error: err })
								});
				})
				.catch(err=>{
					console.log(err);
					return res.statusJson(500, { error: err })
				});
}
const deleteCompetition = (req, res)=>{
	const { params } = req;
	Competition.deleteOne({ fakeId: params.competitionId }, (err, info)=>{
		if(err){ return res.statusJson(500, { error: err}); }
		
		return res.statusJson(200, { info: info, data: 'Done' });
	});
}
const deleteAll = (req, res)=>{
	Competition.deleteMany((err, info)=>{
		if(err){ return res.statusJson(500, { error: err}); }

		return res.statusJson(200, { info: info, data: 'Done' });
	});
}
const reset = (req, res)=>{
	const competitionData = DEFAULT_DATA.competitions;
	Competition.deleteMany((err, info)=>{
		if(err){ return res.statusJson(500, { error: err }); }

		let promises = [];
		let newCompetitions = [];
		let fakeId = 1;

		Company.find().exec().then(companies=>{
			if(companies.length <= 0){ return res.statusJson(404, { message: 'Make sure there are companies in the db before entering competitions for them' }); }

			companies.forEach(company=>{
				let tempCompetitions = competitionData.map(x=>x);
				for(let i = 0; i < tempCompetitions.length; i++){
					let tempCompetition = { ...tempCompetitions[i] };

					tempCompetition.organizer = company;
					tempCompetition.name = tempCompetition.name + ' ' + fakeId;
					tempCompetition.fakeId = fakeId++;
					
					tempCompetitions[i] = { ...tempCompetition };
				}
				promises.push(
					new Promise((resolve, reject)=>{
						Competition.insertMany(tempCompetitions, (err, competitions)=>{
							if(err){ reject('Failure'); return res.statusJson(500, { error: err }); }
							newCompetitions = newCompetitions.concat(competitions);
							resolve('Success');
						})
					})
				)
			});
			Promise.all(promises).then(()=>{
				return res.statusJson(200, { successful: true, competitions: newCompetitions });
			}).catch(err=>{
				if(err){ return res.statusJson(500, {error: err}); }
			});
		}).catch(err=>{
			if(err){ return res.statusJson(500, {error: err}); }
		});
	})
}
module.exports = {
	createCompetition,
	getCompetitionsByCompany,
	getCompetition,
	getCompetitions,
	updateCompetition,
	deleteCompetition,
	deleteAll,
	reset
};