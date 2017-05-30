import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import TextArea from '../TextArea';

const stories = storiesOf('TextArea', module);

stories.add('plain textarea', () => <TextArea />);
stories.add('with styling', () => <TextArea styling={`background: red;`} />);
stories.add('with value', () => <TextArea value={`display: grid;`} />);
stories.add('with onChange', () => <TextArea onChange={action('onChange')} />);
