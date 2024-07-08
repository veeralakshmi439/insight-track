import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const DynamicComponent = ({ name }) => {

  if(!name) return '';
  // Use React.lazy to dynamically import the component
  console.log(`./pages/${name}/index.tsx`);

  const Component = lazy(() => import(`../pages/${name}/index.tsx`));

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
