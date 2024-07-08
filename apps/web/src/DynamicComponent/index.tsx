import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const DynamicComponent = ({ name }) => {
  // Use React.lazy to dynamically import the component
  if(!name) return '';

  const Component = lazy(() => import(`../charts/${name}/index.tsx`));

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
