const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const DEFAULT_DATA = require('../models/DEFAULT_DATA');

const getCompany = (req, res)=>{
	const { params } = req;
	Company.findOne({ fakeId: params.companyId })
			.exec((err, company)=>{
				if(err){ return res.statusJson(500, { error: err }); }
				else if(!company){ return res.statusJson(404, { message: 'Not found' }); }

				return res.statusJson(200, { company: company });
			});
}
const getCompanies = (req, res)=>{
	Company.find()
			.sort({ name: 'desc' })
			.exec()
			.then(companies=>{
				if(companies.length <= 0){ return res.statusJson(404, { message: 'No company found' }); }

				return res.statusJson(200, { companies: companies });
			})
			.catch(err=>{
				console.log(err);
				if(err){ return res.statusJson(500, { error: err }); }
			});
}
const createCompany = (req, res)=>{
	const { body, file } = req;
	if(!body.name){
		return res.statusJson(400, { message: 'Please check and make sure the companies name is not empty'});
	}
	Company.find()
			.sort({fakeId: 1})
			.exec()
			.then(companies=>{
				for(let i = 0; i < companies.length; i++){
			        if(companies[i].fakeId != i + 1){
			            var newID = i + 1;
			            break;
			        }
			    }
			    let socials = [
			    	{ social: 'fb', link: body.fb },
			    	{ social: 'twitter', link: body.twitter },
			    	{ social: 'insta', link: body.insta },
			    	{ social: 'website', link: body.website },
			    ];
				const company = new Company({
					name: body.name,
					description: body.description,
			    	img: (file)? file.path: '',
					socials: socials,
		            fakeId: newID || companies.length + 1
				});
				company.save().then(result=>{
					return res.statusJson(201, { message: 'Company created', company: result})
				}).catch(err=>{
					console.log(err);
					if(err){ return res.statusJson(500, { error: err }); }
				});
			})
			.catch(err=>{
				console.log(err);
				if(err){ return res.statusJson(500, { error: err }); }
			});
}
const updateCompany = (req, res)=>{
	const { body, params, file } = req;
	if(!body.name){
		return res.statusJson(400, { message: 'Please check and make sure the companies name is not empty'});
	}
	Company.findOne({ fakeId: params.companyId })
			.exec()
			.then(company=>{
				if(!company){ return res.statusJson(404, { message: 'Not found' }); }


			    let socials = [
			    	{ social: 'fb', link: body.fb },
			    	{ social: 'twitter', link: body.twitter },
			    	{ social: 'insta', link: body.insta },
			    	{ social: 'website', link: body.website },
			    ];
				company.name = body.name;
				company.dscription = body.description;
				socials = socials;
				company.img = (file)? file.path: company.img

				company.save()
						.then(updated=>{
							if(!updated){ return res.statusJson(404); }
							return res.statusJson(200, { company: updated })
						}).catch(err=>{
							console.log(err);
							if(err){ return res.statusJson(500, { error: err }); }
						});
			})
			.catch(err=>{
				console.log(err);
				if(err){ return res.statusJson(500, { error: err }); }
			});
}
const deleteCompany = (req, res)=>{
	const { params } = req;
	Company.findOneAndDelete({ fakeId: params.companyId }, (err, info)=>{
		if(err){ return res.statusJson(500, { error: err }); }

		return res.statusJson(200, { info: info, data: 'Done'});
	});
}
const deleteAll = (req, res)=>{
	Company.deleteMany((err, info)=>{
		if(err){ return res.statusJson(500, { error: err }); }

		return res.statusJson(200, { info: info, data: 'Done'});
	});
}
const reset = (req, res)=>{
	let companyData = DEFAULT_DATA.companies;
	Company.deleteMany((err, info)=>{
		if(err){ return res.statusJson(500, {error: err}); }

		companyData.forEach(company=>{
			let fsData = req.files[company.img][0];
			company.img = fsData.path;
		});

		Company.insertMany(companyData, (err, companies)=>{
			if(err){ return res.statusJson(500, {error: err}); }
			return res.statusJson(200, { successful: true, companies: companies });
		})
	});
}

module.exports = {
	getCompany,
	getCompanies,
	createCompany,
	updateCompany,
	deleteCompany,
	deleteAll,
	reset
};