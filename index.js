//configuracao inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()



//forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da api
const clienteRoutes = require('./routes/clienteRoutes')

app.use('/cliente', clienteRoutes)

//rota inicial / endpoint
app.get('/', (req, res) =>{

    //mostrar requicao
    res.json({message: 'teste de rota/endpoint express' })

})

//entregar uma porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@luizacluster.k38pf.mongodb.net/luizadatadase?retryWrites=true&w=majority`,
)
.then(() => {
    console.log('Conectamos ao MongoDB')
    app.listen(3000)

})
.catch((err) => console.log(err))

//app.listen(3000)