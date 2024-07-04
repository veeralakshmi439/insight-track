import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const DynamicComponent = ({ name }) => {
  // Use React.lazy to dynamically import the component
  const Component = lazy(() => import(`../pages/${name}`));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component />
    </Suspense>
  );
};

DynamicComponent.propTypes = {
  name: PropTypes.string.isRequired,
};

export default DynamicComponent;
