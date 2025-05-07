import Board from "./Board";

export default function Game() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        fontFamily: "monospace",
      }}
    >
      <div>
        <Board />
      </div>
      <div style={{ marginLeft: "1rem" }}>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}
