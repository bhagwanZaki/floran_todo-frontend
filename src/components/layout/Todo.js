import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTodos,deleteTodo,completeTodo,chartapi } from '../../actions/todo'
import Linechart from '../common/Linechart';
function formatDate(){
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
export class Todo extends Component {
    static propTypes = {
        todos : PropTypes.array.isRequired,
        getTodos: PropTypes.func.isRequired,
        chartapi: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func,
        label_data : PropTypes.array.isRequired,
        todo_data : PropTypes.array.isRequired,

    };
    componentDidMount(){
        this.props.getTodos();
        this.props.chartapi();
    }
    

    onchange = (e,id) =>{
      console.log('format',formatDate())
        var today
        if (e.target.checked === true){
            today = formatDate()            
        } else {
            today = null
            
          }
        this.props.completeTodo(id,e.target.checked,today)
        // eslint-disable-next-line no-self-assign
        e.target.checked = e.target.checked
        this.props.chartapi();
        this.setState();

    }
    render() {
      var popo = [...this.props.todos].reverse();
      var todo_data

      if(this.props.todo_data.length === 0 && this.props.todo_data[0] === 0){
        todo_data = []
      } else {
        todo_data = this.props.todo_data

      }
        
        return (
            <Fragment>
                <div className='col-12'>
                  <h4>Daily Todo done Graph</h4>
                
                  <Linechart dayList={this.props.label_data} graph_data={todo_data} />
                </div>
                <h2>
                    Todo List
                </h2>
                <div className="table-responsive">
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Sr no</th>
                            <th>Title</th>
                            <th>Last day</th>
                            <th>Completed on</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                 
                        {popo.map((todo,index) =>(
                            <tr key={todo.id}>
                                <td>{index+1}</td>
                                <td>{todo.title}</td>
                                <td>{todo.date_completed_by}</td>
                                <td>{todo.completed_at ? (
                                  todo.completed_at
                                ) : (<h6>Not completed</h6>)}</td>
                                <td>
                                    <input type='checkbox' className='form-check-input' checked={todo.completed ? 'checked' : '' } onChange={(e) => this.onchange(e,todo.id)}></input>
                                </td>
                                <td><button onClick={this.props.deleteTodo.bind(this,todo.id)} className='btn btn-danger'>Delete</button></td>
                            </tr>
                        ))}
                        
                        
                    </tbody>
                </table>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todo.todos,
    label_data: state.todo.label_data,
    todo_data: state.todo.todo_data
})

export default connect(mapStateToProps,{getTodos,deleteTodo,completeTodo,chartapi})(Todo)
