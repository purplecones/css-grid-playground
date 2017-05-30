import React from 'react';
import { storiesOf } from '@kadira/storybook';
import App from '../App';

const stories = storiesOf('App', module);

stories.add('main app', () => <App />);
