import '../scss/global.scss';
import '../scss/style.scss';
import '../scss/auth.scss';
import '../scss/main.scss';
import '../scss/header.scss';
import '../scss/footer.scss';
import '../scss/electronBook.scss';
import '../scss/loader.scss';

import 'airbnb-browser-shims/browser-only';

import { Model } from './model';
import { View } from './view';
import { Controller } from './controller';

import { Header } from '../components/header';
import { Footer } from '../components/footer';
import { Auth } from '../pages/auth';
import { Main } from '../pages/main';
import { ElectronBook } from '../pages/electronBook';
import { Statistics } from '../pages/statistics';
import { AudioCall } from '../games/audiocall/audiocall';
import { Sprint } from '../games/sprint/sprint';

export const view = new View(new Header(), Footer, new Auth(), Main, new ElectronBook(), AudioCall, Sprint, Statistics);
export const model = new Model();

export const controller = new Controller(view, model)

controller.initApp();
