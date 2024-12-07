const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyCdYj-PkdLlDW65IboL0yeF5vLeJ1cMd88");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const callAi = async (prompt) => {
  const prompt1 = `Rate this problem on a scale of 0 to 100 based on severity of problem.Strictly, No text just a number between 0 to 100: ${prompt}`;

  const result = await model.generateContent(prompt1);
  console.log(result.response.text());
  return result.response.text();
};
