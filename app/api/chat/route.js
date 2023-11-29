export async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Agreus/KOlivia-distilbert",
    {
      headers: {
        Authorization: `Bearer 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`,
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}
// Appointments - LABEL_0
// Questions - LABEL_1
// Weather - LABEL_2
