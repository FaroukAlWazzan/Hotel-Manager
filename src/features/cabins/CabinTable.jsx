import styled from "styled-components";
import CabinRow from "./CabinRow";
// import { useQuery } from "@tanstack/react-query";
// import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import { useCabins } from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

function CabinTable() {
  // const queryClient = useQueryClient();
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const discount = searchParams.get("discount") || "all";
  // console.log(field, direction);

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resource="cabins" />;

  let filteredCabins;
  if (discount === "all") filteredCabins = cabins;
  if (discount === "no-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
  if (discount === "with-discount")
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  console.log(filteredCabins);

  const sortedCabins = filteredCabins.sort((a, b) =>
    typeof a[field] === "string"
      ? a[field].localeCompare(b[field]) * modifier
      : (a[field] - b[field]) * modifier
  );

  // const sortedCabins = filteredCabins.sort((a, b) => {
  //   if (field === "name") {
  //     return a[field].localeCompare(b[field]) * modifier;
  //   } else {
  //     const valA = Number(a[field]) || 0;
  //     const valB = Number(b[field]) || 0;

  //     return (valA - valB) * modifier;
  //   }
  // });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
        {/* {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))} */}
      </Table>
    </Menus>
  );
}

export default CabinTable;
