import App from './app';
import '~/assets/styles/globals.css';

const app = new App({ root: document.body });

app.initRouter();
