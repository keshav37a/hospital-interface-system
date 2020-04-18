const port = 8000;
const express = require('express');
const app = new express();

app.listen(port, function(err){
    if(err) { console.log(`error in starting server : ${err}`); return; }

    console.log(`server up and running on port ${8000}`);
})
