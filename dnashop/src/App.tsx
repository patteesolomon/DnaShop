import { connect } from 'react-redux';
import * as React from 'react';
import { Route, Router } from 'react-router';
import { Link } from 'react-router-dom';

type Props = {

}

type State = {}

const Home = () => {
    <h1>Home Page</h1>
}    

export class App extends React.Component<Props, State> {
  state = {}

  render() {
    return (
          <Router location={''} navigator={undefined}>
                <div>
                    <nav>
                      <Link to="/"></Link>
                    </nav>
                </div>
        <Switch>
          <Route exact path ="/" Component={Home}></Route>
        </Switch>
      </Router>
    )
  }
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(App)