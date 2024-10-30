import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name)
        formData.append("description", data.description)
        formData.append("price", Number(data.price))
        formData.append("category", data.category)
        formData.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false)
            toast.success(response.data.messge)
        }
        else {
            toast.error(response.data.messge)
        }
    }


    return (
        <div className="add d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <div className='img-bgr1'>
                    <img src={assets.anh1} alt="" />
            </div>
            <div className='img-bgr2'>
                    <img src={assets.anh3} alt="" />
            </div>
            <div className="card p-5 shadow-lg border-0" style={{ maxWidth: '700px', width: '100%', borderRadius: '15px' }}>
                
                <h2 className="text-center mb-4">Add New Product</h2>

                <form onSubmit={onSubmitHandler}>
                    {/* Upload Image Section */}
                    <div className="form-group text-center">
                        <p className="font-weight-bold mb-1">Upload Image</p>
                        <label htmlFor="image" style={{ cursor: 'pointer' }}>
                            <img
                                src={image ? URL.createObjectURL(image) : assets.upload_area}
                                alt="Upload Preview"
                                className="rounded-circle shadow-sm"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'cover',
                                    border: '3px dashed #ddd',
                                    padding: '10px'
                                }}
                            />
                        </label>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            id="image"
                            className="d-none"
                            required
                        />
                    </div>

                    {/* Product Name */}
                    <div className="form-group">
                        <label htmlFor="name" className="mb-2">Product Name</label>
                        <input
                            onChange={onChangeHandler}
                            value={data.name}
                            type="text"
                            name="name"
                            id="name"
                            className="form-control rounded-pill"
                            placeholder="Enter product name"
                            required
                        />
                    </div>

                    {/* Product Description */}
                    <div className="form-group">
                        <label htmlFor="description" className="mb-2">Description</label>
                        <textarea
                            onChange={onChangeHandler}
                            value={data.description}
                            name="description"
                            id="description"
                            rows="4"
                            className="form-control"
                            placeholder="Describe the product"
                            style={{ borderRadius: '15px' }}
                        ></textarea>
                    </div>

                    {/* Product Details */}
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="category" className="mb-2">Category</label>
                            <select
                                onChange={onChangeHandler}
                                value={data.category}
                                name="category"
                                id="category"
                                className="form-control rounded-pill"
                            >
                                <option value="Salad">Salad</option>
                                <option value="Rolls">Rolls</option>
                                <option value="Deserts">Deserts</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="Drink">Drink</option>
                                <option value="Pure Veg">Pure Veg</option>
                                <option value="Pasta">Pasta</option>
                                <option value="Noodles">Noodles</option>
                            </select>
                        </div>

                        <div className="form-group col-md-6">
                            <label htmlFor="price" className="mb-2">Price ($)</label>
                            <input
                                onChange={onChangeHandler}
                                value={data.price}
                                type="number"
                                name="price"
                                id="price"
                                className="form-control rounded-pill"
                                placeholder="20"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-4">
                        <button type="submit" className="btn btn-primary rounded-pill px-4 py-2">
                            Add Product
                        </button>
                    </div>
                </form>
                
            </div>
            
        </div>

    )
}

export default Add;
