const React = require('react');
import Task from './task';

var tasks;
tasks = React.createClass({
  getInitialState() {
    console.log(this.props);
    return {
      tasks: []
    }
  },
  componentDidMount() {
    this.setState({
      tasks: [{name: '1'},{name: '2'}]
    })
  },
  render() {
    return (
      {this.state.tasks.map((task, index) => {
        console.log(this.props);
        return(
          <tr>
            <td>taskname</td>
            {this.props.days.map((day, index) => {
              let tasks = this.state.tasks;
              let props = {
                day,
                index,
                task
              };
              return <Task { ...props } />
            })}
          </tr>
        )
      })}
    )
  }
});


export default tasks;
