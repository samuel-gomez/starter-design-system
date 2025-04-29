import { createRoot, type Root } from 'react-dom/client';
import { App } from './App';

export class AppHTMLElement extends HTMLElement {
  private readonly root: Root;

  constructor() {
    super();

    this.root = createRoot(this);
  }

  connectedCallback() {
    this.root.render(<App />);
  }

  disconnectedCallback() {
    queueMicrotask(() => this.root.unmount());
  }
}
