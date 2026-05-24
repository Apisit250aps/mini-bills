import { created, success } from './response'
import { response, validator } from './validate-request'

abstract class Controller {
  validator = validator
  response = response
  created = created
  success = success
}

export default Controller
