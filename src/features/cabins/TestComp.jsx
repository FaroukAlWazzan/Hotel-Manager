import Button from "../../ui/Button";

function TestComp({ onCloseModal }) {
  return (
    <div>
      hello test comp
      <Button onClick={onCloseModal}>Close</Button>
    </div>
  );
}

export default TestComp;
