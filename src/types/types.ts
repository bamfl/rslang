export interface ITemplate {
  getHTML: () => string;
}

export interface IAuth {
  getHTML: () => string;
  init: () => void;
  addListeners: () => void;
}


export interface IView {
  renderApp: () => void;
  renderHeader: () => void;
  renderFooter: () => void;
  renderContent: (content: string) => void;
}

export interface IModel {
  activePage: string
}

export enum EPage {
  auth = 'auth',
  main = 'main',
  electronBook = 'electronBook',
  audiocall = 'audiocall',
  sprint = 'sprint'
}