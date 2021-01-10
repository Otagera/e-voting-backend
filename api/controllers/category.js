const mongoose = require('mongoose');
const Competition = mongoose.model('Competition');
const Company = mongoose.model('Company');
const Contestant = mongoose.model('Contestant');
const Category = mongoose.model('Category');
const DEFAULT_DATA = require('../models/DEFAULT_DATA');

const createCategory = (req, res)=>{
	const { body } = req;
	const { name, description,  type, competitionFakeId } = body;
	if(!name || !description || !competitionFakeId){
		return res.statusJson(400, { 
			message: 'Please check and make sure the name, description or competitionFakeId is not empty'
		});
	}
	Category.find()
				.sort({ fakeId: 1 })
				.exec()
				.then(categories=>{
					for(let i = 0; i < categories.length; i++){
				        if(categories[i].fakeId != i + 1){
				            var newID = i + 1;
				            break;
				        }
				    }
				    Competition.findOne({ fakeId: competitionFakeId })
				    		.exec((err, competition)=>{
				    			if(err) { return res.statusJson(500, { error: err }); }
				    			if(!competition) { return res.statusJson(500, { message: 'Sorry but no competition by that id' }); }
							    const category = new Category({
							    	name: name,
							    	description: description,
							    	type: 'first-past-the-post',
							    	competition: competition,
		            				fakeId: newID || categories.length + 1
							    });
							    category.save().then(comp=>{
							    	res.statusJson(201, { message: 'Category created', category: category });
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
const getCategory = (req, res)=>{
	const { params } = req;
	Category.findOne({ fakeId: params.categoryId })
				.populate('competition')
				.populate('contestants.contestant')
				.exec()
				.then(category=>{
					if(!category){ return res.statusJson(404, { message: 'Not found' }); }

					return res.statusJson(200, { category: category });
				})
				.catch(err=>{
					console.log(err);
					return res.status.Json(500, { error: err });
				});
}
const getCategories = (req, res)=>{
	Category.find()
				.sort({ name: 'desc' })
				.populate('competition')
				.populate('contestants.contestant')
				.exec()
				.then(categories=>{
					if(categories.length <= 0){ return res.statusJson(404, { message: 'Not found' }); }

					return res.statusJson(200, { categories: categories });
				})
				.catch(err=>{
					console.log(err);
					return res.status.Json(500, { error: err });
				});
}
const getCategoriesByCompetition = (req, res)=>{
	const { params } = req;
	Category.find()
			.sort({ name: 'desc' })
			.populate('competition')
			.populate('contestants.contestant')
			.exec()
			.then(categories=>{
				if(categories.length <= 0){ return res.statusJson(404, { message: 'Not found' }); }
				categories = categories.filter((category)=>{
					return category.competition && +category.competition.fakeId === +params.competitionId;
				});
				return res.statusJson(200, { categories: categories });
			})
			.catch(err=>{
				console.log(err);
				return res.status.Json(500, { error: err });
			});
}
const updateCategory = (req, res)=>{
	const { body, params } = req;
	const { name, description, type } = body;
	if(!name || !description){
		return res.statusJson(400, { 
			message: 'Please check and make sure the name or description is not empty'
		});
	}
	Category.findOne({ fakeId: params.categoryId })
			.exec()
			.then(category=>{
				if(!category){ return res.statusJson(404, { message: 'Not found' }); }

				category.name = name;
				category.description = description;
				//category.type = type;

				category.save()
						.then(updated=>{
							if(!updated) { return res.statusJson(404); }
							return res.statusJson(200, { category: updated });
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
const deleteCategory = (req, res)=>{
	const { params } = req;
	Category.deleteOne({ fakeId: params.categoryId }, (err, info)=>{
		if(err){ return res.statusJson(500, { error: err}); }
		let promises = [];
		let infoArr = [];
		competition.contestants.forEach((contest)=>{
			promises.push(new Promise((resolve, reject)=>{
					Contestant.deleteOne({ _id: contest._id }, (err, infoo)=>{
						if(err){ reject('Failed'); return res.statusJson(500, { error: err}); }
						infoArr.push(infoo);
						resolve('Success');
					});
				})
			)
		});
		Promise.all(promises).then(()=>{
			return res.statusJson(200, { info: info, data: 'Done' });
		});
	});
}
const deleteAll = (req, res)=>{
	Category.deleteMany((err, info)=>{
		if(err){ return res.statusJson(500, { error: err}); }

		return res.statusJson(200, { info: info, data: 'Done' });
	});
}
const vote = (req, res)=>{
	const { params } = req;
	Category.findOne({ fakeId: params.categoryId })
				.populate('contestants.contestant')
				.exec()
				.then(category=>{
					if(!category){ return res.statusJson(404, { message: 'Not found' }); }
					let currentWinner = null;
					category.contestants.forEach((contest)=>{
						if(+contest.contestant.fakeId === +params.contestantId){
							contest.contestantVotes += 1;
						}
					});
					category.totalVotes += 1;

					category.save()
								.then(updated=>{
									if(!updated) { return res.statusJson(404); }
									return res.statusJson(200, { category: updated });
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
const reset = (req, res)=>{
	const categoryData = DEFAULT_DATA.categories;
	Category.deleteMany((err, info)=>{
		if(err){ return res.statusJson(500, { error: err }); }

		let promises = [];
		let newCategories = [];
		let superCompetitions = [];
		let superContestants = [];
		let fakeId = 1;
		promises.push(
			new Promise((resolve, reject)=>{
				Contestant.find().exec().then(contestants=>{
					if(contestants.length <= 0){ return res.statusJson(404, { message: 'Make sure there are contestants in the db before entering contestants for them' }); }
					superContestants = contestants;
					resolve('Success');
					//console.log(contestants);
				}).catch(err=>{
					reject('Failure');
					if(err){ return res.statusJson(500, {error: err}); }
				});
			})
		);
		promises.push(
			new Promise((resolve, reject)=>{
				Competition.find().exec().then(competitions=>{
					if(competitions.length <= 0){ return res.statusJson(404, { message: 'Make sure there are competitions in the db before entering competitions for them' }); }
					superCompetitions = competitions;
					resolve('Success');
					//console.log(competitions);
				}).catch(err=>{
					reject('Failure');
					if(err){ return res.statusJson(500, {error: err}); }
				});				
			})
		);
		Promise.all(promises).then(()=>{
			let subPromises = [];
			superCompetitions.forEach((competition, compe)=>{
				subPromises.push(
					new Promise((resolve, reject)=>{
						let tempCategories = categoryData.map(x=>x);
						for(let i = 0; i < tempCategories.length; i++){
							let tempCategory = { ...tempCategories[i] };

							tempCategory.name = tempCategory.name + ' ' + fakeId;
							tempCategory.fakeId = fakeId++;
							tempCategory.competition = competition;
							tempCategory.totalVotes = 0;
							for(let j = 0; j < tempCategory.contestants.length; j++){
								tempCategory.contestants[j].contestant = superContestants[j];
								tempCategory.totalVotes += tempCategory.contestants[j].contestantVotes;
							}
							tempCategories[i] = { ...tempCategory };
						}
						Category.insertMany(tempCategories, (err, categories)=>{
							if(err){ reject('Failure'); return res.statusJson(500, { error: err }); }
							
							newCategories = newCategories.concat(categories);
							resolve('Success');
						});
					})
				)
			});
			Promise.all(subPromises).then(()=>{
				//return res.statusJson(200, { successful: true, superContestants: superContestants });
				return res.statusJson(200, { successful: true, categories: newCategories });
			}).catch(err=>{
				if(err){ return res.statusJson(500, { error: err, prpmise: 'subPromises' }); }
			});
		}).catch(err=>{
			if(err){ return res.statusJson(500, {error: err, prpmise: 'promises' }); }
		}); 
	});
}

module.exports = {
	createCategory,
	getCategory,
	getCategories,
	getCategoriesByCompetition,
	updateCategory,
	deleteCategory,
	deleteAll,
	vote,
	reset
};