const OpenAI = require('openai');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  try {
    const body = JSON.parse(event.body);
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: body.messages
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(completion.choices[0].message)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process chat' })
    };
  }
};