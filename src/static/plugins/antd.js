import '@styles/custom.less';
import {
  SettingOutlined,
  DownOutlined,
  GithubOutlined,
  WeiboOutlined,
  ZhihuOutlined,
  QqOutlined,
  HomeOutlined,
  ProjectOutlined,
  ProfileOutlined,
  CoffeeOutlined
} from '@ant-design/icons-vue'

// Elements
import {
  Alert,
  Button,
  Switch,
  Drawer,
  Avatar,
  Divider,
  Tabs,
  Input,
  InputSearch,
  Menu,
  SubMenu,
  Card,
  CardMeta
} from 'ant-design-vue'

export {
  install
}

const install = function(app) {
  for (const i in Icons){
    app.component(i, Icons[i])
  }

  for (const i in Elements){
    app.use(Elements[i])
  }
}


const Icons = {
  SettingOutlined,
  DownOutlined,
  GithubOutlined,
  WeiboOutlined,
  ZhihuOutlined,
  QqOutlined,
  HomeOutlined,
  ProjectOutlined,
  ProfileOutlined,
  CoffeeOutlined
}
const Elements = {
  Alert,
  Button,
  Switch,
  Drawer,
  Avatar,
  Divider,
  Tabs,
  Input,
  InputSearch,
  Menu,
  SubMenu,
  Card,
  CardMeta
}