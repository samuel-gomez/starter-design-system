import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { App } from './App';

export class AppHTMLElement extends HTMLElement {
  private readonly root: Root;
  private isMounted = false;

  constructor() {
    super();

    this.root = createRoot(this);
  }

  connectedCallback() {
    this.isMounted = true;
    this.root.render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }

  disconnectedCallback() {
    this.isMounted = false;

    queueMicrotask(() => {
      if (!this.isMounted) {
        this.root.unmount();
      }
    });
  }
}
