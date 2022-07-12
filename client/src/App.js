import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Accomodation from './components/pages/Accomodation';
import Admin from './components/pages/Admin';
import Gifts from './components/pages/Gifts';
import Itinerary from './components/pages/Itinerary';
import Location from './components/pages/Location';
import Login from './components/pages/Login';
import Navigation from './components/Navigation';
import RequireAuth from './routing/RequireAuth';
import Rsvp from './components/pages/Rsvp';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <RequireAuth admin={true}>
                <Admin />
              </RequireAuth>
            }
          />
          <Route
            path="/rsvp"
            element={
              <RequireAuth>
                <Rsvp />
              </RequireAuth>
            }
          />
          <Route
            path="/location"
            element={
              <RequireAuth>
                <Location />
              </RequireAuth>
            }
          />
          <Route
            path="/accomodation"
            element={
              <RequireAuth>
                <Accomodation />
              </RequireAuth>
            }
          />
          <Route
            path="/itinerary"
            element={
              <RequireAuth>
                <Itinerary />
              </RequireAuth>
            }
          />
          <Route
            path="/gifts"
            element={
              <RequireAuth>
                <Gifts />
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
