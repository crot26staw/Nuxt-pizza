import { defineStore } from 'pinia'

interface CartProduct {
    id: number,
    name: string,
    slug: string,
    img: string,
    params: {
        weight: string,
        size: number
    },
    price: number,
    count: number,
}

interface Cart {
    totalCount: number,
    total: number,
    products: CartProduct[]
}

export const useCartStore = defineStore('cart', () => {

    const cart = ref<Cart>({
        totalCount: 0,
        total: 0,
        products: []
    })

    const addToCart = (id: number, name: string, slug: string, img: string, weight: string, size: number, price: number, count: number) => {
        const product = cart.value.products.find((product: CartProduct) => product.id === id && product.params.weight === weight && product.params.size === size);
        if (product) {
            product.count += count
        } else {
            cart.value.products.push({
                id: id,
                name: name,
                slug: slug,
                img: img,
                params: {
                    weight: weight,
                    size: size
                },
                price: price,
                count: count
            })
        }
        cart.value.total += price * count
        cart.value.totalCount += count
    }

    const removeToCart = (id: number, price: number, count: number, weight: string, size: number) => {
        const productIndex = cart.value.products.findIndex(product => product.id === id && product.params.weight === weight && product.params.size === size);
        const product = cart.value.products[productIndex] as CartProduct;
        if (product.count > 1) {
            product.count -= count
        } else {
            cart.value.products.splice(productIndex, 1);
        }
        cart.value.total -= price * count
        cart.value.totalCount -= count
    }

    const deleteToCart = (id: number) => {
        const productIndex = cart.value.products.findIndex(product => product.id === id);
        const product = cart.value.products[productIndex] as CartProduct;
        cart.value.total -= product.price * product.count;
        cart.value.totalCount -= product.count;
        cart.value.products.splice(productIndex, 1);
    }

    const cartClear = () => {
        cart.value.total = 0;
        cart.value.totalCount = 0;
        cart.value.products = [];
    }

    const checkToCart = (id: number, weight: string, size: number) => {
        const product = cart.value.products.find((product: CartProduct) => product.id === id && product.params.weight === weight && product.params.size === size);
        if (product) {
            return product
        } else {
            return false
        }
    }

    const chekToCartView = (id: number) => {
        const items = cart.value.products.filter(item => item.id === id);
        if (items.length === 0) return false;
        return items[items.length - 1];
    }

    return {
        cart,
        addToCart,
        removeToCart,
        deleteToCart,
        cartClear,
        checkToCart,
        chekToCartView
    }
},{
  persist: true,
});