const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const typeDefs = require('./graphQL/typeDefs');
const resolvers = require('./graphQL/resolvers');
const authRoute = require('./routes/auth.routes')
const { validarToken, admin, estudiante, lider } = require('./middleware/authjwt')


// realizar la conexión a la BD
const bd = require('./infrastructure/bd');
bd.conectar();

const PUERTO = 3020;

const iniciarServidor = async () => {
    const app = express();
    const apollo = new ApolloServer(
        {
            typeDefs,
            resolvers
        });
    await apollo.start();
    apollo.applyMiddleware({ app: app });
    app.use(express.json())
    app.use('/api', authRoute)

    // ********* Dashboards ***************
    app.set('port',process.env.PORT ||PUERTO)

    app.get("/" ,(req,res)=>{
        res.json("Backen GreenCoding")
    });

    app.get('/api/dashboard/admin', [validarToken, admin], (req, res) => {
        res.json("Soy el dashboard del administrador")
    })
    app.get('/api/dashboard/estudiante', [validarToken, estudiante], (req, res) => {
        res.json("Soy el dashboard del estudiante")
    })
    app.get('/api/dashboard/lider', [validarToken, lider], (req, res) => {
        res.json("Soy el dashboard del lider")
    })
    // ************************************

    app.listen(app.get('port'),PUERTO, () => {
        console.log(`Servicio iniciado a través de la url http://localhost:${PUERTO}`);
    });
}

iniciarServidor()