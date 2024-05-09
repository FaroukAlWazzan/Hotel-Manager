// import { updateSetting } from "../../services/apiSettings";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import NewFormRow from "../../ui/NewFormRow";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
    isLoading,
  } = useSettings();

  const { updateSetting, isUpdating } = useUpdateSetting();

  function handleUpdate(e) {
    const { value, defaultValue, id } = e.target;
    if (!value || value === defaultValue) return;
    updateSetting({ [id]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <NewFormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          disabled={isUpdating}
          defaultValue={minBookingLength}
          onBlur={(e) => handleUpdate(e)}
        />
      </NewFormRow>
      <NewFormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          disabled={isUpdating}
          defaultValue={maxBookingLength}
          onBlur={(e) => handleUpdate(e)}
        />
      </NewFormRow>
      <NewFormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxGuestsPerBooking"
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e)}
        />
      </NewFormRow>
      <NewFormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e)}
        />
      </NewFormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
