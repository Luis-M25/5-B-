"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const envs_1 = require("./config/envs");
const routes_1 = require("./presentation/routes");
const server_1 = require("./presentation/server");
const typeorm_config_1 = require("./data/typeorm/typeorm.config");
const datasource_config_1 = require("./infrastructure/datasource/datasource.config");
(async () => {
    main();
})();
async function main() {
    // Detectar el tipo de datasource desde variables de entorno o usar MEMORY por defecto
    const datasourceType = (process.env.DATASOURCE_TYPE || 'MEMORY').toUpperCase();
    const selectedDatasource = datasource_config_1.DatasourceType[datasourceType] || datasource_config_1.DatasourceType.MEMORY;
    console.log(`🔧 Starting application with datasource: ${selectedDatasource}`);
    // Solo inicializar base de datos si es necesario
    if (selectedDatasource === datasource_config_1.DatasourceType.TYPEORM) {
        try {
            console.log('📊 Initializing TypeORM database...');
            await (0, typeorm_config_1.initializeTypeORM)();
            console.log('✅ TypeORM database initialized successfully');
        }
        catch (error) {
            console.error('❌ Error during TypeORM database initialization:', error);
            console.log('💡 Tip: If you want to use memory datasource, set DATASOURCE_TYPE=memory or don\'t configure database');
            process.exit(1);
        }
    }
    else if (selectedDatasource === datasource_config_1.DatasourceType.PRISMA) {
        try {
            console.log('📊 Initializing Prisma database...');
            // Prisma se inicializa automáticamente, pero podemos verificar la conexión
            const { prisma } = await Promise.resolve().then(() => __importStar(require('./data/postgres')));
            await prisma.$connect();
            console.log('✅ Prisma database initialized successfully');
        }
        catch (error) {
            console.error('❌ Error during Prisma database initialization:', error);
            console.log('💡 Tip: If you want to use memory datasource, set DATASOURCE_TYPE=memory or don\'t configure database');
            process.exit(1);
        }
    }
    else {
        console.log('🧠 Using memory datasource - no database initialization required');
        console.log('💾 Data will be stored in memory arrays and lost on restart');
        console.log('🔗 Available endpoints: /api/todos-memory');
    }
    // Configurar el datasource seleccionado
    datasource_config_1.DatasourceConfig.setDatasource(selectedDatasource);
    console.log(`🎯 Datasource configured: ${datasource_config_1.DatasourceConfig.getCurrentDatasourceType()}`);
    const server = new server_1.Server({
        port: envs_1.envs.PORT,
        public_path: envs_1.envs.PUBLIC_PATH,
        routes: routes_1.AppRoutes.routes,
    });
    server.start();
}
