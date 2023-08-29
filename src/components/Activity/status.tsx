const successStyle: React.CSSProperties = {
  color: '#3CB371',
};

const warnStyle: React.CSSProperties = {
  color: '#DAA520',
};

const failStyle: React.CSSProperties = {
  color: '#A52A2A',
};

export const GetStatus = (status: number) => {
  if (status === 1) {
    return <span style={warnStyle}>Auditing</span>;
  } else if (status === 2) {
    return <span style={successStyle}>Success</span>;
  } else if (status === 3) {
    return <span style={failStyle}>Fail</span>;
  } else if (status === 4) {
    return <span>Cancel</span>;
  } else if (status === 5) {
    return <span>Reject</span>;
  } else if (status === 6) {
    return <span style={warnStyle}>Pending</span>;
  } else if (status === 7) {
    return <span style={successStyle}>Approved</span>;
  } else {
    return <span>Unknown</span>;
  }
};
