import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import NewFormRow from "../../ui/NewFormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
//   background-color: var(--color-red-100);
//   border-radius: var(--border-radius-sm);
//   height: 3rem;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

function CreateCabinForm({ cabinForEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinForEdit;

  // console.log(editValues);

  const isEditingSession = Boolean(editId);

  const { createMutate, isCreating } = useCreateCabin();

  const { editMutate, isEditing } = useEditCabin();

  const isPending = isCreating || isEditing;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: isEditingSession ? editValues : {} });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    // console.log(data);
    if (isEditingSession)
      editMutate(
        { newCabinData: { ...data, image: image }, id: editId },
        {
          onSuccess: (data) => {
            // console.log(data);
            reset();
            // setShowEdit(false);
            onCloseModal?.();
          },
        }
      );
    else
      createMutate(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form
      type={onCloseModal ? "modal" : "regular"}
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      {/* the following is the old FormRow before refactoring it to a new component */}
      {/* <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is Required",
          })}
        />
        {errors?.name?.message && <Error>{errors.name.message}</Error>}
      </FormRow> */}

      <NewFormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This Field is Required",
          })}
          disabled={isPending}
        />
      </NewFormRow>

      <NewFormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This Field is Required",
            min: {
              value: 1,
              message: "The least acceptable value is 1",
            },
          })}
          disabled={isPending}
        />
      </NewFormRow>

      <NewFormRow error={errors?.regularPrice?.message} label="Regular price">
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This Field is Required",
            min: {
              value: 1,
              message: "The least value is 1",
            },
          })}
          disabled={isPending}
        />
      </NewFormRow>

      <NewFormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This Field is Required",
            validate: (val, formValues) =>
              +val <= +formValues.regularPrice ||
              "The Discount must be less than the price",
          })}
          disabled={isPending}
        />
      </NewFormRow>

      <NewFormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="text"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This Field is Required",
          })}
          disabled={isPending}
        />
      </NewFormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditingSession
              ? false
              : "You must upload an image as well",
            validate: (fileData) => {
              if (typeof fileData === "string" || fileData?.length === 1)
                return true;
              toast.error(
                "You forgot to choose a new photo. If you changed your mind, please reload the page"
              );
              return "You must choose a picture";
            },
          })}
          disabled={isPending}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isPending}>
          {isEditingSession ? "Edit Cabin" : "Create a cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
