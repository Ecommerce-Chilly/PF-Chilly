const app = require('./src/app.js');
const { db } = require('./src/db.js');
const PORT = 3001;

db.sync({force: true}).then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server listening on port ${PORT}`);
    });
});