import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI client with your API key from environment variables.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates a professional cover letter using the Gemini API.
 * @param {string} resumeText - The text extracted from the user's resume.
 * @param {string} jobRole - The job role the user is applying for.
 * @param {string} [companyName] - The optional name of the company.
 * @returns {Promise<string>} A promise that resolves with the generated cover letter text.
 */
export async function generateCoverLetter(resumeText, jobRole, companyName) {
  // Select the generative model to use.
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  // Create a detailed and structured prompt for the AI to generate a high-quality cover letter.
  const prompt = `
    As an expert career coach and professional writer, please craft a compelling and professional cover letter.

    The cover letter should be based on the following resume:
    --- START RESUME ---
    ${resumeText}
    --- END RESUME ---

    The letter must be tailored specifically for the **${jobRole}** position${companyName ? ` at **${companyName}**` : ''}.

    Please ensure the cover letter:
    1.  Has a professional and confident tone.
    2.  Highlights the most relevant skills and experiences from the resume that match the job role.
    3.  Is concise, well-structured, and easy to read.
    4.  Expresses genuine enthusiasm for the opportunity.
    5.  Does not invent any skills or experiences not found in the resume.
    6.  Is formatted cleanly without any markdown like "###" or "**".
  `;

  try {
    // Call the model to generate content based on the prompt.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // Return the text part of the AI's response.
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Throw an error to be caught by the controller's try-catch block.
    throw new Error("Failed to generate content from Gemini API.");
  }
}



// import { GoogleGenerativeAI } from '@google/generative-ai';

// // Initialize the Gemini AI client
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// /**
//  * Generates a cover letter using the Gemini API.
//  * @param {string} resumeText - The text extracted from the user's resume.
//  * @param {string} jobRole - The job role the user is applying for.
//  * @param {string} [companyName] - The optional company name.
//  * @returns {Promise<string>} A promise that resolves with the generated cover letter text.
//  */
// export async function generateCoverLetter(resumeText, jobRole, companyName) {
//   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//   // **IMPROVEMENT:** Enhanced the prompt for better, more professional results.
//   // It now instructs the AI to act as a career coach and includes the company name if provided.
//   const prompt = `
//     As an expert career coach and professional writer, please craft a compelling and professional cover letter.

//     The cover letter should be based on the following resume:
//     --- START RESUME ---
//     ${resumeText}
//     --- END RESUME ---

//     The letter must be tailored specifically for the **${jobRole}** position${companyName ? ` at **${companyName}**` : ''}.

//     Please ensure the cover letter:
//     1.  Has a professional and confident tone.
//     2.  Highlights the most relevant skills and experiences from the resume that match the job role.
//     3.  Is concise, well-structured, and easy to read.
//     4.  Expresses genuine enthusiasm for the opportunity.
//     5.  Does not invent any skills or experiences not found in the resume.
//   `;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     return response.text();
//   } catch (error) {
//     console.error("Error calling Gemini API:", error);
//     throw new Error("Failed to generate content from Gemini API.");
//   }
// }
