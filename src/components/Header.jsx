export default function Header(props) {
  return (
    <>
      <h1>
        <span style={{ color: "var(--red-500)" }}>w</span>
        <span style={{ color: "var(--orange-500)" }}>o</span>
        <span style={{ color: "var(--green-500)" }}>r</span>
        <span style={{ color: "var(--sky-500)" }}>d</span>
      </h1>
      <p>guess the word in {props.nAttempts} attempts or fewer</p>
    </>
  );
}
