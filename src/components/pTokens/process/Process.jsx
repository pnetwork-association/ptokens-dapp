import React from 'react'
import Spinner from '../../utils/Spinner'
import PropTypes from 'prop-types'

const Process = props => {
  return (
    <div className="card bg-light-gray no-shadow border-0">
      <div className="card-header mb-0 bg-light-gray pl-0 pt-0">
        <div className="row align-items-center">
          <div className="col-10">
            <div className="text-left text-gray text-xxl font-weight-light">
              Process
            </div>
          </div>
          <div
            onClick={() => props.onResetLogs()}
            className="col-2 text-right cursor-pointer"
          >
            <i className="icon empty" />
          </div>
        </div>
      </div>
      <div className="card-body">
        {props.logs
          ? props.logs.map((log, index) => {
              return (
                <div key={index} className="row">
                  <div
                    className={
                      'col ml-10' +
                      (index > 0 ? ' mt-5' : '') +
                      (index === props.logs.length - 1 ? ' mb-15' : '')
                    }
                  >
                    {log.waiting === true ? (
                      <Spinner />
                    ) : (
                      <i
                        className={
                          log.success === true
                            ? 'icon verified'
                            : 'icon not-verified'
                        }
                      />
                    )}
                    <span
                      className={
                        (!log.waiting
                          ? 'text-gray ml-10'
                          : 'text-super-light-gray ml-15') + ' text-sm'
                      }
                    >
                      {log.value}
                    </span>
                    {log.link ? (
                      <a
                        className="ml-10 text-xs text-underline text-primary"
                        href={log.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View tx link
                      </a>
                    ) : null}
                  </div>
                </div>
              )
            })
          : null}
        <hr />
      </div>
      <div className="card-footer border-0 p-0 pt-10" />
    </div>
  )
}

Process.propTypes = {
  logs: PropTypes.array,
  onResetLogs: PropTypes.func
}

export default Process
