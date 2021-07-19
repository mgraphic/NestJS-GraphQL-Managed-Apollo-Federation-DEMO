
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Customer {
    id: string;
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export class Order {
    id: string;
    customerId?: Nullable<string>;
    customerEntity?: Nullable<Customer>;
    items?: Nullable<Nullable<OrderItem>[]>;
}

export class OrderItem {
    productId?: Nullable<string>;
    quantity?: Nullable<number>;
    size?: Nullable<string>;
    productEntity?: Nullable<Product>;
}

export class Product {
    id: string;
}

export abstract class IQuery {
    abstract customers(): Nullable<Nullable<Customer>[]> | Promise<Nullable<Nullable<Customer>[]>>;

    abstract customer(id: string): Nullable<Customer> | Promise<Nullable<Customer>>;

    abstract orders(): Nullable<Nullable<Order>[]> | Promise<Nullable<Nullable<Order>[]>>;

    abstract order(id: string): Nullable<Order> | Promise<Nullable<Order>>;
}

type Nullable<T> = T | null;
