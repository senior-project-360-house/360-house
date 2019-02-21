import React, {Component} from 'react';
import {withFirebase} from '../Firebase';

class HousesListBase extends Component {
  constructor(props){
    super(props);

    this.state = {
      houses: [],
      isLoading: false,
    };
  }

  componentDidMount(){
    this.setState({isLoading: true});

    this.props.firebase.houses().on('value', snapshot => {
      const houseObject = snapshot.val();

      if(houseObject) {
        const housesList = Object.keys(houseObject).map(key => ({
          ...houseObject[key],
          uid: key
        }))
        this.setState({
          houses: housesList,
          isLoading: false,
        });
      } else{
        this.setState({
          houses: null,
          isLoading: false,
        });
      }
    });
  }

  componentWillUnMount() {
    this.props.firebase.houses().off();
  }

  render(){
    const {houses, isLoading} = this.state;

    return (
      <div>
      {/*
        TODO: Update Loading and House List Base Visual
      */}
        {isLoading && <div>Loading ... </div>}
        {houses ? (
          <HouseItemList houses={houses}/>

        ):(
          <div>There are no houses ...</div>
        )}
      </div>
    );
  }

}
/*
TODO: Update House Item in a List Visual
 */
const HouseItemList = ({ houses }) => (
  <ul>
    {houses.map(house => (
      <HouseItem key={house.uid} house={house} />
    ))}
  </ul>
);
/*
TODO: Update Single House Item Visual
 */
const HouseItem = ({house}) => (
  <li>
    <strong>{house.name}</strong> {house.address}
  </li>

);

const HousesList = withFirebase(HousesListBase);

export default HousesList;
