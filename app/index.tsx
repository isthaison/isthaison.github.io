import React from 'react';
import { createRoot } from 'react-dom/client';
import Portfolio from './Portfolio';

const root = createRoot(document.getElementById('root')!);
root.render(<Portfolio />);