import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

function Navigation() {
  const auth = useAuth();

  async function handleLogout() {
    await auth.logOut();
  }

  return (
    auth.isAuthenticated && (
      <ul>
        <li>
          <Link to="/rsvp">RSVP</Link>
        </li>
        <li>
          <Link to="/location">Location</Link>
        </li>
        <li>
          <Link to="/accomodation">Accomodation</Link>
        </li>
        <li>
          <Link to="/itinerary">Itinerary</Link>
        </li>
        <li>
          <Link to="/gifts">Gifts</Link>
        </li>
        {auth.isAdmin && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}
        <li>
          <button onClick={handleLogout}>Sign Out</button>
        </li>
      </ul>
    )
  );
}

export default Navigation;
