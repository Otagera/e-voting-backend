const express = require('express');
const router = express.Router();

const compCtrl = require('../controllers/company');
const competCtrl = require('../controllers/competition');
const categctrl = require('../controllers/category');
const contestCtrl = require('../controllers/contestant');

const checkAuth = require('../middlewares/check-auth');
const upload = require('../middlewares/multer');
const clearFolder = require('../middlewares/clearUploadsFolder');

//company associated routes
router.route('/company/:companyId')
	  .get(compCtrl.getCompany)
	  .put(upload.single('img'), checkAuth, compCtrl.updateCompany)
	  .delete(checkAuth, compCtrl.deleteCompany);

router.route('/companies')
	  .get(compCtrl.getCompanies)
	  .post(upload.single('img'), checkAuth, compCtrl.createCompany)
	  .delete(checkAuth, compCtrl.deleteAll);

router.route('/reset-companies').get(clearFolder, upload.fields([
									{name: 'photosnapImg', maxCount: 1},
									{name: 'manageImg', maxCount: 1},
									{name: 'accountImg', maxCount: 1},
									{name: 'myHomeImg', maxCount: 1},
									{name: 'loopStudiosImg', maxCount: 1},
									{name: 'faceItImg', maxCount: 1},
									{name: 'shortlyImg', maxCount: 1},
									{name: 'insureImg', maxCount: 1},
									{name: 'eyecamImg', maxCount: 1},
									{name: 'airFilterImg', maxCount: 1}
								]), compCtrl.reset);

//competition associated routes
router.route('/competition/:competitionId')
	  .get(competCtrl.getCompetition)
	  .put(upload.single('img'), checkAuth, competCtrl.updateCompetition)
	  .delete(checkAuth, competCtrl.deleteCompetition);

router.route('/competitions/:companyId')
	  .get(competCtrl.getCompetitionsByCompany)

router.route('/competitions')
	  .get(competCtrl.getCompetitions)
	  .post(upload.single('img'), checkAuth, competCtrl.createCompetition)
	  .delete(checkAuth, competCtrl.deleteAll);

router.route('/reset-competitions').get(competCtrl.reset);

//category associated routes
router.route('/category/:categoryId')
	  .get(categctrl.getCategory)
	  .put(upload.single('img'), checkAuth, categctrl.updateCategory)
	  .delete(checkAuth, categctrl.deleteCategory);

router.route('/competition/:competitionId/categories/')
	  .get(categctrl.getCategoriesByCompetition)

router.route('/categories')
	  .get(categctrl.getCategories)
	  .post(upload.single('img'), checkAuth, categctrl.createCategory)
	  .delete(checkAuth, categctrl.deleteAll);

router.route('/reset-categories').get(categctrl.reset);

//contestants associated routes
router.route('/category/:categoryId/contestants')
	  .get(contestCtrl.getContestantsByCategory)
	  .post(upload.single('img'), checkAuth, contestCtrl.addOneContestant)
	  .delete(checkAuth, contestCtrl.deleteAllByCompany);

router.route('/category/:categoryId/contestant/:contestantId')
	  .get(contestCtrl.getContestant)
	  .put(upload.single('img'), checkAuth, contestCtrl.updateContestant)
	  .delete(checkAuth, contestCtrl.deleteContestant);

router.route('/category/:categoryId/contestant/:contestantId/vote')
	  .put(checkAuth, categctrl.vote)

router.route('/contestants')
	  .get(contestCtrl.getContestants)
	  .delete(checkAuth, contestCtrl.deleteAll);

router.route('/reset-contestants').get(upload.fields([
									{name: 'ageraImg', maxCount: 1},
									{name: 'miImg', maxCount: 1},
									{name: 'babyImg', maxCount: 1},
									{name: 'yeImg', maxCount: 1},
									{name: 'aliImg', maxCount: 1}
								]), contestCtrl.reset);

module.exports = router;
