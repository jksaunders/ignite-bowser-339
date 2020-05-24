import axios from 'axios'

let ReactotronDev
if (__DEV__) {
  const { Reactotron } = require("../services/reactotron")
  ReactotronDev = Reactotron
}

type AxiosClientProps = {
  onError: (error: string) => void,
  root: string,
}

class AxiosClient {
  onError: (error: string) => void
  root: string

  constructor(props: AxiosClientProps) {
    console.log('constructor')
    this.onError = props.onError
    this.root = props.root
  }

  get(endpoint: string) {
    axios.get(`${this.root}${endpoint}`)
      .then(result => console.log('Result', result))
      .catch((error) => this.onError(error.message))
  }
}

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  constructor() {
    // create each service
    if (__DEV__) {
      // dev-only services
      this.reactotron = new ReactotronDev()
    }
    this.api = new AxiosClient({
      root: 'https://jsonplaceholder.typicode.com',
      onError: (error) => {
        if (this.setDialog) {
          this.setDialog(error)
        }
      }
    })
  }

  async setup() {
    // allow each service to setup
    if (__DEV__) {
      await this.reactotron.setup()
    }
  }

  /**
   * Reactotron is only available in dev.
   */
  reactotron: typeof ReactotronDev

  /**
   * Our api.
   */
  api: AxiosClient

  setDialog: (dialog: any) => void
}
