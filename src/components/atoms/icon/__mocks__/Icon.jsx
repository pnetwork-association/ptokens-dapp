import React from 'react'

const mockIcon = ({ icon, ...props }) => <img data-testid={`icon-${icon}`} alt="" src={icon} {...props} />

export default mockIcon
