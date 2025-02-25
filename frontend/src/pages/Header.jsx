import DuoIcon from '@mui/icons-material/Duo';
import FaceIcon from '@mui/icons-material/Face';
export const Header = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md rounded-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white"><span ><DuoIcon className='text-xl'/></span>EchoMeet</h1>
        <div>
        <button className="mr-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-200">
  Join as Guset
</button>
          <button className="mr-2 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-200">
  Login
</button>
<button className="px-4 py-2 bg-blue-800 text-white rounded-lg shadow-md hover:bg-blue-900">
  Sign Up
</button>
        </div>
      </div>
    </nav>
  );
};