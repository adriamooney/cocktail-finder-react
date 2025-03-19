import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass, faMartiniGlass, faHeart } from '@fortawesome/free-solid-svg-icons';

library.add(faMagnifyingGlass, faMartiniGlass, faHeart);

createRoot(document.getElementById('root')).render(

    <App />

)
