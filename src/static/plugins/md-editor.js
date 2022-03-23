import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css';

const install = function(app) {
  app.use(MdEditor)
}

export {
  install
}