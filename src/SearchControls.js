import React from 'react';
// petfinder is default export, {} will be named exports
import petfinder, {ANIMALS} from './petfinder-client';
const pf = petfinder(); // don't need to pass credentials because already did

class SearchControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breeds: []
    }

    this.handleAnimalChange = this.handleAnimalChange.bind(this);
    this.handleBreedChange = this.handleBreedChange.bind(this);
  }
  componentDidMount() {
    this.getNewBreeds(this.props.animal);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.animal && nextProps.animal !== this.props.animal) {
      this.getNewBreeds(nextProps.animal);
    }
  }
  getNewBreeds(animal) {
    pf.breed.list({animal})
      .then((data) => {
        if (data.petfinder.breeds) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          })
        }
      })
  }
  handleAnimalChange(event) {
    this.props.changeAnimal(event.target.value);
  }
  // synthetic event
  handleBreedChange(event) {
    this.props.changeBreed(event.target.value);
  }
  render() {
    const breedSelector = !this.props.animal ? null : (
      <select value={this.props.breed} onChange={this.handleBreedChange}>
        <option value=''></option>
        {
          this.state.breeds.map((breed) => (
            <option key={breed} value={breed}>{breed}</option>
          ))
        }
      </select>
    )
    return (
      <div className='search'>
      <select value={this.props.animal} onChange={this.handleAnimalChange}>
        <option value=''></option>
        {
          ANIMALS.map((animal) => (
            <option key={animal} value={animal}>{animal}</option>
          ))
        }
      </select>
        {breedSelector}
      </div>
    )
  }
}

export default SearchControls;
