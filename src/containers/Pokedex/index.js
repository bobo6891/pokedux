import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as pokemonsActions from '../../actions/pokemons';
import PokedexItem from '../../components/PokedexItem';
import styles from './index.css';

function mapStateToProps({ pokedex }) {
  return {
    pokemons: pokedex.pokemons
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(pokemonsActions, dispatch)
  }
}

class Pokedex extends Component {

  componentDidMount() {
    let { actions } = this.props;
    actions.fetchPokedex();
  }

  render() {
    let { pokemons } = this.props;
    return (
      <ul className={styles.root}>
        {pokemons.map((pokemon, i) => {
          return (<PokedexItem key={i} {...pokemon} />);
        })}
      </ul>
    );
  }
};

Pokedex.propTypes = {
  pokemons: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex);
