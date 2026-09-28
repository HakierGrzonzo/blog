import { FancyText } from "@/components/fancy-text";
import { Project } from "@/components/Project";

export default function Projects() {
  return (
    <>
      <h1>
        <FancyText prefix={2}>My personal projects:</FancyText>
      </h1>
      <Project
        link="https://moringmark.grzegorzkoperwas.site/"
        title="MoringMark Archive"
        prefix={"Moring".length}
      >
        <p>
          An archive of all <em>The Owl House</em> comics drawn by renowned
          artist u/makmark
        </p>
      </Project>
      <Project
        link="https://reviewshuffle.koperwas.org"
        title="ReviewShuffle"
        prefix={"Review".length}
      >
        <p>
          A simple application to pick which developer should do this sprint's
          review presentation. Hosted on <em>Cloudflare Pages.</em>
        </p>
      </Project>
      <Project
        link="https://pbl.grzegorzkoperwas.site/map/"
        title="PBL-polsl-2022"
        prefix={"PBL".length}
      >
        <p>
          Webapp for collecting, processing and displaying field measuremnts for
          a research project at <em>Silesian University of Technology</em>
        </p>
      </Project>
      <Project
        link="https://clip.grzegorzkoperwas.site/"
        title="clipselect"
        prefix={"clip".length}
      >
        <p>
          Simple remix application generating gifs and webms from tv-shows.
          source code is hosted on my github.
        </p>
      </Project>
    </>
  );
}
