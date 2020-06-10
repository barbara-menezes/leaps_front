const express = require("express");
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/leaps-admin'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/leaps-admin/index.html'));
})

app.listen(PORT, () => {
    console.log('Servidor on!')
});
