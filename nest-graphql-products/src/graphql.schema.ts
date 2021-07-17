
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Collection {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export class Product {
    id: string;
    collection?: Nullable<string>;
    collectionId?: Nullable<number>;
    collectionEntity?: Nullable<Collection>;
    model?: Nullable<string>;
    designDescription?: Nullable<string>;
    color?: Nullable<string>;
    primaryColor?: Nullable<string>;
    colorFamily?: Nullable<string>;
    construction?: Nullable<string>;
    material?: Nullable<string>;
    backing?: Nullable<string>;
    origin?: Nullable<string>;
    fullDescription?: Nullable<string>;
    style?: Nullable<string>;
    pileHeight?: Nullable<string>;
    materialSearch?: Nullable<string>;
    careDescription?: Nullable<string>;
    attributes?: Nullable<Nullable<ProductAttribute>[]>;
}

export class ProductAttribute {
    size?: Nullable<string>;
    length?: Nullable<number>;
    width?: Nullable<number>;
}

export class Customer {
    id: string;
}

export class Order {
    id: string;
}

export class OrderItem {
    productId?: Nullable<string>;
}

export abstract class IQuery {
    abstract collections(): Nullable<Nullable<Collection>[]> | Promise<Nullable<Nullable<Collection>[]>>;

    abstract collection(id: string): Nullable<Collection> | Promise<Nullable<Collection>>;

    abstract products(): Nullable<Nullable<Product>[]> | Promise<Nullable<Nullable<Product>[]>>;

    abstract product(id: string): Nullable<Product> | Promise<Nullable<Product>>;
}

type Nullable<T> = T | null;
