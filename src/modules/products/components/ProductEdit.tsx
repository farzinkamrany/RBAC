import { useState, useEffect } from "react";
import { useAppStore } from "../../../app/store";
import { useParams, useNavigate } from "react-router-dom";

const ProductEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const products = useAppStore((state) => state.products);
  const setProducts = useAppStore((state) => state.setProducts);

  const [name, setName] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const product = products.find((p) => p.id === Number(id));
    if (product) {
      setName(product.name);
      setImage(product.image ?? null);
    } else {
      navigate("/products");
    }
  }, [id, products, navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("عنوان محصول الزامی است.");
      return;
    }
    const updatedProducts = products.map((p) =>
      p.id === Number(id) ? { ...p, name, image } : p
    );
    setProducts(updatedProducts);
    navigate("/products");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-xl font-bold mb-4">ویرایش محصول</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="عنوان محصول"
        className="w-full p-2 border rounded mb-4"
      />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <img
          src={image}
          alt="پیش‌نمایش"
          className="h-20 mt-2 object-contain rounded"
        />
      )}
      <div className="mt-4 space-x-4 flex gap-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          ذخیره
        </button>
        <button
          onClick={() => navigate("/products")}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          انصراف
        </button>
      </div>
    </div>
  );
};

export default ProductEdit;
