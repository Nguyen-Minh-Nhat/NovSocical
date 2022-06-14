const { upload, destroy, destroyDirectory, deleteTmp } = require('./upload');
const transporter = require('./transporter');

module.exports = { upload, destroy, transporter, destroyDirectory, deleteTmp };
