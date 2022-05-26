import React, { useState } from "react"
import { Helmet } from "react-helmet-async";
import { Button, TextField } from "../../components";
import { IconAddAbove } from "../../utilities/svg-icons";

const Roles = () => {
  const [data, setData] = useState();
  const [focussedItem, setFocussedItem] = useState();
  return (
    <>
      <Helmet>
        <title>Roles</title>
      </Helmet>
      <div className="p-2">
        <div className="grid gap-2 grid-cols-12">
          <div className="col-span-12 md:col-span-10 lg:col-span-8 rounded-t-lg p-2 bg-sky-800 text-white text-xs">Roles</div>
          <TextField
            name="description"
            value={data ? data.description : ""}
            title="Description"
            disabled={false}
            className="text-gray-800 text-sm col-start-1 col-span-9 md:col-span-8 lg:col-span-6"
            textAlign="left"
            onChangeCallback={() => { }}
            onBlurCallback={() => { }}
          />
          <Button
            type="button"
            text="Create"
            disabled={false}
            callback={() => { }}
            animate={false}
            variant="primary"
            className="h-7 px-3 col-span-3 md:col-span-2 lg:col-span-2"
          />
          <div className={"pl-2 col-span-12 md:col-span-10 lg:col-span-8 flex items-center h-9 " + (focussedItem === 1 ? "shadow  border-gray-100" : "")} onMouseOver={() => setFocussedItem(1)} onMouseLeave={() => setFocussedItem()} >
            <div className="flex items-center">
              <div className="font-publicSans text-xs w-8">1.</div>
              <div className="flex items-center">
                <div className="font-publicSans text-xs">MANUF_SHOP_ORDER_VIEW</div>
                <div className={focussedItem === 1 ? "" : "hidden"}>
                  <Button
                    type="button"
                    text=""
                    disabled={false}
                    callback={() => { }}
                    animate={false}
                    variant="default"
                    icon={{ component: <IconAddAbove />, width: 15, color: "black" }}
                    className="ml-3 h-7 w-7 rounded-full col-span-3 md:col-span-2 lg:col-span-2 no-underline"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className={"pl-2 col-span-12 md:col-span-10 lg:col-span-8 flex items-center h-9 " + (focussedItem === 2 ? "shadow  border-gray-100" : "")} onMouseOver={() => setFocussedItem(2)} onMouseLeave={() => setFocussedItem()} >
            <div className="flex items-center">
              <div className="font-publicSans text-xs w-8">2.</div>
              <div className="flex items-center">
                <div className="font-publicSans text-xs">MANUF_SHOP_ORDER_CREATE</div>
                <div className={focussedItem === 2 ? "" : "hidden"}>
                  <Button
                    type="button"
                    text=""
                    disabled={false}
                    callback={() => { }}
                    animate={false}
                    variant="default"
                    icon={{ component: <IconAddAbove />, width: 15, color: "black" }}
                    className="ml-3 h-7 w-7 rounded-full col-span-3 md:col-span-2 lg:col-span-2 no-underline"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Roles;