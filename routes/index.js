var express = require('express');
var router = express.Router();

const PublitioAPI = require('publitio_js_sdk').default
const publitio = new PublitioAPI('6M0QllSsgsP8iSuGdA09', 'sqZx6TpnSBy0nQkn31eJe8ii2DgnTqxz')

/* GET all list data from publit. */
router.get('/all', (req, res, next) => {
  publitio.call('/files/list', 'GET', { offset: '0', limit: '1000'})
        .then(response => res.json(response))
        .catch(error =>  res.json(error) )
  // res.render('index', { title: 'Express' });
});
/* GET all folder data from publit. */
router.get('/allFolders', (req, res, next) => {
  publitio.call('/folders/list', 'GET')
        .then(response => res.json(response))
        .catch(error =>  res.json(error) )
  // res.render('index', { title: 'Express' });
});

/* GET all list data from publit folder flutter. COPYYYYYY*/ 
router.get('/course/:courseName', (req, res, next) => {
  publitio.call('/files/list', 'GET', { offset: '0', limit: '1000', folder: req.params.courseName,order: 'date:desc'})
        .then(response => res.json(response))
        .catch(error =>  res.json(error) )
});

// /* GET all list data from publit folder flutter. */
// router.get('/flutter', (req, res, next) => {
//   publitio.call('/files/list', 'GET', { offset: '0', limit: '1000', folder: 'flutterfolder',order: 'date:desc'})
//         .then(response => res.json(response))
//         .catch(error =>  res.json(error) )
// });

// /* GET all list data from publit folder nodejs. */
// router.get('/nodejs', (req, res, next) => {
//   publitio.call('/files/list', 'GET', { offset: '0', limit: '1000', folder: 'nodejsfolder',order: 'date'})
//         .then(response => res.json(response))
//         .catch(error =>  res.json(error) )
// });

// /* GET all list data from publit folder python. */
// router.get('/python', (req, res, next) => {
//   publitio.call('/files/list', 'GET', { offset: '0', limit: '1000', folder: 'pythonfolder',order: 'date'})
//         .then(response => res.json(response))
//         .catch(error =>  res.json(error) )
// });

// /* GET all list data from publit folder python. */
// router.get('/newCourse', (req, res, next) => {
//   publitio.call('/files/list', 'GET', { offset: '0', limit: '1000', folder: 'newCourse',order: 'date'})
//         .then(response => res.json(response))
//         .catch(error =>  res.json(error) )
// });

// /* GET all image data from publit folder python. */
// router.get('/courses', (req, res, next) => {
//   publitio.call('/files/list', 'GET', { offset: '0', limit: '1000', folder: 'courseimages',order: 'date'})
//         .then(response => res.json(response))
//         .catch(error =>  res.json(error) )
// });

module.exports = router;
