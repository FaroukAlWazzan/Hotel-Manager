import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

function Logout() {
  const { logout, isDeleting } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isDeleting}>
      {!isDeleting ? <HiArrowLeftOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
