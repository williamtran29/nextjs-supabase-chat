import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { prompt } = req.body;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever.\nHuman: ${prompt}\nAI:`,
      max_tokens: 1024,
      temperature: 0.6,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    const text = response.data.choices[0].text;

    res.status(200).json({ text });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

export default handler;
