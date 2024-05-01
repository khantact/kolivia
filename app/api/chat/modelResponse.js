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
	let weatherResponse = false;
	let appointmentResponse = false;
	const APPOINTMENT_LABEL = "LABEL_0";
	const QUESTION_LABEL = "LABEL_1";
	const WEATHER_LABEL = "LABEL_2";
	const DEFAULT_RESPONSE = "I dont know how to answer that question, sorry!";

	// Vars for appointment model
	const REASON_LABEL = "REASON";
	const DATE_START = "DATE_START";
	const DATE_END = "DATE_END";
	let calendarReason = "";
	let dateStart = "";
	let dateEnd = "";
	// let currentHour = new Date().toLocaleTimeString([], {
	// 	hour: "2-digit",
	// 	hour12: false,
	// });

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

	if (labelWithMaxScore === WEATHER_LABEL) {
		weatherResponse = true;
	} else if (labelWithMaxScore === APPOINTMENT_LABEL) {
		appointmentResponse = true;
		appointmentMapping(input["inputs"]).then((response) => {
			// example response:
			// [{"entity_group":"REASON","word":"go to the Dentist","start":23,"end":40,"score":1},{"entity_group":"PM_TIME_START","word":"3","start":46,"end":47,"score":1},{"entity_group":"DATE_END","word":"5","start":48,"end":49,"score":1}]
			response.forEach((element) => {
				console.log(element);
				// element is dictionary
				if (element[entity_group] === REASON_LABEL) {
					calendarReason = element[word];
				} else if (element[entity_group] === DATE_START) {
					dateStart = element[word];
				} else if (element[entity_group] === DATE_END) {
					dateEnd = element[word];
				}
			});
		});
		return;
	} else if (labelWithMaxScore === QUESTION_LABEL) {
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
	} else if (appointmentResponse) {
	}
	return DEFAULT_RESPONSE;
};

async function appointmentMapping(data) {
	if (data[data.length - 1] !== ".") {
		data += ".";
	}

	const response = await fetch(
		"https://api-inference.huggingface.co/models/Agreus/en_pipeline",
		{
			headers: { Authorization: `Bearer ${process.env.API_KEY}` },
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

//example repsonse is:
// [[{"label":"LABEL_2", "score":0.8822324275970459}, {"label":"LABEL_1","score":0.10587149113416672}, {"label":"LABEL_O", "score":0.011896083131432533}]]
