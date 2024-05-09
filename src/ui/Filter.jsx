import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const Div = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const Button = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active === "active" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ options, filter }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentVal = searchParams.get(filter) || options.at(0).value;
  // console.log(currentVal);

  function handleClick(e) {
    searchParams.set(filter, e.target.value);
    if (searchParams.get("page")) {
      searchParams.set("page", 1);
    }
    setSearchParams(searchParams);
  }

  return (
    <Div onClick={handleClick}>
      {options.map((opt) => (
        <Button
          key={opt.value}
          value={opt.value}
          active={opt.value === currentVal ? "active" : "default"}
          disabled={opt.value === currentVal}
        >
          {opt.label}
        </Button>
      ))}
    </Div>
  );
}

export default Filter;
