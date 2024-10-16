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
        <div className='add'>
            <div className="container my-4">
                <form onSubmit={onSubmitHandler}>
                    <div className="form-group">
                        <p>Upload Image</p>
                        <label htmlFor="image" className="d-block">
                            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Preview" className="img-thumbnail" style={{ cursor: 'pointer' }} />
                        </label>
                        <input
                            onChange={(e) => setImage(e.target.files[0])}
                            type="file"
                            id="image"
                            className="form-control-file"
                            style={{ display: 'none' }}
                            required
                        />

                    </div>

                    <div className="form-group">
                        <p>Product name</p>
                        <input onChange={onChangeHandler} value={data.name} type="text" name='name' className="form-control" placeholder='Type here' />
                    </div>

                    <div className="form-group">
                        <p>Product description</p>
                        <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" className="form-control" placeholder='Write content here'></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <p>Product Category</p>
                            <select onChange={onChangeHandler} value={data.category} name="category" className="form-control">
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
                            <p>Product Price</p>
                            <input onChange={onChangeHandler} value={data.price} type="number" name="price" className="form-control" placeholder="$20" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary add-btn">
                        ADD ITEMS
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Add;
