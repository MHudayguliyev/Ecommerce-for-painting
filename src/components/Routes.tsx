import React from 'react'
import { Route } from "@tanstack/react-location";
//layout
import Layout from './Layout/Layout';
//routes
import Catalog from '@app/pages/Catalog/catalog';
import Set from '@app/pages/Set/Set';
import Cart from '@app/pages/Cart/Cart';


const Routes: Route[] = [
    {
        path: 'catalogs/:catalogGuid',
        children: [
            {
                path: '/', 
                element: (
                    <Layout>
                        <Catalog />
                    </Layout>
                )
            }, 
            {
                path: 'sub-catalogs/:subCatalogGuid', 
                element: (
                    <Layout>
                        <Catalog />
                    </Layout>
                )
            }, 
            {
                path: 'set/:setGuid', 
                element: (
                    <Layout>
                        <Set />
                    </Layout>
                )
            }
        ]
    }, 
    {
        path: 'cart', 
        element: (
            <Layout>
                <Cart />
            </Layout>
        )
    },
    {
        path: '*', 
        element: (
            <Layout>
                No page found
            </Layout>
        )
    }
]

export default Routes