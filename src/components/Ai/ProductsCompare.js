import OpenAI from "openai";

const ProductsComare = async ({ voiceText, products }) => {
  const openaiApiKey = import.meta.env.VITE_OPENAI_KEY;
  const openai = new OpenAI({
    apiKey: openaiApiKey,
    dangerouslyAllowBrowser: true,
  });

  try {
    const systemPrompt = `
You are a smart assistant that analyzes what the user said in order to help them compare products.

Here is the data about the available products:
${JSON.stringify(products)}

The user said:
"${voiceText}"

Your task:
1. Identify the products the user mentioned.
2. For each product, provide the following information:
   - _id 
   - quantity in the cart
   - name
   - pros (advantages)
   - cons (disadvantages)
   - price
   - discount
   - category
   - brand
   - rating (out of 5)
   - sold (number of times sold)
   


3. At the end, include a short summary that compares the mentioned products and clearly recommends which one the user should choose and why.

**Return the response in a valid JSON format only**, like this:

{
  "products": [
    {
      "_id": "123",
      "quantity": 2,
      "name": "Product Name",
      "pros": ["Advantage 1", "Advantage 2"],
      "cons": ["Disadvantage 1", "Disadvantage 2"],
      "price": "123",
      "discount": "10%",
      "category": "Product Category",
      "brand": "Brand Name",
      "rating": "4.5",
      "sold": "200"
    },
    ...
  ],
  "comparison_summary": "Based on the features, price, and rating, Product X is the better choice because..."
}
`;



    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: voiceText },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const x = response.choices[0].message.content;
    return x;
  } catch (error) {
    console.error("Error in AI analysis:", error);
    return {
      products: [],
      comparison_summary: "sorry, there was an error in the analysis",
    };
  }
};

export default ProductsComare;
