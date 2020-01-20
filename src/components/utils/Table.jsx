
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { calculateObjectValuesString } from '../../utils/utils'

class Table extends Component {

  constructor(props, context) {
    super(props, context)

    const tableWindow = props.window ? props.window : 5

    this.state = {
      tableWindow,
      currentTableWindow: 1
    }
  }

  onChangePage = page => {
    this.setState({ 
      currentPage: page 
    })
    this.props.onChangePage(page)
  }

  tablePrevious = () => {
    if (
      this.state.currentTableWindow > 1
    ) {
      this.setState({ 
        currentTableWindow: this.state.currentTableWindow - 1 
      })
    }
  }

  render() {

    return (
      <div className="card bg-light-gray no-shadow">
        <div className="card-header border-0 pb-0 pl-0 pt-0">
          <div className="text-xxl text-gray font-weight-light">
            {this.props.title}
          </div>
        </div>
        <div className="card-body pb-5 pt-5">
          <div className="table-responsive">
            <table className={'table align-items-center ' + (this.props.values.length === 0 ? 'opacity-05' : '')}>
              <thead className="text-xxs">
                <tr>
                  {
                    this.props.headers.map(item => {
                      return (
                        <th key={item} scope="col">
                          {this.props.headerMap[item]}
                        </th>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody>
                {
                  
                  this.props.values.length === 0 
                    ? [0, 1, 2, 3, 4].map((obj, gindex) => {
                      return (
                        <tr key={`${this.props.id}${gindex}`}>
                        {
                          this.props.headers.map((header, index) => {
                            return (
                              <td key={`${this.props.id}${header}${index.toString()}${obj.toString()}`}>
                                <div className="container-extern-td">
                                  <div className={(gindex === 0 || gindex % 2 === 0 ? 'bg-white' : '') + " container-intern-td"}>
                                  </div>
                                </div>
                              </td>
                            )
                          })
                        }
                      </tr>
                      ) 
                    })
                    : null
                }
                {
                  this.props.values.filter((obj, index) =>
                    index >= (this.state.tableWindow * this.state.currentTableWindow) - this.state.tableWindow && index < this.state.tableWindow * this.state.currentTableWindow)
                    .map((item, gindex) => {
                      return (
                        <tr key={gindex} >
                          {
                            this.props.headers.map((header, index) => {
                              return (
                                <td key={`${calculateObjectValuesString(item[header])}${index.toString()}`}>
                                  <div className="container-extern-td">
                                    <div className={(gindex === 0 || gindex % 2 === 0 ? 'bg-white' : '') + " container-intern-td"}>
                                      {
                                        this.props.whichLink[index] ? (
                                          <a className="text-xs text-underline text-primary font-monospace" 
                                            href={this.props.whichLink[index].base + item[header]} 
                                            target="_blank" rel="noopener noreferrer">
                                            {
                                              item[header] ? (
                                                item[header].slice(0,6) + '...' + 
                                                item[header].slice(item[header].length - 4,item[header].length)
                                              ) : null
                                            }
                                          </a> 
                                        ) : (
                                          this.props.whichAnimation.includes(index) ? (
                                            <i className={item[header] ? 'icon done' : 'icon timer'} />
                                          ) : (
                                            <span className="text-xs text-gray">
                                            {
                                              this.props.conversions[index] ? (
                                                this.props.conversions[index](item[header])
                                              ) : item[header] 
                                            }
                                            </span>
                                          )
                                        )
                                      } 
                                    </div>
                                  </div>
                                </td>
                              )
                            })
                          }
                        </tr>
                      )
                    })
                }
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer border-0 pt-0">
          {this.props.values.length > 0 ? <nav aria-label="...">
            <div className="row show-mobile">
              <div className="col-6">
                <button onClick={() => this.setState({ currentTableWindow: this.state.currentTableWindow - 1 })}
                  disabled={this.state.currentTableWindow === 1}
                  className={'btn-page-prev mr-50 ' + (this.state.currentTableWindow === 1 ? 'disabled' : null)}>
                  PREV
                </button>
              </div>
              <div className="col-6 text-right">
                <button onClick={() => this.setState({ currentTableWindow: this.state.currentTableWindow + 1 })}
                  disabled={(this.state.currentTableWindow >= ((this.props.values.length / this.state.tableWindow)))}
                  className={'btn-page-prev ' + (this.state.currentTableWindow >= ((this.props.values.length / this.state.tableWindow)) ? 'disabled' : null)}>
                  NEXT
                </button>
              </div>
            </div>
            <div className="pagination justify-content-center-mobile justify-content-end mb-0 hidden-mobile">
              <button onClick={() => this.setState({ currentTableWindow: this.state.currentTableWindow - 1 })}
                disabled={this.state.currentTableWindow === 1}
                className={'btn-page-prev mr-50 ' + (this.state.currentTableWindow === 1 ? 'disabled' : null)}>
                PREV
              </button>
              <button onClick={() => this.setState({ currentTableWindow: this.state.currentTableWindow + 1 })}
                disabled={(this.state.currentTableWindow >= ((this.props.values.length / this.state.tableWindow)))}
                className={'btn-page-prev ' + (this.state.currentTableWindow >= ((this.props.values.length / this.state.tableWindow)) ? 'disabled' : null)}>
                NEXT
              </button>
            </div>
          </nav> : ''}
        </div>
      </div>
    )
  }
}

Table.propTypes = {
  id: PropTypes.string,
  title: PropTypes.object,
  headers: PropTypes.array,
  values: PropTypes.array
}

export default Table