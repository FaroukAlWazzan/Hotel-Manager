import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ numDays, numCabins, bookings, confirmedStays }) {
  const totalEarning = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const occupancy =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * numCabins);

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Bookings"
        value={bookings.length}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Sales"
        value={formatCurrency(totalEarning)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Check ins"
        value={confirmedStays.length}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="occupancy rate"
        value={Math.round(occupancy * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
