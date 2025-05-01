// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import MiniDrawer from './components/Dashboard';
// import UserTable from './components/UserTable';


// const routes = [
//   { path: '/table', element: <UserTable /> },
//   { path: '/', element: <MiniDrawer /> },
// ];


// function App() {
//   return (
//     <Router>
//       <Routes>
//         {routes.map(({ path, element }, index) => (
//           <Route key={index} path={path} element={element} />
//         ))}
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import { BrowserRouter } from 'react-router-dom';
import MiniDrawer from './components/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      < MiniDrawer/>
    </BrowserRouter>
  );
}
