import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const ErrorPage = ({ statusCode }) => {
  const router = useRouter();

  const handleRefresh = () => {
    router.reload(); // Refresh the page
  };

  return (
    <div>
      <p>An error occurred: {statusCode}</p>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
};

ErrorPage.propTypes = {
  statusCode: PropTypes.number,
};

ErrorPage.defaultProps = {
  statusCode: 404,
};

export default ErrorPage;
