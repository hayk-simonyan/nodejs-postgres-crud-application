import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { getCars } from '../../redux/cars/cars.actions';
import Card from '../../components/Card/Card';
import Form from '../../components/Form/Form';

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

const Dashboard = ({ getCars, putCar, deleteCar, cars: { cars, loading } }) => {
  useEffect(() => {
    getCars();
  }, []);

  const carsList = cars.map((car) => (
    <Card
      key={car.id}
      id={car.id}
      brand={car.brand}
      model={car.model}
      released={car.released}
      color={car.color}
      putCar={putCar}
      deleteCar={deleteCar}
    />
  ));

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
      <Form />
    </div>
  );

  return (
    <div className='center mw5 mw6-ns hidden mv4'>
      <a
        onClick={handleOpen}
        className='f6 link dim ba bw2 ph3 pv2 mb2 dib black'
        href='#0'
      >
        Add a new car
      </a>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
      {carsList}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cars: state.cars,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCars: () => {
      dispatch(getCars());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
