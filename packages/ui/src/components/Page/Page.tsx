import React, { ReactNode } from 'react';

export type TPageProps = {
    title: ReactNode;
    children: ReactNode;
}

export function Page(props: TPageProps) {

    return (
        <div>
            <div>
                <h1>
                    {props.title}
                </h1>
            </div>
            <div>
                {props.children}
            </div>
        </div>
    )

}