import React, {Component} from 'react';
import { UnreadContext } from './configs/unreadcontext.js'

class AppProvider extends Component {
state = {
    number : 10,
  }

render() {
    <UnreadContext.Provider value={this.state}>
    // declare consumer
    </UnreadContext.Provider>
}
}

