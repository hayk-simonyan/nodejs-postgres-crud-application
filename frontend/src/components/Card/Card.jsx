import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Form from '../Form/Form';
import { connect } from 'react-redux';

import { deleteCar } from '../../redux/cars/cars.actions';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Card = ({ id, brand, model, released, color, deleteCar }) => {
  const deleteHandler = (e) => {
    deleteCar(id);
  };

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Form
        brandInit={brand}
        modelInit={model}
        releasedInit={released}
        colorInit={color}
        id={id}
        editing={true}
      />
    </div>
  );

  return (
    <article key={id} className='center mw5 mw6-ns hidden ba mv4'>
      <h1 className='f4 bg-near-black white mv0 pv2 ph3'>{brand}</h1>
      <div className='pa3 bt'>
        <p className='f6 f5-ns lh-copy measure mv0'>{model}</p>
        <p className='f6 f5-ns lh-copy measure mv0'>{released}</p>
        <p className='f6 f5-ns lh-copy measure mv0'>{color}</p>
      </div>
      <div className='ph3'>
        <a
          onClick={handleOpen}
          className='mr3 f6 link dim ba bw2 ph3 pv2 mb2 dib black'
          href='#0'
        >
          Edit
        </a>

        <a
          onClick={deleteHandler}
          className='f6 link dim ba bw2 ph3 pv2 mb2 dib black'
          href='#0'
        >
          Delete
        </a>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </article>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCar: (id) => {
      dispatch(deleteCar(id));
    },
  };
};

export default connect(null, mapDispatchToProps)(Card);
