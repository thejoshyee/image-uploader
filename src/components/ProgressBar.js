import React from 'react'

const ProgressBar = (props) => {
    const { bgcolor, completed } = props


    const containerStyles = {
      height: 20,
      width: '15%',
      backgroundColor: "#e0e0de",
      borderRadius: 50,
      margin: 50,
      fontSize: '0.7em'
    }

    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right',
      transition: 'width 1s ease-in-out',
    }

    const labelStyles = {
      color: 'white',
    }

    return (
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
    );
  };

  export default ProgressBar