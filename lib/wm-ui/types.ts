import React from 'react';

export type RefElement<TElement extends HTMLElement, TProps extends React.HTMLAttributes<TElement> = React.HTMLAttributes<TElement>> = TProps & {
    ref?: React.Ref<TElement>;
}
