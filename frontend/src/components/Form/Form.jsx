import React, { useState } from 'react';
import { connect } from 'react-redux';

import { postCar, putCar } from '../../redux/cars/cars.actions';

const Form = ({
  postCar,
  putCar,
  id = null,
  brandInit = '',
  modelInit = '',
  releasedInit = '',
  colorInit = '',
  editing = false,
}) => {
  const [brand, setBrand] = useState(brandInit);
  const [model, setModel] = useState(modelInit);
  const [released, setReleased] = useState(releasedInit);
  const [color, setColor] = useState(colorInit);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    // if we are in editing mode than update otherwise create a new car
    editing
      ? putCar(id, { brand, model, released, color })
      : postCar({ brand, model, released, color });
    !editing && setBrand('');
    !editing && setModel('');
    !editing && setReleased('');
    !editing && setColor('');
  };

  return (
    <article className='center mw5 mw6-ns hidden mv4'>
      <form onSubmit={submitFormHandler}>
        <fieldset id='sign_up' className='ba b--transparent ph0 mh0'>
          <legend className='ph0 mh0 fw6 clip'>Submit</legend>
          <div className='mt3'>
            <label className='db fw4 lh-copy f6' htmlFor='brand'>
              Brand
            </label>
            <input
              className='pa2 input-reset ba bg-transparent w-100 measure'
              type='text'
              name='brand'
              id='brand'
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
            />
          </div>
          <div className='mt3'>
            <label className='db fw4 lh-copy f6' htmlFor='model'>
              Model
            </label>
            <input
              className='pa2 input-reset ba bg-transparent w-100 measure'
              type='text'
              name='model'
              id='model'
              value={model}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </div>
          <div className='mt3'>
            <label className='db fw4 lh-copy f6' htmlFor='released'>
              Released year
            </label>
            <input
              className='pa2 input-reset ba bg-transparent w-100 measure'
              type='number'
              name='released'
              id='released'
              value={released}
              onChange={(e) => setReleased(e.target.value)}
              required
            />
          </div>
          <div className='mt3'>
            <label className='db fw4 lh-copy f6' htmlFor='color'>
              Color
            </label>
            <input
              className='pa2 input-reset ba bg-transparent w-100 measure'
              type='text'
              name='color'
              id='color'
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>
        </fieldset>
        <div className='mt3'>
          <input
            className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6'
            type='submit'
            value='Submit'
          />
        </div>
      </form>
    </article>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postCar: (formData) => {
      dispatch(postCar(formData));
    },
    putCar: (id, formData) => {
      dispatch(putCar(id, formData));
    },
  };
};

export default connect(null, mapDispatchToProps)(Form);
