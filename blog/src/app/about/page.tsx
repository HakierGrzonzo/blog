import type { Metadata } from "next";
import { CVEntry } from "@/components/CVEntry";
import { CVSection } from "@/components/CVSection";
import { FancyList } from "@/components/FancyList";
import { FancyText } from "@/components/fancy-text";

export const metadata: Metadata = {
  title: "CV - Grzegorz Koperwas",
};

const skills: [string, string[]][] = [
  ["Frontend", ["HTML", "CSS", "Angular", "React", "JavaScript", "TypeScript"]],
  [
    "Backend",
    [
      "Python",
      "Flask",
      "FastAPI",
      "SQLAlchemy",
      "nginx",
      "MySQL",
      "MariaDB",
      "Postgres",
    ],
  ],
  [
    "DevOps",
    ["Git", "Github", "Gitlab CI/CD", "Docker Swarm", "Linux", "bash", "QEMU"],
  ],
  ["Programming", ["C++", "libav", "openal", "C#", "Java", "Unity", "MOS6502"]],
  ["Languages", ["Polish (native)", "English (C2)", "German (A1)"]],
];

export default function About() {
  return (
    <>
      <h1>
        <FancyText prefix={"Grzegorz".length}>GrzegorzKoperwas</FancyText>
      </h1>
      <span className="left">Fullstack Developer</span>

      <CVSection title="Skills">
        {skills.map(([category, values]) => (
          <li key={category}>
            <span className="category">{category}:</span>
            <span className="values">
              <FancyList items={values} />
            </span>
          </li>
        ))}
      </CVSection>

      <CVSection title="Experience">
        <CVEntry
          employer="STX Next"
          dates="03.2022 - Current"
          position="Fullstack Developer"
        />
        <CVEntry
          employer="APA Group"
          dates="09.2020 - 09.2021"
          position="Junior Fullstack Developer"
        >
          <li>Developed Angular based frontend for Nazca BMS.</li>
          <li>Created and maintained Gitlab CI/CD pipelines.</li>
          <li>
            Aided IOT hardware team in developing embedded Linux images with
            required kernel modules and software.
          </li>
        </CVEntry>
        <CVEntry
          employer="Organization for Transformative Works"
          dates="09.2021 - ongoing"
          position="Open Doors Technical Volunteer"
        >
          <li>
            Optimized MySQL queries in order to speed up importing process by 7
            times.
          </li>
          <li>
            Developed tools to autodetect character encoding of thousands of
            text files and show differences between different ones in a user
            friendly way.
          </li>
          <li>
            Worked remotely with international team of volunteers across
            time-borders.
          </li>
          <li>
            Created import scripts for &quot;Fiction Alley&quot; archive, that
            automated the importing process for over 20{" "}000 works
          </li>
        </CVEntry>
        <CVEntry
          employer="APA Group"
          dates="07.2020 - 09.2020"
          position="Intern"
        >
          <li>
            Created a camera management application in Flask using FFmpeg as a
            proxy and as a transcoder.
          </li>
          <li>
            Created prototype AR application in Unity for use with Nazca BMS.
          </li>
        </CVEntry>
      </CVSection>

      <CVSection title="Personal Projects">
        <CVEntry employer="Homelab" position="Managing 3 servers">
          <li>Operates a network of three servers for redundancy.</li>
          <li>Created automated versioned backup system.</li>
          <li>
            Configured nginx to proxy requests to internal services and bully
            script-kiddies involving automated rickrolling of wordpress exploits
            and other shenanigans.
          </li>
        </CVEntry>
        <CVEntry
          employer="grzemplate"
          dates="11.2021"
          position="Static Site Generator"
        >
          <li>
            Python based static site generator based on component system
            providing Angular-like development experience.
          </li>
          <li>This site was developed and generated with it.</li>
        </CVEntry>
        <CVEntry employer="ClipSelect" dates="05.2020" position="Flask WebApp">
          <li>
            Currently hosted{" "}
            <a href="https://clip.grzegorzkoperwas.site/">here</a>.
          </li>
          <li>
            A web service created using Flask, MySQL and ffmpeg in order to
            provide gifs generated from quotes in select tv-shows.
          </li>
          <li>Features microservice architecture.</li>
        </CVEntry>
        <CVEntry
          employer="tinypub"
          dates="12.2019"
          position="Console EPUB reader"
        >
          <li>
            Features self-developed HTML rendering engine that respects CSS
            formatting where possible.
          </li>
        </CVEntry>
      </CVSection>

      <CVSection title="Awards & Contests">
        <CVEntry
          employer="HackYeah - Opener.gov"
          dates="12.2021"
          position="Second place"
        >
          <li>
            Solution that I came up with and implemented with my team won second
            place in the category sponsored by Polish Ministry of Finance
          </li>
          <li>
            Created FastAPI backend for opening compressed file archives and PDF
            anonymization.
          </li>
          <li>Created electron based frontend application.</li>
        </CVEntry>
        <CVEntry employer="CryptoBrawl" dates="10.2021" position="First place">
          <li>
            Documented API&apos;s for simulated trading platform developed by
            IBM.
          </li>
          <li>
            Came up and implemented successful high frequency trading
            algorithms.
          </li>
        </CVEntry>
      </CVSection>

      <CVSection title="Education">
        <CVEntry
          employer="Silesian University of Technology"
          dates="10.2020 - now"
          position="Faculty of Applied Informatics"
        />
        <CVEntry
          employer={"I Liceum Ogólnokształcące w Gliwicach"}
          dates="09.2017 - 05.2020"
          position="Physics/Maths"
        >
          <li>
            Managed production of promotional videos in a multi-person team,
            including consulting the headmaster (client).
          </li>
        </CVEntry>
      </CVSection>
    </>
  );
}
