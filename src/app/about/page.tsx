import type { Metadata } from "next";
import { CVEntry } from "@/components/CVEntry";
import { CVRow } from "@/components/CVRow";
import { CVSection } from "@/components/CVSection";
import { FancyList } from "@/components/FancyList";
import { FancyText } from "@/components/fancy-text";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "CV - Grzegorz Koperwas",
};

const skills: [string, string[]][] = [
  [
    "Front-end",
    ["React", "Next.js", "MUI", "React-Native", "HTML5", "HLS", "CSS3", "vite"],
  ],
  [
    "Back-end",
    [
      "FastAPI",
      "pydantic",
      "SQLAlchemy",
      "Nest.js",
      "poetry",
      "PostgreSQL",
      "MySQL",
      "SurrealDB",
      "nginx",
    ],
  ],
  [
    "DevOps",
    [
      "Docker",
      "AWS",
      "GCP",
      "Gitlab CI/CD",
      "Linux",
      "GitHub Actions",
      "OpenTelemetry",
      "Terraform",
    ],
  ],
  ["LLM AI", ["ollama selfhosting", "OpenAI API", "Claude Code"]],
  ["Programming", ["Python", "TypeScript", "JavaScript", "LaTeX"]],
  ["Languages", ["English (C2)", "Polish (native)", "German (A1)"]],
];

export default function About() {
  return (
    <div className={styles.page}>
      <h1>
        <FancyText prefix={"Grzegorz".length}>GrzegorzKoperwas</FancyText>
      </h1>
      <span>Senior Fullstack Developer · Gliwice, Poland</span>

      <p>
        Fullstack developer not afraid of any challenge. Successful hackathon
        junkie on a local and international stage.
      </p>
      <p>
        An accomplished individual contributor, and an inspiring leader.
        Experienced in software consulting and capable of not just implementing
        the solution, but of solving real problems.
      </p>
      <p>
        Optimizing work processes on a team level, optimizing &amp; diagnosing
        performance across multiple services. Defining architecture on the
        application level.
      </p>
      <p>
        <a href="https://github.com/hakiergrzonzo">GitHub</a> ·{" "}
        <a href="https://www.linkedin.com/in/hakiergrzonzo">LinkedIn</a>
      </p>

      <CVSection title="Skills">
        {skills.map(([category, values]) => (
          <CVRow key={category} label={`${category}:`}>
            <FancyList items={values} />
          </CVRow>
        ))}
      </CVSection>

      <CVSection title="Experience">
        <CVEntry
          employer="STX Next"
          dates="07.2024 - ongoing"
          position="Senior Fullstack Developer — AdTech campaign management platform"
          tech="Python, FastAPI, SQLAlchemy, OpenTelemetry, GCP, GitLab CI/CD, Terraform, Docker, React, NestJS"
        >
          <li>
            Enterprise microservice application for managing advertising
            campaigns for one of the biggest companies in the space.
          </li>
          <li>
            Developed and introduced agentic AI development practices in the
            team.
          </li>
          <li>
            Leading a team and working with product to design solutions;
            designing system architecture and presenting ADRs to stakeholders.
          </li>
          <li>
            Designed and implemented an Excel-like domain specific language,
            with a working compiler and bytecode interpreter.
          </li>
          <li>
            Introduced OpenTelemetry observability and used it to optimize load
            times 10×.
          </li>
          <li>
            Built the complete CI/CD pipeline to GCP and handed it off to
            DevOps; leveraged OpenAPI for client generation and custom API
            review tooling.
          </li>
          <li>
            Owned AuthN/AuthZ: documented processes, identified and resolved
            security vulnerabilities.
          </li>
        </CVEntry>
        <CVEntry
          employer="STX Next"
          dates="06.2023 - 05.2024"
          position="Fullstack Developer — Veterinary drug & clinical data platform"
          tech="Python, FastAPI, Django, Piccolo ORM, PostgreSQL, MySQL, pytest, TypeScript, React Native, AWS, GitHub Actions, Docker"
        >
          <li>
            Up to date drug and treatment information for veterinary
            professionals (web &amp; mobile app), and a microservice API for
            corporate customers.
          </li>
          <li>
            Developed a RESTful API in FastAPI following Domain-Driven Design;
            generated and maintained OpenAPI specifications and clients.
          </li>
          <li>
            Maintained the Django backend and React Native frontend; built PDF
            generation and implemented the mobile app&apos;s new look.
          </li>
          <li>
            Refactored the API to dramatically speed up development; debugged
            and fixed issues in open source dependencies.
          </li>
          <li>
            Coordinated integrations with other teams; worked with DevOps on CI
            and debugged AWS hosted environments.
          </li>
        </CVEntry>
        <CVEntry
          employer="STX Next"
          dates="03.2022 - 06.2023"
          position="Fullstack Developer — Industrial & sales analytics dashboards"
          tech="React, TypeScript, Redux, Material-UI, Highcharts.js, Jest, Karma, GitHub Actions, OpenAPI"
        >
          <li>
            React dashboards for monitoring steam cracking of hydrocarbons and
            for comparing sales forecasts.
          </li>
          <li>
            Co-created a shared React component library/pseudoframework for
            internal applications, in cooperation with UI/UX, and coordinated
            its use across teams.
          </li>
          <li>
            Built selective data fetching with caching; reduced date input
            rendering time 10×; extended Highcharts.js with custom tooltips and
            graph types.
          </li>
          <li>
            Planned the backend migration from a proprietary monolith to
            microservices; helped define OpenAPI schemas with the backend team.
          </li>
          <li>
            Worked with the client&apos;s team in Texas; resolved time zone and
            DST bugs; maintained GitHub Actions CI.
          </li>
        </CVEntry>
        <CVEntry
          employer="APA sp. z o.o."
          dates="06.2020 - 02.2022"
          position="Systems Analyst, Software Developer, DevOps"
          tech="Python, Flask, jQuery, libav, Docker, NGINX, Angular, TypeScript, Webpack, Unity, Linux, Bash"
        >
          <li>
            <b>KamCośRTSP:</b> created an in-house ffmpeg (libav) based CCTV
            video proxy made of several microservices, with a Flask/jQuery web
            interface. Started as a proof of concept during my internship.
          </li>
          <li>
            Integrated hardware accelerated transcoding with NVIDIA CUDA/NVENC
            and VAAPI; managed Docker images, a Docker server and CI/CD
            pipelines for testing and delivery.
          </li>
          <li>
            <b>WebSO:</b> developed the Angular web interface and a component
            library with fully custom CSS for a user-customizable Nazca BMS
            dashboard; set up and managed its CI/CD pipelines.
          </li>
          <li>
            Developed Unity based AR mobile prototypes communicating with Nazca
            BMS.
          </li>
          <li>
            Built an Agile/Scrum time estimation tool using the JIRA REST API;
            customized embedded Linux images for IoT teams.
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
            automated the importing process for over 20 000 works
          </li>
        </CVEntry>
      </CVSection>

      <CVSection title="Personal Projects">
        <CVEntry
          employer="Pebbenote"
          dates="2025 - ongoing"
          position="Pebble note-taking app"
        >
          <li>
            Note-taking app for the Pebble smartwatch: dictate on the watch, a
            local LLM (Ollama) turns the dictation into formatted notes.
          </li>
          <li>
            FastAPI/PostgreSQL backend with Taskiq workers and Keycloak sign-in;
            watchapp in C and TypeScript with a generated OpenAPI client.
          </li>
          <li>
            Published on the{" "}
            <a href="https://apps.rebble.io/en_US/search/watchapps/1?query=pebbenote">
              Rebble app store
            </a>
            .
          </li>
        </CVEntry>
        <CVEntry
          employer="MoringMark Archive"
          dates="2024 - ongoing"
          position="Comic archive"
        >
          <li>
            Statically generated Next.js comic archive on AWS, with comics
            gathered via the reddit API, OCR alt-text and CI/CD on GitHub
            Actions.
          </li>
          <li>
            Hosted at{" "}
            <a href="https://moringmark.grzegorzkoperwas.site">
              moringmark.grzegorzkoperwas.site
            </a>
            : gigabytes of traffic and 2200+ monthly Google hits for 3$ a month.
          </li>
        </CVEntry>
        <CVEntry
          employer="Soundscape of Zabrze"
          dates="2022"
          position="Research project"
        >
          <li>
            Took part in the research project &quot;A way to investigate the
            soundscape of urban spaces: a case study on the example of city of
            Zabrze&quot;.
          </li>
          <li>
            Designed and implemented a React/FastAPI fullstack application to
            help with gathering and displaying measurements.
          </li>
          <li>Co-authored a research paper for the IBIMA conference.</li>
        </CVEntry>
        <CVEntry employer="Homelab" position="Managing 3 servers">
          <li>Operates a network of three servers for redundancy.</li>
          <li>Created automated versioned backup system.</li>
          <li>
            Configured nginx to proxy requests to internal services and bully
            script-kiddies involving automated rickrolling of wordpress exploits
            and other shenanigans.
          </li>
        </CVEntry>
        <CVEntry employer="bfc64" dates="12.2020" position="University project">
          <li>
            A simple BrainFuck to Commodore 64 cross compiler written in C++.
          </li>
        </CVEntry>
        <CVEntry employer="ClipSelect" dates="05.2020" position="Flask WebApp">
          <li>
            Currently hosted{" "}
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
          employer="CASSINI Hackathon"
          dates="2023"
          position="Second place"
        >
          <li>
            5th CASSINI Hackathon: Space for Defence &amp; Security, organized
            by Incubator STARTER.
          </li>
        </CVEntry>
        <CVEntry
          employer="European Healthcare Hackathon"
          dates="2022"
          position="First place"
        >
          <li>Organized by InterSystems in Czechia.</li>
        </CVEntry>
        <CVEntry employer="GUS Datathon" dates="2022" position="First place">
          <li>
            &quot;Wykorzystanie API do bazy Dziedzinowe Bazy Wiedzy Głównego
            Urzędu Statystycznego&quot;, organized by Kancelaria Prezesa Rady
            Ministrów.
          </li>
        </CVEntry>
        <CVEntry
          employer="Silesian University of Technology"
          dates="2022"
          position="Best Student"
        >
          <li>Awarded by Rada Społeczna Politechniki Śląskiej.</li>
        </CVEntry>
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
          <li>Organized by IBM and MIMUW.</li>
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
          dates="10.2020 - 01.2024"
          position="Applied Informatics"
        >
          <li>Computer Networks and Cybersecurity</li>
        </CVEntry>
      </CVSection>
    </div>
  );
}
