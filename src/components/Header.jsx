export default function Header(props) {
  return (
    <>
      <h1>
        <span style={{ WebkitTextStroke: "3px var(--red-500)" }}>w</span>
        <span style={{ WebkitTextStroke: "3px var(--orange-500)" }}>o</span>
        <span style={{ WebkitTextStroke: "3px var(--green-500)" }}>r</span>
        <span style={{ WebkitTextStroke: "3px var(--sky-500)" }}>d</span>
      </h1>
      <p>guess the word in {props.nAttempts} attempts or fewer</p>
    </>
  );
}
