const app = require('./src/app')
const PORT = 8088

require('dotenv-safe').config();

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))