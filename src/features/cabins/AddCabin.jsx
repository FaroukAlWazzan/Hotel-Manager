// import { useState } from "react";
import Button from "../../ui/Button";
// import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

import Modal from "../../ui/Modal";
// import TestComp from "./TestComp";
// import CabinTable from "./CabinTable";

function AddCabin() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Modal>
        <Modal.Open opens="form">
          <Button>Create Cabin</Button>
        </Modal.Open>
        <Modal.Window name="form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      {/* below is the old implementation of Modal without compound component pattern */}
      {/* <Button onClick={() => setIsModalOpen((show) => !show)}>
        Create Cabin
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateCabinForm onCloseModal={() => setIsModalOpen(false)} />
        </Modal>
      )} */}
    </div>
  );
}

export default AddCabin;
