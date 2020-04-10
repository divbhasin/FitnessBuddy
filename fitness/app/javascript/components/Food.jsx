import React, { Component } from 'react';
import axios from 'axios';
import { Button, Col, Form, Modal, Spinner } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import DatePicker from 'react-datepicker';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import "react-datepicker/dist/react-datepicker.css";
import './Food.css';

const NoDataIndication = () => (
  <div className="spinner">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

const { SearchBar } = Search;

class Food extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      showModal: false,
      date: new Date(),
      grams: 100,
      selectedFood: {},
      columns: [{
        dataField: 'id',
        text: 'ID',
        hidden: 'true'
      },
      {
        dataField: 'food_group_id',
        text: 'Food group',
        hidden: 'true'
      },
      {
        dataField: 'name',
        text: 'Name',
        headerStyle: () => {
          return { width: '480px' };
        }
      },
      {
        dataField: 'calories',
        text: 'Calories'
      },
      {
        dataField: 'carbs',
        text: 'Carbs'
      },
      {
        dataField: 'protein',
        text: 'Protein'
      },
      {
        dataField: 'fat',
        text: 'Fat'
      },
      {
        dataField: 'fibre',
        text: 'Fibre'
      }],
      data: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillMount() {
    this.getFoods();
  }

  getFoods = () => {
    axios.get('/api/foods', { withCredentials: true })
      .then(({ data }) => {
        this.setState({
          isLoading: false,
          data: data.foods
        });
      })
      .catch(error => console.log('api errors:', error))
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleBlur(event) {
    event.preventDefault();
    const { name, value } = event.target;
    if (name == 'grams' && !value) {
      this.setState({ [name]: 100 });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleModalClose();

    let food_history = { food_id: this.state.selectedFood.id,
      servings: this.state.grams, created_at: this.formatDate(this.state.date)};

    axios.post('/api/food_histories', { food_history }, { withCredentials: true })
      .catch(error => console.log('api errors:', error))
  }

  handleDateChange = (date) => {
    this.setState({
      date: date
    });
  }

  handleModalClose = () => {
    this.setState({
      showModal: false,
      selectedFood: {}
    });
  }

  onRowClick = (e, food, rowIndex) => {
    this.setState({
      showModal: true,
      selectedFood: food
    });
  }

  formatDate = (d) => {
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 1).toString();       
    var dd = d.getDate().toString();
    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]);
  };

  render() {
    const { isLoading, columns, data, date, grams, selectedFood, showModal } = this.state;
    const { checkedLogin, isLoggedIn, user } = this.props;
    const multFactor = grams / 100.0;

    if (!checkedLogin) {
      return null;
    } else if (!isLoggedIn) {
      this.props.history.push('/login');
    }

    const noDataIndication = isLoading ? <NoDataIndication /> : null;
  
    return (
      <div className="container secondary-color" style={{ marginTop: 50 }}>
        <ToolkitProvider bootstrap4 keyField='id' data={data} columns={columns} search>
          {
            props => (
              <div>
                <SearchBar
                  className="search-bar"
                  placeholder="Search food"
                  {...props.searchProps}
                />
                <hr />
                <BootstrapTable
                  bootstrap4
                  hover
                  striped
                  noDataIndication={() => noDataIndication}
                  pagination={paginationFactory()}
                  rowEvents={{onClick: this.onRowClick}}
                  {...props.baseProps}
                />
              </div>
            )
          }
        </ToolkitProvider>
        <Modal show={showModal} onHide={this.handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Food</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body>
              <p>
                <b>Name:</b> {selectedFood.name}<br />
                <b>Calories:</b> {(selectedFood.calories * multFactor).toFixed(1)}<br />
                <b>Carbs:</b> {(selectedFood.carbs * multFactor).toFixed(1)}<br />
                <b>Protein:</b> {(selectedFood.protein * multFactor).toFixed(1)}<br />
                <b>Fat:</b> {(selectedFood.fat * multFactor).toFixed(1)}<br />
                <b>Fibre:</b> {(selectedFood.fibre * multFactor).toFixed(1)}<br />
              </p>
              <Form.Row>
                <Form.Group as={Col} controlId="formDate">
                  <Form.Label>Date consumed</Form.Label>
                  <div className="input-group">
                    <DatePicker
                      style={{ width: '100%' }}
                      className="form-control"
                      selected={date}
                      onChange={date => this.handleDateChange(date)} />
                  </div>
                </Form.Group>
                <Form.Group as={Col} controlId="formAmount">
                  <Form.Label>Amount consumed (g)</Form.Label>
                  <Form.Control 
                    name="grams"
                    type="number"
                    value={grams}
                    min="1"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur} />
                </Form.Group>
              </Form.Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleModalClose}>Cancel</Button>
              <Button variant="primary" type='submit'>Add Food</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Food;
