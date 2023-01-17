import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleNameChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleIngredientChange = event => {
    event.preventDefault();
    const newIngredient = event.target.name
    this.setState({ ingredients: [...this.state.ingredients, newIngredient] })
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.name && this.state.ingredients.length) {
      console.log("you good bro")

      const newOrder = { name: this.state.name, ingredients: this.state.ingredients }
      console.log("yo order before POST: ", newOrder)

      fetch('http://localhost:3001/api/v1/orders', {
        method: 'POST',
        body: JSON.stringify({name: newOrder.name, ingredients: newOrder.ingredients}),
        headers: { 'content-type': 'application/json' }
      })
        .then(response => response.json())
        .then(data => console.log("DATA AFTER POST: ", data))

    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({ name: '', ingredients: [] });
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        {ingredientButtons}

        <p>Order: {this.state.ingredients.join(', ') || 'Nothing selected'}</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
