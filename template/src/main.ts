import { AppHTMLElement } from './App/AppHTMLElement';

const enableMock = async () => {
  if (import.meta.env.FRONT_MOCK_ENABLE === 'true') {
    const { worker } = await import('../mocks/browser');

    return worker.start({
      onUnhandledRequest: 'warn',
    });
  }

  return Promise.resolve();
};

enableMock().then(() => {
  customElements.define('react-app', AppHTMLElement);
});
