// the next for the Wild Oasis project itself
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import Cabins from "./pages/Cabins";
import AppLayout from "./ui/AppLayout";
import NewUsers from "./pages/Users";
import GlobalStyles from "./styles/GlobalStyles";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import CheckinBooking from "./features/check-in-out/CheckinBooking";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./contexts/DarkModeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<CheckinBooking />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="account" element={<Account />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<NewUsers />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "12px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 4000,
            },
            style: {
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              fontSize: "16px",
              padding: "16px 24px",
              maxWidth: "500px",
              textAlign: "center",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;

// // old code
// // import styled from "styled-components";
// // import GlobalStyles from "./styles/GlobalStyles";
// // import Button from "./ui/Button";
// // import Input from "./ui/Input";
// // import Heading from "./ui/Heading";
// // import Row from "./ui/Row";

// // const P = styled.p`
// //   background-color: yellow;
// // `;

// // const StyledApp = styled.div`
// //   background-color: orage;
// //   padding: 20px;
// // `;

// // function App() {
// //   styled;
// //   return (
// //     <>
// //       <GlobalStyles />
// //       <StyledApp>
// //         <Row>
// //           <Heading as="h1">The Wild Oasis</Heading>
// //           <P>Hello Good people</P>
// //         </Row>
// //         <Row type="vertical">
// //           <Heading as="h2">Check in and out</Heading>
// //           <Button>This is a Button</Button>
// //           <Button variation="danger" size="small">
// //             This 2nd a Button
// //           </Button>
// //           <Button size="large" variation="seconday">
// //             3rd Button
// //           </Button>
// //         </Row>
// //         <Input placeholder="This is an input" />
// //         <Heading as="h3">the smallest one</Heading>
// //       </StyledApp>
// //     </>
// //   );
// // }

// // export default App;

// the next for Render props design pattern in React

// import { useState } from "react";
// import { faker } from "@faker-js/faker";
// import "./styles-render-props.css";

// const products = Array.from({ length: 20 }, () => {
//   return {
//     productName: faker.commerce.productName(),
//     description: faker.commerce.productDescription(),
//     price: faker.commerce.price(),
//   };
// });

// export default function App() {
//   return (
//     <div>
//       <h1>Render Props Demo</h1>

//       <div className="col-2">
//         <List
//           title="Products"
//           items={products}
//           render={(product) => (
//             <ProductItem key={product.productName} product={product} />
//           )}
//         />
//         <List
//           title="Companies"
//           items={companies}
//           render={(company) => (
//             <CompanyItem
//               key={company.companyName}
//               company={company}
//               defaultVisibility={false}
//             />
//           )}
//         />
//       </div>
//     </div>
//   );
// }

// function List({ title, items, render }) {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isCollapsed, setIsCollapsed] = useState(false);

//   const displayItems = isCollapsed ? items.slice(0, 3) : items;

//   function toggleOpen() {
//     setIsOpen((isOpen) => !isOpen);
//     setIsCollapsed(false);
//   }

//   return (
//     <div className="list-container">
//       <div className="heading">
//         <h2>{title}</h2>
//         <button onClick={toggleOpen}>
//           {isOpen ? <span>&or;</span> : <span>&and;</span>}
//         </button>
//       </div>
//       {isOpen && <ul className="list">{displayItems.map(render)}</ul>}

//       <button onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}>
//         {isCollapsed ? `Show all ${items.length}` : "Show less"}
//       </button>
//     </div>
//   );
// }

// function ProductItem({ product }) {
//   return (
//     <li className="product">
//       <p className="product-name">{product.productName}</p>
//       <p className="product-price">${product.price}</p>
//       <p className="product-description">{product.description}</p>
//     </li>
//   );
// }

// // LATER: Let's say we got this component from a 3rd-party library, and can't change it. But we still want to add the 2 toggle functionalities to it
// function ProductList({ title, items }) {
//   return (
//     <ul className="list">
//       {items.map((product) => (
//         <ProductItem key={product.productName} product={product} />
//       ))}
//     </ul>
//   );
// }

// const companies = Array.from({ length: 15 }, () => {
//   return {
//     companyName: faker.company.name(),
//     phrase: faker.company.catchPhrase(),
//   };
// });

// function CompanyItem({ company, defaultVisibility }) {
//   const [isVisible, setIsVisisble] = useState(defaultVisibility);

//   return (
//     <li
//       className="company"
//       onMouseEnter={() => setIsVisisble(true)}
//       onMouseLeave={() => setIsVisisble(false)}
//     >
//       <p className="company-name">{company.companyName}</p>
//       {isVisible && (
//         <p className="company-phrase">
//           <strong>About:</strong> {company.phrase}
//         </p>
//       )}
//     </li>
//   );
// }

// the next is for Compound component design pattern

// import CounterCompoundPattern from "./CounterCompoundPattern";

// function App() {
//   return (
//     <div>
//       <h1>Counter app using Compound component pattern</h1>
//       {/* following is Old */}
//       {/* <CounterCompoundPattern
//         label="not flexible component with lots of props"
//         doIncrement={false}
//         doDecrement={false}
//         showLabel={false}
//         incrementIcon="+"
//         decrementIcon="-"
//       /> */}
//       <CounterCompoundPattern>
//         <CounterCompoundPattern.Label>
//           Best New Counter Everrr
//         </CounterCompoundPattern.Label>
//         <CounterCompoundPattern.Increment icon="+" />

//         <CounterCompoundPattern.Count />
//       </CounterCompoundPattern>
//     </div>
//   );
// }

// export default App;
