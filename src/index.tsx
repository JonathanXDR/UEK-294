import { StrictMode, DetailedHTMLProps, HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import {
  defineCustomElements,
  JSX,
} from '@swisscom/sdx/dist/js/webcomponents/loader';
import '@swisscom/sdx/dist/css/webcomponents.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
defineCustomElements();
