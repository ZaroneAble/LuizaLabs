const router = require('express').Router()

//const Cliente = require('./models/Cliente')
const Cliente = require('../models/Cliente')

//criacao de dados
router.post('/', async (req, res) => {

    //req.body
    const{nome, email, approved, listaFavoritos} = req.body

    try {
        
  
        if(await Cliente.findOne({ email }))
            return res.status(400).send({ error:'Usuario ja cadastrado!' })
        } catch (error) {
        
        }
    if(!nome) {
        res.status(422).json({ error: 'O Nome é obrigatorio!'})
        return
    }

    if(!email) {
        res.status(422).json({ error: 'O Email é obrigatorio!'})
        return
    }


    const cliente = {
        nome,
        email,
        approved,
        listaFavoritos,
    }

    //create
    try{
        //criando dados
        await Cliente.create(cliente)

        res.status(201).json({message: 'Cliente cadastrato com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//leitura de dados
router.get('/', async (req, res) => {
    try{
        //find retorna todos os clientes!
        const clientes = await Cliente.find()

        res.status(200).json(clientes)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

router.get('/:id', async (req, res) => {

    //extrair o dado da requisicao, pela url = req.params
    const id = req.params.id

    try {
        const cliente = await Cliente.findOne({_id: id})

        if(!cliente) {
            res.status(422).json({message: 'Usuario nao encontrado!'})
            return
        }
        
        res.status(200).json(cliente)
    }   catch (error) {
        res.status(500).json({ error: error })    
    }
})


// atualizar dados(PATCH)

router.patch('/:id', async (req, res) => {
const id = req.params.id

const {nome, email, approved, listaFavoritos} = req.body

const cliente = {
    nome,
    email,
    approved,
    listaFavoritos,
    }

    try { 
        const updatedCliente = await Cliente.updateOne({_id: id}, cliente)
        
        if(updatedCliente.matchedCount === 0){
        res.status(422).json({message: 'Usuario nao encontrado!'})
        return
    }
        res.status(200).json(cliente)
        
    } catch (error) {
        res.status(500).json({ error: error })   
    }

})

//deletar cadastro por id
router.delete('/:id', async(req, res) => {
    const id = req.params.id

    const cliente = await Cliente.findOne({_id: id})

        if(!cliente) {
            res.status(422).json({message: 'Usuario nao encontrado!'})
            return
        }
        try {
            await Cliente.deleteOne({_id: id})
            
            res.status(200).json({ message: 'O cliente foi excluido com sucesso!'})
        } catch (error) {
            res.status(500).json({ error: error })   
        }
})



module.exports = router
