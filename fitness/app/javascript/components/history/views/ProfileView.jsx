import React, { Component } from 'react';
import './profile.css';

const activity_mappings = {
    1: 'Sedentary exercise',
    2: 'Light exercise',
    3: 'Moderate exercise',
    4: 'Heavy exercise',
    5: 'Athlete'
}

const goal_mappings = {
    1: 'Maintain my weight',
    2: 'Gain 0.5 lb per week',
    3: 'Gain 1 lb per week',
    4: 'Lose 0.5 lb per week',
    5: 'Lose 1 lb per week'
}

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function (a) { return a.toUpperCase(); });
};

export default class ProfileView extends Component {
    render() {
        let { user } = this.props;
        return (
            <div id='profile-view' className='pane'>
                <div className='header'>User Profile</div>
                <div className='profile-info'>
                    <p>
                        <b>Name:</b> {user.first_name} {user.last_name}<br />
                        <b>Gender:</b> {user.gender.capitalize()}<br />
                        <b>Age:</b> {user.age}<br />
                        <b>Weight:</b> {user.weight} lbs<br />
                        <b>Height:</b> {user.height} cm<br />
                        <b>Activity Level:</b> {activity_mappings[user.activity_level_id]}<br />
                        <b>Fitness Goal:</b> {goal_mappings[user.goal_id]}<br />
                    </p>
                </div>
            </div>
        )
    }
}
