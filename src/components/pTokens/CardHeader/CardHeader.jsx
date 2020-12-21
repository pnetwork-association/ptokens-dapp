import React from 'react'
import PropTypes from 'prop-types'

const IssueCardHeader = _props => {
  const { pTokenSelected, type } = _props

  return (
    <div className="card-header mb-0 bg-light-gray pl-0 pt-0 pr-0">
      <div className="row align-items-center">
        <div className="col-12 col-md-8">
          <div className="text-left text-gray text-xxl font-weight-light">
            {type === 'issue' ? 'Issue' : 'Redeem'} {pTokenSelected.name}{' '}
            <span className="text-md">{type === 'issue' ? '(Peg-in)' : '(Peg-out)'}</span>
          </div>
        </div>
        <div className="col-12 col-md-4 text-md-right pl-0 mt-10 mt-0-md mb-10 mb-0-md">
          <img
            className="ml-20 mr-10"
            // prettier-ignore
            src={`../assets/${type === 'issue' ? pTokenSelected.issueFrom : `${pTokenSelected.name}-${pTokenSelected.network}` }.png`}
            height="22"
            width="22"
            alt="redeem from logo"
          />
          <img src="../assets/right.png" height="22" width="22" alt="redeem from logo" />
          <img
            className="ml-10"
            // prettier-ignore
            src={`../assets/${type === 'issue' ? `${pTokenSelected.name}-${pTokenSelected.network}` : pTokenSelected.issueFrom}.png`}
            height="22"
            width="22"
            alt="redeem to logo"
          />
        </div>
      </div>
    </div>
  )
}

IssueCardHeader.propTypes = {
  pTokenSelected: PropTypes.object
}

export default IssueCardHeader
