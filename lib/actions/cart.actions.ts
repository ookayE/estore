"use server";

import { CartItem } from "@/types";
import { cookies } from "next/headers";
import { convertToPlainObject, formatError } from "../utils";
import { auth } from "@/auth";
import { prisma } from "@/db/prisma";
import { cartItemSchema } from "../validators";

export async function addItemToCart(data: CartItem) {
  try {
    // check for cart cookie
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    //get session and user id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // get cart
    const cart = await getMyCart()

    // parse and validate item
    const item = cartItemSchema.parse(data)

    // TESTING
    console.log({
      "session cart ID": sessionCartId,
      userID: userId,
      "Item requested": item
    });

    return {
      success: true,
      message: "Item added to cart",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}


export async function getMyCart (params:type) => {
      // check for cart cookie
      const sessionCartId = (await cookies()).get("sessionCartId")?.value;
      if (!sessionCartId) throw new Error("Cart session not found");
  
      //get session and user id
      const session = await auth();
      const userId = session?.user?.id ? (session.user.id as string) : undefined;

      //get the user's cart from databse using the session or user ID
      const cart = await prisma.cart.findFirst({
        where: userId ? {userId: userId} : {sessionCartId = sessionCartId}
      })

      if (!cart) return undefined

      // Convert decimals and return
      return convertToPlainObject({
        ...cart,
        items: cart.items as CartItem[],
        itemsPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString(),
      })
}