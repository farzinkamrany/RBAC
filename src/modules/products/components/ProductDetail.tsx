import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppStore } from "../../../app/store";
import Modal from "../../../components/Modal";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useAppStore((state) => state.products);
  const product = products.find((p) => p.id === Number(id));

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!product) {
    return (
      <div className="p-6 text-center">
        محصول یافت نشد
        <button
          onClick={() => navigate("/products")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          بازگشت به محصولات
        </button>
      </div>
    );
  }

  let images: string[] = [];
  try {
    images = product.image ? JSON.parse(product.image) : [];
  } catch {
    images = product.image ? [product.image] : [];
  }

  const openModal = (img: string) => {
    setSelectedImage(img);
    setModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

      <div className="flex flex-wrap gap-4">
        {images.length > 0 ? (
          images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.name} - ${i + 1}`}
              className="w-32 h-32 object-cover rounded cursor-pointer hover:scale-105 transition"
              onClick={() => openModal(img)}
            />
          ))
        ) : (
          <div>بدون تصویر</div>
        )}
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedImage && (
          <img
            src={selectedImage}
            alt="تصویر بزرگ شده"
            className="max-w-full max-h-[80vh]"
          />
        )}
      </Modal>

      <button
        onClick={() => navigate("/products")}
        className="mt-6 px-4 py-2 bg-gray-600 text-white rounded"
      >
        بازگشت به لیست محصولات
      </button>
    </div>
  );
};

export default ProductDetail;
