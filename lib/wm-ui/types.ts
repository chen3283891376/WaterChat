import React from 'react';

export type RefElement<TElement extends HTMLElement, TProps = React.HTMLAttributes<TElement>> = TProps & {
    ref?: React.Ref<TElement>;
};
