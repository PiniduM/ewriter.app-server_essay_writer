import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv"

dotenv.config();

 const apiKey = process.env.OPENAIAPIKEY;
const configuration = new Configuration({
  apiKey,
});

const openai = new OpenAIApi(configuration);

const getCompletion = async (prompt,maxLength = 400,model = "text-curie-001") => {
  console.log(model,maxLength); //
  try {
    const response = await openai.createCompletion({
      model,
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: maxLength,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0.8,
    });
    return response.data.choices[0].text;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default getCompletion;
