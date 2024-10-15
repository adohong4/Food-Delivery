import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";
import FoodItem from '../FoodItem/FoodItem'
import ReactPaginate from 'react-paginate';

const FoodDisplay = ({ category, url }) => {
    const [foods, setFoods] = useState([]);
    const [totalFood, setTotalFood] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)


    // const { food_list } = useContext(StoreContext)

    const fetchAllfood = async (page = 1) => {
        const response = await axios.get(`${url}/api/food/lists?page=${page}&limit=12`);
        if (response.data.success) {
            setFoods(response.data.data)
            console.log(response.data.data);
            setTotalFood(response.data.totalFoods)
            setTotalPages(response.data.totalPages)
        }
        else {
            toast.error("Error")
        }
    }

    useEffect(() => {
        fetchAllfood(currentPage)
    }, [currentPage])

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1);
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {foods.map((item, index) => {
                    { console.log(category, item.category); }
                    if (category === "All" || category === item.category) {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                    }
                    return null;
                })}
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="<"
                renderOnZeroPageCount={null}

                pageClassName="page-item"
                pageLinkClassName="page-link" previousClassName="page-item"
                previousLinkClassName="page-link" nextClassName="page-item" nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination" activeClassName="active"
            />
        </div>
    )
}

export default FoodDisplay
