import React from 'react'
import { Route } from "@tanstack/react-location";
//layout
import Layout from './Layout/Layout';
//routes
import Catalog from '@app/pages/Catalog/catalog';
import Set from '@app/pages/Set/Set';
import Cart from '@app/pages/Cart/Cart';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import './Routes.css'

import adds from '@app/assets/images/adds.png'

const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000', 
    border: "1px solid red"
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px',
    width: '400px'
  }
const slideImages = [
    {
      url: adds,
      caption: 'Slide 1'
    },
    {
      url: adds,
      caption: 'Slide 2'
    },
    {
      url: adds,
      caption: 'Slide 3'
    },
  ];

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
        path: 'test', 
        element: (
            <Layout>
                <Slide cssClass='flex item' autoplay={false}>
                    
                    {slideImages.map((slideImage, index)=> (
                        <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                        </div>
                    ))} 
                </Slide>
            </Layout>
        )
    }, 
    {
        path: '*', 
        element: (
            <Layout>
                Mother fo goodnes
            </Layout>
        )
    }
]

export default Routes