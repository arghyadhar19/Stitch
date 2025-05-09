import React from 'react'
import decodeJWT from '../../utils/decodeJWT'
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import InputField2 from '../../components/Admin/InputField2';
import BASE_URL from '../../utils/baseurl';

const EditProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { product } = location.state || {};

    const [id, setId] = useState(0);

    // state variables for the form fields
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("");
    const [price, setPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const [topLevelCategory, setTopLevelCategory] = useState("");
    const [secondLevelCategory, setSecondLevelCategory] = useState("");
    const [thirdLevelCategory, setThirdLevelCategory] = useState("");
    const [size, setSize] = useState([
        { name: "XS", quantity: 0 },
        { name: "S", quantity: 0 },
        { name: "M", quantity: 0 },
        { name: "L", quantity: 0 },
        { name: "XL", quantity: 0 },
        { name: "XXL", quantity: 0 },
        { name: "T28", quantity: 0 },
        { name: "T30", quantity: 0 },
        { name: "T32", quantity: 0 },
        { name: "T34", quantity: 0 },
        { name: "T36", quantity: 0 },
        { name: "T38", quantity: 0 },
        { name: "T40", quantity: 0 }
    ]);

    // function to handle the size input fields
    const handleSizeInputChange = (index, field, value) => {
        const newSize = [...size];
        newSize[index][field] = field === 'quantity' ? Number(value) : value;
        setSize(newSize);
    }

    // function to validate the form fields
    const validateInputs = () => {
        if (imageUrl === "" || brand === "" || title === "" || color === "" || price === 0 || discountedPrice === 0 || topLevelCategory === "" || secondLevelCategory === "" || thirdLevelCategory === "" || description === "") {
            toast.error("Please fill all the fields");
            return false;
        }
        return true;
    }


    // function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate the form fields
        if (!validateInputs()) return;


        // create the product object
        const productObj = {
            imageUrl,
            description,
            brand,
            title,
            color,
            price,
            discountedPrice,
            topLevelCategory,
            secondLevelCategory,
            thirdLevelCategory,
            sizes: size.filter(s => s.quantity > 0)
        }

        // send the product object to the server
        try {
            const res = await axios.put(`${BASE_URL}/api/admin/products/${id}/update`, productObj, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`
                }
            });
            if (res.data.error) {
                console.log(res.data.error);
                toast.error(res.data.error);
            } else {
                toast.success("Product created successfully");
                navigate('/admin/products');
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    // check if the user is an admin
    useEffect(() => {
        if (localStorage.getItem("jwtToken")) {
            const authorities = decodeJWT(localStorage.getItem("jwtToken")).authorities;
            if (authorities.includes("ROLE_ADMIN")) {
                if (product) {

                    setId(product.id);

                    const thirdLevelCategory = product.category.name;
                    const secondLevelCategory = product.category.parentCategory.name;
                    const topLevelCategory = product.category.parentCategory.parentCategory.name;

                    setImageUrl(product.imageUrl || "");
                    setBrand(product.brand || "");
                    setTitle(product.title || "");
                    setColor(product.color || "");
                    setPrice(product.price || 0);
                    setDiscountedPrice(product.discountedPrice || 0);
                    setDescription(product.description || "");
                    setTopLevelCategory(topLevelCategory || "");
                    setSecondLevelCategory(secondLevelCategory || "");
                    setThirdLevelCategory(thirdLevelCategory || "");
                    // update only the values that are present in the product object
                    size.forEach((s, index) => {
                        // find the size object in the product object
                        const sizeObj = product.sizes.find(size => size.name === s.name);
                        if (sizeObj) {
                            // update the quantity value
                            handleSizeInputChange(index, 'quantity', sizeObj.quantity);
                        }
                    })
                }
            } else {
                navigate('/Log');
            }
        } else
            navigate('/Log');
    }, [navigate])

    return (
        <form onSubmit={handleSubmit}>
            <div className="mx-12 sm:mx-24 md:mx-40 lg:mx-48 xl:mx-80">
                <div className="space-y-12">

                    <div></div>
                    {/* border-b border-gray-900/10 */}
                    <div className="pb-4">
                        <h2 className="text-3xl font-semibold text-gray-900">Edit Product Details</h2>
                        <p className="mt-1 text-sm/6 text-gray-600">Fill up the fields below to create a product.</p>

                        {imageUrl && (
                            <div className="flex justify-center mb-6">
                                <div className="w-60 h-60 shadow-lg rounded-md overflow-hidden bg-gray-50 flex items-center justify-center">
                                    <img
                                        src={imageUrl}
                                        alt="Product Preview"
                                        className="object-contain max-h-full max-w-full"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className={`sm:col-span-6`}>
                                <InputField2
                                    label="Image URL"
                                    type="text"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    name="image-url"
                                />
                            </div>
                            <div className={`sm:col-span-6`}>
                                <InputField2
                                    label="Description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    name="image-url"
                                />
                            </div>
                            <div className="sm:col-span-3">
                                <InputField2
                                    label="Brand"
                                    type="text"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    name="brand"
                                />
                            </div>

                            <div className="sm:col-span-3">
                                <InputField2
                                    label="Title"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    name="title"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <InputField2
                                    label="Price"
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    name="price"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <InputField2
                                    span={3}
                                    label="Discounted Price"
                                    type="number"
                                    value={discountedPrice}
                                    onChange={(e) => setDiscountedPrice(e.target.value)}
                                    name="discountedPrice"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <InputField2
                                    label="Color"
                                    type="text"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    name="color"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <InputField2
                                    label="Top Level Category"
                                    type="text"
                                    value={topLevelCategory}
                                    onChange={(e) => setTopLevelCategory(e.target.value)}
                                    name="topLevelCategory"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <InputField2
                                    span={2}
                                    label="Second Level Category"
                                    type="text"
                                    value={secondLevelCategory}
                                    onChange={(e) => setSecondLevelCategory(e.target.value)}
                                    name="secondLevelCategory"
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <InputField2
                                    label="Third Level Category"
                                    type="text"
                                    value={thirdLevelCategory}
                                    onChange={(e) => setThirdLevelCategory(e.target.value)}
                                    name="thirdLevelCategory"
                                />
                            </div>

                            <div className="block text-sm/6 font-medium text-gray-900 col-span-full">
                                Quantity:
                            </div>
                            {size.map((s, index) => (
                                <div key={index} className="sm:col-span-1">
                                    <InputField2
                                        key={index}
                                        type='number'
                                        value={s.quantity}
                                        onChange={(e) => handleSizeInputChange(index, 'quantity', e.target.value)}
                                        name={`quantity-${index}`}
                                        label={`${s.name[0] === 'T' ? s.name.split('T')[1] : s.name}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6 mb-4">
                    <button type="button" className="px-4 py-2 bg-gray-50 text-sm font-semibold shadow rounded-lg text-black-600 hover:text-black-800 hover:shadow-lg hover:bg-gray-800 hover:text-white transition" onClick={() => navigate(-1)}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-gray-800 text-sm font-semibold shadow rounded-lg text-white hover:shadow-lg hover:bg-gray-600 hover:text-white transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    )
}

export default EditProduct