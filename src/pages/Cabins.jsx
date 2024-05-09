import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import Filter from "../ui/Filter";
import SortBy from "../ui/SortBy";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <Filter
          filter="discount"
          options={[
            { value: "all", label: "All" },
            { value: "no-discount", label: "No Discount" },
            { value: "with-discount", label: "With Discount" },
          ]}
        />
        <SortBy
          options={[
            { value: "name-asc", label: "Sort by Name (A-Z)" },
            { value: "name-desc", label: "Sort by Name (Z-A))" },
            { value: "regularPrice-asc", label: "Sort by Price (low to high)" },
            {
              value: "regularPrice-desc",
              label: "Sort by Price (high to low)",
            },
            {
              value: "maxCapacity-asc",
              label: "Sort by Capacity (low to high)",
            },
            {
              value: "maxCapacity-desc",
              label: "Sort by Capacity (high to low)",
            },
          ]}
        />
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
