import { response, validator } from './validate-request'

abstract class Controller {
  validator = validator
  response = response
}

export default Controller
