import React, { useState } from "react";
import { Button, Modal } from "antd";
import { FiAlertTriangle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { createBrandAsync } from "../../products/productSlice";

const { confirm } = Modal;

const callouts = [
  {
    name: "Desk and Office",
    description: "Work from home accessories",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
    id: 1,
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
    id: 2,
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
    id: 2,
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
    id: 3,
  },
  {
    name: "Desk and Office",
    description: "Work from home accessories",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
    id: 4,
  },
  {
    name: "Desk and Office",
    description: "Work from home accessories",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg",
    imageAlt:
      "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
    href: "#",
    id: 4,
  },
  {
    name: "Self-Improvement",
    description: "Journals and note-taking",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
    imageAlt:
      "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
    href: "#",
    id: 5,
  },
  {
    name: "Travel",
    description: "Daily commute essentials",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
    imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
    href: "#",
    id: 6,
  },
];

const AdminBrandListing = ({ wrapClass }) => {
  const dispatch = useDispatch();

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
                    {brand_image ? brand_image.name : "Upload Brand Logo or Image"}
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
            {callouts.map((callout) => (
              <div key={callout.id}>
                <div className="group relative border-2 border-sky-800 p-1 rounded-lg">
                  <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {callout.description}
                  </p>
                </div>
                <div className="flex justify-between space-x-1 mb-6">
                  <div className="w-[50%] text-center mt-1 py-2  rounded-lg bg-sky-800 text-white hover:cursor-pointer hover:bg-sky-900 active:bg-sky-800">
                    Edit
                  </div>
                  <div
                    onClick={() => showDeleteConfirm(callout.name)}
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
