import CommandLineInterface from '../components/CommandLineInterface'; // Adjust path as needed
import { useNavigate } from 'react-router-dom';

export default function TerminalPage() {
  const navigate = useNavigate();

  const handleCloseTerminal = () => {
    navigate(-1); // Go back to the previous page, or navigate('/') for home
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center px-4 pt-28 pb-8 selection:bg-green-400 selection:text-black"
      // Example: To add a background image for a more "desktop" feel:
      // style={{
      //   backgroundImage: "url('/path-to-your-desktop-wallpaper.jpg')",
      //   backgroundSize: 'cover',
      //   backgroundPosition: 'center',
      // }}
    >
        <CommandLineInterface onCloseRequest={handleCloseTerminal} height="min(600px, calc(100vh - 9rem))" />
    </div>
  );
}