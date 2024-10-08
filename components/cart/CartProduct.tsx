import { CartItem, CartStore } from '@/lib/hooks/useCart';
import indianCurrency from '@/lib/indianCurrancy';
import { CircleMinus, CirclePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface CartProductPropes {
    cart: CartStore
}

const CartProduct: React.FC<CartProductPropes> = ({cart}) => {
  return (
    <div className="w-2/3 max-lg:w-full">
        <h3 className="font-bold text-2xl">Shopping Cart</h3>
        <hr className="my-5" />
        {cart?.cartItems.length === 0 ? (
          <p className="font-semibold text-lg">No item in cart</p>
        ) : (
          <div className='grid gap-3'>
            {cart?.cartItems.map((cartItem: CartItem) => (
              <div key={cartItem.item._id} className=" w-full flex hover:bg-gray-100 bg-gray-50 px-5 py-3 items-center justify-between rounded-xl max-md:start-center">
                <div className="flex items-center max-lg:flex-col">
                  <Image
                    src={cartItem?.item?.media[0]}
                    alt={cartItem?.item?.title}
                    width={500}
                    height={500}
                    className=" w-36 h-36 object-fill rounded-xl"
                  />
                  <div className="flex flex-col gap-1 ml-4">
                    <p className="text-xl font-bold">{cartItem?.item?.title}</p>
                    <div className="flex gap-3 items-center">
                      <h3 className="text-orange-600 font-bold">Color :</h3>
                      {cartItem?.color && <p className="">{cartItem?.color}</p>}
                    </div>
                    <div className="flex gap-3 items-center">
                      <h3 className="text-orange-600 font-bold">Size :</h3>
                      {cartItem?.size && <p className="">{cartItem?.size}</p>}
                    </div>

                    <div>
                      <div className="flex items-center gap-3 flex-nowrap">
                        <span className="text-orange-600 font-bold">
                          Price :
                        </span>
                        <span className="font-medium line-through text-gray-500">
                          {indianCurrency(cartItem?.item.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-nowrap">
                        <span className="text-orange-600 font-bold">Pay :</span>
                        <span className="font-medium text-gray-950">
                          {indianCurrency(cartItem?.item.pay)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 max-md:items-center">
                  <div className="flex items-center gap-2">
                    <CircleMinus
                      onClick={() => {
                        if (cartItem.quantity > 1) {
                          cart.decresaeQuantity(cartItem?.item?._id);
                        }
                      }}
                      className="hover:text-orange-500 cursor-pointer"
                    />
                    <p>{cartItem?.quantity}</p>
                    <CirclePlus
                      onClick={() => cart.increaseQuantity(cartItem?.item?._id)}
                      className="hover:text-orange-500 cursor-pointer"
                    />
                  </div>
                </div>

                <Trash
                  className="hover:text-red-600 cursor-pointer"
                  onClick={() => cart.removeItem(cartItem?.item?._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
  )
}

export default CartProduct