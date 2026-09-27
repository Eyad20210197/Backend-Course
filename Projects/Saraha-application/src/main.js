import bootstrap from './bootstrap.js';
import config from './common/config/config.js';

const startServer = async () => {

    try {
        const app = await bootstrap();
        app.listen(config.port,()=>{
            console.log(`Saraha API is running at port ${config.port}`); 
        });
    } catch (error) {
        console.log(`Faild to start Saraha bsra7a:`, error);        
        process.exit(1);
    }
}

startServer();