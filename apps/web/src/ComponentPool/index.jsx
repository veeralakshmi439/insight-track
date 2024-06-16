// ComponentPool.jsx
import React, { lazy, Suspense, useState, useEffect, ReactNode } from 'react';

// Dynamically import all components from the components folder
const componentPaths = import.meta.glob('./components/*.jsx');

// Function to load a component dynamically
const loadComponent = (name) => {
    const key = `./components/${name}.jsx`;
    if (componentPaths[key]) {
        return lazy(componentPaths[key]);
    }
    return null;
};

const ComponentPool = ({ type, ...props }) => {
    const [Component, setComponent] = useState<ReactNode|undefined|null>(null);

    useEffect(() => {
        const load = async () => {
            const component = loadComponent(type);
            if (component) {
                setComponent(component);
            }
        };
        load();
    }, [type]);

    if (!Component) {
        return <div>Loading...</div>;
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );
};

export default ComponentPool;
