import React from "react";
import styles from "../styles/Home.module.css";

const techImgURLs = [
	{
		name: "react",
		Url:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png",
	},
	{
		name: "next.js",
		Url: "https://miro.medium.com/max/650/0*UDc8KYYpxxn2ynWe.jpg",
	},
	{
		name: "StepZen",
		Url:
			"https://res.cloudinary.com/practicaldev/image/fetch/s--rIjbQB7r--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/3943/af485a9e-2bd8-4dbd-97d0-b998e5adcc0c.png",
	},
	{
		name: "GraphQL",
		Url:
			"data:image/png;base64,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",
	},
];

export default function TechnologyUsed() {
	return (
		<div>
			<h2 className={styles.section_header}>Technologies Used</h2>
			<div className={styles.team}>
				{techImgURLs.map((tech) => (
					<img key={tech.name} src={tech.Url} alt={tech.name} className={styles.logo_tech} />
				))}
			</div>
		</div>
	);
}