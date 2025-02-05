const { GoogleGenerativeAI } = require("@google/generative-ai");

async function ChatGemini(prompt) {
  try {
    //const apiKey = process.env.GEMINI_API_KEY; 
    const apiKey = "AIzaSyD1ArZ3PycIPEjNpPhyGhLMMnzi2n4Varo"; 
    
    if (!apiKey) {
      return { error: true, message: "Falta la clave de API. Establece la variable de entorno API_KEY." };
    }

    if (typeof prompt !== 'string' || prompt.trim() === '') {
      return { error: true, message: "El mensaje debe ser una cadena no vacía." };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 

    const resultado = await model.generateContent(prompt);      

    return [resultado.response.text()] ;
  } catch (error) {
    console.error("Error al generar respuesta de IA:", error);
    return { error: true, message: error.message }; 
  }
}

module.exports = { ChatGemini };