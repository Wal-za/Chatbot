const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');
const { delay } = require('@whiskeysockets/baileys');
const ChatGpt = require("./ChatGpt")
const path = require("path");
const fs = require("fs");

const MenuPath = path.join(__dirname,"mensajes","menu.txt");
const menu = fs.readFileSync(MenuPath,"utf-8");

// Flujo Principal
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer(
        [
            '🙌 Bienvenido a Oulo Soluciones',
            '',
            'Estimado usuario,',
            '',
            'Bienvenido a Oulo Soluciones. Somos una empresa especializada en automatización y servicios de desarrollo.',
            'Para obtener más información sobre nosotros, le invitamos a seguirnos en Instagram:',
            '',
            '👉 [Oulo Soluciones Instagram](https://www.instagram.com/oulo_soluciones?igsh=ZW1nYjVtdTYzcWE0)',
            '',
            'Quedamos a su disposición para cualquier consulta o requerimiento adicional.',
            '',
            'Atentamente,',
            'El equipo de Oulo Soluciones'
        ]
    );

// Flujo Servicios
const flowServicios = addKeyword(['servicios'])
    .addAnswer(
        [
            '💼 Bienvenido a Oulo Soluciones',
            '',
            'Estimado usuario,',
            '',
            'En Oulo Soluciones nos especializamos en una amplia gama de servicios diseñados para impulsar su negocio:',
            '',
            '1. **Creación de Chatbots**: Diseñamos y desarrollamos chatbots personalizados para mejorar la interacción con sus clientes.',
            '2. **Diseño Web**: Creamos sitios web atractivos y funcionales que reflejan la identidad de su marca.',
            '3. **Macros y Automatización**: Desarrollamos soluciones de automatización para optimizar sus procesos empresariales.',
            '4. **Desarrollo de Software**: Ofrecemos desarrollo de software a medida para satisfacer sus necesidades específicas.',
            '',
            'Si desea obtener más información sobre nuestros servicios, por favor síganos en Instagram:',
            '👉 [Oulo Soluciones Instagram](https://www.instagram.com/oulo_soluciones?igsh=ZW1nYjVtdTYzcWE0)',
            '',
            'Quedamos a su disposición para cualquier consulta o requerimiento adicional.',
            '',
            'Atentamente,',
            'El equipo de Oulo Soluciones'
        ]
    );

// Flujo Gracias
const flowGracias = addKeyword(['gracias', 'grac'])
    .addAnswer(
        [
            '🚀 Nos complace haber solucionado su problema. En Oulo Soluciones, estamos siempre a su disposición.',
            'Si tiene alguna otra consulta o necesita asistencia adicional, no dude en contactarnos.',
            'Para más información y actualizaciones, le invitamos a seguirnos en Instagram:',
            '👉 [Oulo Soluciones Instagram](https://www.instagram.com/oulo_soluciones?igsh=ZW1nYjVtdTYzcWE0)',
            '',
            'Agradecemos su confianza en nuestros servicios. Quedamos atentos a cualquier requerimiento adicional.',
            '',
            'Atentamente,',
            'El equipo de Oulo Soluciones'
        ]
    );


    const flowWelcome = addKeyword(EVENTS.WELCOME)
    .addAnswer("este es el evento welcome", {
       delay: 5000
    },
    async(ctx,ctxFn)=>{
          console.log(ctx.body)
    }

)

// Función principal para crear el bot
const main = async () => {
    const adapterDB = new MockAdapter(); // Base de datos mockeada
    const adapterFlow = createFlow([flowPrincipal, flowServicios, flowGracias]); // Flujos de conversación
    const adapterProvider = createProvider(BaileysProvider); // Proveedor Baileys para WhatsApp

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb(); // Muestra el QR para conectar el bot a WhatsApp
};

main();
