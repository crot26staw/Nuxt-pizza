export interface Product {
    id: number,
    name: string,
    slug: string,
    img: string,
    price: number,
    defaultParams: {
        size: number,
        weight: string
    },
    variables: object[],
    params: {
        size: number[],
        weight: string[]
    }
}

export interface PaginatedProducts {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: Product[];
}

export interface Category {
    id: number,
    name: string,
    slug: string
}

export interface CartProduct {
    id: number,
    name: string,
    img: string,
    params: {
        weight: string,
        size: number
    },
    price: number,
    count: number,
}

export interface Params {
    weight: string,
    size: number
}