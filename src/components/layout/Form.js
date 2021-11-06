import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { createTodo } from '../../actions/todo';

export class Form extends Component {
    
  convertDate = () => {
      var date = new Date(),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    
    
    state = {
        title: '',
        date_completed_by: this.convertDate(),
    }

    static propTypes = {
        createTodo: PropTypes.func.isRequired,
      };


    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        e.preventDefault();
        const {title, date_completed_by } = this.state;
        const todo = { title,date_completed_by}
        this.props.createTodo(todo)
        this.setState({
            title: '',
            date_completed_by: this.convertDate(),
        });
    }
    render() {
        const {title, date_completed_by } = this.state;


        return (
            <div className="card card-body mt-4 mb-4">
            <h2>Add Todo </h2>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  onChange={this.onChange}
                  value={title}
                />
              </div>
              <div className="form-group">
                <label>last day to complete</label>
                <input
                  className="form-control"
                  type="date"
                  name="date_completed_by"
                  onChange={this.onChange}
                  value={date_completed_by}
                />
              </div>
            
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        )
    }
}

export default connect(null,{ createTodo })(Form);
