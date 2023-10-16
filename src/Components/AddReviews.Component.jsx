import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ADDORUPDATEPRODUCTREVIEW } from "../Services/index";
import { useUser } from "../Context/User.Context";
import toast from "react-hot-toast";
import toastConfig from "../Constants/Toast.Constant.json";

export default function AddReviews({ fetchProductDetail }) {
  const { productId } = useParams();
  const { user } = useUser();

  const [iswrite, setIsWrite] = useState(false);
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });

  const handleInput = (e) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async () => {
    const { data } = await ADDORUPDATEPRODUCTREVIEW(productId, formData);

    if (data && data.SUCCESS) {
      toast.success(data?.MESSAGE, toastConfig.success);
      setFormData({
        rating: 5,
        comment: "",
      });
      setIsWrite(false);
      fetchProductDetail();
    }
  };

  return (
    <>
      {iswrite ? (
        <div className="flex flex-col items-center border border-gray-700 rounded-xl p-3 md:p-5">
          <img
            src={user?.avatar?.url || "/src/Assets/user-icon.png"}
            alt=""
            className="rounded-full h-16 md:h-28 w-16 md:w-28"
          />
          <p className="py-2"></p>
          <Rating
            value={+formData?.rating}
            precision={0.5}
            max={5}
            name="rating"
            onChange={(e) => handleInput(e)}
          />
          <textarea
            className="mt-3 w-[200px] md:w-[400px] outline-none rounded-sm p-2 md:p-3 text-sm md:text-base h-auto bg-black border border-gray-700"
            rows={3}
            placeholder="Write Your Review Here With length 100 To 200..."
            minLength={100}
            maxLength={200}
            required
            name="comment"
            onChange={(e) => handleInput(e)}
          ></textarea>
          <button
            className="mt-3 bg-button py-2 px-5 text-base font-semibold"
            onClick={() => handleSubmit()}
          >
            Add/Edit Review
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center border border-gray-700 rounded-xl p-2 md:p-5">
          <div className="w-[200px] md:w-[400px] h-full grid place-items-center">
            <button
              className="bg-button py-2 px-5 text-base font-semibold"
              onClick={() => setIsWrite(true)}
            >
              Add Review
            </button>
          </div>
        </div>
      )}
    </>
  );
}
