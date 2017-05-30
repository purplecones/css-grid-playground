import { configure } from '@kadira/storybook';

// const req = require.context('../src/stories', true, /.js$/);

function loadStories() {
  require('../src/stories');
  // req.keys().forEach(path => req(path));
}

configure(loadStories, module);
