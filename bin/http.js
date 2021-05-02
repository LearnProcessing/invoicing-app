const app = require('../app')
const port = process.env.PORT || 4000

app.listen(port, (err, res) => {
    console.log('listening port ' + port)
})