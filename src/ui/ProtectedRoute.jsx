import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. get current user
  const { isLoading, isAuthenticated, fetchStatus } = useUser();

  // 3. if not authenticated (no user) redirect to login page
  useEffect(() => {
    if (!isAuthenticated && fetchStatus !== "fetching") navigate("/login");
  }, [isAuthenticated, navigate, isLoading, fetchStatus]);

  // 2. if loading show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if authenticated return the application
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
