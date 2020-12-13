const mongoose = require('mongoose');
const Contestant = mongoose.model('Contestant');
const Category = mongoose.model('Category');
const DEFAULT_DATA = require('../models/DEFAULT_DATA');

const addOneContestant = (req, res)=>{
	const { body, params, file } = req;
	Contestant.find()
				.exec()
				.then(contestants=>{
					for(let i = 0; i < contestants.length; i++){
				        if(contestants[i].fakeId != i + 1){
				            var newID = i + 1;
				            break;
				        }
				    }
					Category.findOne({ fakeId: params.categoryId })
						.populate('competition')
						.populate('contestants.contestant')
						.exec()
						.then(category=>{
							if(!category){ return res.statusJson(404, { message: 'Not found' }); }

							const contest = new Contestant({
								name: body.name,
								quote: body.quote,
								img: (file)? file.path: '',
								fakeId: newID || contestants.length + 1
							});

							contest.save().then(newContest=>{
								category.contestants.push({ contestant: newContest });
								category.save().then(newCompet=>{
									return res.statusJson(200, { contestants: newContest });									
								}).catch(err=>{
									console.log(err);
									return res.statusJson(500, { error: err });
								});
							}).catch(err=>{
								console.log(err);
								return res.statusJson(500, { error: err });
							});
						})
						.catch(err=>{
							console.error(err);
							return res.status.Json(500, { error: err });
						});
				})
				.catch(err=>{
					console.error(err);
					return res.status.Json(500, { error: err });
				});
}
const addMultipleContestants = ({ body }, res) => {
	/*body.products.forEach((prod, i) => {
		let qty = 0;
		if(body.quantities[i] !== " "){
			qty = Number.parseInt(body.quantities[i]);
		}
		if(qty !== 0){
			promises.push(new Promise((resolve, reject) => {
				Product.findOne({ "name": prod.substr(0, prod.length-1) }, (err, pro) => {
					if(err) { reject("Error"); return res.send( {error: err} );}
					
					order.products.push({ product: pro, quantity: qty });
					resolve("Success");
				});
			}));			
		}
	});
	Promise.all(promises).then(()=>{
		Order.create(order, (err, newOrder) => {
			if(err) {return res.send( {error: err} );}

			newOrder.products.forEach((product) => {
				ctrlInventory.updateInventoryItem(false, product, "order");
			})

			res.redirect("/sales/orders");
		});		
	});*/
}
const getContestant = (req, res)=>{
	const { params } = req;
	Contestant.findOne({ fakeId: params.contestantId })
				.exec()
				.then(contest=>{
					if(!contest){ return res.statusJson(404, { message: 'Not found'}); }

					return res.statusJson(200, { contestant: contest });
				})
				.catch(errr=>{
					console.log(err);
					return res.statusJson(500, { error: err });
				});
}
const getContestantsByCategory = (req, res)=>{
	const { params } = req;
	Category.findOne({ fakeId: params.categoryId })
				.populate('competition')
				.populate('contestants.contestant')
				.exec()
				.then(category=>{
					if(!category){ return res.statusJson(404, { message: 'Not found' }); }
					if(category.contestants.length <= 0){ return res.statusJson(404, { message: 'No Contestants yet' }); }


					return res.statusJson(200, { contestants: category.contestants });
				})
				.catch(errr=>{
					console.log(err);
					return res.statusJson(500, { error: err });
				});
}
const getContestants = (req, res)=>{
	const { params } = req;
	Contestant.find()
				.populate('company')
				.populate('contestants.contestant')
				.exec()
				.then(contestants=>{
					if(contestants.length <= 0){ return res.statusJson(404, { message: 'Not found' }); }

					return res.statusJson(200, { contestants: contestants });
				})
				.catch(errr=>{
					console.log(err);
					return res.statusJson(500, { error: err });
				});
}
const updateContestant = (req, res)=>{
	Contestant.findOne()
				.exec()
				.then(contest=>{
					if(!contest){ return res.statusJson(404, { message: 'Not found' }); }

					contest.save().then(updated=>{
						if(!updated){ return res.statusJson(404); }

						return res.statusJson(200, { contestant: updated })
					}).catch(errr=>{
						console.log(err);
						return res.statusJson(500, { error: err });
					});
				})
				.catch(errr=>{
					console.log(err);
					return res.statusJson(500, { error: err });
				});
}
const deleteContestant = (req, res)=>{
	const { params } = req;
	Category.find()
		.populate('contestants.contestant')
		.exec()
		.then(categories=>{
			if(categories.length <= 0){ return res.statusJson(404, 'Empty'); }
			let promises = [];
			categories.forEach(category=>{
				category.contestants = category.contestants.filter((contest)=>{
					return +contest.fakeId !== +params.contestantId
				});
				promises.push(new Promise((resolve, reject)=>{
					category.save().then(info=>{resolve("Success");}).catch(err=>{
						reject('Failure');
						console.log(err);
						return res.statusJson(500, { error: err });
					});
				}))
				Promise.all(promises).then(()=>{
					Contestant.deleteOne({ fakeId: params.contestantId }, (err, info)=>{
							if(err){ return res.statusJson(500, { error: err}); }
							return res.statusJson(200, { info: info, data: 'Done' });
						});
					});
				});
		})
		.catch(err=>{
			console.log(err);
			return res.statusJson(500, { error: err });
		});
}
const deleteAllByCompany = (req, res)=>{
	const { params } = req;
	Category.findOne({ fakeId: params.competitionId })
				.populate('contestants.contestant')
				.exec()
				.then(category=>{
					if(!category){ return res.statusJson(404, { message: 'Not found' }); }
					let promises = [];
					let info = [];
					category.contestants.forEach((contest)=>{
						promises.push(new Promise((resolve, reject)=>{
								let id = contest._id;
								category.contestants = category.contestants.filter((contest)=>{
									return +contest._id !== +id;
								});
								Contestant.deleteOne({ _id: id }, (err, infoo)=>{
									if(err){ reject('Failed'); return res.statusJson(500, { error: err}); }
									info.push(infoo);
									resolve('Success');
								});
							})
						);
					});
					Promise.all(promises).then(()=>{
						return res.statusJson(200, { info: info, data: 'Done' });
					});
				})
				.catch(errr=>{
					console.log(err);
					return res.statusJson(500, { error: err });
				});
}
const deleteAll = (req, res)=>{
	Category.find()
		.populate('contestants.contestant')
		.exec()
		.then(categories=>{
			if(categories.length <= 0){ return res.statusJson(404, 'Empty'); }
			let promises = [];
			categories.forEach(category=>{
				category.contestants = [];
				promises.push(new Promise((resolve, reject)=>{
					category.save().then(info=>{resolve("Success");}).catch(err=>{
						reject('Failure');
						console.log(err);
						return res.statusJson(500, { error: err });
					});
				}))
				Promise.all(promises).then(()=>{
					Contestant.deleteMany((err, info)=>{
						if(err){ return res.statusJson(500, { error: err}); }

						return res.statusJson(200, { info: info, data: 'Done' });
					});
				});
			})
		})
		.catch(err=>{
			console.log(err);
			return res.statusJson(500, { error: err });
		});
}
const reset = (req, res)=>{
	let contestantData = DEFAULT_DATA.contestants;
	Contestant.deleteMany((err, info)=>{
		if(err){ return res.statusJson(500, {error: err}); }

		contestantData.forEach(contest=>{
			let fsData = req.files[contest.img][0];
			contest.img = fsData.path;
		});

		Contestant.insertMany(contestantData, (err, contestants)=>{
			if(err){ return res.statusJson(500, {error: err}); }
			return res.statusJson(200, { successful: true, contestants: contestants });
		})
	});
}

module.exports = {
	addOneContestant,
	addMultipleContestants,
	getContestant,
	getContestantsByCategory,
	getContestants,
	updateContestant,
	deleteContestant,
	deleteAllByCompany,
	deleteAll,
	reset
};