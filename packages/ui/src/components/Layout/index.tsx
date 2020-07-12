import React from 'react';
import { ReactNode } from 'react';

type TLayoutProps = {
    children: ReactNode;
}

export function Layout(props: TLayoutProps) {

    return (
        <div>
            {props.children}
        </div>
    )

}