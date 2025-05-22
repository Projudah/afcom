'use client'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import store from './store';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* suppress hydration warnings on <body> so injected attrs (e.g. Grammarly) don’t break React */}
      <body suppressHydrationWarning>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
