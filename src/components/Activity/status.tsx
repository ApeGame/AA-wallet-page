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

const successContentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#3CB371',
  color: '#FFFFFF',
  height: 25,
  width: 80,
  borderRadius: 6,
};

const warnContentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#DAA520',
  color: '#FFFFFF',
  height: 25,
  width: 80,
  borderRadius: 6,
};

const failContentStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#A52A2A',
  color: '#FFFFFF',
  height: 25,
  width: 80,
  borderRadius: 6,
};

export const GetStatusContent = (status: number) => {
  if (status === 1) {
    return <div style={warnContentStyle}>Auditing</div>;
  } else if (status === 2) {
    return <div style={successContentStyle}>Success</div>;
  } else if (status === 3) {
    return <div style={failContentStyle}>Fail</div>;
  } else if (status === 4) {
    return <div>Cancel</div>;
  } else if (status === 5) {
    return <div>Reject</div>;
  } else if (status === 6) {
    return <div style={warnContentStyle}>Pending</div>;
  } else if (status === 7) {
    return <div style={successContentStyle}>Approved</div>;
  } else {
    return <div>Unknown</div>;
  }
};
