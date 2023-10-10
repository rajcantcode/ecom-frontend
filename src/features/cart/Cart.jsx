import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromCartAsync,
  selectCartItems,
  updateCartAsync,
} from "./cartSlice";
import { discountedPrice } from "../../app/constants";

const Cart = ({ open, setOpen }) => {
  //   const [open, setOpen] = useState(showCart);
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalCost = items.reduce(
    (amount, item) => discountedPrice(item) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    console.log(e.target.value);
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };

  const handleRemoveItem = (id, item) => {
    console.log(item);
    dispatch(deleteItemFromCartAsync(id));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="w-screen max-w-md pointer-events-auto">
                  <div className="flex flex-col h-full overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 px-4 py-6 overflow-y-auto sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="flex items-center ml-3 h-7">
                          <button
                            type="button"
                            className="relative p-2 -m-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {items.map((item) => (
                              <li key={item.product.id} className="flex py-6">
                                <div className="flex-shrink-0 w-24 h-24 overflow-hidden border border-gray-200 rounded-md">
                                  <img
                                    src={item.product.thumbnail}
                                    alt={item.product.description}
                                    className="object-cover object-center w-full h-full"
                                  />
                                </div>

                                <div className="flex flex-col flex-1 ml-4">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link
                                          to={`/item.product-detail/${item.product.productId}`}
                                        >
                                          {item.product.title}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">
                                        ${item.product.price}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item.product.color}
                                    </p>
                                  </div>
                                  <div className="flex items-end justify-between flex-1 text-sm">
                                    <div className="text-gray-500">
                                      <label
                                        htmlFor="quantity"
                                        className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                      >
                                        Qty
                                      </label>
                                      <select
                                        onChange={(e) =>
                                          handleQuantity(e, item)
                                        }
                                        value={item.quantity}
                                      >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                      </select>
                                    </div>
                                    <div className="flex">
                                      <button
                                        onClick={() =>
                                          handleRemoveItem(item.id, item)
                                        }
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-6 border-t border-gray-200 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${totalCost}</p>
                      </div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total items in cart</p>
                        <p>{totalItems}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <Link
                          to="/checkout"
                          className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </Link>
                      </div>
                      <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                        <p>
                          or&nbsp;
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
