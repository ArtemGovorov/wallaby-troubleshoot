import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// fix for `Object.values() is not a function` because babel-polyfill is not included anymore
Object.values = obj => Object.keys(obj).map(key => obj[key])
