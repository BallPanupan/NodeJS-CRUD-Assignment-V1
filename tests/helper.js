const mongoose = require('mongoose');

before(done => {
	mongoose.connect('mongodb://localhost/pkap_test', {useMongoClient: true});
	mongoose.connection
		.once('open', () => done())
		.on('error', error => {
			console.warn('Warning', error);
		});
});

beforeEach(done => {
	const { todolists} = mongoose.connection.collections;
	todolists.drop()
		.then(() => done())
		.catch(() => done());
});
