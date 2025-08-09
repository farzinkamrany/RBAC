import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../../../app/store";
import { getPermissions } from "../../../core/permissionRegistry";
import { Action, canAccess, Resource } from "../../../app/permissions";

const ProductList = () => {
  const products = useAppStore((state) => state.products);
  const addProduct = useAppStore((state) => state.addProduct);
  const setProducts = useAppStore((state) => state.setProducts);

  const [name, setName] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  const validTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSizeMB = 200;
  const user = useAppStore((state) => state.user);
  const permissions = getPermissions();

  const canDelete = canAccess(
    user?.role ?? null,
    Resource.Products,
    Action.Delete,
    permissions
  );
  const navigate = useNavigate();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const files = e.target.files;
    if (!files || files.length === 0) {
      setError("انتخاب حداقل یک تصویر الزامی است.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!validTypes.includes(file.type)) {
        setError("فرمت فایل‌ها باید JPG، PNG یا GIF باشد.");
        return;
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`حجم هر فایل نباید بیشتر از ${maxSizeMB} مگابایت باشد.`);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const clearAllImages = () => {
    setImages([]);
  };

  const addNewProduct = () => {
    setError("");
    if (!name.trim()) {
      setError("عنوان محصول الزامی است.");
      return;
    }
    if (images.length === 0) {
      setError("حداقل یک تصویر محصول الزامی است.");
      return;
    }
    addProduct({ name, image: JSON.stringify(images) });

    setName("");
    setImages([]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        لیست محصولات
      </h2>

      <div className="mb-6 space-y-3">
        {error && <div className="text-red-600 mb-2">{error}</div>}

        <input
          type="text"
          placeholder="عنوان محصول"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded w-full"
        />

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="block"
        />

        <div className="flex flex-wrap gap-2 mt-2">
          {images.map((img, i) => (
            <div
              key={i}
              className="relative w-20 h-20 rounded overflow-hidden border"
            >
              <img
                src={img}
                alt={`پیش‌نمایش ${i + 1}`}
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0 right-0 bg-red-600 text-white rounded-bl px-1"
                title="حذف تصویر"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {images.length > 0 && (
          <button
            type="button"
            onClick={clearAllImages}
            className="mt-2 text-sm text-red-600 underline"
          >
            حذف همه تصاویر
          </button>
        )}

        <button
          onClick={addNewProduct}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mt-4"
        >
          افزودن محصول
        </button>
      </div>

      <ul className="divide-y divide-gray-200">
        {products.map((p) => {
          let imgs: string[] = [];
          try {
            imgs = p.image ? JSON.parse(p.image) : [];
          } catch {
            imgs = p.image ? [p.image] : [];
          }
          return (
            <li key={p.id} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {imgs.length > 0 && (
                  <Link to={`/products/${p.id}`}>
                    {imgs.length > 0 && (
                      <img
                        src={imgs[0]}
                        alt={p.name}
                        className="h-12 w-12 object-cover rounded cursor-pointer"
                      />
                    )}
                  </Link>
                )}
                <span className="text-gray-700">{p.name}</span>
              </div>

              <span className="flex gap-4">
                <button
                  onClick={() => navigate(`/products/${p.id}/edit`)}
                  className="text-blue-600 hover:underline"
                >
                  ویرایش
                </button>
                {canDelete && (
                  <button
                    onClick={() =>
                      setProducts(products.filter((prod) => prod.id !== p.id))
                    }
                    className="text-red-600 hover:underline"
                  >
                    حذف
                  </button>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ProductList;
