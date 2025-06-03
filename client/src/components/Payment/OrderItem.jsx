const OrderItem = ({ item }) => {
    return (
        <div className="flex gap-4 pb-4 border-b border-primary-100 last:border-b-0 last:pb-0">
            <div className="w-20 flex-shrink-0 rounded overflow-hidden">
                {item.product && item.product.preview && (
                    <img
                        src={item.product.preview}
                        alt={item.product?.title || 'Product Image'}
                        className="h-full w-full object-cover"
                    />
                )}
            </div>

            <div className="flex-grow flex flex-col justify-between">
                <div>
                    <h5 className="font-medium text-primary-800">
                        {item.product?.title || 'Product'}
                    </h5>
                    <p className="text-sm text-primary-500">
                        {item.product?.brand || 'Brand'}
                    </p>
                    <p className="text-sm text-primary-600">
                        Size: {item.product.size} | Qty: {item.product.quantity}
                    </p>
                </div>

                <div className="flex justify-end">
                    <p className="font-medium text-primary-800">
                        INR {item.product.discountedPrice}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OrderItem;