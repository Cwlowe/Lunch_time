import React from "react";
import styles from "../styles/Home.module.css";

const TeamMembers = [
	{
		name: "Calvin",
		LinkedinURL: "https://www.linkedin.com/in/calvin-lowe/",
		GitHubURL: "https://github.com/Cwlowe",
	},
	{
		name: "Leslie",
		LinkedinURL: "https://www.linkedin.com/in/leslie-meng/",
		GitHubURL: "https://github.com/leslie-meng",
	},
	{
		name: "Kelsey",
		LinkedinURL: "https://www.linkedin.com/in/kelsey-m-schroeder/",
		GitHubURL: "https://github.com/ka9kdc",
	},
];

export default function Team() {
	return (
		<div>
			<h2 className={styles.section_header}>The Team</h2>
			<div className={styles.team}>
				{TeamMembers.map((member) => (
					<div>
						<h3>{member.name}</h3>
						<p>
							<a href={member.LinkedinURL}>
								<img
									src="LinkedinLogo.png"
									alt="Linkedin"
									className={styles.logo_links}
								/>
							</a>
							<a href={member.GitHubURL}>
								<img
									src="GithubLogo.png"
									alt="Github"
									className={styles.logo_links}
								/>
							</a>
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
