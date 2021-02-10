import mongoose from 'mongoose';

class Database {
    constructor() {
        this.init();
    }

    init() {
        mongoose.connect("mongodb://localhost:27017/appointments",{useNewUrlParser: true, useUnifiedTopology: true})
        
        this.connection = mongoose.connection;
        this.connection.on('error', console.error.bind(console, 'Erro ao conectar:'));
        this.connection.once('open', () => {
            console.log('Conectado com sucesso');
        });
    }
}

export default new Database();