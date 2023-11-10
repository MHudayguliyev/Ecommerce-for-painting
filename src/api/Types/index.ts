export type Categories = {
    _id: string
    catalogTitle:string
    catalogUrl:string
    createdDate: string 
    __v: number
    priority: number
    subCatalogsName: {
        _id:string
        subcatalogTitle:string
        coverImageName: null
        createdDate:string
        __v:number
    }[]
}

export type SubCategories = {
    _id:string
    subcatalogTitle:string
    coverImageName: null
    createdDate:string
    __v:number
}

interface CoverImage {
    fieldName:string
    originalName:string
    encoding: string
    mimetype: "image/jpeg"
    destination: string
    filename:string
    path:string
    size: number
}


export interface PrintSizePost {
    _id:Sets['_id']
    prSize: string
    pricePost:number
    createdDate: Sets['createdDate']
    _v: Sets['__v']
}

export type Sets = {
    _id: string
    titleSets:string
    createdDate:Date | undefined
    __v:number
    coverImageName: Array<string>
    catalogName: Array<string>
    subCatalogName: SubCategories[]
    paintingsName: {
        _id: string
        quantity: number
        title:string
        orientation:"vertical" | "horizontal"
        createdDate:Date | undefined
        __v:number
        coverImageName: CoverImage
        printSizePost: PrintSizePost[]
    }[]
}

export type Frames = {
    _id: string
    quantity: number
    frameName:string
    frameSize: string 
    frameСost:number
    coverImageName: CoverImage
    createdDate:Date | undefined
    __v:number
}

export type PostDataType<T> = {
    totalCost: number 
    deliveryType:T
    paymentMethod:T 
    city:T 
    address: T 
    name:T 
    phone: T
    insta: T
    email: T
    comments: T
    CART: {
        id: T
        title: T
        size: T
        cost: number
        img: T
        quantity: number
    }[]
}