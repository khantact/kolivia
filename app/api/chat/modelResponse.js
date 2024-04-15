"use server";
export async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Agreus/KOlivia-distilbert",
		{
			headers: {
				Authorization: `Bearer ${process.env.API_KEY}`,
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	handleLabel(result);
	return result;
}
const handleLabel = (data) => {
	let maxScore = 0;
	let labelWithMaxScore = "";
	const WEATHER_LABEL = "LABEL_2";
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			const obj = data[i][j];
			if (obj.score > maxScore) {
				maxScore = obj.score;
				labelWithMaxScore = obj.label;
			}
		}
	}
	if (labelWithMaxScore === WEATHER_LABEL) {
	}
};
// Appointments - LABEL_0
// Questions - LABEL_1
// Weather - LABEL_2

//example repsonse is:
// [[{"label":"LABEL_2", "score":0.8822324275970459}, {"label":"LABEL_1","score":0.10587149113416672}, {"label":"LABEL_O", "score":0.011896083131432533}]]
