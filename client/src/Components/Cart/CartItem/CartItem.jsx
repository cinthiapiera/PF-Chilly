import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteP,
  increaseProductQuantity,
  decreaseProductQuantity,
} from '../../../redux/actions/actions';

function CartItem({ name, quantity, price, image, id, changeVariable }) {
  const dispatch = useDispatch();
  let storeQuantity = useSelector((state) => state.quantity);
  const deleteProduct = (id) => {
    dispatch(deleteP(id));
  };

  React.useEffect(() => {
    changeVariable(storeQuantity);
    console.log('Juanra ripeo');
  }, [storeQuantity]);

  return (
    <div className=" w-2/3 px-7 text-slate-800 m-auto border-solid border-slate-200 border-t-2 py-4 text-mono">
      <div class="flex justify-between items-center h-52 w-full">
        <div class="flex  items-center   h-full w-3/4  mr-4 ">
          <div className="h-full w-60 ">
            <img src={image.replace('SL75', 'SL500')} class=" h-full m-auto" />
          </div>
          <div class="flex flex-col ml-3 w-3/5">
            <span class="md:text-md font-medium">{name}</span>
          </div>
        </div>

        <div class="flex justify-between  items-center   w-60">
          <div class="  flex text-base flex-row items-center ">
            <span
              onClick={() => {
                dispatch(decreaseProductQuantity(id));
              }}
              class="font-semibold w-9 rounded  text-center cursor-pointer text-lg hover:bg-main hover:text-white"
            >
              -
            </span>
            <input
              type="text"
              class="focus:outline-none bg-gray-100  h-6 w-10  rounded text-center  px-2 mx-2 text-lg"
              value={quantity}
              disabled
            />
            <span
              onClick={() => {
                dispatch(increaseProductQuantity(id));
              }}
              class="font-semibold w-9 rounded  text-center cursor-pointer text-lg hover:bg-main hover:text-white"
            >
              +
            </span>
          </div>
          <div className="flex items-center justify-between ">
            <div class="mr-10 w-16    ml-6">
              <span class="   font-medium">
                ${(price * quantity).toFixed(2)}
              </span>
            </div>
            <button
              className="font-bold text-2xl"
              onClick={() => deleteProduct(id)}
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
