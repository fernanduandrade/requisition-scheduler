import mongoose from 'mongoose';

class Database {
    constructor() {
        this.init();
    }
    init() {
        mongoose.connect("mongodb+srv://fernando:Ilhadojua985@cluster0.xfllj.mongodb.net/schedule?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true})
        
        this.connection = mongoose.connection;
        this.connection.on('error', console.error.bind(console, 'Erro ao conectar:'));
        this.connection.once('open', () => {
            console.log('Conectado com sucesso');
        });
    }
}

export default new Database();