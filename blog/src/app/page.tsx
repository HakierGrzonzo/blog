import { FancyText } from "@/components/fancy-text";

export default function Home() {
  return (
    <>
      <h1>
        <FancyText prefix={"Hakier".length}>HakierGrzonzo&apos;s Page</FancyText>
      </h1>
      <h2 className="header">#whoami</h2>
      <p>
        I am a young fullstack developer, currently working full-time at{" "}
        <em>STX Next</em>.
      </p>
      <h2 className="header">#socials</h2>
      <ul className="socials">
        <li>
          <a href="https://github.com/HakierGrzonzo">Github</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/hakiergrzonzo">LinkedIn</a>
        </li>
        <li>
          <a href="https://reddit.com/u/hakiergrzonzo">Reddit</a>
        </li>
        <li>
          <a rel="me" href="https://social.linux.pizza/@hakiergrzonzo">
            Mastodon
          </a>
        </li>
      </ul>
    </>
  );
}
