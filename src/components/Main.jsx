import Header from "./Header";

export default function Main() {
  return (
    <div className="main-div">
      <div className="header-div">
        <Header />
      </div>
      <div className="status-div">
        <h2>game win! (progress)</h2>
      </div>
      <div className="turns-remaining-div">
        <h2>turns remaining</h2>
      </div>
      <div className="spaces-div">
        <h2>spaces</h2>
      </div>
      <div className="keyboard-div">
        <h2>keyboard</h2>
      </div>
      <div className="new-game-div">
        <h2>new game button</h2>
      </div>
    </div>
  );
}
