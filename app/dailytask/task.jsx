const React = require('react');

var task = React.createClass({
  render() {
    return(
      <tr>
        <td>{ this.props.task.name }</td>
        {this.props.days.map((day, index) => {
          return <td key={index} className={day.className}>fe</td>
        })}
      </tr>
    )
  }
});

export default task;