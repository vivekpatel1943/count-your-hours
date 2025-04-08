import { useNavigate } from 'react-router-dom';
import { useAuth } from './Root'; // Import the custom hook

function Profile() {
    const { user } = useAuth(); // Access user from AuthContext
    const navigate = useNavigate();

    console.log(JSON.stringify(user))

    function navigateToHomePage() {
        navigate('/home')
    }

    return (
        <div>
            <div className="fixed top-4 right-4">
                <button onClick={navigateToHomePage} className=" bg-blue-900 text-white rounded px-2 py-1">Home</button>
            </div>
            <div>
                
                {user ? <p>{user.username}'s Profile</p> : <p>User not found</p>}
            </div>
        </div>
    );
}

export default Profile;
