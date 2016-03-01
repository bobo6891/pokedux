import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';

import * as pokemonActions from 'actions/pokemon';
import * as descriptionActions from 'actions/description';
import styles from './Pokemon.css';
import Title from 'components/Title';
import PokemonStatus from 'components/PokemonStatus';

function mapStateToProps({ description, pokemon }) {
  return {
    pokemon,
    description,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...pokemonActions,
      ...descriptionActions,
    }, dispatch),
  }
}

class Pokemon extends Component {

  state = {
    requests: [],
  }

  componentDidMount() {
    let { id, pokemon } = this.props.params;
    let { actions } = this.props;

    this.state.requests.push(actions.fetchPokemon({ id }));
  }

  componentWillReceiveProps({ pokemon, description }) {
    let { descriptions } = pokemon;
    let { text } = description;
    let { actions } = this.props;

    if (this.state.requests.length === 1) {
      this.state.requests.push(actions.fetchDescription(pokemon));
    }
  }

  componentWillUnmount() {
    this.state.requests.forEach(x => x.abort());
  }

  render() {
    let { pokemon } = this.props;
    let { name, image } = pokemon;
    let { text } = this.props.description;
    let { goBack } = this.props.history;

    return (
      <div>
        <div className={styles.topWrap}>
          <div className={styles.titleHolder}>
            <Title text={name} />
          </div>
          <div className={styles.content}>
            <div>
              <p>{text}</p>
            </div>
          </div>
          <PokemonStatus {...pokemon} />
          <img
            className={styles.image}
            src={image}
            alt={name} />
        </div>
        <RaisedButton onClick={goBack} label='Return'/>
      </div>
    );
  }
}

Pokemon.propTypes = {
  pokemon: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokemon);

