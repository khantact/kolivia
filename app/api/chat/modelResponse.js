"use server";
export async function query(data) {
	try {
		const response = await fetch(
			"https://api-inference.huggingface.co/models/Agreus/KOlivia-classifier-v2",
			{
				headers: {
					Authorization: `Bearer ${process.env.API_KEY}`,
				},
				method: "POST",
				body: JSON.stringify(data),
				options: data.options,
			}
		);
		const result = await response.json();
		let botResponse = handleLabel(result, data);
		return botResponse;
	} catch (error) {
		return "Error processing your request please try again";
	}
}
const handleLabel = async (data, input) => {
	let maxScore = 0;
	let secondMaxScore = 0;
	let labelWithMaxScore = "";
	let labelWithSecondMaxScore = "";
	const WEATHER_LABEL = "LABEL_2";
	const QUESTION_LABEL = "LABEL_1";
	const DEFAULT_RESPONSE = "I dont know how to answer that question, sorry!";

	// let currentHour = new Date().toLocaleTimeString([], {
	// 	hour: "2-digit",
	// 	hour12: false,
	// });

	let weatherResponse = false;
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			const obj = data[i][j];
			if (obj.score > maxScore) {
				secondMaxScore = maxScore;
				maxScore = obj.score;
				labelWithMaxScore = obj.label;
			} else if (obj.score > secondMaxScore && obj.score < maxScore) {
				secondMaxScore = obj.score;
				labelWithSecondMaxScore = obj.label;
			}
		}
	}
	console.log(
		"first:",
		labelWithMaxScore,
		"second:",
		labelWithSecondMaxScore
	);
	if (labelWithMaxScore === WEATHER_LABEL) {
		weatherResponse = true;
	} else if (labelWithMaxScore === QUESTION_LABEL) {
		console.log("not weather");
		return DEFAULT_RESPONSE;
	}

	if (weatherResponse) {
		var dict = {};
		const response = await fetch(
			"https://api-inference.huggingface.co/models/spacy/en_core_web_md",
			{
				headers: {
					Authorization: `Bearer ${process.env.API_KEY}`,
				},
				method: "POST",
				body: JSON.stringify(input),
			}
		);
		const result = await response.json();
		for (const ent of result) {
			if (dict[ent.entity_group]) {
				dict[ent.entity_group].push(ent.word);
			} else {
				dict[ent.entity_group] = [ent.word];
			}
		}
		try {
			if (dict["GPE"]) {
				dict["GPE"] = dict["GPE"].join();
			}
			if (dict["CARDINAL"]) {
				dict["GPE"] = dict["CARDINAL"];
			}
			// honestly so many places have names of old dead people so this will just have to do (e.g "Hamilton") I can't be
			// bothered to think of a better implementation and I definitely don't want to train any more models.
			if (dict["PERSON"]) {
				dict["GPE"] = dict["PERSON"];
			}
		} catch (e) {
			console.log(e.message);
		}
		//implement weather api call
		// days=1 allows us to give the user an hourly forecast, which is typically what i like

		let apiURL = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API_KEY}&q=${dict["GPE"]}&days=1&aqi=no&alerts=no`;
		try {
			const query = await fetch(apiURL, { cache: "no-store" });
			const response = await query.json();
			console.log(apiURL);
			return {
				data: response.forecast.forecastday[0].hour,
				type: "weather",
			};
		} catch (e) {
			console.log(apiURL);
			console.log(response);
			console.log(dict);
			console.log(e);
		}
		console.log("returning default result");
		return result;
	}
	return DEFAULT_RESPONSE;
};
// Appointments - LABEL_0
// Questions - LABEL_1
// Weather - LABEL_2

//example repsonse is:
// [[{"label":"LABEL_2", "score":0.8822324275970459}, {"label":"LABEL_1","score":0.10587149113416672}, {"label":"LABEL_O", "score":0.011896083131432533}]]

// example api
// if (city) {
// 	apiURL = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=${city}&aqi=no`;
// } else {
// 	console.log(process.env.WEATHER_KEY);
// 	apiURL = `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=13346&aqi=no`;
// }
// try {
// 	const query = await fetch(apiURL);
// 	const response = await query.json();
// 	return NextResponse.json({ response });
// } catch (e) {
// 	console.log(e);
// }
