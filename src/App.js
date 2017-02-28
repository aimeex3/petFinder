import React from 'react'; // es6 syntax
// const React = require('react') // known as commonjs
import Pet from './Pet';
import SearchControls from './SearchControls';
import credentials from './credentials';
import petfinder from './petfinder-client';
import {Provider, connect} from 'react-redux';
import store from './store';
import {setBreed} from './actionCreators';
const pf = petfinder(credentials);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animal: 'dog',
      location: 'San Francisco, CA',
      pets: []
    }

    this.changeAnimal = this.changeAnimal.bind(this)
    this.changeBreed = this.changeBreed.bind(this)
  }
  componentDidMount() {
    this.search(this.props.breed);
  }
  componentWillReceiveProps(nextProps) {
    this.search(nextProps.breed);
  }
  changeAnimal(animal) {
    this.setState({animal, breed: ''}, () => this.search(this.props.breed));
  }
  changeBreed(breed) {
    this.props.changeBreed(breed);
  }
  search(breed) {
    const {animal, location} = this.state;
    const promise = pf.pet.find({animal, breed, location, output: 'full'});
    promise
      .then((data) => {
        console.log('pets', data)
        const pets = data.petfinder.pets ? data.petfinder.pets.pet : [];
        this.setState({pets});
      });
  }
  render() {
    return (
      <Provider store={store}>
        <div className='app'>
          <img src='adopt-me.png' alt='adopt-me logo' />
          <SearchControls
            animal={this.state.animal}
            breed={this.props.breed}
            changeAnimal={this.changeAnimal}
            changeBreed={this.changeBreed} />
          <div>
            {
              this.state.pets.map((pet) => {
                return (
                  <Pet key={pet.id} pet={pet} />
                )
              })
            }
          </div>
        </div>
      </Provider>
    );
  }
}

// pass only what this component needs
const mapStateToProps = function(state) {
  // return subset of state that this component cares about
  return {
    breed: state.breed
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    changeBreed(breed) {
      dispatch(setBreed(breed));
    }
  }
}

// typically do not have to do this
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
const ProvidedApp = (props) => <Provider store={store}><ConnectedApp/></Provider>

// everytime rerender happens, mapStateToProps is called
export default ProvidedApp; // App is wrapped around another HOC
