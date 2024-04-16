"use client";
import Image from "next/image";
import React from "react";

function SingleForecast({ forecastData }: any) {
	const militaryTime = forecastData.time.split(" ")[1];
	const time = militaryTime.split(":");
	var hours = Number(time[0]);
	var timeValue;
	const iconPath = "https:" + forecastData.condition.icon;
	const fTemp = Math.round(forecastData.temp_f) + "°F";
	if (hours > 0 && hours <= 12) {
		timeValue = "" + hours;
	} else if (hours > 12) {
		timeValue = "" + (hours - 12);
	} else if (hours == 0) {
		timeValue = "12";
	}
	timeValue += hours >= 12 ? " PM" : " AM";

	return (
		<div>
			<div className="flex flex-col gap-x-2 text-sm text-black">
				<div className="text-center">{timeValue}</div>
				<Image src={iconPath} alt="pic" width={75} height={75}></Image>
				<div className="text-center">{fTemp}</div>
			</div>
		</div>
	);
}

export default SingleForecast;
