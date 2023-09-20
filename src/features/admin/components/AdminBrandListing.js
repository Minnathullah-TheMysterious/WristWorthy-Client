import React, { useState } from "react";
import { Button, Modal } from "antd";
import { FiAlertTriangle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { createBrandAsync } from "../../products/productSlice";

const { confirm } = Modal;

const AdminBrandListing = ({ wrapClass }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state?.product?.brands);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [brand_image, setBrand_image] = useState(null);
  const [brand_name, setBrand_name] = useState("");

  const showDeleteConfirm = (brandName) => {
    confirm({
      title: `Are you sure to delete '${brandName}' brand?`,
      icon: <FiAlertTriangle className="font-bold text-red-700 text-2xl" />,
      content:
        "Be Careful! All The Filters and all the related products etc,. may not work expectedly",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    console.log(brand_name, brand_image);
    const formData = new FormData();
    formData.append("brand_name", brand_name);
    formData.append("image", brand_image);
    dispatch(createBrandAsync(formData));
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-3 sm:py-2 lg:max-w-none lg:py-4">
          <h2 className="text-2xl font-bold text-gray-900 font-serif">
            Brands
          </h2>
          {/* Create Category Modal */}
          <section>
            <Button
              className="bg-sky-800 text-white min-w-full font-bold font-serif tracking-widest"
              type="primary"
              onClick={showModal}
            >
              Add New Brand
            </Button>
            <Modal
              // title="Create A New Category"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText={"Create Brand"}
              okButtonProps={{
                style: {
                  color: "black",
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                },
              }}
              cancelButtonProps={{
                style: {
                  fontFamily: "sans-serif",
                  fontWeight: "bold",
                },
              }}
            >
              <form preserve={false} className="space-y-5" onSubmit={handleOk}>
                <h1 className="text-center font-serif font-bold text-xl">
                  Create A New Brand
                </h1>
                <label htmlFor="brand_name" className="flex flex-col">
                  <input
                    type="text"
                    id="brand_name"
                    name="brand_name"
                    className="rounded-lg min-h-full"
                    placeholder="Enter Brand Name"
                    onChange={(e) => setBrand_name(e.target.value)}
                  />
                </label>

                <div className="space-y-2">
                  {brand_image && (
                    <div className="flex justify-center">
                      <img
                        src={URL.createObjectURL(brand_image)}
                        alt="category"
                        className="h-52 w-52 "
                      />
                    </div>
                  )}
                  <label
                    htmlFor="brand_image"
                    className="bg-blue-800 block text-white py-1 text-center rounded-lg hover:cursor-pointer hover:bg-blue-700 active:bg-blue-800"
                  >
                    {brand_image
                      ? brand_image.name
                      : "Upload Brand Logo or Image"}
                    <input
                      type="file"
                      id="brand_image"
                      name="brand_image"
                      accept="image/*"
                      hidden
                      onChange={(e) => setBrand_image(e.target.files[0])}
                    />
                  </label>
                </div>
              </form>
            </Modal>
          </section>

          <div className={wrapClass}>
            {brands.map((brand) => (
              <div key={brand._id}>
                <div className="group">
                  <div className="relative overflow-hidden group-hover:opacity-75">
                    <img
                      src={`${process.env.REACT_APP_API}/${brand.image.location}`}
                      alt={brand.brand_name}
                      className="sm:h-40 sm:min-w-[160px] sm:max-w-[160px] h-28 min-w-[7rem] max-w-[7rem] object-fill object-center rounded-full border-2 border-gray-700"
                    />
                  </div>
                  <h3 className="mt-3 text-sm text-gray-500 font-serif font-bold text-center">
                    {brand.brand_name}
                  </h3>
                </div>
                <div className="flex justify-between space-x-1 mb-6 text-xs sm:text-base">
                  <div className="w-[50%] text-center mt-1 py-2  rounded-lg bg-sky-800 text-white hover:cursor-pointer hover:bg-sky-900 active:bg-sky-800">
                    Edit
                  </div>
                  <div
                    onClick={() => showDeleteConfirm(brand.brand_name)}
                    className="mt-1 w-[50%] text-center py-2 rounded-lg bg-red-800 text-white hover:cursor-pointer hover:bg-red-900 active:bg-red-800"
                  >
                    Delete
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBrandListing;
