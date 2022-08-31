import { StrictMode, DetailedHTMLProps, HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import {
  defineCustomElements,
  JSX,
} from '@swisscom/sdx/dist/js/webcomponents/loader';
import '@swisscom/sdx/dist/css/webcomponents.css';
import '@swisscom/sdx/dist/css/sdx.css';
import '@swisscom/sdx';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Source: https://sdx.swisscom.ch/

// Register the Stencil types
type StencilProps<T> = {
  [P in keyof T]?: Omit<T[P], 'ref'> | HTMLAttributes<T>;
};

// Register the React types
type ReactProps<T> = {
  [P in keyof T]?: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>;
};

// Combine both types
type StencilToReact<
  T = JSX.IntrinsicElements,
  U = HTMLElementTagNameMap
> = StencilProps<T> & ReactProps<U>;

// Export the new types as the new JSX namespace.
// Disable the eslint errors
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements extends StencilToReact {}
  }
}

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
defineCustomElements();
