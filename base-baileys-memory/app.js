const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const { delay } = require('@whiskeysockets/baileys');
const { ChatGemini } = require('./Gemini');
const path = require('path');
const fs = require('fs');

const promptPath = path.join(__dirname, 'mensajes', 'Promt.txt');
let prompt = fs.readFileSync(promptPath, 'utf-8');

    const flowPrincipal = addKeyword(EVENTS.WELCOME)
        .addAction( 
            async (ctx,ctxFn) => {
            
            let mensaje ={
                "nombre cliente": ctx.pushName,                     
                "pregunta": "Eres Gemini de google y debes contestar siempre en español jamas usar otro idioma y siempre de forma amalble y cortes ademas de saludar al cliente por su nombre si lo tiene",
                "mensaje_usuario": ctx.body
            }

           const resultado = await ChatGemini(JSON.stringify(mensaje))           
           await ctxFn.flowDynamic(resultado)
    })

const main = async () => {      
        const adapterDB = new MockAdapter();
        const adapterFlow = createFlow([flowPrincipal]);
        const adapterProvider = createProvider(BaileysProvider); 

        createBot({
            flow: adapterFlow,
            provider: adapterProvider,
            database: adapterDB,
        });

        QRPortalWeb();    
       
};

main();
