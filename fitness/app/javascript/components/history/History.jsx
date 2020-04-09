import React, { Component } from 'react';
import axios from 'axios';
import data from './data';
import { Layout, Card, Row, Col} from 'antd';
import ProfileView from './views/ProfileView';
import View2 from './views/View2';
import View3 from './views/View3';
import View4 from './views/View4';
import View5 from './views/View5';
import View6 from './views/View6';
import './history.css';
import 'antd/dist/antd.css';

import CanvasJSReact from './canvasjs.react.js';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const { Sider, Content, Footer } = Layout;

const default_options = {
	animationEnabled: true,
	exportEnabled: true,
	theme: "light2", // "light1", "dark1", "dark2"
	axisX: {
		title: "Day",
		interval: 1
	}
}

const calories_data_options = {
	...default_options,
	axisY: {
		title: "Calories (kcal)",
		includeZero: false
	},
	title:{
    text: "Monthly Calories Analytics"
	},
	data: [{
		type: "line",
    lineColor: "red",
		toolTipContent: "{y}",
		dataPoints: []
	}]
}

const carbs_data_options = {
	...default_options,
	axisY: {
		title: "Carbohydrates (g)",
		includeZero: false
	},
	title:{
		text: "Monthly Carbohydrates Analytics"
	},
	data: [{
		type: "line",
    lineColor: "blue",
		toolTipContent: "{y}",
		dataPoints: []
	}]
} 

const protein_data_options = {
	...default_options,
	axisY: {
		title: "Proteins (g)",
		includeZero: false
	},
	title:{
		text: "Monthly Protein Analytics"
	},
	data: [{
		type: "line",
    lineColor: "purple",
		toolTipContent: "{y}",
		dataPoints: []
	}]
} 

const fat_data_options = {
	...default_options,
	axisY: {
		title: "Fats (g)",
		includeZero: false
	},
	title:{
		text: "Monthly Fat Analytics"
	},
	data: [{
		type: "line",
    lineColor: "orange",
		toolTipContent: "{y}",
		dataPoints: []
	}]
} 

const fibre_data_options = {
	...default_options,
	axisY: {
		title: "Fibres (g)",
		includeZero: true 
	},
	title:{
		text: "Monthly Fibre Analytics"
	},
	data: [{
		type: "line",
    lineColor: "green",
		toolTipContent: "{y}",
		dataPoints: []
	}]
} 

class History extends Component {

  constructor(props) {
    super(props);
    this.state = {
      calories_results: [],
      carbs_results: [],
      protein_results: [],
      fat_results: [],
      fibre_results: [],
      calories_data_options: calories_data_options,
      carbs_data_options: carbs_data_options,
      protein_data_options: protein_data_options,
      fat_data_options: fat_data_options,
      fibre_data_options: fibre_data_options
    };
  };

  clean_data = (data) => {
    const clean = data.map(function(o) {
      return {x: new Date(Date.parse(o.date)), y: Number(o.count)};
    });
    return clean;
  }

  async componentDidMount() {
    var self = this;
    axios.get('/api/analytics', { withCredentials: true })
      .then(( { data }) => {
        this.setState({
          calories_results: data.calories_results,
          carbs_results: data.carbs_results,
          protein_results: data.protein_results,
          fat_results: data.fat_results,
          fibre_results: data.fibre_results
        });
        
        calories_data_options.data[0].dataPoints = self.clean_data(this.state.calories_results); 
        carbs_data_options.data[0].dataPoints = self.clean_data(this.state.carbs_results); 
        protein_data_options.data[0].dataPoints = self.clean_data(this.state.protein_results); 
        fat_data_options.data[0].dataPoints = self.clean_data(this.state.fat_results); 
        fibre_data_options.data[0].dataPoints = self.clean_data(this.state.fibre_results); 
      })

      .catch(error => console.log('api errors:', error))
  };

  render() {
    const { checkedLogin, isLoggedIn, user } = this.props;

    if (!checkedLogin) {
      return null;
    } else if (!isLoggedIn) {
      this.props.history.push('/');
    }

    return (
      <div>
				<Layout style={{ height: 2100 }}>
					<Sider width={300} style={{backgroundColor:'#eee'}}>
						<Content style={{ height: 220 }}>
							<ProfileView user={user}/>
						</Content>
					</Sider>

					<Layout>
						<Content style={{ height: 300 }}>
							<CanvasJSChart options={this.state.calories_data_options} />
						</Content>

						<Content style={{ height: 300  }}>
							<CanvasJSChart options={this.state.carbs_data_options} />
						</Content>
						<Content  style={{ height: 300  }}>
							<CanvasJSChart options={this.state.protein_data_options} />
						</Content>

						<Content style={{ height: 300  }}>
							<CanvasJSChart options={this.state.fat_data_options} />
						</Content>

						<Content style={{ height: 300  }}>
							<CanvasJSChart options={this.state.fibre_data_options} />
						</Content>
					</Layout>

				</Layout>
      </div>
      )
  }
}

export default History
