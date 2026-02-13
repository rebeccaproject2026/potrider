/**
 * Reusable order summary card - blue block for use inside chat (product list + financial breakdown + Human Response).
 */
const OrderSummaryCard = ({ products = [], subtotal, promocode, discount, potCash, storeDiscount, total, timestamp, showHumanResponse }) => {
  return (
    <div className="w-full max-w-[90%] ml-auto rounded-md overflow-hidden bg-(--color-secondary) text-white shadow-lg">
      <div className="px-3 py-2">
        {/* Products */}
        {products.map((p, i) => (
          <div key={i} className="flex items-center gap-4 pb-2 mb-2 border-b border-white/20 last:border-b-0 last:mb-0 last:pb-0">
            {/* Image */}
            <div className="w-[65px] h-[65px] rounded-sm bg-white/10 shrink-0 overflow-hidden flex items-center justify-center">
              {p.image ? (
                <img src={p.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="text-white/40 text-sm font-medium">Img</div>
              )}
            </div>

            {/* Product Name & Qty */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[15px] text-white leading-tight">{p.name}</p>
              <p className="text-[15px] text-white/90 mt-1">Qty: {p.qty}</p>
            </div>

            {/* Items */}
            <div className="text-center shrink-0 mr-8">
              <p className="text-[15px] text-white/90 mb-0.5">Items</p>
              <p className="font-bold text-[19px] text-white">{p.items}</p>
            </div>

            {/* Total */}
            <div className="text-right shrink-0 min-w-[90px]">
              <p className="text-[15px] text-white/90 mb-0.5">Total</p>
              <p className="font-medium text-[15px] text-white">{p.total}</p>
            </div>
          </div>
        ))}

        {/* Financial breakdown */}
        <div className="pt-1 space-y-2">
          {subtotal != null && (
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-white/90">Subtotal</span>
              <span className="font-medium text-[15px] text-white">{subtotal}</span>
            </div>
          )}
          {promocode != null && (
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-white/90">Promocode</span>
              <span className="font-medium text-[15px] text-white">{promocode}</span>
            </div>
          )}
          {discount != null && (
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-white/90">Discount</span>
              <span className="font-medium text-[15px] text-white">{discount}</span>
            </div>
          )}
          {potCash != null && (
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-white/90">Pot Cash</span>
              <span className="font-medium text-[15px] text-white">{potCash}</span>
            </div>
          )}
          {storeDiscount != null && (
            <div className="flex justify-between items-center">
              <span className="text-[16px] text-white/90">Store Discount</span>
              <span className="font-medium text-[15px] text-white">{storeDiscount}</span>
            </div>
          )}
          {total != null && (
            <div className="flex justify-between items-center pt-2 mt-1">
              <span className="font-bold text-[18px] text-white">Total</span>
              <span className="font-medium text-[18px] text-white">{total}</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-white/20">
          <span className="text-[13px] font-medium text-white/90">{timestamp}</span>
          {showHumanResponse !== false && (
            <button
              type="button"
              className="text-[13px] font-semibold px-2 py-1 rounded-sm bg-white text-(--color-secondary) hover:bg-blue-50 transition-colors"
            >
              Human Response
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
